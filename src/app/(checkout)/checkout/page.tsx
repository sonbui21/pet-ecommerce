import { Addresses } from "@/components/order/addresses";
import { CheckoutSummary } from "@/components/order/checkout-summary";
import { Payment } from "@/components/order/payment";
import { Review } from "@/components/order/review";
import { getCart } from "@/lib/actions/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage(props: { searchParams: Promise<{ step?: string }> }) {
  const cart = await getCart();

  if (!cart || !cart.items || cart.items.length === 0) {
    return notFound();
  }

  const customer = await retrieveCustomer();
  if (!customer) {
    return notFound();
  }

  const searchParams = await props.searchParams;
  const step = searchParams.step;

  return (
    <div className='container'>
      <div className='row justify-between py-8'>
        <div className='col-lg-7'>
          <Addresses cart={cart} customer={customer} isOpen={step === "address"} />
          <Payment cart={cart} isOpen={step === "payment"} />
          <Review cart={cart} customer={customer} isOpen={step === "review"} />
        </div>

        <div className='col-lg-4'>
          <CheckoutSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
