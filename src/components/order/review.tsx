"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { CircleCheckSVG } from "../icon/circle-check";

export const Review = () => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "review";
  return (
    <div>
      <div className='flex gap-2'>
        <h2
          className={clsx("mb-0", {
            "opacity-50 pointer-events-none select-none": !isOpen && true,
          })}
        >
          Review
        </h2>
        {!isOpen && false && <CircleCheckSVG className='w-[20px] pb-2 text-(--theme-primary)' />}
      </div>

      {isOpen && true && (
        <>
          <div>
            By clicking the Place Order button, you confirm that you have read, understand and accept our Terms of Use,
            Terms of Sale and Returns Policy and acknowledge that you have read PetPal Store&apos;s Privacy Policy.
          </div>
          <div className='flex mt-8'>
            <button className='btn'>Place order</button>
          </div>
        </>
      )}
    </div>
  );
};
