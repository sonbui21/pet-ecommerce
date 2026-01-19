import { CategoryFilter } from "@/components/catalog/category-filter";
import { Search } from "@/components/common/search";
import { getCategories } from "@/lib/data/catalog";
import { Suspense } from "react";

export default async function CollectionsLayout(props: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <section className='animal__area-three mb-10'>
      <div className='container'>
        <div className='row'>
          {props.children}
          <div className='col-xl-3 col-lg-4'>
            <aside className='animal__sidebar'>
              <div className='animal__widget'>
                <h4 className='animal__widget-title'>Filters</h4>
                <Search className='sidebar-search-form relative' placeholder='Type Keywords. . .' />
              </div>

              <Suspense fallback={null}>
                <CategoryFilter categories={categories} />
              </Suspense>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
