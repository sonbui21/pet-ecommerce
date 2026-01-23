"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "../../lib/stores/cart-store";
import { QuantitySelector } from "./quantity-selector";
import { Price } from "../common/price";

export function CartModal() {
  const open = useCartStore((state) => state.isOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  const cart = useCartStore((state) => state.cart);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    if (!cart) fetchCart();
  }, [cart, fetchCart]);

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          openCart();
        } else {
          closeCart();
        }
      }}
    >
      <SheetTrigger className='!text-[var(--theme-secondary)] hover:!text-[var(--theme-primary)]'>
        <i className='flaticon-shopping-bag'></i>
        <span className='custom-cart-span'>{cart?.totalQuantity ?? 0}</span>
      </SheetTrigger>

      <SheetContent side='right' className='w-full sm:max-w-md gap-0 bg-[#fff]'>
        <SheetHeader className='pb-0'>
          <SheetTitle>My Cart</SheetTitle>
          <SheetDescription className='sr-only'>My Cart</SheetDescription>
        </SheetHeader>

        <div className='flex h-full flex-col justify-between overflow-hidden p-4 pt-0'>
          {!cart?.items || cart.items.length === 0 ? (
            <h3 className='text-center text-2xl font-bold'>Your cart is empty.</h3>
          ) : (
            <>
              <ul className='list-wrap flex-grow overflow-auto'>
                {cart.items.map((item) => (
                  <li key={item.productId} className='flex w-full flex-col border-b border-neutral-300 pr-2 pt-2 pb-2'>
                    <div className='flex justify-between mb-2'>
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className='flex items-start gap-3 text-(--body-color)! hover:text-(--theme-primary)!'
                      >
                        <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted'>
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            className='h-full w-full object-cover'
                            width={64}
                            height={64}
                          />
                        </div>

                        <div className='flex flex-1 items-start justify-between gap-3'>
                          <div className='min-w-0'>
                            <div className='truncate font-medium'>{item.title.slice(0, 30)}</div>
                            {item.variantOptions && (
                              <div className='mt-1 flex flex-wrap gap-1'>
                                {item.variantOptions.map((o) => (
                                  <span
                                    key={o.name}
                                    className='rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground'
                                  >
                                    {o.name}: {o.value}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                      <span
                        className='cursor-pointer hover:text-(--theme-primary)'
                        onClick={() => removeItem(item.productId)}
                      >
                        Delete
                      </span>
                    </div>

                    <div className='flex justify-between'>
                      <QuantitySelector
                        isDecreaseDisabled={item.quantity <= 1}
                        isIncreaseDisabled={item.quantity >= item.availableStock}
                        quantity={item.quantity}
                        handleDecrease={() => updateItemQuantity(item.productId, item.quantity - 1)}
                        handleIncrease={() => updateItemQuantity(item.productId, item.quantity + 1)}
                        className='w-[128px]!'
                        classNameInput='h-[36px]! text-sm!'
                        classNameSpan='w-[24px]! h-[24px]!'
                      />
                      <Price amount={item.price} />
                    </div>
                  </li>
                ))}
              </ul>

              <div className='py-4 font-medium'>
                <div className='flex items-center justify-between border-b border-neutral-300  text-(--theme-primary) py-1 text-[20px]'>
                  <p className='mb-0'>Subtotal (excl. taxes)</p>
                  <span className='font-bold'>
                    <Price amount={cart?.totalPrice ?? 0} />
                  </span>
                </div>
              </div>

              <Link href='/cart' onClick={closeCart} className='btn justify-center'>
                View Cart
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
