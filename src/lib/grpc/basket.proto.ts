export interface GetBasketRequest {
  basket_id: string;
}

export interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

export interface BasketItem {
  product_id: string;
  variant_id: string;
  quantity: number;

  title: string;
  slug: string;
  thumbnail: string;

  price: string;
  available_stock: number;
  variant_options: string;
}

export interface CustomerBasket {
  basket_id: string;
  items: BasketItem[];
  shipping_address?: Address;
  payment_collection?: string;
}
