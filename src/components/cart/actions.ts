import { getCart } from "@/lib/data/basket";
import { setCartId } from "@/lib/data/cookies";

export async function createCartAndSetCookie() {
  const cart = await getCart();

  if (cart) setCartId(cart.id);
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    itemId: string;
    quantity: number;
  }
) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find((line) => line.merchandise.id === merchandiseId);

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ itemId, quantity }]);
    }

    // revalidateTag(TAGS.cart, "seconds");
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}
