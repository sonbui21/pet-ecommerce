import { ProductList } from "@/components/catalog/product-list";
import { getProductsByCategory, getProductsByTitle } from "@/lib/data/catalog";
import { PaginatedResponse } from "@/lib/types/api";
import { ProductCard } from "@/lib/types/catalog";
import { parsePageNumber } from "@/lib/utils";

export default async function CollectionPage(props: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ categories?: string; title?: string; page?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const currentPage = parsePageNumber(searchParams ? searchParams.page : undefined);
  const basePath = buildBasePath(params?.handle, {
    categories: searchParams?.categories,
    title: searchParams?.title,
  });

  let res: PaginatedResponse<ProductCard>;

  if (params?.handle !== undefined) {
    res = await getProductsByCategory(params.handle, currentPage);
  } else if (searchParams.categories) {
    res = await getProductsByCategory(searchParams.categories, currentPage);
  } else if (searchParams.title) {
    res = await getProductsByTitle(searchParams.title, currentPage);
  } else {
    res = await getProductsByCategory("shop", currentPage);
  }

  return (
    <ProductList products={res.data} searchValue={searchParams.title} basePath={basePath} pagination={res.pagination} />
  );
}

function buildBasePath(handle: string | undefined, sp: { categories?: string; title?: string }) {
  const pathname = handle ? `/collections/${handle}` : "/collections";

  const qs = new URLSearchParams();
  if (sp.categories) qs.set("categories", sp.categories);
  if (sp.title) qs.set("title", sp.title);

  const query = qs.toString();
  return query ? `${pathname}?${query}` : pathname;
}
