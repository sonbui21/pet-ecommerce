"use client";

import { Cart, CartItem } from "@/lib/types/basket";
import { ProductDetail, ProductVariant } from "@/lib/types/catalog";
import { createContext, use, useCallback, useContext, useMemo, useOptimistic } from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { itemId: string; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: { variant: ProductVariant; product: ProductDetail };
    };

type CartContextType = {
  cartPromise: Promise<Cart | undefined>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  return <CartContext.Provider value={{ cartPromise }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const initialCart = use(context.cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(initialCart, cartReducer);

  const updateCartItem = useCallback(
    (itemId: string, updateType: UpdateType) => {
      updateOptimisticCart({
        type: "UPDATE_ITEM",
        payload: { itemId, updateType },
      });
    },
    [updateOptimisticCart]
  );

  const addCartItem = useCallback(
    (variant: ProductVariant, product: ProductDetail) => {
      updateOptimisticCart({ type: "ADD_ITEM", payload: { variant, product } });
    },
    [updateOptimisticCart]
  );

  return useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
    }),
    [optimisticCart, updateCartItem, addCartItem]
  );
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case "UPDATE_ITEM": {
      const { itemId, updateType } = action.payload;
      const updatedItems = currentCart.items
        .map((item) => (item.id === itemId ? updateCartItem(item, updateType) : item))
        .filter(Boolean) as CartItem[];

      if (updatedItems.length === 0) {
        return {
          ...currentCart,
          items: [],
          total: 0,
          subTotal: 0,
          taxTotal: 0,
          totalQuantity: 0,
        };
      }

      const subTotal = updatedItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
      const totalQuantity = updatedItems.reduce((sum, it) => sum + it.quantity, 0);

      const taxTotal = currentCart.taxTotal ?? 0;
      const total = subTotal + taxTotal;

      return {
        ...currentCart,
        items: updatedItems,
        subTotal,
        totalQuantity,
        taxTotal,
        total,
      };
    }
    case "ADD_ITEM": {
      const { variant, product } = action.payload;
      const variantId = variant.id;

      const existingItem = currentCart.items.find((it) => it.variantId === variantId);

      const updatedItem = createOrUpdateCartItem(existingItem, variant, product);

      const updatedItems = existingItem
        ? currentCart.items.map((it) => (it.variantId === variantId ? updatedItem : it))
        : [...currentCart.items, updatedItem];

      const subTotal = updatedItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
      const totalQuantity = updatedItems.reduce((sum, it) => sum + it.quantity, 0);
      const taxTotal = currentCart.taxTotal ?? 0;
      const total = subTotal + taxTotal;

      return {
        ...currentCart,
        items: updatedItems,
        subTotal,
        totalQuantity,
        taxTotal,
        total,
      };
    }
    default:
      return currentCart;
  }
}

function createEmptyCart(): Cart {
  return {
    id: crypto.randomUUID(),
    items: [],
    currencyCode: "USD",
    total: 0,
    subTotal: 0,
    taxTotal: 0,
    totalQuantity: 0,
  };
}

function updateCartItem(item: CartItem, updateType: UpdateType): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity = updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  return {
    ...item,
    quantity: newQuantity,
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: ProductDetail
): CartItem {
  const nextQuantity = (existingItem?.quantity ?? 0) + 1;
  const quantity = Math.min(nextQuantity, variant.availableStock);

  const thumbnail = product.images[0]?.src ?? "";

  const variantOptions: CartItem["variantOptions"] = variant.options.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  return {
    id: existingItem?.id ?? crypto.randomUUID(),
    productId: product.id,
    variantId: variant.id,
    quantity,

    title: product.title,
    slug: product.slug,
    thumbnail: thumbnail,

    variantOptions: variantOptions,
    price: variant.price,
    availableStock: variant.availableStock,
  };
}
