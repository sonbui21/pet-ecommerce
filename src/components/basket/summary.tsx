import { Cart } from "@/lib/types/cart";
import Link from "next/link";
import { Price } from "../common/price";

export const Summary = ({ cart }: { cart: Cart }) => {
  const step = getCheckoutStep(cart);

  return (
    <div className='sticky top-30'>
      <h1>Summary</h1>
      <div>
        <div className='py-3 border-y border-neutral-200'>
          <div className='flex items-center justify-between py-1'>
            <p className='mb-0'>Subtotal (excl. shipping and taxes)</p>
            <Price amount={cart.totalPrice} />
          </div>
          <div className='flex items-center justify-between py-1'>
            <p className='mb-0'>Shipping</p>
            <Price amount={0} />
          </div>
          <div className='flex items-center justify-between py-1'>
            <p className='mb-0'>Taxes</p>
            <Price amount={0} />
          </div>
        </div>

        <div className='flex items-center justify-between border-b border-neutral-200 text-(--theme-primary) py-3 font-bold text-[20px]'>
          <p className='mb-0 text-[20px]!'>Total</p>
          <Price amount={cart.totalPrice} />
        </div>
      </div>
      <div className='flex justify-center mt-8'>
        <Link href={"/checkout?step=" + step} className='btn justify-center w-full'>
          Go to checkout
        </Link>
      </div>
    </div>
  );
};

function getCheckoutStep(cart: Cart) {
  if (!cart?.shippingAddress) {
    return "address";
  } else if (!cart?.paymentCollection) {
    return "payment";
  } else {
    return "review";
  }
}
