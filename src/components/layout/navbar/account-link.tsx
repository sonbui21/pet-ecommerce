"use client";

import { PROVIDER_ID } from "@/auth";
import { signIn, signOut } from "next-auth/react";

export function AccountLink({ idToken }: { idToken?: string }) {
  const handleSignOut = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!idToken) {
      await signOut({ callbackUrl: "/", redirect: true });
      return;
    }

    window.location.href = "/api/auth/logout";
  };

  // Nếu có idToken => render nút Logout
  if (idToken !== undefined) {
    return (
      <button
        className='account-nav text-[18px]! block px-5! py-5! text-(--theme-secondary)! justify-center hover:text-(--theme-primary)! w-full font-medium! text-[18px]!'
        onClick={handleSignOut}
      >
        Logout
      </button>
    );
  }

  // Không có session => render Login
  return (
    <button className='btn' onClick={() => signIn(PROVIDER_ID)}>
      <i className='flaticon-user'></i>Login
    </button>
  );
}
