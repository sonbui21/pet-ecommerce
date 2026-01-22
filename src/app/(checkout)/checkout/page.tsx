import { Addresses } from "@/components/order/addresses";
import { CheckoutSummary } from "@/components/order/checkout-summary";
import { Payment } from "@/components/order/payment";
import { Review } from "@/components/order/review";
import { getCart } from "@/lib/actions/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage(props: { searchParams: Promise<{ step?: string }> }) {
  const cart = await getCart();

  const searchParams = await props.searchParams;

  if (!cart || !cart.items || cart.items.length === 0) {
    return notFound();
  }

  const customer = await retrieveCustomer();
  if (!customer) {
    return notFound();
  }

  const step = searchParams.step;
  const currentStep = cart.currentStep;

  if (currentStep && step !== currentStep) {
    redirect(`/checkout?step=${currentStep}`);
  } else if (!step && !currentStep) {
    redirect("/checkout?step=address");
  }

  return (
    <div className='container'>
      <div className='row justify-between py-8'>
        <div className='col-lg-7'>
          <Addresses cart={cart} customer={customer} isOpen={step === "address"} />
          {/* <Shipping cart={cart} isOpen={step === "delivery"} /> */}
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
