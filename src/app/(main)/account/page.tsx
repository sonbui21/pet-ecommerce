import { Overview } from "@/components/account/overview";
import { retrieveCustomer } from "@/lib/data/customer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
};

export default async function Dashboard() {
  const customer = await retrieveCustomer();
  const orders = null;

  return <Overview customer={customer} orders={orders} />;
}
