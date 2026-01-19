import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
};

export default async function Addresses() {
  return (
    <div>
      <div className='flex flex-col'>
        <h3>Shipping Addresses</h3>
        <p>
          View and update your shipping addresses, you can add as many as you like. Saving your addresses will make them
          available during checkout.
        </p>
      </div>
      <div>
        <button className='btn'>New address</button>
      </div>
    </div>
  );
}
