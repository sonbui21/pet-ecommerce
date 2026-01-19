import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />

      <Navbar />
      <main className='min-h-screen'>{children}</main>

      <Footer />
    </>
  );
}
