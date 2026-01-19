import { Address, CartItem } from "./basket";

export interface StoreCustomer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone?: string | null;

  addresses?: Address[];
}

export interface StoreOrder {
  shipping_address?: Address | null;

  billing_address?: Address | null;

  items: CartItem[] | null;

  customer?: StoreCustomer;
}
