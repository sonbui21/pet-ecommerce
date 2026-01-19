import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
};

export default async function Orders() {
  return (
    <div>
      <div className='flex flex-col'>
        <h3>Orders</h3>
        <p>
          View your previous orders and their status. You can also create returns or exchanges for your orders if
          needed.
        </p>
      </div>

      <div className='flex flex-col items-center mt-3'>
        <h4>Nothing to see here</h4>
        <p>You don&apos;t have any orders yet, let us change that {":)"}</p>
        <Link href='/collections' className='btn'>
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
