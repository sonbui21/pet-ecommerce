import Image from "next/image";
import Link from "next/link";

const logoImg = "/logo/logo.png";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <div id='sticky-header' className='tg-header__area tg-header__area-four border-b border-neutral-300'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='tgmenu__wrap'>
                  <nav className='tgmenu__nav relative flex items-center'>
                    <div className='flex items-center gap-x-2 uppercase flex-1 basis-0 checkout-text items-center'>
                      <span className='text-(--theme-primary)'>
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='rotate-90'
                        >
                          <path
                            d='M4 6L8 10L12 6'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          ></path>
                        </svg>
                      </span>
                      <Link href='cart' className='flex items-center h-full pt-[6px]'>
                        Back to shopping cart
                      </Link>
                    </div>
                    <div className='logo absolute left-1/2 -translate-x-1/2'>
                      <Link href='/'>
                        <Image src={logoImg} alt='Logo' width={150} height={40} priority sizes='150px' />
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className='min-h-100'>{children}</main>
    </>
  );
}
