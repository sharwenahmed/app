import React, { useMemo, useState } from "react";
import { AlertCircle, Check, Clock3, MapPin } from "lucide-react";

import { useOrder } from "./OrderProvider";
import {
  ORDER_STEP_LABELS,
  ORDER_STEPS,
  PAYMENT_OPTIONS,
  PICKUP_LOCATION,
  formatCurrency,
  getTodayDateValue,
  isPastDate,
  normalizePromoCode,
  validateCanadianPhone,
  validateCanadianPostalCode,
  validateEmail,
} from "./orderUtils";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#C9A25B]/60";

const labelClass = "text-[10px] uppercase tracking-[0.24em] text-white/46";
const errorClass = "mt-2 flex items-start gap-2 text-xs leading-relaxed text-[#f0b3a8]";

function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <p id={id} className={errorClass}>
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

function StepButton({ active, complete, children }) {
  return (
    <span
      className={`flex min-w-0 items-center gap-2 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.18em] ${
        active
          ? "border-[#C9A25B]/60 bg-[#C9A25B]/12 text-[#C9A25B]"
          : complete
            ? "border-white/10 bg-white/[0.04] text-white/58"
            : "border-white/10 text-white/32"
      }`}
    >
      {complete ? <Check className="h-3.5 w-3.5 shrink-0" /> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

function TotalsBlock({ totals, compact = false }) {
  const rows = [
    ["Subtotal", totals.subtotalCents],
    ["MAISON10 discount", -totals.discountCents, totals.discountCents > 0],
    ["Delivery fee", totals.deliveryFeeCents, totals.deliveryFeeCents > 0],
    ["Simulated tax 14%", totals.taxCents],
    ["Tip", totals.tipCents],
  ];

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {rows
        .filter(([, , show = true]) => show)
        .map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <span className="text-sm text-white/50">{label}</span>
            <span className="font-serif text-lg text-white/78">
              {value < 0 ? "-" : ""}
              {formatCurrency(Math.abs(value))}
            </span>
          </div>
        ))}

      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
        <span className="text-xs uppercase tracking-[0.24em] text-[#C9A25B]">
          Total
        </span>
        <span className="font-serif text-3xl text-[#C9A25B]">
          {formatCurrency(totals.totalCents)}
        </span>
      </div>
    </div>
  );
}

export default function OrderCheckout() {
  const {
    cartItems,
    checkout,
    checkoutStep,
    setCheckoutStep,
    setOrderType,
    submitDemoOrder,
    totals,
    updateCheckout,
    updateCustomer,
    updateDeliveryAddress,
    updatePickupDetails,
    updateSchedule,
  } = useOrder();
  const [errors, setErrors] = useState({});

  const currentStepIndex = ORDER_STEPS.indexOf(checkoutStep);
  const paymentOptions = PAYMENT_OPTIONS[checkout.orderType];

  const validateStep = (step) => {
    const nextErrors = {};

    if (step === "customer" || step === "review") {
      if (!checkout.customer.firstName.trim()) {
        nextErrors.firstName = "First name is required.";
      }
      if (!checkout.customer.lastName.trim()) {
        nextErrors.lastName = "Last name is required.";
      }
      if (!validateEmail(checkout.customer.email)) {
        nextErrors.email = "Enter a valid email address.";
      }
      if (!validateCanadianPhone(checkout.customer.phone)) {
        nextErrors.phone = "Enter a Canadian phone number with 10 digits.";
      }
    }

    if ((step === "details" || step === "review") && checkout.orderType === "delivery") {
      if (!checkout.deliveryAddress.street.trim()) {
        nextErrors.street = "Street address is required for delivery.";
      }
      if (!checkout.deliveryAddress.city.trim()) {
        nextErrors.city = "City is required for delivery.";
      }
      if (!checkout.deliveryAddress.province.trim()) {
        nextErrors.province = "Province is required for delivery.";
      }
      if (!validateCanadianPostalCode(checkout.deliveryAddress.postalCode)) {
        nextErrors.postalCode = "Enter a valid Canadian postal code.";
      }
    }

    if (step === "schedule" || step === "review") {
      if (checkout.schedule.timing === "later") {
        if (!checkout.schedule.date) {
          nextErrors.scheduleDate = "Choose a requested date.";
        } else if (isPastDate(checkout.schedule.date)) {
          nextErrors.scheduleDate = "Scheduled orders cannot use a past date.";
        }

        if (!checkout.schedule.time) {
          nextErrors.scheduleTime = "Choose a requested time.";
        }
      }
    }

    if (step === "review") {
      if (!cartItems.length) {
        nextErrors.cart = "Add at least one item before submitting.";
      }
      if (!checkout.allergyAcknowledged) {
        nextErrors.allergyAcknowledged =
          "Please acknowledge that serious allergies must be confirmed directly with the restaurant team.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(checkoutStep)) return;

    const nextStep = ORDER_STEPS[currentStepIndex + 1];
    if (nextStep && nextStep !== "confirmation") {
      setCheckoutStep(nextStep);
    }
  };

  const goBack = () => {
    const previousStep = ORDER_STEPS[currentStepIndex - 1];
    if (previousStep) {
      setErrors({});
      setCheckoutStep(previousStep);
    }
  };

  const submitOrder = () => {
    if (!validateStep("review")) return;

    // Future hosted payment checkout should be connected here before final submission.
    submitDemoOrder();
  };

  const progressSteps = useMemo(
    () => ORDER_STEPS.filter((step) => step !== "confirmation"),
    []
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A25B]">
          Demonstration checkout
        </p>
        <h3 className="mt-2 font-serif text-3xl leading-none text-white">
          Complete the order
        </h3>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {progressSteps.map((step, index) => (
            <StepButton
              key={step}
              active={checkoutStep === step}
              complete={index < currentStepIndex}
            >
              {ORDER_STEP_LABELS[step]}
            </StepButton>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        {errors.cart ? <FieldError id="cart-error" message={errors.cart} /> : null}

        {checkoutStep === "order-type" ? (
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-white/58">
              Choose how this demo order should be prepared. Delivery-zone validation
              is simulated and does not confirm service availability.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["delivery", "Delivery", "Simulated delivery fee applies."],
                ["pickup", "Pickup", "Collect from Bishop's Landing."],
              ].map(([value, title, detail]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setOrderType(value)}
                  className={`rounded-[1.35rem] border p-4 text-left transition ${
                    checkout.orderType === value
                      ? "border-[#C9A25B]/60 bg-[#C9A25B]/12"
                      : "border-white/10 bg-white/[0.035] hover:border-[#C9A25B]/35"
                  }`}
                >
                  <span className="font-serif text-2xl text-white">{title}</span>
                  <span className="mt-2 block text-sm text-white/52">{detail}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {checkoutStep === "customer" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={labelClass}>First name</span>
              <input
                value={checkout.customer.firstName}
                onChange={(event) => updateCustomer({ firstName: event.target.value })}
                className={fieldClass}
                aria-describedby={errors.firstName ? "first-name-error" : undefined}
              />
              <FieldError id="first-name-error" message={errors.firstName} />
            </label>

            <label>
              <span className={labelClass}>Last name</span>
              <input
                value={checkout.customer.lastName}
                onChange={(event) => updateCustomer({ lastName: event.target.value })}
                className={fieldClass}
                aria-describedby={errors.lastName ? "last-name-error" : undefined}
              />
              <FieldError id="last-name-error" message={errors.lastName} />
            </label>

            <label>
              <span className={labelClass}>Email</span>
              <input
                type="email"
                value={checkout.customer.email}
                onChange={(event) => updateCustomer({ email: event.target.value })}
                className={fieldClass}
                placeholder="you@example.com"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <FieldError id="email-error" message={errors.email} />
            </label>

            <label>
              <span className={labelClass}>Phone</span>
              <input
                type="tel"
                value={checkout.customer.phone}
                onChange={(event) => updateCustomer({ phone: event.target.value })}
                className={fieldClass}
                placeholder="(902) 555-0198"
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              <FieldError id="phone-error" message={errors.phone} />
            </label>
          </div>
        ) : null}

        {checkoutStep === "details" ? (
          checkout.orderType === "delivery" ? (
            <div className="space-y-5">
              <div className="rounded-[1.35rem] border border-[#C9A25B]/20 bg-[#C9A25B]/8 p-4 text-sm leading-relaxed text-white/60">
                Delivery-zone validation is simulated for this portfolio demo.
                This does not confirm that the address is inside a real delivery zone.
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className={labelClass}>Street address</span>
                  <input
                    value={checkout.deliveryAddress.street}
                    onChange={(event) =>
                      updateDeliveryAddress({ street: event.target.value })
                    }
                    className={fieldClass}
                    aria-describedby={errors.street ? "street-error" : undefined}
                  />
                  <FieldError id="street-error" message={errors.street} />
                </label>

                <label>
                  <span className={labelClass}>Apartment / unit</span>
                  <input
                    value={checkout.deliveryAddress.apartment}
                    onChange={(event) =>
                      updateDeliveryAddress({ apartment: event.target.value })
                    }
                    className={fieldClass}
                  />
                </label>

                <label>
                  <span className={labelClass}>Buzzer</span>
                  <input
                    value={checkout.deliveryAddress.buzzer}
                    onChange={(event) =>
                      updateDeliveryAddress({ buzzer: event.target.value })
                    }
                    className={fieldClass}
                  />
                </label>

                <label>
                  <span className={labelClass}>City</span>
                  <input
                    value={checkout.deliveryAddress.city}
                    onChange={(event) =>
                      updateDeliveryAddress({ city: event.target.value })
                    }
                    className={fieldClass}
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                  <FieldError id="city-error" message={errors.city} />
                </label>

                <label>
                  <span className={labelClass}>Province</span>
                  <input
                    value={checkout.deliveryAddress.province}
                    onChange={(event) =>
                      updateDeliveryAddress({ province: event.target.value })
                    }
                    className={fieldClass}
                    aria-describedby={errors.province ? "province-error" : undefined}
                  />
                  <FieldError id="province-error" message={errors.province} />
                </label>

                <label>
                  <span className={labelClass}>Postal code</span>
                  <input
                    value={checkout.deliveryAddress.postalCode}
                    onChange={(event) =>
                      updateDeliveryAddress({ postalCode: event.target.value })
                    }
                    className={fieldClass}
                    placeholder="B3J 1S9"
                    aria-describedby={errors.postalCode ? "postal-code-error" : undefined}
                  />
                  <FieldError id="postal-code-error" message={errors.postalCode} />
                </label>

                <label className="sm:col-span-2">
                  <span className={labelClass}>Delivery instructions</span>
                  <textarea
                    value={checkout.deliveryAddress.deliveryInstructions}
                    onChange={(event) =>
                      updateDeliveryAddress({
                        deliveryInstructions: event.target.value,
                      })
                    }
                    className={`${fieldClass} min-h-24 resize-none`}
                  />
                </label>

                <label className="flex items-start gap-3 rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-4 text-sm text-white/62 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={checkout.deliveryAddress.contactless}
                    onChange={(event) =>
                      updateDeliveryAddress({ contactless: event.target.checked })
                    }
                    className="mt-1"
                  />
                  Contactless delivery requested
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-[1.35rem] border border-[#C9A25B]/24 bg-white/[0.035] p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#C9A25B]" />
                  <div>
                    <h4 className="font-serif text-2xl text-white">
                      {PICKUP_LOCATION.name}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/58">
                      {PICKUP_LOCATION.address}, {PICKUP_LOCATION.city},{" "}
                      {PICKUP_LOCATION.province}
                      <br />
                      {PICKUP_LOCATION.hours}
                      <br />
                      {PICKUP_LOCATION.phone}
                    </p>
                  </div>
                </div>
              </div>

              <label>
                <span className={labelClass}>Pickup instructions</span>
                <textarea
                  value={checkout.pickupDetails.pickupInstructions}
                  onChange={(event) =>
                    updatePickupDetails({ pickupInstructions: event.target.value })
                  }
                  className={`${fieldClass} min-h-24 resize-none`}
                  placeholder="Optional notes for the pickup team"
                />
              </label>
            </div>
          )
        ) : null}

        {checkoutStep === "schedule" ? (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["asap", "As soon as possible", "The quickest available preparation request."],
                ["later", "Schedule for later", "Choose a requested date and time."],
              ].map(([value, title, detail]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateSchedule({ timing: value })}
                  className={`rounded-[1.35rem] border p-4 text-left transition ${
                    checkout.schedule.timing === value
                      ? "border-[#C9A25B]/60 bg-[#C9A25B]/12"
                      : "border-white/10 bg-white/[0.035] hover:border-[#C9A25B]/35"
                  }`}
                >
                  <span className="font-serif text-2xl text-white">{title}</span>
                  <span className="mt-2 block text-sm text-white/52">{detail}</span>
                </button>
              ))}
            </div>

            {checkout.schedule.timing === "later" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelClass}>Requested date</span>
                  <input
                    type="date"
                    min={getTodayDateValue()}
                    value={checkout.schedule.date}
                    onChange={(event) => updateSchedule({ date: event.target.value })}
                    className={fieldClass}
                    aria-describedby={
                      errors.scheduleDate ? "schedule-date-error" : undefined
                    }
                  />
                  <FieldError id="schedule-date-error" message={errors.scheduleDate} />
                </label>

                <label>
                  <span className={labelClass}>Requested time</span>
                  <input
                    type="time"
                    value={checkout.schedule.time}
                    onChange={(event) => updateSchedule({ time: event.target.value })}
                    className={fieldClass}
                    aria-describedby={
                      errors.scheduleTime ? "schedule-time-error" : undefined
                    }
                  />
                  <FieldError id="schedule-time-error" message={errors.scheduleTime} />
                </label>
              </div>
            ) : null}

            <div className="flex items-start gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-relaxed text-white/58">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A25B]" />
              Selected times are requests only until confirmed by the restaurant.
            </div>
          </div>
        ) : null}

        {checkoutStep === "review" ? (
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4">
                <p className={labelClass}>Items</p>
                <div className="mt-3 space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4 text-sm">
                      <div>
                        <p className="font-medium text-white">
                          {item.quantity} x {item.name}
                        </p>
                        <p className="text-white/42">
                          {item.customizations?.temperature || item.category}
                        </p>
                      </div>
                      <span className="font-serif text-[#C9A25B]">
                        {formatCurrency((item.priceCents || 0) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <label>
                <span className={labelClass}>Promo code</span>
                <input
                  value={checkout.promoCode}
                  onChange={(event) =>
                    updateCheckout({ promoCode: normalizePromoCode(event.target.value) })
                  }
                  className={fieldClass}
                  placeholder="MAISON10"
                />
                <span className="mt-2 block text-xs text-white/40">
                  Demo code: MAISON10 applies 10% off food.
                </span>
              </label>

              <div>
                <p className={labelClass}>Tip</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    ["none", "No tip"],
                    ["15", "15%"],
                    ["18", "18%"],
                    ["20", "20%"],
                    ["custom", "Custom"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateCheckout({ tipOption: value })}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        checkout.tipOption === value
                          ? "border-[#C9A25B]/60 bg-[#C9A25B] text-black"
                          : "border-white/10 text-white/60 hover:border-[#C9A25B]/35 hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {checkout.tipOption === "custom" ? (
                  <label className="mt-3 block">
                    <span className={labelClass}>Custom tip</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={(checkout.customTipCents || 0) / 100}
                      onChange={(event) =>
                        updateCheckout({
                          customTipCents: Math.max(
                            0,
                            Math.round(Number(event.target.value || 0) * 100)
                          ),
                        })
                      }
                      className={fieldClass}
                    />
                  </label>
                ) : null}
              </div>

              <div>
                <p className={labelClass}>Payment</p>
                <div className="mt-2 grid gap-2">
                  {paymentOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 rounded-[1.1rem] border p-3 text-sm ${
                        option.disabled
                          ? "border-white/10 text-white/30"
                          : "border-white/10 text-white/62"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.id}
                        disabled={option.disabled}
                        checked={checkout.paymentMethod === option.id}
                        onChange={() => updateCheckout({ paymentMethod: option.id })}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <label>
                <span className={labelClass}>Allergy and dietary notes</span>
                <textarea
                  value={checkout.allergyNotes}
                  onChange={(event) =>
                    updateCheckout({ allergyNotes: event.target.value })
                  }
                  className={`${fieldClass} min-h-24 resize-none`}
                  placeholder="Optional notes. Serious allergies must be confirmed directly."
                />
              </label>

              <label className="flex items-start gap-3 rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-relaxed text-white/62">
                <input
                  type="checkbox"
                  checked={checkout.allergyAcknowledged}
                  onChange={(event) =>
                    updateCheckout({ allergyAcknowledged: event.target.checked })
                  }
                  className="mt-1"
                  aria-describedby={
                    errors.allergyAcknowledged ? "allergy-ack-error" : undefined
                  }
                />
                <span>
                  I understand that serious allergies must be confirmed directly
                  with the restaurant team.
                </span>
              </label>
              <FieldError
                id="allergy-ack-error"
                message={errors.allergyAcknowledged}
              />
            </div>

            <aside className="h-fit rounded-[1.35rem] border border-[#C9A25B]/22 bg-black/32 p-5">
              <p className={labelClass}>Order summary</p>
              <div className="mt-4">
                <TotalsBlock totals={totals} />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/42">
                This is a portfolio demonstration. No real order or payment will
                be sent.
              </p>
            </aside>
          </div>
        ) : null}
      </div>

      <div className="sticky bottom-0 border-t border-white/10 bg-[#070504]/95 p-4 backdrop-blur-xl">
        <div className="mb-4 sm:hidden">
          <TotalsBlock totals={totals} compact />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStepIndex <= 0}
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/62 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B] disabled:cursor-not-allowed disabled:opacity-35"
          >
            Back
          </button>

          {checkoutStep === "review" ? (
            <button
              type="button"
              onClick={submitOrder}
              className="rounded-full bg-[#C9A25B] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#d6b36d]"
            >
              Submit demo order
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-[#C9A25B] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#d6b36d]"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
