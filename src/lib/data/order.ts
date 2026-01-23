"use server";

import { apiClient } from "../api-client";
import { CreateOrderRequest } from "@/lib/types/order";
import { API_ENDPOINTS } from "../endpoints";
import { StoreOrder } from "../types/customer";
import { ListResponse } from "../types/api";

export async function createOrder(
  requestId: string,
  request: CreateOrderRequest,
): Promise<{ success: boolean; error?: string }> {
  const result = await apiClient<void>({
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
