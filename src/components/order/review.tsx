"use client";

import clsx from "clsx";
import { useState } from "react";
import { Cart } from "@/lib/types/cart";
import { placeOrder } from "@/lib/actions/order";
import { StoreCustomer } from "@/lib/types/customer";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "../../lib/stores/cart-store";

export const Review = ({ isOpen, cart, customer }: { cart: Cart; customer: StoreCustomer; isOpen: boolean }) => {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const fetchCart = useCartStore((state) => state.fetchCart);
  const setOrderId = useCartStore((state) => state.setOrderId);

  const handlePlaceOrder = async () => {
    setError(null);
    setMessage(null);
    setPending(true);

    // const result = await placeOrder(cart, customer.id, customer.email);

    setPending(false);

    const result = { success: true, orderId: "019c0cba-6ebc-7f3f-b680-204510d0ab9b" };
    if (!result.success || !result.orderId) {
      setError("Failed to place order");
    } else {
      setOrderId(result.orderId);
      // setIsOrderPlaced(true);
      // setMessage("Order placed successfully! Redirecting to your account page...");

      router.push(pathname + "?step=payment", { scroll: false });
      await fetchCart();
    }
  };

  return (
    <div>
      {isOpen && (
        <>
          <div className='flex gap-2'>
            <h2
              className={clsx("mb-0", {
                "opacity-50 pointer-events-none select-none": !isOpen,
              })}
            >
              Review
            </h2>
          </div>
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
          {!isOrderPlaced && (
            <div className='flex mt-8'>
              <button
                onClick={handlePlaceOrder}
                className={`btn ${isPending ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
              >
                {isPending ? "Placing order..." : "Place order"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
