"use client";

import clsx from "clsx";
import { useState, useTransition } from "react";
import { Cart } from "@/lib/types/basket";
import { placeOrder } from "@/lib/actions/order";
import { StoreCustomer } from "@/lib/types/customer";
import { useRouter } from "next/navigation";
import { useCartStore } from "../basket/cart-store";

export const Review = ({ isOpen, cart, customer }: { cart: Cart; customer: StoreCustomer; isOpen: boolean }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const fetchCart = useCartStore((state) => state.fetchCart);

  const handlePlaceOrder = async () => {
    setError(null);
    setMessage(null);

    startTransition(async () => {
      const result = await placeOrder(cart, customer.id, customer.email);

      if (!result.success) {
        setError(result.error || "Failed to place order");
        return;
      }

      // setMessage(
      //   result.orderId ? `Order placed successfully! Your order ID is ${result.orderId}` : "Order placed successfully!",
      // );
    });

    await fetchCart();
    router.push("/account");
  };

  return (
    <div>
      <div className='flex gap-2'>
        <h2
          className={clsx("mb-0", {
            "opacity-50 pointer-events-none select-none": !isOpen,
          })}
        >
          Review
        </h2>
      </div>

      {isOpen && (
        <>
          <div>
            By clicking the Place Order button, you confirm that you have read, understand and accept our Terms of Use,
            Terms of Sale and Returns Policy and acknowledge that you have read PetPal Store&apos;s Privacy Policy.
          </div>
          {error && (
            <div className='mt-4 rounded-md bg-red-50 p-4'>
              <p className='text-sm text-red-800 mb-0'>{error}</p>
            </div>
          )}
          {message && (
            <div className='mt-4 rounded-md bg-green-50 p-4'>
              <p className='text-sm text-green-800 mb-0'>{message}</p>
            </div>
          )}
          <div className='flex mt-8'>
            <button
              onClick={handlePlaceOrder}
              className={`btn ${isPending ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
            >
              {isPending ? "Placing order..." : "Place order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
