"use server";

import { getBasket, updateBasket } from "../grpc/basket-client";
import { Address, Cart, CartItem } from "../types/cart";
import { BasketItem, CustomerBasket, Address as ProtoAddress } from "../grpc/basket.proto";
import { getCartId } from "../data/cookies";
import { joinOptions, parseOptions } from "../utils";

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

  const cart = await getBasket({ basket_id: cartId });
  return mapBasketToCart(cart);
}

function mapCartToBasket(cart: Cart): CustomerBasket {
  return {
    basket_id: cart.id,
    items: cart.items ? cart.items?.map(mapCartItemToBasketItem) : [],

    shipping_address: mapAddressToProtoAddress(cart.shippingAddress),
    payment_collection: cart.paymentCollection,
  };
}

function mapCartItemToBasketItem(item: CartItem): BasketItem {
  return {
    product_id: item.productId,
    variant_id: item.variantId,
    quantity: item.quantity,
    title: item.title,
    slug: item.slug,
    thumbnail: item.thumbnail,
    price: item.price.toString(),
    variant_options: joinOptions(item.variantOptions),
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

function mapBasketToCart(basket: CustomerBasket): Cart {
  const totalPrice = basket.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const totalQuantity = basket.items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    id: basket.basket_id,
    items: basket.items.map(mapBasketItemToCartItem),
    shippingAddress: mapProtoAddressToAddress(basket.shipping_address),
    paymentCollection: basket.payment_collection,

    totalPrice: totalPrice,
    totalQuantity: totalQuantity,
  };
}

function mapBasketItemToCartItem(item: BasketItem): CartItem {
  return {
    productId: item.product_id,
    variantId: item.variant_id,
    quantity: item.quantity,

    title: item.title,
    slug: item.slug,
    thumbnail: item.thumbnail,

    price: Number(item.price),
    availableStock: item.available_stock,
    variantOptions: parseOptions(item.variant_options),
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
