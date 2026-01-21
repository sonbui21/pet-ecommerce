"use server";

import { apiClient } from "../api/api-client";
import { CreateOrderRequest, CreateOrderResponse } from "@/lib/types/order";
import { API_ENDPOINTS } from "../api/endpoints";

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
