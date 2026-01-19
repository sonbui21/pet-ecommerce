"use client";

import { Cart } from "@/lib/types/basket";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleCheckSVG } from "../icon/circle-check";
import { CreditCardSVG } from "../icon/credit-card";
import { Divider } from "../common/divider";
import { updateCart } from "@/lib/data/basket";

export const Payment = ({ cart }: { cart: Cart }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "payment";

  const handleEdit = () => {
    updateCart({ ...cart, currentStep: "payment" });
    router.push(pathname + "?step=payment", { scroll: false });
  };

  const paymentReady = cart.shippingMethods !== undefined;

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <h2
            className={clsx("mb-0", {
              "opacity-50 pointer-events-none select-none": !isOpen && !paymentReady,
            })}
          >
            Payment
          </h2>
          {!isOpen && paymentReady && <CircleCheckSVG className='w-[20px] pb-2 text-(--theme-primary)' />}
        </div>

        {!isOpen && paymentReady && <button onClick={handleEdit}>Edit</button>}
      </div>

      {isOpen ? (
        <>
          <div className='grid'>
            <button className='flex items-center justify-between cursor-pointer py-3 px-8 border rounded-lg! border-(--theme-primary)! mt-4'>
              <div className='flex items-center gap-x-4'>
                <input type='radio' className='accent-(--theme-primary)!' defaultChecked />
                <span>Manual Payment</span>
              </div>
              <span>
                <CreditCardSVG className='w-[20px]' />
              </span>
            </button>
          </div>
          <div className='flex mt-8'>
            <button className='btn'>Continue to review</button>
          </div>
        </>
      ) : (
        <>
          {cart && paymentReady && (
            <div className='flex items-start gap-x-8'>
              <div className='flex items-start gap-x-1 w-full'>
                <div className='flex flex-col w-1/3'>
                  <p className='font-bold! mb-2'>Payment method</p>
                  <p className='m-0'>Manual Payment</p>
                </div>

                <div className='flex flex-col w-1/3 '>
                  <p className='font-bold! mb-2'>Payment details</p>
                  <p className='m-0'>Another step will appear</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Divider className='mt-8 mb-8' />
    </div>
  );
};
