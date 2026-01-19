import { auth } from "@/auth";
import { loginAction, logoutAction } from "@/lib/actions/auth";
import Link from "next/link";
export async function Account() {
  const session = await auth();

  const name = session?.user?.name;

  return (
    <li className='header-login mr-0! relative group/account header-btn login-btn'>
      {session ? (
        <>
          <span className='text-[28px] py-[36px] text-[var(--theme-secondary)] flex cursor-pointer hover:text-(--theme-primary)! account-icon'>
            <i className='flaticon-user flex align-center gap-2'>
              <p className='m-0 account-name'>{name}</p>
            </i>
          </span>

          <ul className='absolute opacity-0 invisible group-hover/account:opacity-100! group-hover/account:visible! transition-all duration-200 border border-[#f5f5f5] bg-(--color-white-default) shadow-[0_30px_70px_0_hsla(216,2%,55%,0.15)] rounded-[6px] z-9 m-0 p-0 top-[80px] flex-col w-36'>
            <li className='before:hidden w-full group/item ml-0!'>
              <Link
                href='/account'
                className='account-nav text-[18px]! block px-5! py-5! text-(--theme-secondary)! justify-center hover:text-(--theme-primary)! w-full font-medium! text-[18px]!'
              >
                My Account
              </Link>
            </li>

            <li className='before:hidden w-full group/item ml-0!'>
              <form action={logoutAction}>
                <button className='account-nav text-[18px]! block px-5! py-5! text-(--theme-secondary)! justify-center hover:text-(--theme-primary)! w-full font-medium! text-[18px]!'>
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </>
      ) : (
        <>
          <form action={loginAction}>
            <button className='btn'>
              <i className='flaticon-user'></i>Login
            </button>
          </form>
        </>
      )}
    </li>
  );
}
