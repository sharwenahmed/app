import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import { useOrder } from "./OrderProvider";
import { formatCurrency } from "./orderUtils";

export default function OrderLauncher({ visible = true }) {
  const reduceMotion = useReducedMotion();
  const { cartCount, openDrawer, totals } = useOrder();

  if (!visible) return null;

  return (
    <motion.button
      type="button"
      onClick={() => openDrawer("cart")}
      aria-label={`Open online order with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: 2147482600 }}
      className="fixed bottom-24 right-5 flex min-h-14 items-center gap-3 rounded-full border border-[#C9A25B]/32 bg-black/78 px-3.5 py-2 text-[#F5F2EB] shadow-[0_26px_90px_-42px_rgba(201,162,91,0.82)] backdrop-blur-2xl transition hover:border-[#C9A25B]/65 hover:bg-[#120909] sm:right-6 md:bottom-28"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-[#C9A25B]">
        <ShoppingBag size={19} strokeWidth={1.8} />

        <AnimatePresence mode="popLayout">
          {cartCount > 0 ? (
            <motion.span
              key={cartCount}
              initial={{ opacity: 0, scale: 0.45, y: 7 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -5 }}
              transition={{ type: "spring", stiffness: 520, damping: 24 }}
              className="absolute -right-2 -top-2 flex min-h-6 min-w-6 items-center justify-center rounded-full border border-black/35 bg-[#C9A25B] px-1.5 text-[11px] font-semibold leading-none text-black"
            >
              {cartCount}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>

      <span className="hidden min-w-0 pr-1 text-left sm:block">
        <span className="block text-[9px] uppercase tracking-[0.26em] text-[#C9A25B]/78">
          Online order
        </span>
        <span className="mt-0.5 block font-serif text-lg leading-none text-white">
          {formatCurrency(totals.subtotalCents)}
        </span>
      </span>
    </motion.button>
  );
}
