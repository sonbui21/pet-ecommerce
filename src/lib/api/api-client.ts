import "server-only";
import { auth, signOut } from "@/auth";

export type ApiResult<T> =
  | { success: true; status: number; body: T }
  | { success: false; status: number; error: string };

export async function apiClient<T>({
  endpoint,
  method = "GET",
  headers,
  body,
  query,
}: {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
}): Promise<ApiResult<T>> {
  const url = new URL(endpoint);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const session = await auth();
  if (session) {
    (fetchOptions.headers as Record<string, string>)["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const response = await fetch(url.toString(), fetchOptions);

  if (response.status === 401) {
    await signOut({ redirectTo: "/" });
  }

  // Handle 404 specifically
  if (response.status === 404) {
    return {
      success: false,
      status: 404,
      error: "Resource not found",
    };
  }

  // Handle other errors
  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      error: response.statusText,
    };
  }

  // Parse successful response
  const data = await response.json();
  return {
    success: true,
    status: response.status,
    body: data,
  };
}
