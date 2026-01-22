import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parsePageNumber = (value?: string) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 1;
  }

  return Math.max(1, Math.floor(parsed));
};

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number | string, currencyCode: string = "USD", locale?: string): string | null {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (!Number.isFinite(num)) {
    return null;
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch (error) {
    console.error(`Error formatting currency (${currencyCode}):`, error);
    // Fallback to simple format
    return `${currencyCode === "USD" ? "$" : currencyCode} ${num.toFixed(2)}`;
  }
}

export function formatPriceWithDiscount(
  amount: number | string,
  oldAmount?: number | string,
  currencyCode: string = "USD",
): {
  formattedPrice: string;
  formattedOldPrice: string | null;
  hasDiscount: boolean;
} {
  const formattedPrice = formatCurrency(amount, currencyCode) || "0";
  const formattedOldPrice = oldAmount ? formatCurrency(oldAmount, currencyCode) : null;

  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  const numOldAmount = oldAmount ? (typeof oldAmount === "string" ? parseFloat(oldAmount) : oldAmount) : null;

  const hasDiscount = numOldAmount !== null && Number.isFinite(numOldAmount) && numOldAmount > numAmount;

  return {
    formattedPrice,
    formattedOldPrice,
    hasDiscount: !!hasDiscount,
  };
}
