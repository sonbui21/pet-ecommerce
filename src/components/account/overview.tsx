import { StoreCustomer, StoreOrder } from "@/lib/types/customer";
import Image from "next/image";
import { Price } from "../common/price";
import { Divider } from "../common/divider";
import { formatDateTime, parseOptions } from "@/lib/utils";

export const Overview = ({ customer, orders }: { customer: StoreCustomer | null; orders: StoreOrder[] | null }) => {
  return (
    <div className='min-h-[1200px]'>
      <div className='flex justify-between items-center'>
        <h3>Hello {customer?.first_name}</h3>
        <span>
          Signed in as: <span className='font-semibold text-(--heading-color)'>{customer?.email}</span>
        </span>
      </div>
      <div className='flex flex-col py-8 border-t border-gray-200'>
        <div className='flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-x-2'>
              <h3>Recent orders</h3>
            </div>

            {orders && orders.length > 0 ? (
              <ul className='list-wrap flex-grow overflow-auto flex flex-col gap-3'>
                {orders.map((order) => (
                  <li
                    key={order.orderId}
                    className='list-wrap flex-grow overflow-auto flex flex-col border border-neutral-300 p-3 rounded-md'
                  >
                    <div className='flex w-full flex-row justify-between'>
                      <div className='font-semibold'>Order Date: {formatDateTime(order.date)}</div>
                      <div className='font-semibold'>{order.status}</div>
                    </div>
                    <Divider className='my-3' />

                    <ul className='p-0'>
                      {order.orderItems.map((item) => (
                        <li key={item.productId} className='flex w-full flex-col'>
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

                              <div className='flex flex-col h-full'>
                                <div className='truncate font-medium'>{item.title}</div>
                                {item.variantOptions && (
                                  <div className='mt-2 flex flex-wrap gap-1'>
                                    {parseOptions(item.variantOptions).map((o) => {
                                      return (
                                        <span
                                          key={o.name}
                                          className='rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground'
                                        >
                                          {o.name}: {o.value}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className='text-right'>
                              {`${item.quantity} x `}
                              <Price amount={item.price} currencyCode='USD' />
                            </div>
                          </div>
                          <Divider className='my-3' />
                        </li>
                      ))}
                    </ul>

                    <div className='flex w-full flex-col items-end gap-3'>
                      <div className='text-(--theme-primary) font-bold'>
                        Total: <Price amount={order.total} currencyCode='USD' />
                      </div>
                      <div className='flex flex-row gap-3'>
                        <button className='btn btn-small'>View order details</button>
                        <button className='btn btn-small btn-disable'>Cancel order</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <span>No recent orders</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
