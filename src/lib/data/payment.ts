"use server";

import { apiClient } from "../api-client";
import { API_ENDPOINTS } from "../endpoints";

export interface CreatePaymentRequest {
  userId: string;
  orderId: string;
  amount: number;
}

export async function createPayment(
  requestId: string,
  request: CreatePaymentRequest,
): Promise<{ success: boolean; error?: string; clientSecret?: string }> {
  console.log("createPayment");

  const result = await apiClient<string>({
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
      error: result.error || "Failed to create payment",
    };
  }

  return {
    success: true,
    clientSecret: result.body,
  };
}
