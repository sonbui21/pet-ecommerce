import { auth } from "@/auth";
import { AccountSideBarNav } from "@/components/account/account-siderbar-nav";

export default async function AccountPageLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-2'>
          <AccountSideBarNav />
        </div>
        <div className='col-lg-8'>{children}</div>
      </div>
    </div>
  );
}
