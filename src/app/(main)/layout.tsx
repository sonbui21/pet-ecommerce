import { CartProvider } from "@/components/cart/cart-context";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { getCart } from "@/lib/data/basket";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const cart = getCart();

  return (
    <>
      <ScrollToTop />

      <CartProvider cartPromise={cart}>
        <Navbar />
        <main className='min-h-100'>{children}</main>
      </CartProvider>

      <Footer />
    </>
  );
}
