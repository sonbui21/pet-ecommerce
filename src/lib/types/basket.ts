export type Cart = {
  id: string;
  items: CartItem[];

  currencyCode: string;
  total: number;
  subTotal: number;
  taxTotal: number;
  totalQuantity: number;

  email?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  shippingMethods?: ShippingMethod;

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

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  amount: number;
}

export interface Address {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  countryCode: string;
  province: string;
  postalCode: string;
}
