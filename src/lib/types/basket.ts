export type Cart = {
  id: string;
  items: CartItem[];

  total: number;
  subTotal: number;
  taxTotal: number;
  totalQuantity: number;

  shippingAddress?: Address;
  paymentCollection?: string;

  currentStep?: string;
};

export type CartItem = {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;

  title: string;
  slug: string;
  thumbnail: string;

  variantOptions: Option[];
  price: number;
  availableStock: number;
};

export type Option = {
  name: string;
  value: string;
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
