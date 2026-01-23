export type Cart = {
  id: string;
  items: CartItem[];
  shippingAddress?: Address;
  paymentCollection?: string;

  totalPrice: number;
  totalQuantity: number;
};

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;

  title: string;
  slug: string;
  thumbnail: string;

  price: number;
  availableStock: number;
  variantOptions: Option[];
};

export interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export type Option = {
  name: string;
  value: string;
};
