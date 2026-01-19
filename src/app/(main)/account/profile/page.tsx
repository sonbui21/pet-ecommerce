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
        <p className='m-0'>View and update your profile information, including your name, email, and phone number.</p>
      </div>
      <div className='flex flex-col gap-y-8 w-full mt-8'>
        <div className='flex items-end justify-between'>
          <div className='flex flex-col'>
            <h5>Name</h5>
            <div className='flex items-center flex-1 basis-0 justify-end gap-x-4'>
              <span className='font-semibold text-(--heading-color)'>
                {customer?.first_name} {customer?.last_name}
              </span>
            </div>
          </div>
          <div>
            <button type='button' className='font-semibold'>
              Edit
            </button>
          </div>
        </div>
        <Divider />
        <div className='flex items-end justify-between'>
          <div className='flex flex-col'>
            <h5>Email</h5>
            <div className='flex items-center flex-1 basis-0 justify-end gap-x-4'>
              <span className='font-semibold text-(--heading-color)'>{customer?.email}</span>
            </div>
          </div>
          <div>
            <button type='button' className='font-semibold'>
              Edit
            </button>
          </div>
        </div>

        <Divider />
        <div className='flex items-end justify-between'>
          <div className='flex flex-col'>
            <h5>Phone</h5>
            <div className='flex items-center flex-1 basis-0 justify-end gap-x-4'>
              <span className='font-semibold text-(--heading-color)'>{customer?.phone}</span>
            </div>
          </div>
          <div>
            <button type='button' className='font-semibold'>
              Edit
            </button>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
