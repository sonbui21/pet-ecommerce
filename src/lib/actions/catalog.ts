"use server";

import { redirect } from "next/navigation";

export async function searchAction(formData: FormData) {
  const title = String(formData.get("search_title") ?? "").trim();
  if (!title) return;

  const encoded = encodeURIComponent(title);
  redirect(`/collections?title=${encoded}`);
}
