"use server";

// import { cacheLife, cacheTag } from "next/cache";
import { TAGS } from "../constants";
import { Category } from "../types/catalog";
import { ListResponse } from "../types/api";
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
