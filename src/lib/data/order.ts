"use server";

import { apiClient } from "../api/api-client";
import { CreateOrderRequest, CreateOrderResponse } from "@/lib/types/order";
import { API_ENDPOINTS } from "../api/endpoints";
import { StoreOrder } from "../types/customer";
import { ListResponse } from "../types/api";

export async function createOrder(
  requestId: string,
  request: CreateOrderRequest,
): Promise<{ success: boolean; error?: string } & CreateOrderResponse> {
  const result = await apiClient<CreateOrderResponse>({
    endpoint: API_ENDPOINTS.ORDER.PLACE_ORDER,
    method: "POST",
    headers: {
      "x-requestid": requestId,
    },
    body: request,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error || "Failed to create order",
    };
  }

  return {
    success: true,
    orderId: result?.body.orderId,
    status: result?.body.status,
  };
}

export async function getOrders(): Promise<StoreOrder[]> {
  // "use cache";
  // cacheTag(TAGS.collections);
  // cacheLife("days");

  const response = await apiClient<ListResponse<StoreOrder>>({
    endpoint: API_ENDPOINTS.ORDER.GET_ORDERS,
  });

  if (!response.success) {
    console.error("Failed to fetch orders:", response.error);
    return [];
  }

  if (!response.body?.data) {
    return [];
  }

  return response.body.data;
}
