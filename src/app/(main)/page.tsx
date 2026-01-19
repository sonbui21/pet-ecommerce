import { TitleShapeSVG } from "@/components/icon/title-shape";
import { ProductCard } from "@/components/catalog/product-card";
import { getPremiumProducts } from "@/lib/data/catalog";
import Link from "next/link";

export default async function HomePage() {
  const homepageItems = await getPremiumProducts();

  return (
    <section className='product__area py-0'>
      <div className='container'>
        <div className='row align-items-center mb-3'>
          <div className='col-md-4'>
            <div className='section__title-two'>
              <h2 className='title'>
                Pick The Premium
                <TitleShapeSVG />
              </h2>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='grid grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {homepageItems.map((product) => (
                <ProductCard key={product.slug} {...product} />
              ))}
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='view-all-btn'>
            <Link href='/collections' className='tp-btn-border'>
              View all products <i className='flaticon-right-arrow-angle' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
