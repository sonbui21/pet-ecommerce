"use server";

import { getBasket } from "../grpc/basket-client";
import { getCartId, setCartId } from "./cookies";
import { Address, Cart, CartItem, ShippingMethod } from "@/lib/types/basket";
import {
  BasketItem,
  CustomerBasketResponse,
  Address as ProtoAddress,
  ShippingMethod as ProtoShippingMethod,
  UpdateBasketRequest,
} from "../grpc/basket.proto";

export async function getCart(): Promise<Cart | undefined> {
  const cartId = await getCartId();

  if (!cartId) {
    return undefined;
  }

  const cart = await getBasket({ cart_id: cartId });

  if (cart.cart_id == "") {
    return undefined;
  }

  if (cart.cart_id !== cartId) {
    await setCartId(cart.cart_id);
  }

  return mapBasketToCart(cart);
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
