import { Overview } from "@/components/account/overview";
import { retrieveCustomer } from "@/lib/data/customer";
import { getOrders } from "@/lib/data/order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
};

export default async function Dashboard() {
  const customer = await retrieveCustomer();
  const orders = await getOrders();

  return <Overview customer={customer} orders={orders} />;
}
