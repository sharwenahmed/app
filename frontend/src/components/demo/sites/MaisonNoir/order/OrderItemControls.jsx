import React from "react";
import { Minus, Plus } from "lucide-react";

export default function OrderItemControls({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  label = "item",
}) {
  const canDecrease = quantity > min;

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.035] p-1">
      <button
        type="button"
        onClick={onDecrease}
        disabled={!canDecrease}
        aria-label={`Decrease ${label}`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-white/62 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Minus size={15} strokeWidth={1.9} />
      </button>

      <span className="min-w-9 text-center text-sm text-white" aria-live="polite">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase ${label}`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-white/62 transition hover:bg-white/10 hover:text-white"
      >
        <Plus size={15} strokeWidth={1.9} />
      </button>
    </div>
  );
}
