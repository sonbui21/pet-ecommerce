export type MenuItem = {
  label: string;
  href: string;
  subMenu?: Array<{ label: string; href: string }>;
};

export type Image = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Category = {
  name: string;
  slug: string;
  totalCount?: number;
};

export type ProductCard = {
  slug: string;
  title: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
};

export type ProductDetail = {
  id: string;
  slug: string;
  title: string;
  price: number;
  oldPrice?: number;
  currencyCode: string;
  images: Image[];
  categories: Category[];
  options: ProductOption[];
  variants: ProductVariant[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  price: number;
  availableStock: number;
  options: VariantOption[];
};

export type VariantOption = {
  name: string;
  value: string;
};

export type SelectedOptions = {
  variantId?: string;
  options: VariantOption[];
  quantity: number;
  availableStock: number;
};
