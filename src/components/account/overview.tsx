import { StoreCustomer, StoreOrder } from "@/lib/types/customer";

export const Overview = ({ customer, orders }: { customer: StoreCustomer | null; orders: StoreOrder[] | null }) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h3>Hello {customer?.first_name}</h3>
        <span>
          Signed in as: <span className='font-semibold text-(--heading-color)'>{customer?.email}</span>
        </span>
      </div>
      <div className='flex flex-col py-8 border-t border-gray-200'>
        <div className='flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1'>
          <div className='flex flex-col gap-y-4'>
            <div className='flex items-center gap-x-2'>
              <h3>Recent orders</h3>
            </div>
            <ul className='flex flex-col gap-y-4'>
              <span>No recent orders</span>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
