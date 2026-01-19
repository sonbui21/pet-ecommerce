"use client";

import { Cart, ShippingMethod } from "@/lib/types/basket";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { CircleCheckSVG } from "../icon/circle-check";
import { Divider } from "../common/divider";
import { updateCart } from "@/lib/data/basket";
import { FormEvent } from "react";

export const Shipping = ({ cart, isOpen }: { cart: Cart; isOpen: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleEdit = async () => {
    await updateCart({ ...cart, currentStep: "delivery" });
    router.push(pathname + "?step=delivery", { scroll: false });
  };

  const handleContinue = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const shippingMethod: ShippingMethod = {
      id: "standard_shipping",
      name: "Standard shipping",
      amount: 5.0,
      description: "Standard shipping",
    };

    const updatedCart: Cart = {
      ...cart,
      shippingMethods: shippingMethod,
      currentStep: "payment",
    };

    try {
      const savedCart = await updateCart(updatedCart);

      if (savedCart) {
        router.push(pathname + "?step=payment", { scroll: false });
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <h2
            className={clsx("mb-0", {
              "opacity-50 pointer-events-none select-none": !isOpen && !cart.shippingMethods,
            })}
          >
            Delivery
          </h2>
          {!isOpen && cart.shippingMethods && <CircleCheckSVG className='w-[20px] pb-2 text-(--theme-primary)' />}
        </div>

        {!isOpen && cart?.shippingMethods && (
          <button onClick={handleEdit} className='font-semibold'>
            Edit
          </button>
        )}
      </div>

      {isOpen ? (
        <form onSubmit={handleContinue}>
          <div className='grid'>
            <div className='flex flex-col'>
              <span className='font-bold'>Shipping method</span>
              <span className='mb-4'>How would you like you order delivered</span>
            </div>

            <button className='flex items-center justify-between cursor-pointer py-3 px-8 border rounded-lg! border-(--theme-primary)!'>
              <div className='flex items-center gap-x-4'>
                <input type='radio' className='accent-(--theme-primary)!' defaultChecked />
                <span>Standard shipping</span>
              </div>
              <span>$5.00</span>
            </button>
          </div>
          <div className='flex mt-8'>
            <button className='btn'>Continue to payment</button>
          </div>
        </form>
      ) : (
        <>
          {cart && cart.shippingMethods && (
            <div>
              <div className='flex flex-col w-1/3'>
                <p className='font-bold! mb-2'>Method</p>
                <p className='mb-0'>Standard shipping $5.00</p>
              </div>
            </div>
          )}
        </>
      )}
      <Divider className='mt-6 mb-6' />
    </div>
  );
};
