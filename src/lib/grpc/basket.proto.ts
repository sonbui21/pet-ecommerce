export interface GetBasketRequest {
  cart_id: string;
}

export interface VariantOption {
  name: string;
  value: string;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  phone: string;
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

  total: string;
  sub_total: string;
  tax_total: string;
  total_quantity: string;

  shipping_address?: Address;
  billing_address?: Address;
  payment_collection?: string;
  current_step: string;
}

export interface UpdateBasketRequest {
  cart_id: string;
  items: BasketItem[];

  total: string;
  sub_total: string;
  tax_total: string;
  total_quantity: string;

  shipping_address?: Address;
  billing_address?: Address;
  payment_collection?: string;
  current_step: string;
}
