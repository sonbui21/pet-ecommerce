"use client";

import { usePathname, useRouter } from "next/navigation";
import { ShippingAddress } from "./shipping-address";
import { BillingAddress } from "./billing-address";
import { FormEvent } from "react";
import { updateCart } from "@/lib/data/basket";
import { Address, Cart } from "@/lib/types/basket";
import { StoreCustomer } from "@/lib/types/customer";
import { useToggleState } from "@/lib/hooks/use-toggle-state";
import compareAddresses from "@/lib/utils";
import { CircleCheckSVG } from "../icon/circle-check";
import { Divider } from "../common/divider";

export const Addresses = ({ cart, customer, isOpen }: { cart: Cart; customer: StoreCustomer; isOpen: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shippingAddress && cart?.billingAddress
      ? compareAddresses(cart?.shippingAddress, cart?.billingAddress)
      : true,
  );

  const handleEdit = async () => {
    await updateCart({ ...cart, currentStep: "address" });
    router.push(pathname + "?step=address");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const shippingAddress: Address = {
      id: cart?.shippingAddress?.id || crypto.randomUUID(),
      customerId: customer?.id || "",
      firstName: (formData.get("shipping_address.first_name") as string) || "",
      lastName: (formData.get("shipping_address.last_name") as string) || "",
      phone: (formData.get("shipping_address.phone") as string) || "",
      company: (formData.get("shipping_address.company") as string) || "",
      address1: (formData.get("shipping_address.address_1") as string) || "",
      address2: "",
      city: (formData.get("shipping_address.city") as string) || "",
      countryCode: (formData.get("shipping_address.country_code") as string) || "",
      province: (formData.get("shipping_address.province") as string) || "",
      postalCode: (formData.get("shipping_address.postal_code") as string) || "",
    };

    let billingAddress: Address;
    if (sameAsBilling) {
      billingAddress = { ...shippingAddress };
    } else {
      billingAddress = {
        id: cart?.billingAddress?.id || crypto.randomUUID(),
        customerId: customer?.id || "",
        firstName: (formData.get("billing_address.first_name") as string) || "",
        lastName: (formData.get("billing_address.last_name") as string) || "",
        phone: shippingAddress.phone,
        company: (formData.get("billing_address.company") as string) || "",
        address1: (formData.get("billing_address.address_1") as string) || "",
        address2: "",
        city: (formData.get("billing_address.city") as string) || "",
        countryCode: (formData.get("billing_address.country_code") as string) || "",
        province: (formData.get("billing_address.province") as string) || "",
        postalCode: (formData.get("billing_address.postal_code") as string) || "",
      };
    }

    const email = (formData.get("email") as string) || "";

    const updatedCart: Cart = {
      ...cart,
      email,
      shippingAddress,
      billingAddress,
      currentStep: "delivery",
    };

    try {
      const savedCart = await updateCart(updatedCart);

      if (savedCart) {
        router.push(pathname + "?step=delivery");
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
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
          <ShippingAddress cart={cart} checked={sameAsBilling} onChange={toggleSameAsBilling} />
          {!sameAsBilling && (
            <div className='mt-8'>
              <h2>Billing address</h2>
              <BillingAddress cart={cart} />
            </div>
          )}
          <div className='flex mt-8'>
            <button type='submit' className='btn'>
              Continue to delivery
            </button>
          </div>
        </form>
      ) : (
        <div className=''>
          {cart && cart.shippingAddress ? (
            <div className='flex items-start gap-x-8'>
              <div className='flex items-start gap-x-1 w-full'>
                <div className='flex flex-col w-1/3'>
                  <p className='font-bold! mb-2'>Shipping Address</p>
                  <p className='m-0'>
                    {cart.shippingAddress.firstName} {cart.shippingAddress.lastName}
                  </p>
                  <p className='m-0'>
                    {cart.shippingAddress.address1} {cart.shippingAddress.address2}
                  </p>
                  <p className='m-0'>
                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.city}
                  </p>
                  <p className='m-0'>{cart.shippingAddress.countryCode?.toUpperCase()}</p>
                </div>

                <div className='flex flex-col w-1/3 '>
                  <p className='font-bold! mb-2'>Contact</p>
                  <p className='m-0'>{cart.shippingAddress.phone}</p>
                  <p className='m-0'>{cart.email}</p>
                </div>

                <div className='flex flex-col w-1/3'>
                  <p className='font-bold! mb-2'>Billing Address</p>

                  {sameAsBilling ? (
                    <p className=''>Billing and delivery address are the same.</p>
                  ) : (
                    <>
                      <p className='m-0'>
                        {cart.billingAddress?.firstName} {cart.billingAddress?.lastName}
                      </p>
                      <p className='m-0'>
                        {cart.billingAddress?.address1} {cart.billingAddress?.address2}
                      </p>
                      <p className='m-0'>
                        {cart.billingAddress?.postalCode}, {cart.billingAddress?.city}
                      </p>
                      <p className='m-0'>{cart.billingAddress?.countryCode?.toUpperCase()}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
      <Divider className='mt-6 mb-6' />
    </div>
  );
};
