"use client";

import { Category } from "@/lib/types/catalog";
import { useRouter, useSearchParams } from "next/navigation";

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoriesFromUrl = searchParams.get("categories")?.split(",") ?? [];

  const normalizeSlug = (slug: string) => slug.slice("collections/".length);

  const handleCategoryChange = (slug: string, checked: boolean) => {
    let current = [...categoriesFromUrl];
    const params = new URLSearchParams();

    if (checked) {
      current.push(slug);
    } else {
      current = current.filter((c) => c !== slug);
    }

    if (current.length) {
      params.set("categories", current.join(","));
    } else {
      params.delete("categories");
    }

    router.push(`/collections?${params.toString()}`, {
      scroll: false,
    });
  };
  return (
    <div className='animal__widget'>
      <h4 className='animal__widget-title'>Categories</h4>
      <div className='courses-cat-list'>
        <ul className='list-wrap'>
          {categories.map((category) => {
            const slug = normalizeSlug(category.slug);
            return (
              <li key={category.slug}>
                <div className='form-check'>
                  <input
                    className='form-check-input cursor-pointer'
                    type='checkbox'
                    id={category.slug}
                    checked={categoriesFromUrl.includes(slug)}
                    onChange={(e) => handleCategoryChange(slug, e.target.checked)}
                  />
                  <label className='form-check-label' htmlFor={category.slug}>
                    {category.name} <span>({category.totalCount})</span>
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
