import { Gallery } from "@/components/catalog/gallery";
import { VariantSelector } from "@/components/catalog/variant-selector";
import { getProduct } from "@/lib/data/catalog";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;

  const product = await getProduct(params.handle);
  if (!product) return notFound();

  return (
    <section className='product__details-area pt-0'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='product__details-images-wrap'>
              <Gallery images={product.images} />
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='product__details-content'>
              <h2 className='title'>{product.title}</h2>

              <VariantSelector
                options={product.options}
                variants={product.variants}
                currencyCode={product.currencyCode}
                defaultPrice={product.price}
                defaultOldPrice={product.oldPrice}
                product={product}
              />

              <div className='product__details-bottom border-t border-[#d9d9d9] pt-6 mt-12'>
                <ul className='list-wrap'>
                  <li className='product__details-category'>
                    <span className='title'>Categories:</span>
                    {product.categories.map((category, index) => (
                      <span key={category.slug} className='title'>
                        {index > 0 && ", "}
                        <Link href={`/${category.slug}`}>{category.name}</Link>
                      </span>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='divider-area mt-5 mb-4'>
          <div className='container'>
            <div className='divider-wrap'></div>
          </div>
        </div>

        <Suspense fallback={null}>
          <DynamicRelatedProducts id={product.id} />
        </Suspense>
      </div>
    </section>
  );
}

const DynamicRelatedProducts = dynamic(
  () =>
    import("@/components/catalog/related-products").then((mod) => ({
      default: mod.RelatedProducts,
    })),
  {
    loading: () => <></>,
    ssr: true,
  },
);
