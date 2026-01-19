"use client";

import Link from "next/link";
import { PaginationPrevSVG } from "../icon/pagination-prev";
import { PaginationNextSVG } from "../icon/pagination-next";
import { Pagination } from "@/lib/types/api";

type PaginationParams = Record<string, string>;
type PaginationItem = number | "...";

export const ProductPagination = ({ basePath, pagination }: { basePath: string; pagination: Pagination }) => {
  const paginationParams: PaginationParams = {};

  const safePage = Math.max(1, Math.min(pagination.pageNumber, pagination.totalPages));

  const prevHref = buildHref(Math.max(1, safePage - 1), basePath, paginationParams);
  const nextHref = buildHref(pagination.hasNextPage ? safePage + 1 : safePage, basePath, paginationParams);

  const prevClassName = pagination.hasPreviousPage ? "link-arrow" : "link-arrow pointer-events-none opacity-50";
  const nextClassName = pagination.hasNextPage ? "link-arrow" : "link-arrow pointer-events-none opacity-50";

  const items = getPaginationItems(safePage, pagination.totalPages, 1, 1);

  return (
    <nav className='pagination__wrap'>
      <ul className='list-wrap'>
        <li className={prevClassName}>
          <Link href={prevHref} aria-disabled={!pagination.hasPreviousPage}>
            <PaginationPrevSVG />
          </Link>
        </li>

        {items.map((item, index) =>
          item === "..." ? (
            <li key={`ellipsis-${index}`} className='ellipsis'>
              ...
            </li>
          ) : (
            <li key={item} className={item === safePage ? "active" : undefined}>
              <Link href={buildHref(item, basePath, paginationParams)}>{item}</Link>
            </li>
          ),
        )}

        <li className={nextClassName}>
          <Link href={nextHref} aria-disabled={!pagination.hasNextPage}>
            <PaginationNextSVG />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const buildHref = (page: number, basePath: string, paginationParams?: PaginationParams) => {
  const [path, existingQuery] = basePath.split("?");

  const params = new URLSearchParams(existingQuery ?? "");

  if (paginationParams) {
    Object.entries(paginationParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
  }

  if (page > 1) {
    params.set("page", String(page));
  } else {
    params.delete("page");
  }

  const query = params.toString();
  return query ? `${path}?${query}` : path;
};

const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => i + start);

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationItem[] => {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages <= totalBlocks) {
    return range(1, totalPages);
  }

  const startPages = range(1, boundaryCount);
  const endPages = range(totalPages - boundaryCount + 1, totalPages);

  const leftSibling = Math.max(currentPage - siblingCount, boundaryCount + 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - boundaryCount - 1);

  const shouldShowLeftDots = leftSibling > boundaryCount + 2;
  const shouldShowRightDots = rightSibling < totalPages - boundaryCount - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = boundaryCount + 1 + siblingCount * 2 + 1;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, "...", ...endPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = boundaryCount + 1 + siblingCount * 2 + 1;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [...startPages, "...", ...rightRange];
  }

  const middleRange = range(leftSibling, rightSibling);
  return [...startPages, "...", ...middleRange, "...", ...endPages];
};
