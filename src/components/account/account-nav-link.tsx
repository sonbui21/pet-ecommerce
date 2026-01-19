"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const AccountNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${isActive ? "active" : ""}`}>
      {children}
    </Link>
  );
};
