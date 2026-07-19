import React from "react";
import { CheckCircle2 } from "lucide-react";

import { useOrder } from "./OrderProvider";
import {
  PICKUP_LOCATION,
  formatCurrency,
  getCartItemLineTotalCents,
} from "./orderUtils";

function SummaryRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={highlight ? "text-[#C9A25B]" : "text-white/50"}>{label}</span>
      <span
        className={
          highlight
            ? "font-serif text-2xl text-[#C9A25B]"
            : "font-serif text-lg text-white/78"
        }
      >
        {value}
      </span>
    </div>
  );
}

export default function OrderConfirmation() {
  const { confirmationDetails, closeDrawer, startNewOrder } = useOrder();

  if (!confirmationDetails) {
    return (
      <div className="p-6 text-sm leading-relaxed text-white/55">
        No demo confirmation is available yet.
      </div>
    );
  }

  const {
    deliveryAddress,
    items,
    orderNumber,
    orderType,
    requestedTime,
    totals,
  } = confirmationDetails;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C9A25B]/35 bg-[#C9A25B]/12 text-[#C9A25B]">
            <CheckCircle2 size={22} strokeWidth={1.8} />
          </span>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A25B]">
              Demo order received
            </p>
            <h3 className="mt-2 font-serif text-3xl leading-none text-white">
              {orderNumber}
            </h3>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div className="rounded-[1.35rem] border border-[#C9A25B]/24 bg-[#C9A25B]/8 p-4 text-sm leading-relaxed text-white/68">
          This is a portfolio demonstration. No real order has been sent, no
          payment has been collected, and no restaurant staff have been contacted.
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
              Guest
            </p>
            <p className="mt-2 font-serif text-2xl text-white">
              {confirmationDetails.customerName}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/52">
              {confirmationDetails.maskedEmail}
              <br />
              {confirmationDetails.maskedPhone}
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
              {orderType === "delivery" ? "Delivery" : "Pickup"}
            </p>
            <p className="mt-2 font-serif text-2xl text-white">
              {requestedTime}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/52">
              {orderType === "delivery"
                ? `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.province}`
                : `${PICKUP_LOCATION.address}, ${PICKUP_LOCATION.city}, ${PICKUP_LOCATION.province}`}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
            Ordered items
          </p>

          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-serif text-xl text-white">
                    {item.quantity} x {item.name}
                  </p>
                  <div className="mt-1 space-y-1 text-sm text-white/45">
                    {item.customizations?.temperature ? (
                      <p>{item.customizations.temperature}</p>
                    ) : null}
                    {item.customizations?.addOns?.length ? (
                      <p>
                        {item.customizations.addOns
                          .map((addOn) => addOn.label)
                          .join(", ")}
                      </p>
                    ) : null}
                    {item.customizations?.specialInstructions ? (
                      <p>{item.customizations.specialInstructions}</p>
                    ) : null}
                  </div>
                </div>

                <span className="font-serif text-xl text-[#C9A25B]">
                  {formatCurrency(getCartItemLineTotalCents(item))}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-black/30 p-4">
          <div className="space-y-3 text-sm">
            <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotalCents)} />
            {totals.discountCents > 0 ? (
              <SummaryRow
                label="MAISON10 discount"
                value={`-${formatCurrency(totals.discountCents)}`}
              />
            ) : null}
            {totals.deliveryFeeCents > 0 ? (
              <SummaryRow
                label="Delivery fee"
                value={formatCurrency(totals.deliveryFeeCents)}
              />
            ) : null}
            <SummaryRow label="Simulated tax" value={formatCurrency(totals.taxCents)} />
            <SummaryRow label="Tip" value={formatCurrency(totals.tipCents)} />
            <SummaryRow
              label="Total"
              value={formatCurrency(totals.totalCents)}
              highlight
            />
          </div>
        </div>

        {confirmationDetails.allergyNotes ? (
          <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
              Allergy / dietary notes
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/58">
              {confirmationDetails.allergyNotes}
            </p>
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/10 bg-[#070504]/95 p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/62 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
          >
            Close
          </button>
          <button
            type="button"
            onClick={startNewOrder}
            className="rounded-full bg-[#C9A25B] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#d6b36d]"
          >
            Start a new order
          </button>
        </div>
      </div>
    </div>
  );
}
