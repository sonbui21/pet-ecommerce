export interface GetBasketRequest {
  cart_id: string;
}

export interface VariantOption {
  name: string;
  value: string;
}

export interface Address {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  country_code: string;
  province: string;
  postal_code: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  amount: string;
}

export interface BasketItem {
  id: string;
  product_id: string;
  variant_id: string;
  quantity: number;

  title: string;
  slug: string;
  thumbnail: string;

  variant_options: VariantOption[];
  price: string;
  available_stock: number;
}

export interface CustomerBasketResponse {
  cart_id: string;
  items: BasketItem[];

  currency_code: string;
  total: string;
  sub_total: string;
  tax_total: string;
  total_quantity: string;

  email: string;
  shipping_address?: Address;
  billing_address?: Address;
  shipping_methods?: ShippingMethod;
  payment_collection?: string;
  current_step: string;
}

export interface UpdateBasketRequest {
  cart_id: string;
  items: BasketItem[];

  currency_code: string;
  total: string;
  sub_total: string;
  tax_total: string;
  total_quantity: string;

  email: string;
  shipping_address?: Address;
  billing_address?: Address;
  shipping_methods?: ShippingMethod;
  payment_collection?: string;
  current_step: string;
}
