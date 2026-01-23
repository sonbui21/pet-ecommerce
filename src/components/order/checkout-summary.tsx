import { Cart } from "@/lib/types/cart";
import Image from "next/image";
import { Price } from "../common/price";

export const CheckoutSummary = ({ cart }: { cart: Cart }) => {
  return (
    <div>
      <h2>In your Cart</h2>
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

        <div className='flex items-center justify-between border-b border-neutral-200 text-(--theme-primary) py-3 font-bold text-[20px]!'>
          <p className='mb-0'>Total</p>
          <Price amount={cart.totalPrice} />
        </div>
      </div>
      <div className='mt-3'>
        <ul className='list-wrap flex-grow overflow-auto flex flex-col gap-3'>
          {cart.items?.map((item) => (
            <li key={item.productId} className='flex w-full flex-col border-b border-neutral-300 pb-3'>
              <div className='flex justify-between'>
                <div className='flex items-start gap-3 text-(--body-color)! hover:text-(--theme-primary)!'>
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
                      <div className='truncate font-medium'>{item.title.slice(0, 25).concat("...")}</div>
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
                </div>
                <div className='flex justify-between'>
                  {`${item.quantity} x `}
                  <Price amount={item.price} currencyCode='USD' />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
