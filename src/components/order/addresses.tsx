"use client";

import { usePathname, useRouter } from "next/navigation";
import { ShippingAddress } from "./shipping-address";
import { FormEvent } from "react";
import { Address, Cart } from "@/lib/types/cart";
import { StoreCustomer } from "@/lib/types/customer";
import { CircleCheckSVG } from "../icon/circle-check";
import { Divider } from "../common/divider";
import { updateCart } from "@/lib/actions/cart";

export const Addresses = ({ cart, customer, isOpen }: { cart: Cart; customer: StoreCustomer; isOpen: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleEdit = async () => {
    router.push(pathname + "?step=address", { scroll: false });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const shippingAddress: Address = {
      name: (formData.get("shipping_address.name") as string) || "",
      phone: (formData.get("shipping_address.phone") as string) || "",
      street: (formData.get("shipping_address.street") as string) || "",
      city: (formData.get("shipping_address.city") as string) || "",
      state: (formData.get("shipping_address.state") as string) || "",
      country: (formData.get("shipping_address.country") as string) || "",
      zipCode: (formData.get("shipping_address.zip_code") as string) || "",
    };

    const updatedCart: Cart = {
      ...cart,
      shippingAddress,
    };
    await updateCart(updatedCart);

    router.push(pathname + "?step=review", { scroll: false });
  };

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <h2 className='m-0'>Shipping Address</h2>
          {!isOpen && <CircleCheckSVG className='w-[20px] pb-2 text-(--theme-primary)' />}
        </div>

        {!isOpen && cart?.shippingAddress && (
          <button onClick={handleEdit} className='font-semibold'>
            Edit
          </button>
        )}
      </div>

      {isOpen ? (
        <form className='mt-2' onSubmit={handleSubmit}>
          <ShippingAddress cart={cart} email={customer.email} />

          <div className='flex mt-8'>
            <button type='submit' className='btn'>
              Continue
            </button>
          </div>
        </form>
      ) : (
        <>
          {cart && cart.shippingAddress && (
            <div className='flex items-start gap-x-8'>
              <div className='flex items-start gap-x-1 w-full'>
                <div className='flex flex-col w-1/3'>
                  <p className='font-bold! mb-2'>Shipping Address</p>
                  <p className='m-0'>{cart.shippingAddress.name}</p>
                  <p className='m-0'>
                    {cart.shippingAddress.street} {cart.shippingAddress.city}
                  </p>
                  <p className='m-0'>
                    {cart.shippingAddress.state}, {cart.shippingAddress.country}
                  </p>
                  <p className='m-0'>{cart.shippingAddress.zipCode}</p>
                </div>

                <div className='flex flex-col w-1/3 '>
                  <p className='font-bold! mb-2'>Contact</p>
                  <p className='m-0'>{cart.shippingAddress.phone}</p>
                  <p className='m-0'>{customer.email}</p>
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
