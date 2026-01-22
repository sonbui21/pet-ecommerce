export const QuantitySelector = ({
  isDecreaseDisabled = false,
  isIncreaseDisabled = false,
  quantity = 1,
  handleDecrease,
  handleIncrease,
  className,
  classNameInput,
  classNameSpan,
}: {
  isDecreaseDisabled?: boolean;
  isIncreaseDisabled?: boolean;
  quantity?: number;
  handleDecrease?: () => void;
  handleIncrease?: () => void;
  className?: string;
  classNameInput?: string;
  classNameSpan?: string;
}) => {
  return (
    <div className={`cart-plus-minus ${className ?? ""}`}>
      <div
        className={`dec qtybutton ${classNameSpan ?? ""} ${isDecreaseDisabled ? "opacity-50 cursor-not-allowed!" : ""}`}
        onClick={handleDecrease}
      >
        <span>-</span>
      </div>
      <input type='text' value={quantity} readOnly className={classNameInput} />
      <div
        className={`inc qtybutton ${classNameSpan ?? ""} ${isIncreaseDisabled ? "opacity-50 cursor-not-allowed!" : ""}`}
        onClick={handleIncrease}
      >
        <span>+</span>
      </div>
    </div>
  );
};
