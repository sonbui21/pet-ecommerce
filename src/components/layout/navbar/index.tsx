import { getMenu } from "@/lib/data/catalog";
import Link from "next/link";
import Image from "next/image";
import { Search } from "../../common/search";
import { Account } from "./account";
import { CartModal } from "@/components/basket/cart-modal";

export async function Navbar() {
  const menu = await getMenu();

  const shopAll = {
    name: "Shop By Category",
    slug: "collections/shop",
  };
  const newMenu = [...menu.slice(0, 1), shopAll, ...menu.slice(1)];

  return (
    <header>
      <div id='sticky-header' className='tg-header__area tg-header__area-four'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='tgmenu__wrap'>
                <nav className='tgmenu__nav'>
                  <div className='logo'>
                    <Link href='/'>
                      <Image src='/logo/logo.png' alt='Logo' width={150} height={40} priority sizes='150px' />
                    </Link>
                  </div>

                  <div className='tgmenu__navbar-wrap tgmenu__navbar-wrap-two tgmenu__main-menu d-none d-xl-flex'>
                    <ul className='navigation'>
                      {newMenu.map((item) => (
                        <li key={item.slug}>
                          <Link href={`/${item.slug}`}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='tgmenu__search'>
                    <Search className='tgmenu__search-form w-[300px]' placeholder='Search Here . . .' />
                  </div>

                  <div className='tgmenu__navbar-wrap tgmenu__action tgmenu__action-three d-none d-md-block mr-0-important'>
                    <ul className='list-wrap'>
                      <Account />

                      <li className='header-cart header-cart-two custom-cart cursor-pointer'>
                        <CartModal />
                      </li>
                    </ul>
                  </div>

                  <div className='mobile-nav-toggler'>
                    <i className='flaticon-layout'></i>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
