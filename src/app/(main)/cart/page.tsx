import { CartTemplate } from "@/components/basket/cart-template";
import { retrieveCustomer } from "@/lib/data/customer";

export default async function CartPage() {
  const customer = await retrieveCustomer();

  return <CartTemplate customer={customer} />;
}
