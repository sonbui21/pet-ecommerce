"use client";

import { ProductDetail, SelectedOptions } from "@/lib/types/catalog";
import { useState, useTransition } from "react";
import { useCartStore } from "./cart-store";

export function AddToCart({
  isDisabled,
  selectedOptions,
  product,
}: {
  isDisabled: boolean;
  selectedOptions: SelectedOptions;
  product: ProductDetail;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const openCart = useCartStore((state) => state.openCart);
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  const handleClick = async () => {
    setError(null);

    startTransition(async () => {
      try {
        const errorMessage = await addItemToCart(product, selectedOptions);
        if (errorMessage) {
          setError(errorMessage);
        } else {
          openCart();
        }
      } catch (err) {
        console.error("Error adding item to cart:", err);
        setError("Failed to add item to cart. Please try again.");
      }
    });
  };

  return (
    <>
      <div>
        <button
          type='submit'
          className={`btn w-80 h-12 justify-center ${
            isDisabled || isPending ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
          }`}
          onClick={handleClick}
        >
          {isPending ? "Adding..." : "Add To Cart"}
        </button>
      </div>
      {error && (
        <div className='absolute left-42 top-17 product__details-category'>
          <span className='title '>{error}</span>
        </div>
      )}
    </>
  );
}
