import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Edit3, ShoppingBag, Trash2, X } from "lucide-react";

import OrderCheckout from "./OrderCheckout";
import OrderConfirmation from "./OrderConfirmation";
import OrderItemControls from "./OrderItemControls";
import { useOrder } from "./OrderProvider";
import {
  formatCurrency,
  getAddOnTotalCents,
  getCartItemLineTotalCents,
  getItemCustomizationConfig,
} from "./orderUtils";

const describeCustomizations = (item) => {
  const details = [];

  if (item.customizations?.temperature) details.push(item.customizations.temperature);
  if (item.customizations?.addOns?.length) {
    details.push(item.customizations.addOns.map((addOn) => addOn.label).join(", "));
  }
  if (item.customizations?.specialInstructions) {
    details.push(`Notes: ${item.customizations.specialInstructions}`);
  }

  return details;
};

function CartView() {
  const {
    cartItems,
    clearCart,
    editCartItem,
    removeCartItem,
    startCheckout,
    totals,
    updateCartItemQuantity,
  } = useOrder();

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#C9A25B]">
              Online ordering
            </p>
            <h3 className="mt-2 font-serif text-3xl leading-none text-white">
              Your order
            </h3>
          </div>

          {cartItems.length > 0 ? (
            <button
              type="button"
              onClick={clearCart}
              className="rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/52 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
            >
              Clear cart
            </button>
          ) : null}
        </div>
      </div>

      {cartItems.length > 0 ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-2">
          {cartItems.map((item) => {
            const customizationDetails = describeCustomizations(item);

            return (
              <div
                key={item.id}
                className="grid grid-cols-[4.75rem_1fr] gap-4 border-b border-white/10 py-4 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover brightness-110 contrast-105"
                />

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.24em] text-[#C9A25B]/75">
                        {item.category}
                      </p>
                      <h4 className="mt-1 font-serif text-xl leading-tight text-white">
                        {item.name}
                      </h4>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => editCartItem(item.id)}
                        aria-label={`Edit ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/42 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
                      >
                        <Edit3 size={14} strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeCartItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/42 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>

                  {customizationDetails.length ? (
                    <div className="mt-3 space-y-1 text-xs leading-relaxed text-white/45">
                      {customizationDetails.map((detail) => (
                        <p key={detail}>{detail}</p>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <OrderItemControls
                      quantity={item.quantity}
                      label={item.name}
                      onDecrease={() => updateCartItemQuantity(item.id, -1)}
                      onIncrease={() => updateCartItemQuantity(item.id, 1)}
                    />

                    <span className="font-serif text-2xl text-[#C9A25B]">
                      {formatCurrency(getCartItemLineTotalCents(item))}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[18rem] flex-1 flex-col items-center justify-center px-8 py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A25B]/25 bg-[#C9A25B]/10 text-[#C9A25B]">
            <ShoppingBag size={26} strokeWidth={1.7} />
          </div>
          <h4 className="mt-5 font-serif text-3xl text-white">The cart is empty.</h4>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/52">
            Add a dish from the full menu to begin a front-end demo order.
          </p>
        </div>
      )}

      <div className="sticky bottom-0 border-t border-white/10 bg-[#070504]/95 p-5 backdrop-blur-xl">
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Subtotal</span>
            <span className="font-serif text-2xl text-white">
              {formatCurrency(totals.subtotalCents)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Simulated tax</span>
            <span className="font-serif text-xl text-white/70">
              {formatCurrency(totals.taxCents)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C9A25B]">
              Current total
            </span>
            <span className="font-serif text-3xl text-[#C9A25B]">
              {formatCurrency(totals.totalCents)}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={!cartItems.length}
          onClick={startCheckout}
          className="w-full rounded-full bg-[#C9A25B] px-6 py-3.5 text-base font-medium text-black transition hover:bg-[#d6b36d] disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/32"
        >
          Checkout / Order
        </button>
      </div>
    </div>
  );
}

function ItemCustomizer() {
  const {
    closeItemCustomizer,
    saveCustomizedItem,
    selectedItem,
  } = useOrder();
  const reduceMotion = useReducedMotion();
  const panelRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState("");
  const [addOns, setAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const item = selectedItem?.item;
  const config = getItemCustomizationConfig(item);
  const unitTotalCents = item
    ? item.priceCents + getAddOnTotalCents(addOns)
    : 0;

  useEffect(() => {
    if (!selectedItem) return;

    setQuantity(selectedItem.quantity || 1);
    setTemperature(
      selectedItem.customizations?.temperature ||
        config.defaultTemperature ||
        ""
    );
    setAddOns(selectedItem.customizations?.addOns || []);
    setSpecialInstructions(
      selectedItem.customizations?.specialInstructions || ""
    );
  }, [config.defaultTemperature, selectedItem]);

  useEffect(() => {
    if (!selectedItem) return;
    panelRef.current?.focus();
  }, [selectedItem]);

  if (!selectedItem || !item) return null;

  const toggleAddOn = (addOn) => {
    setAddOns((current) =>
      current.some((entry) => entry.id === addOn.id)
        ? current.filter((entry) => entry.id !== addOn.id)
        : [...current, addOn]
    );
  };

  const saveItem = () => {
    saveCustomizedItem({
      item,
      quantity,
      customizations: {
        temperature: config.temperatures?.length ? temperature : "",
        addOns,
        specialInstructions,
      },
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-end justify-center bg-black/45 px-3 pb-3 backdrop-blur-sm sm:items-center sm:p-6"
        style={{ zIndex: 2147483300 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`Customize ${item.name}`}
          initial={
            reduceMotion ? { opacity: 1 } : { opacity: 0, y: 36, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }
          }
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[min(92vh,45rem)] w-full max-w-3xl overflow-hidden rounded-[1.65rem] border border-[#C9A25B]/28 bg-[#070504]/96 text-[#F5F2EB] shadow-[0_34px_120px_-42px_rgba(201,162,91,0.72)] backdrop-blur-2xl"
        >
          <div className="grid max-h-[inherit] overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full min-h-64 w-full object-cover brightness-110 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/18 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#C9A25B]">
                  {item.category}
                </p>
                <h3 className="mt-2 font-serif text-4xl leading-none text-white">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/62">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="relative p-5 sm:p-6">
              <button
                type="button"
                onClick={closeItemCustomizer}
                aria-label="Close item customization"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/65 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
              >
                <X size={18} strokeWidth={1.8} />
              </button>

              <div className="pr-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A25B]">
                  Customize
                </p>
                <p className="mt-2 font-serif text-3xl text-white">
                  {formatCurrency(item.priceCents)}
                </p>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-white/46">
                    Quantity
                  </p>
                  <OrderItemControls
                    quantity={quantity}
                    label={item.name}
                    onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
                    onIncrease={() => setQuantity((current) => current + 1)}
                  />
                </div>

                {config.temperatures?.length ? (
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/46">
                      Steak temperature
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {config.temperatures.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setTemperature(option)}
                          className={`rounded-full border px-4 py-2 text-sm transition ${
                            temperature === option
                              ? "border-[#C9A25B]/60 bg-[#C9A25B] text-black"
                              : "border-white/10 text-white/62 hover:border-[#C9A25B]/35 hover:text-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {config.addOns?.length ? (
                  <div>
                    <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/46">
                      Optional add-ons
                    </p>
                    <div className="grid gap-2">
                      {config.addOns.map((addOn) => {
                        const checked = addOns.some((entry) => entry.id === addOn.id);

                        return (
                          <label
                            key={addOn.id}
                            className={`flex items-center justify-between gap-3 rounded-[1rem] border p-3 text-sm transition ${
                              checked
                                ? "border-[#C9A25B]/45 bg-[#C9A25B]/10 text-white"
                                : "border-white/10 bg-white/[0.035] text-white/62"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleAddOn(addOn)}
                              />
                              {addOn.label}
                            </span>
                            <span className="font-serif text-[#C9A25B]">
                              {formatCurrency(addOn.priceCents)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/46">
                    Special instructions
                  </span>
                  <textarea
                    value={specialInstructions}
                    onChange={(event) => setSpecialInstructions(event.target.value)}
                    className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#C9A25B]/60"
                    placeholder="Optional notes for this item"
                  />
                </label>

                <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Item total</span>
                    <span className="font-serif text-3xl text-[#C9A25B]">
                      {formatCurrency(unitTotalCents * quantity)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={saveItem}
                  className="w-full rounded-full bg-[#C9A25B] px-6 py-3.5 text-base font-medium text-black transition hover:bg-[#d6b36d]"
                >
                  {selectedItem.mode === "edit" ? "Save item" : "Add to order"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function OrderDrawer() {
  const {
    closeDrawer,
    closeItemCustomizer,
    drawerOpen,
    drawerView,
    selectedItem,
  } = useOrder();
  const reduceMotion = useReducedMotion();
  const drawerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    drawerRef.current?.focus({ preventScroll: true });
  }, [drawerOpen, drawerView]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (selectedItem) {
          closeItemCustomizer();
        } else {
          closeDrawer();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeDrawer, closeItemCustomizer, selectedItem]);

  if (!mounted) return null;

  const drawerContent =
    drawerView === "checkout" ? (
      <OrderCheckout />
    ) : drawerView === "confirmation" ? (
      <OrderConfirmation />
    ) : (
      <CartView />
    );

  return createPortal(
    <>
      <AnimatePresence>
        {drawerOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close order drawer"
              onClick={closeDrawer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
              style={{ zIndex: 2147483001 }}
              className="fixed inset-0 cursor-default bg-black/18 backdrop-blur-[1px]"
            />

            <motion.aside
              ref={drawerRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="Maison Noir online order"
              initial={
                reduceMotion ? { opacity: 1 } : { opacity: 0, x: 42, scale: 0.98 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, x: 38, scale: 0.98 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 31 }
              }
              style={{ zIndex: 2147483002 }}
              className={`fixed bottom-3 left-3 right-3 top-20 flex flex-col overflow-hidden rounded-[1.5rem] border border-[#C9A25B]/28 bg-[#070504]/96 text-[#F5F2EB] shadow-[0_34px_120px_-42px_rgba(201,162,91,0.72)] backdrop-blur-2xl md:bottom-auto md:left-auto md:right-7 md:top-24 md:max-h-[calc(100vh-7rem)] ${
                drawerView === "checkout" || drawerView === "confirmation"
                  ? "md:w-[min(calc(100vw-3.5rem),58rem)]"
                  : "md:w-[min(calc(100vw-3.5rem),30rem)]"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-24 top-12 h-64 w-64 rounded-full bg-[#3B1A57]/45 blur-[95px]" />
                <div className="absolute -left-28 bottom-6 h-72 w-72 rounded-full bg-[#4A1418]/42 blur-[105px]" />
              </div>

              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close order drawer"
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/65 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>

                {drawerContent}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <ItemCustomizer />
    </>,
    document.body
  );
}
