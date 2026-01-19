"use client";

import { Cart } from "@/lib/types/basket";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleCheckSVG } from "../icon/circle-check";
import { Divider } from "../common/divider";
import { updateCart } from "@/lib/data/basket";

export const Shipping = ({ cart }: { cart: Cart }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "delivery";

  const handleEdit = () => {
    updateCart({ ...cart, currentStep: "payment" });
    router.push(pathname + "?step=delivery", { scroll: false });
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

        {!isOpen && cart?.shippingAddress && cart?.billingAddress && cart?.email && (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>

      {isOpen ? (
        <>
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
        </>
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
      <Divider className='mt-8 mb-8' />
    </div>
  );
};
