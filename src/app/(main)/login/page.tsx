"use client";

import { PROVIDER_ID } from "@/auth";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/account";

  useEffect(() => {
    signIn(PROVIDER_ID, { callbackUrl });
  }, [callbackUrl]);

  return (
    <div className='container'>
      <div className='row align-items-center mb-3'>
        <div className='col-md-4'>
          <div className='section__title-two'>
            <h2 className='title'>Signing in...</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
