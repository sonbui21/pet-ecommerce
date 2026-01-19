import { AccountNavLink } from "./account-nav-link";

export const AccountSideBarNav = () => {
  return (
    <>
      <h3>Account</h3>
      <ul className='flex mb-0 justify-start items-start flex-col gap-y-4 account_sidebar_nav'>
        <li>
          <AccountNavLink href='/account'>Overview</AccountNavLink>
        </li>
        <li>
          <AccountNavLink href='/account/profile'>Profile</AccountNavLink>
        </li>
        <li>
          <AccountNavLink href='/account/addresses'>Addresses</AccountNavLink>
        </li>
        <li>
          <AccountNavLink href='/account/orders'>Orders</AccountNavLink>
        </li>
      </ul>
    </>
  );
};
