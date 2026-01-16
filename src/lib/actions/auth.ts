"use server";

import { PROVIDER_ID, signIn, signOut } from "@/auth";

export async function loginAction() {
  await signIn(PROVIDER_ID, { redirectTo: "/" });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
