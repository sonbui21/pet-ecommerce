"use server";

import { getBasket, updateBasket } from "../grpc/basket-client";
import { BasketItem, UpdateBasketRequest } from "../grpc/basket.proto";
import { Address, Cart, CartItem } from "../types/basket";
import { CustomerBasketResponse, Address as ProtoAddress } from "../grpc/basket.proto";
import { getCartId } from "../data/cookies";

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

    total: total.toString(),
    sub_total: subTotal.toString(),
    tax_total: taxTotal.toString(),
    total_quantity: totalQuantity.toString(),

    shipping_address: mapAddressToProtoAddress(cart.shippingAddress),
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
  if (!address) {
    return undefined;
  }

  return {
    name: address.name,
    phone: address.phone,
    street: address.street,
    city: address.city,
    state: address.state,
    country: address.country,
    zip_code: address.zipCode,
  };
}

function mapBasketToCart(basket: CustomerBasketResponse): Cart {
  return {
    id: basket.cart_id,
    items: basket.items.map(mapBasketItemToCartItem),

    total: Number(basket.total),
    subTotal: Number(basket.sub_total),
    taxTotal: Number(basket.tax_total),
    totalQuantity: Number(basket.total_quantity),

    shippingAddress: mapProtoAddressToAddress(basket.shipping_address),
    paymentCollection: basket.payment_collection,

    currentStep: basket.current_step,
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
  if (!protoAddress) {
    return undefined;
  }

  return {
    name: protoAddress.name,
    phone: protoAddress.phone,
    street: protoAddress.street,
    city: protoAddress.city,
    state: protoAddress.state,
    country: protoAddress.country,
    zipCode: protoAddress.zip_code,
  };
}
