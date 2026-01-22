import { getCart, updateCart } from "@/lib/data/basket";
import { getCartId, setCartId } from "@/lib/data/cookies";
import { Cart, CartItem } from "@/lib/types/basket";
import { ProductDetail, SelectedOptions } from "@/lib/types/catalog";
import { create } from "zustand";

interface CartStore {
  cart: Cart | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setCart: (cart: Cart | null) => void;
  fetchCart: () => Promise<void>;
  addItemToCart: (product: ProductDetail, selectedOptions: SelectedOptions) => Promise<string | null>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => {
  return {
    cart: null,
    isOpen: false,

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),

    setCart: (cart) => set({ cart }),

    fetchCart: async () => {
      const cart = await getCart();

      if (!cart) {
        const newCart: Cart = {
          id: crypto.randomUUID(),
          items: [],
          currencyCode: "USD",
          total: 0,
          subTotal: 0,
          taxTotal: 0,
          totalQuantity: 0,
        };

        set({ cart: newCart });
        setCartId(newCart.id);
      } else {
        set({ cart });

        const cartId = await getCartId();

        if (cart.id !== cartId) {
          setCartId(cart.id);
        }
      }
    },

    addItemToCart: async (product: ProductDetail, selectedOptions: SelectedOptions) => {
      const { cart } = get();

      if (!cart) {
        return "Cart is not initialized";
      }

      if (!selectedOptions.variantId) {
        return "Please select a variant";
      }

      const selectedVariant = product.variants.find((variant) => variant.id === selectedOptions.variantId);
      if (!selectedVariant) {
        return "Selected variant not found";
      }

      const existingItem = cart.items.find((item) => item.variantId === selectedVariant.id);

      const existingQuantity = existingItem?.quantity ?? 0;
      const requestedQuantity = selectedOptions.quantity;
      const newQuantity = existingQuantity + requestedQuantity;

      if (newQuantity > selectedVariant.availableStock) {
        const available = selectedVariant.availableStock - existingQuantity;
        if (available <= 0) {
          return "This item is out of stock";
        } else {
          return `Only ${available} more item${available > 1 ? "s" : ""} available in stock`;
        }
      }

      const thumbnail = product.images[0]?.src ?? "";
      const variantOptions = selectedVariant.options
        .map((opt) => ({
          name: opt.name,
          value: opt.value,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      const cartItem: CartItem = {
        id: existingItem?.id ?? crypto.randomUUID(),
        productId: product.id,
        variantId: selectedVariant.id,
        quantity: newQuantity,
        title: product.title,
        slug: product.slug,
        thumbnail: thumbnail,
        variantOptions: variantOptions,
        price: selectedVariant.price,
        availableStock: selectedVariant.availableStock,
      };

      const updatedItems = existingItem
        ? cart.items.map((item) => (item.variantId === selectedVariant.id ? cartItem : item))
        : [...cart.items, cartItem];

      const subTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const taxTotal = cart.taxTotal ?? 0;
      const total = subTotal + taxTotal;

      const updatedCart = {
        ...cart,
        items: updatedItems,
        subTotal,
        totalQuantity,
        taxTotal,
        total,
      };

      set({ cart: updatedCart });

      try {
        const syncedCart = await updateCart(updatedCart);
        if (syncedCart) {
          set({ cart: syncedCart });
        } else {
          set({ cart });
          return "Failed to sync cart with server. Please try again.";
        }
      } catch (error) {
        console.error("Error syncing cart with server:", error);
        set({ cart });
        return "Failed to sync cart with server. Please try again.";
      }

      return null;
    },

    updateItemQuantity: async (itemId, quantity) => {
      const { cart } = get();
      if (!cart) return;

      const items = cart.items ?? [];
      const updatedItems = items.map((item) => (item.id === itemId ? { ...item, quantity: quantity } : item));

      const nextCart: Cart = { ...cart, items: updatedItems };

      const updatedCart = await updateCart(nextCart);
      set({ cart: updatedCart });
    },

    removeItem: async (itemId) => {
      const { cart } = get();
      if (!cart) return;

      const items = cart.items ?? [];
      const removedItem = items.filter((item) => item.id !== itemId);

      const nextCart: Cart = { ...cart, items: removedItem };

      const updatedCart = await updateCart(nextCart);
      set({ cart: updatedCart });
    },
  };
});
