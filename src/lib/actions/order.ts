"use server";

import { Cart } from "@/lib/types/cart";
import { CreateOrderRequest } from "@/lib/types/order";
import { createOrder } from "@/lib/data/order";
import { getRequestOrderId, setRequestOrderId } from "../data/cookies";

export interface PlaceOrderResult {
  success: boolean;
  error?: string;
  orderId?: string;
  status?: string;
}

export async function placeOrder(cart: Cart, userId: string, userName: string): Promise<PlaceOrderResult> {
  const orderRequest: CreateOrderRequest = {
    userId,
    userName,
    street: cart.shippingAddress?.street || "",
    city: cart.shippingAddress?.city || "",
    state: cart.shippingAddress?.state || "",
    country: cart.shippingAddress?.country || "",
    zipCode: cart.shippingAddress?.zipCode || "",
    cardNumber: "0000000000000000",
    cardHolderName: userName,
    cardExpiration: "2030-01-01T00:00:00Z",
    cardSecurityNumber: "000",
    cardTypeId: 1,
    buyer: userName,
    items: cart.items.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      title: item.title,
      slug: item.slug,
      thumbnail: item.thumbnail,
      price: item.price,
      variantOptions: item.variantOptions.map((o) => `${o.name}:${o.value}`).join(";"),
    })),
  };

  let requestOrderId = await getRequestOrderId();
  if (!requestOrderId) {
    requestOrderId = crypto.randomUUID();
    setRequestOrderId(requestOrderId);
  }

  const result = await createOrder(crypto.randomUUID(), orderRequest);

  if (!result.success) {
    return {
      success: false,
      error: result.error || "Failed to place order.",
    };
  }

  return {
    success: true,
    orderId: result.orderId,
    status: result.status,
  };
}
