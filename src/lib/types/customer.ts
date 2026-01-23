import { Address } from "./cart";

export interface StoreCustomer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone?: string | null;

  addresses?: Address[];
}

export interface StoreOrder {
  orderId: string;
  date: string;
  status: string;
  total: number;
  orderItems: OrderItem[];
}

export interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  title: string;
  slug: string;
  thumbnail: string;
  price: number;
  variantOptions?: string;
}
