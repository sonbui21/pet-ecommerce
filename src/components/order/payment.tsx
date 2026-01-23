"use client";

import { Cart } from "@/lib/types/cart";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { CircleCheckSVG } from "../icon/circle-check";
import { CreditCardSVG } from "../icon/credit-card";
import { Divider } from "../common/divider";
import { FormEvent } from "react";
import { updateCart } from "@/lib/actions/cart";

export const Payment = ({ cart, isOpen }: { cart: Cart; isOpen: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleEdit = async () => {
    router.push(pathname + "?step=payment", { scroll: false });
  };

  const paymentReady = cart.paymentCollection !== undefined && cart.paymentCollection != "";

  const handleContinue = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedCart: Cart = {
      ...cart,
      paymentCollection: "Visa / MasterCard",
    };
    await updateCart(updatedCart);

    router.push(pathname + "?step=review", { scroll: false });
  };

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

        {!isOpen && paymentReady && (
          <button onClick={handleEdit} className='font-semibold'>
            Edit
          </button>
        )}
      </div>

      {isOpen ? (
        <form onSubmit={handleContinue}>
          <div className='grid'>
            <button className='flex items-center justify-between cursor-pointer py-3 px-8 border rounded-lg! border-(--theme-primary)! mt-4'>
              <div className='flex items-center gap-x-4'>
                <input type='radio' className='accent-(--theme-primary)!' defaultChecked />
                <span>Visa / MasterCard</span>
              </div>
              <span>
                <CreditCardSVG className='w-[20px]' />
              </span>
            </button>
          </div>
          <div className='flex mt-8'>
            <button className='btn'>Continue to review</button>
          </div>
        </form>
      ) : (
        <>
          {cart && paymentReady && (
            <div className='flex items-start gap-x-8'>
              <div className='flex items-start gap-x-1 w-full'>
                <div className='flex flex-col w-1/3'>
                  <p className='font-bold! mb-2'>Payment method</p>
                  <p className='m-0'>{cart.paymentCollection}</p>
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
      <Divider className='mt-6 mb-6' />
    </div>
  );
};
