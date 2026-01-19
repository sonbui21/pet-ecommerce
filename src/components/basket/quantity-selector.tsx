import { memo, useCallback } from "react";

type Props = {
  isDecreaseDisabled?: boolean;
  isIncreaseDisabled?: boolean;
  quantity?: number;
  handleDecrease?: () => void;
  handleIncrease?: () => void;
  className?: string;
  classNameInput?: string;
  classNameSpan?: string;
};

export const QuantitySelector = memo(function QuantitySelector({
  isDecreaseDisabled = false,
  isIncreaseDisabled = false,
  quantity = 1,
  handleDecrease,
  handleIncrease,
  className,
  classNameInput,
  classNameSpan,
}: Props) {
  const onDec = useCallback(() => {
    if (isDecreaseDisabled) return;
    handleDecrease?.();
  }, [isDecreaseDisabled, handleDecrease]);

  const onInc = useCallback(() => {
    if (isIncreaseDisabled) return;
    handleIncrease?.();
  }, [isIncreaseDisabled, handleIncrease]);

  const decDisabled = isDecreaseDisabled || !handleDecrease;
  const incDisabled = isIncreaseDisabled || !handleIncrease;

  return (
    <div className={`cart-plus-minus ${className ?? ""}`}>
      <button
        type='button'
        aria-label='Decrease quantity'
        disabled={decDisabled}
        onClick={onDec}
        className={`dec qtybutton ${classNameSpan ?? ""} ${
          decDisabled ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
        }`}
      >
        <span>-</span>
      </button>

      <input
        type='text'
        inputMode='numeric'
        value={quantity}
        readOnly
        aria-label='Quantity'
        className={classNameInput}
      />

      <button
        type='button'
        aria-label='Increase quantity'
        disabled={incDisabled}
        onClick={onInc}
        className={`inc qtybutton ${classNameSpan ?? ""} ${
          incDisabled ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
        }`}
      >
        <span>+</span>
      </button>
    </div>
  );
});
