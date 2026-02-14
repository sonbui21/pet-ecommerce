"use client";

import { FormEvent, useState } from "react";
import { PaymentElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe, StripePaymentElementOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

function PaymentForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error !== undefined && (error.type === "card_error" || error.type === "validation_error")) {
      setError(error.message ?? "An unexpected error occurred.");
    } else {
      setMessage("Payment successfully! Redirecting to your account page...");
    }

    setIsLoading(false);

    setTimeout(() => {
      router.push("/account");
    }, 1500);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='mt-3'>
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id='submit' className='btn mt-4'>
        <span id='button-text'>{isLoading ? <div className='spinner' id='spinner'></div> : "Pay now"}</span>
      </button>

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
    </form>
  );
}

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const appearance: Appearance = {
    theme: "stripe",
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm />
    </Elements>
  );
}
