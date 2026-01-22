"use client";

import { StoreCustomer } from "@/lib/types/customer";
import Link from "next/link";
import { useCartStore } from "../../lib/stores/cart-store";
import { Items } from "./items";
import { Summary } from "./summary";
import { loginAction } from "@/lib/actions/auth";

export function CartTemplate({ customer }: { customer: StoreCustomer | null }) {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  return (
    <div className='container mb-8'>
      <div className='row justify-between'>
        {cart?.items?.length ? (
          <>
            <div className='col-lg-7'>
              <div className='flex flex-col'>
                {!customer && (
                  <div className='bg-white flex items-center justify-between border-b border-neutral-300 mb-3'>
                    <div>
                      <h1 className='txt-xlarge'>Already have an account?</h1>
                      <p className='txt-medium text-ui-fg-subtle mt-2'>Sign in for a better experience.</p>
                    </div>
                    <div>
                      <form action={loginAction}>
                        <button className='btn justify-center'>Sign in</button>
                      </form>
                    </div>
                  </div>
                )}

                <Items items={cart.items} removeItem={removeItem} updateItemQuantity={updateItemQuantity} />
              </div>
            </div>
            <div className='col-lg-4 relative'>{cart && <Summary cart={cart} />}</div>
          </>
        ) : (
          <div>
            <h1>Cart</h1>
            <p>
              You don&apos;t have anything in your cart. Let&apos;s change that, use the link below to start browsing
              our products.
            </p>
            <div>
              <Link href='/collections' className='btn'>
                Explore products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
