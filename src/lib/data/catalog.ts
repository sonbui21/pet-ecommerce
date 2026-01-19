"use server";

// import { cacheLife, cacheTag } from "next/cache";
import { TAGS } from "../constants";
import { Category, ProductCard, ProductDetail } from "../types/catalog";
import { ListResponse, Response } from "../types/api";
import { apiClient } from "../api/api-client";
import { API_ENDPOINTS } from "../api/endpoints";

export async function getMenu(): Promise<Category[]> {
  // "use cache";
  // cacheTag(TAGS.collections);
  // cacheLife("days");

  const response = await apiClient<ListResponse<Category>>({
    endpoint: API_ENDPOINTS.CATALOG.NAV_CATEGORIES,
  });

  if (!response.success) {
    console.error("Failed to fetch menu navigation:", response.error);
    return [];
  }

  if (!response.body?.data) {
    return [];
  }

  return response.body.data;
}

export async function getPremiumProducts(): Promise<ProductCard[]> {
  // "use cache";
  // cacheTag(TAGS.products);
  // cacheLife("days");

  const response = await apiClient<ListResponse<ProductCard>>({
    endpoint: API_ENDPOINTS.CATALOG.PREMIUM_ITEMS,
  });

  if (!response.success) {
    console.error("Failed to fetch premium products:", response.error);
    return [];
  }

  if (!response.body?.data) {
    return [];
  }

  return response.body.data;
}

export async function getProduct(handle: string): Promise<ProductDetail | null> {
  const response = await apiClient<Response<ProductDetail>>({
    endpoint: API_ENDPOINTS.CATALOG.ITEM_BY_HANDLE(handle),
  });

  if (!response.success) {
    if (response.status === 404) {
      console.warn(`Product not found: ${handle}`);
    } else {
      console.error(`Failed to fetch product ${handle}:`, response.error);
    }
    return null;
  }

  if (!response.body?.data) {
    return null;
  }

  return response.body.data;
}
