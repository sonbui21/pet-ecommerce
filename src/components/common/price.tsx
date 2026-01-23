import { formatPriceWithDiscount } from "@/lib/utils";
import { memo } from "react";

export const Price = memo(function Price({
  amount,
  currencyCode = "USD",
  oldAmount,
}: {
  amount: number;
  currencyCode?: string;
  oldAmount?: number;
} & React.ComponentProps<"p">) {
  const { formattedPrice, formattedOldPrice, hasDiscount } = formatPriceWithDiscount(amount, oldAmount, currencyCode);

  return (
    <>
      {formattedPrice}
      {hasDiscount && formattedOldPrice && <del className='text-[#b9bdc8] font-bold ml-3'>{formattedOldPrice}</del>}
    </>
  );
});
