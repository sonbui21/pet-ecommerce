import { CartItem } from "@/lib/types/basket";
import { useActionState } from "react";
import { updateItemQuantity } from "./actions";

export function QuantitySelector({
  item,
  type,
  optimisticUpdate,

  isDecreaseDisabled = false,
  isIncreaseDisabled = false,
  quantity = 1,
  className,
  classNameInput,
  classNameSpan,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: any;

  isDecreaseDisabled?: boolean;
  isIncreaseDisabled?: boolean;
  quantity?: number;
  className?: string;
  classNameInput?: string;
  classNameSpan?: string;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    itemId: item.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const updateItemQuantityAction = formAction.bind(payload);

  return (
    <form
      action={async () => {
        optimisticUpdate(payload.itemId, type);
        updateItemQuantityAction();
      }}
    >
      <div className={`cart-plus-minus ${className ?? ""}`}>
        <div
          className={`dec qtybutton ${classNameSpan ?? ""} ${
            isDecreaseDisabled ? "opacity-30 cursor-not-allowed!" : ""
          }`}
        >
          <span>-</span>
        </div>
        <input
          type="text"
          value={quantity}
          readOnly
          className={classNameInput}
        />
        <div
          className={`inc qtybutton ${classNameSpan ?? ""} ${
            isIncreaseDisabled ? "opacity-30 cursor-not-allowed!" : ""
          }`}
        >
          <span>+</span>
        </div>
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
