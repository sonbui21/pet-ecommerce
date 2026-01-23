import Link from "next/link";
import Image from "next/image";
import { CartItem } from "@/lib/types/cart";
import { QuantitySelector } from "./quantity-selector";
import { Price } from "../common/price";

export const Items = function Items({
  items,
  removeItem,
  updateItemQuantity,
}: {
  items: CartItem[];
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
}) {
  return (
    <div>
      <h1>Cart</h1>
      <ul className='list-wrap flex-grow overflow-auto flex flex-col gap-3'>
        {items.map((item) => (
          <li key={item.productId} className='flex w-full flex-col border-b border-neutral-300 pb-3'>
            <div className='flex justify-between mb-2'>
              <Link
                href={`/products/${item.slug}`}
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
                    <div className='truncate font-medium'>{item.title}</div>
                    {item.variantOptions && (
                      <div className='mt-1 flex flex-wrap gap-1'>
                        {item.variantOptions.map((o) => (
                          <span key={o.name} className='rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground'>
                            {o.name}: {o.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              <span className='cursor-pointer hover:text-(--theme-primary)' onClick={() => removeItem(item.productId)}>
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
              <Price amount={item.price} currencyCode='USD' />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
