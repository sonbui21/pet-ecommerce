import Link from "next/link";
import Image from "next/image";
import { memo, useMemo } from "react";
import { formatPriceWithDiscount } from "@/lib/utils";
import { ProductCard as ProductCardProps } from "@/lib/types/catalog";

export const ProductCard = memo(function ProductCard({ slug, title, imageUrl, price, oldPrice }: ProductCardProps) {
  const productUrl = useMemo(() => `/products/${slug}`, [slug]);

  return (
    <div className='product__item cursor-pointer'>
      <div className='product__thumb'>
        <Link href={productUrl}>
          <Image
            src={imageUrl}
            alt={title}
            width={242}
            height={260}
            className='object-cover w-full h-full'
            loading='lazy'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 242px'
          />
        </Link>
      </div>

      <div className='product__content'>
        <h4 className='title'>
          <Link href={productUrl}>{title}</Link>
        </h4>

        <ProductPrice price={price} oldPrice={oldPrice} />
      </div>
    </div>
  );
});

const ProductPrice = memo(function ProductPrice({ price, oldPrice }: { price: number; oldPrice?: number }) {
  const { formattedPrice, formattedOldPrice, hasDiscount } = formatPriceWithDiscount(price, oldPrice, "USD");

  return (
    <h3 className='price'>
      {formattedPrice}
      {hasDiscount && formattedOldPrice && <del> {formattedOldPrice}</del>}
    </h3>
  );
});
