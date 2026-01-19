"use server";

import { getBasket, updateBasket } from "../grpc/basket-client";
import { getCartId } from "./cookies";
import { Address, Cart, CartItem, ShippingMethod } from "@/lib/types/basket";
import {
  BasketItem,
  CustomerBasketResponse,
  Address as ProtoAddress,
  ShippingMethod as ProtoShippingMethod,
  UpdateBasketRequest,
} from "../grpc/basket.proto";

export async function updateCart(cart: Cart): Promise<Cart | null> {
  const updatedBasket = await updateBasket(mapCartToBasket(cart));
  const updatedCart = mapBasketToCart(updatedBasket);

  return updatedCart;
}

export async function getCart(): Promise<Cart | undefined> {
  const cartId = await getCartId();

  if (!cartId) {
    return undefined;
  }

  const cart = await getBasket({ cart_id: cartId });

  return mapBasketToCart(cart);
}

function mapCartToBasket(cart: Cart): UpdateBasketRequest {
  const subTotal = cart.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;

  const totalQuantity = cart.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const taxTotal = 0;
  const total = subTotal + taxTotal;

  return {
    cart_id: cart.id,
    items: cart.items ? cart.items?.map(mapCartItemToBasketItem) : [],

    currency_code: cart.currencyCode,
    total: total.toString(),
    sub_total: subTotal.toString(),
    tax_total: taxTotal.toString(),
    total_quantity: totalQuantity.toString(),

    email: cart.email ?? "",
    shipping_address: mapAddressToProtoAddress(cart.shippingAddress),
    billing_address: mapAddressToProtoAddress(cart.billingAddress),
    shipping_methods: mapShippingMethodToProto(cart.shippingMethods),

    payment_collection: cart.paymentCollection,

    current_step: cart.currentStep ?? "",
  };
}

function mapCartItemToBasketItem(item: CartItem): BasketItem {
  return {
    id: item.id,
    product_id: item.productId,
    variant_id: item.variantId,
    quantity: item.quantity,

    title: item.title,
    slug: item.slug,
    thumbnail: item.thumbnail,

    variant_options: item.variantOptions.map((opt) => ({
      name: opt.name,
      value: opt.value,
    })),

    price: item.price.toString(),
    available_stock: item.availableStock,
  };
}

function mapAddressToProtoAddress(address?: Address): ProtoAddress | undefined {
  if (!address || !address.id) {
    return undefined;
  }

  return {
    id: address.id,
    customer_id: address.customerId,
    first_name: address.firstName,
    last_name: address.lastName,
    phone: address.phone,
    company: address.company,
    address_1: address.address1,
    address_2: address.address2,
    city: address.city,
    country_code: address.countryCode,
    province: address.province,
    postal_code: address.postalCode,
  };
}

function mapShippingMethodToProto(ship?: ShippingMethod): ProtoShippingMethod | undefined {
  if (!ship || !ship.id) {
    return undefined;
  }

  return {
    id: ship.id,
    name: ship.name,
    description: ship.description,
    amount: ship.amount.toString(),
  };
}

function mapBasketToCart(basket: CustomerBasketResponse): Cart {
  return {
    id: basket.cart_id,
    items: basket.items.map(mapBasketItemToCartItem),

    currencyCode: basket.currency_code,
    total: Number(basket.total),
    subTotal: Number(basket.sub_total),
    taxTotal: Number(basket.tax_total),
    totalQuantity: Number(basket.total_quantity),

    email: basket.email,
    shippingAddress: mapProtoAddressToAddress(basket.shipping_address),
    billingAddress: mapProtoAddressToAddress(basket.billing_address),
    shippingMethods: mapProtoToShippingMethod(basket.shipping_methods),

    paymentCollection: basket.payment_collection,

    currentStep: basket.current_step,
  };
}

function mapProtoToShippingMethod(ship?: ProtoShippingMethod): ShippingMethod | undefined {
  if (!ship || !ship.id) {
    return undefined;
  }

  return {
    id: ship.id,
    name: ship.name,
    description: ship.description,
    amount: Number(ship.amount),
  };
}

function mapBasketItemToCartItem(item: BasketItem): CartItem {
  return {
    id: item.id,
    productId: item.product_id,
    variantId: item.variant_id,
    quantity: item.quantity,

    title: item.title,
    slug: item.slug,
    thumbnail: item.thumbnail,

    variantOptions: item.variant_options.map((opt) => ({
      name: opt.name,
      value: opt.value,
    })),

    price: Number(item.price),
    availableStock: item.available_stock,
  };
}

function mapProtoAddressToAddress(protoAddress?: ProtoAddress): Address | undefined {
  if (!protoAddress || !protoAddress.id) {
    return undefined;
  }

  return {
    id: protoAddress.id,
    customerId: protoAddress.customer_id,
    firstName: protoAddress.first_name,
    lastName: protoAddress.last_name,
    phone: protoAddress.phone,
    company: protoAddress.company,
    address1: protoAddress.address_1,
    address2: protoAddress.address_2,
    city: protoAddress.city,
    countryCode: protoAddress.country_code,
    province: protoAddress.province,
    postalCode: protoAddress.postal_code,
  };
}
