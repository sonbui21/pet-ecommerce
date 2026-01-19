"use client";

import { useCallback, useMemo, useState } from "react";
import { ProductDetail, ProductOption, ProductVariant, SelectedOptions } from "@/lib/types/catalog";
import { Price } from "../common/price";
import { QuantitySelector } from "./quantity-selector";
import { AddToCart } from "../basket/add-to-cart";

type VariantSelectorProps = {
  options: ProductOption[];
  variants: ProductVariant[];
  currencyCode: string;
  defaultPrice: number;
  defaultOldPrice?: number;
  product: ProductDetail;
};

type VariantOptionMap = {
  variant: ProductVariant;
  optionMap: Record<string, string>;
};

export function VariantSelector({
  options,
  variants,
  currencyCode,
  defaultPrice,
  defaultOldPrice,
  product,
}: VariantSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    options: [],
    quantity: 1,
    availableStock: 1,
  });

  const variantOptionMaps = useMemo<VariantOptionMap[]>(() => {
    return variants.map((variant) => ({
      variant,
      optionMap: Object.fromEntries(variant.options.map((opt) => [opt.name, opt.value])) as Record<string, string>,
    }));
  }, [variants]);

  const selectedMap = useMemo(() => {
    return Object.fromEntries(selectedOptions.options.map((o) => [o.name, o.value])) as Record<string, string>;
  }, [selectedOptions.options]);

  const maxQuantity = selectedOptions.availableStock ?? 0;
  const isIncreaseDisabled = maxQuantity <= 0 || selectedOptions.quantity >= maxQuantity;
  const isDecreaseDisabled = selectedOptions.quantity <= 1;
  const canAddToCart = selectedOptions.options.length === options.length;

  const findVariantForSelection = useCallback(
    (selection: Record<string, string>) => {
      return variantOptionMaps.find(({ optionMap }) =>
        Object.entries(selection).every(([name, value]) => optionMap[name] === value),
      )?.variant;
    },
    [variantOptionMaps],
  );

  const handleOptionClick = useCallback(
    (name: string, value: string) => {
      setSelectedOptions((prev) => {
        const existing = prev.options.find((opt) => opt.name === name);
        const newOptions = existing
          ? prev.options.map((opt) => (opt.name === name ? { ...opt, value } : opt))
          : [...prev.options, { name, value }];

        if (newOptions.length !== options.length) {
          return { ...prev, options: newOptions, availableStock: 0 };
        }

        const selection = Object.fromEntries(newOptions.map((o) => [o.name, o.value])) as Record<string, string>;
        const matchedVariant = findVariantForSelection(selection);
        if (!matchedVariant) {
          return { ...prev, options: newOptions, availableStock: 0 };
        }

        if (matchedVariant.availableStock <= prev.quantity) {
          return {
            ...prev,
            variantId: matchedVariant.id,
            options: newOptions,
            availableStock: matchedVariant.availableStock,
            quantity: matchedVariant.availableStock,
          };
        }

        return {
          ...prev,
          variantId: matchedVariant.id,
          options: newOptions,
          availableStock: matchedVariant.availableStock,
        };
      });
    },
    [findVariantForSelection, options.length],
  );

  const isOptionValueAvailable = useCallback(
    (optionName: string, optionValue: string) => {
      const nextSelection = {
        ...selectedMap,
        [optionName]: optionValue,
      };

      return variantOptionMaps.some(({ variant, optionMap }) => {
        if (variant.availableStock == 0) return false;

        return Object.entries(nextSelection).every(([name, value]) => optionMap[name] === value);
      });
    },
    [selectedMap, variantOptionMaps],
  );

  const handleDecrease = useCallback(() => {
    setSelectedOptions((prev) => {
      return { ...prev, quantity: Math.max(1, prev.quantity - 1) };
    });
  }, []);

  const handleIncrease = useCallback(() => {
    setSelectedOptions((prev) => {
      const nextMax = prev.availableStock ?? 0;
      if (nextMax <= 0 || prev.quantity >= nextMax) {
        return prev;
      }

      return { ...prev, quantity: Math.min(nextMax, prev.quantity + 1) };
    });
  }, []);

  return (
    <>
      <div className='variant-selector'>
        <div className='price-display mb-2'>
          <h4 className='price text-2xl font-bold'>
            <Price amount={defaultPrice} currencyCode={currencyCode} oldAmount={defaultOldPrice} />
          </h4>
        </div>

        {options.map((option) => (
          <div className='product__size-wrap' key={option.id || option.name}>
            <span className='size-title'>{option.name}:</span>

            <ul className='list-wrap'>
              {option.values.map((value) => {
                const isSelected =
                  selectedOptions &&
                  selectedOptions.options.some((opt) => opt.name === option.name && opt.value === value);
                const isValueAvailable = isOptionValueAvailable(option.name, value);

                return (
                  <li key={value}>
                    <button
                      type='button'
                      onClick={() => handleOptionClick(option.name, value)}
                      disabled={!isValueAvailable}
                      className={`
                        border hover:border-(--theme-primary)! transition-colors duration-200
                        ${isSelected ? "border-(--theme-primary)! text-(--theme-primary)!" : ""}
                        ${!isValueAvailable ? "opacity-30 cursor-not-allowed line-through" : "cursor-pointer"}
                      `}
                    >
                      {value}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className='product__details-qty relative '>
        <QuantitySelector
          isDecreaseDisabled={isDecreaseDisabled}
          isIncreaseDisabled={isIncreaseDisabled}
          quantity={selectedOptions.quantity}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
        />

        <AddToCart selectedOptions={selectedOptions} isDisabled={!canAddToCart} product={product} />

        {canAddToCart && selectedOptions && (
          <div className='absolute top-17 product__details-category'>
            <span className='title '>
              Available:{" "}
              <span className='font-[var(--heading-font-family)] text-[var(--body-color)] font-bold'>
                {selectedOptions.availableStock}
              </span>{" "}
              items
            </span>
          </div>
        )}
      </div>
    </>
  );
}
