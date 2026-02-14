"use client";

import { Cart } from "@/lib/types/cart";
import clsx from "clsx";
import { CircleCheckSVG } from "../icon/circle-check";
import CheckoutForm from "./checkout";
import { createPayment, CreatePaymentRequest } from "@/lib/data/payment";
import { useCartStore } from "@/lib/stores/cart-store";
import { StoreCustomer } from "@/lib/types/customer";
import { useEffect, useMemo, useRef, useState } from "react";

export const Payment = ({ cart, isOpen, customer }: { cart: Cart; isOpen: boolean; customer: StoreCustomer }) => {
  const orderId = useCartStore((state) => state.orderId);

  const amount = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart.items]);

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setClientSecret(null);

      const input: CreatePaymentRequest = {
        userId: customer.id,
        orderId,
        amount,
      };

      console.log(input);

      const result = await createPayment(crypto.randomUUID(), input);

      if (!result.success || !result.clientSecret) {
        return;
      }

      setClientSecret(result.clientSecret);
    };

    run();
  }, [isOpen, customer.id, orderId, amount]);

  return (
    <>
      {clientSecret && (
        <div>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <h2
                className={clsx("mb-0", {
                  "opacity-50 pointer-events-none select-none": !isOpen,
                })}
              >
                Payment
              </h2>
              {!isOpen && <CircleCheckSVG className='w-[20px] pb-2 text-(--theme-primary)' />}
            </div>
          </div>

          <div id='checkout'>
            <CheckoutForm clientSecret={clientSecret} />
          </div>
        </div>
      )}
    </>
  );
};
