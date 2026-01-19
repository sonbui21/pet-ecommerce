import { Divider } from "@/components/common/divider";
import { retrieveCustomer } from "@/lib/data/customer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Pet Store profile.",
};

export default async function Profile() {
  const customer = await retrieveCustomer();

  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        <h3>Profile</h3>
        <p>View and update your profile information, including your name, email, and phone number.</p>
      </div>
      <div className='flex flex-col gap-y-8 w-full'>
        <div className='flex items-end justify-between'>
          <div className='flex flex-col'>
            <span className='uppercase text-ui-fg-base'>Name</span>
            <div className='flex items-center flex-1 basis-0 justify-end gap-x-4'>
              <span className='font-semibold text-(--heading-color)'>
                {customer?.first_name} {customer?.last_name}
              </span>
            </div>
          </div>
          <div>
            <button type='button'>Edit</button>
          </div>
        </div>
        <Divider />
        <div className='flex items-end justify-between'>
          <div className='flex flex-col'>
            <span className='uppercase text-ui-fg-base'>Email</span>
            <div className='flex items-center flex-1 basis-0 justify-end gap-x-4'>
              <span className='font-semibold text-(--heading-color)'>{customer?.email}</span>
            </div>
          </div>
          <div>
            <button type='button'>Edit</button>
          </div>
        </div>

        <Divider />
        <div className='flex items-end justify-between'>
          <div className='flex flex-col'>
            <span className='uppercase text-ui-fg-base'>Phone</span>
            <div className='flex items-center flex-1 basis-0 justify-end gap-x-4'>
              <span className='font-semibold text-(--heading-color)'>{customer?.phone}</span>
            </div>
          </div>
          <div>
            <button type='button'>Edit</button>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
