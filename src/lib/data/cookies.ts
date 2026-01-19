"use server";

import { cookies } from "next/headers";

export const getCartId = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("_pet_cart_id")?.value;
};

export const setCartId = async (cartId: string) => {
  const cookieStore = await cookies();
  cookieStore.set("_pet_cart_id", cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

export const removeCartId = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("_pet_cart_id");
};
