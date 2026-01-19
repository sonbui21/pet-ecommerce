import { getCart } from "@/lib/data/basket";

export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    itemId: string;
    quantity: number;
  },
) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    // revalidateTag(TAGS.cart, "seconds");
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}
