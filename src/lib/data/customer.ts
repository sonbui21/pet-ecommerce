"use server";

import { auth } from "@/auth";
import { StoreCustomer } from "../types/customer";

export const retrieveCustomer = async (): Promise<StoreCustomer | null> => {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const customer: StoreCustomer = {
    id: session.user.email,
    email: session.user.email,
    first_name: session.user.name ?? "",
    last_name: session.user.name ?? "",
  };

  return customer;
};
