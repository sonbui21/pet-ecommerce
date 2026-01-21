const BASE_CATALOG_ENDPOINT = `${process.env.CATALOG_API_BASE_URL}/api/shop`;

export const API_ENDPOINTS = {
  CATALOG: {
    NAV_CATEGORIES: `${BASE_CATALOG_ENDPOINT}/catalog/nav-categories`,
    SEARCH_CATEGORIES: `${BASE_CATALOG_ENDPOINT}/catalog/search-categories`,
    PREMIUM_ITEMS: `${BASE_CATALOG_ENDPOINT}/catalog/premium-items`,
    ITEM_BY_HANDLE: (handle: string) => `${BASE_CATALOG_ENDPOINT}/catalog/items/${encodeURIComponent(handle)}`,
    ITEMS_BY_CATEGORY: (handle: string) =>
      `${BASE_CATALOG_ENDPOINT}/catalog/items/category/${encodeURIComponent(handle)}`,
    ITEMS_BY_TITLE: (handle: string) => `${BASE_CATALOG_ENDPOINT}/catalog/items/title/${encodeURIComponent(handle)}`,
  },
  ORDER: {
    PLACE_ORDER: `${process.env.ORDER_API_BASE_URL}/api/orders`,
  },
} as const;
