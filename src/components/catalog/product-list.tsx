import { Pagination } from "@/lib/types/api";
import { ProductCard } from "@/lib/types/catalog";
import { ProductPagination } from "./pagination";
import { ProductCard as ProductCardComponent } from "@/components/catalog/product-card";

type Props = {
  products: ProductCard[];
  searchValue?: string;
  basePath: string;
  pagination?: Pagination;
};

export function ProductList({ products, searchValue, basePath, pagination }: Props) {
  return (
    <div className='col-xl-9 col-lg-8 order-0 order-lg-2'>
      {searchValue && (
        <div className='col-span-4 text-left'>
          <h3>Results for {`"${searchValue}"`}</h3>
        </div>
      )}
      <div className='grid grid-cols-4 gap-3'>
        {products.length > 0 ? (
          products.map((product) => <ProductCardComponent key={product.slug} {...product} />)
        ) : (
          <></>
        )}
      </div>
      {products.length == 0 && (
        <div className='col-span-4 text-left'>
          <p>No results could be found.</p>
        </div>
      )}
      {products.length > 0 && pagination && <ProductPagination basePath={basePath} pagination={pagination} />}
    </div>
  );
}
