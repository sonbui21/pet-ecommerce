export interface CreateOrderRequest {
  userId: string;
  userName: string;
  name: string;
  phone: string;
  city: string;
  street: string;
  state: string;
  country: string;
  zipCode: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpiration: string;
  cardSecurityNumber: string;
  cardTypeId: number;
  buyer: string;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  title: string;
  slug: string;
  thumbnail: string;
  price: number;
  variantOptions: string;
}
