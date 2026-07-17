import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import OpeningArrivalGate from "./OpeningArrivalGate";
import SignatureMenu from "./SignatureMenu";
import FoodFilmRunway from "./FoodFilmRunway";
import Philosophy from "./Philosophy";
import ChefCraft from "./ChefCraft";
import PrivateDining from "./PrivateDining";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import Reservation from "./Reservation";
import Visit from "./Visit";
import Footer from "./Footer";
import FullMenu from "./FullMenu";
import SignatureToFullMenuTransition from "./SignatureToFullMenuTransition";
import ExperienceShell, { SceneChapter } from "./ExperienceShell";
import MaisonConcierge from "./MaisonConcierge";

const parsePrice = (price) => Number(String(price).replace(/[^0-9.]/g, "")) || 0;
const TAX_RATE = 0.14;
const formatCartCurrency = (amount) => `$${Number(amount || 0).toFixed(2)}`;

function FloatingCartButton({ count, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Open cart with ${count} item${count === 1 ? "" : "s"}`}
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{ zIndex: 2147483000 }}
      className="fixed bottom-[6.25rem] right-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A25B]/40 bg-black/78 text-[#C9A25B] shadow-[0_28px_90px_-38px_rgba(201,162,91,0.95)] backdrop-blur-2xl transition hover:bg-[#C9A25B] hover:text-black md:bottom-[6.75rem] md:right-6"
    >
      <ShoppingCart size={23} strokeWidth={1.8} />

      <AnimatePresence mode="popLayout">
        {count > 0 ? (
          <motion.span
            key={count}
            initial={{ opacity: 0, scale: 0.45, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -6 }}
            transition={{ type: "spring", stiffness: 520, damping: 24 }}
            className="absolute -right-1.5 -top-1.5 flex min-h-7 min-w-7 items-center justify-center rounded-full border border-black/40 bg-[#C9A25B] px-2 text-xs font-semibold leading-none text-black shadow-[0_12px_34px_-16px_rgba(201,162,91,0.95)]"
          >
            {count}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}

function CartDrawer({
  open,
  items,
  subtotal,
  onClose,
  onRemoveAll,
  onUpdateQuantity,
  onRemoveItem,
}) {
  const taxAmount = subtotal * TAX_RATE;
  const totalWithTaxes = subtotal + taxAmount;

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ zIndex: 2147483001 }}
            className="fixed inset-0 cursor-default bg-transparent"
          />

          <motion.aside
            initial={{ opacity: 0, x: 42, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 38, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 31 }}
            style={{ zIndex: 2147483002 }}
            className="fixed right-4 top-24 w-[min(calc(100vw-2rem),29rem)] overflow-hidden rounded-[1.5rem] border border-[#C9A25B]/28 bg-[#070504]/94 text-[#F5F2EB] shadow-[0_34px_120px_-42px_rgba(201,162,91,0.72)] backdrop-blur-2xl md:right-7"
          >
            <div className="flex items-start justify-between gap-5 border-b border-white/10 p-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-[#C9A25B]">
                  Your Cart
                </p>
                <h3 className="mt-2 font-serif text-3xl leading-none text-white">
                  Order summary
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 ? (
                  <button
                    type="button"
                    onClick={onRemoveAll}
                    className="rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/52 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
                  >
                    Remove all
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close cart"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/65 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {items.length > 0 ? (
              <div className="max-h-[min(42vh,23rem)] overflow-y-auto px-5 py-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-white/10 py-4 last:border-b-0"
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

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/42 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
                        >
                          <Trash2 size={15} strokeWidth={1.8} />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.035] p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white/62 transition hover:bg-white/10 hover:text-white"
                          >
                            <Minus size={14} strokeWidth={1.9} />
                          </button>

                          <span className="min-w-8 text-center text-sm text-white">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white/62 transition hover:bg-white/10 hover:text-white"
                          >
                            <Plus size={14} strokeWidth={1.9} />
                          </button>
                        </div>

                        <span className="font-serif text-2xl text-[#C9A25B]">
                          ${parsePrice(item.price) * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-8 text-sm leading-relaxed text-white/55">
                Your cart is empty. Add a dish from the full menu to begin an
                online order.
              </div>
            )}

            <div className="border-t border-white/10 p-5">
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.24em] text-white/46">
                    Before taxes
                  </span>
                  <span className="font-serif text-2xl text-white">
                    {formatCartCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs uppercase tracking-[0.24em] text-white/46">
                    Tax 14%
                  </span>
                  <span className="font-serif text-2xl text-white/72">
                    {formatCartCurrency(taxAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm uppercase tracking-[0.24em] text-white/58">
                    Total with taxes
                  </span>
                  <span className="font-serif text-3xl text-[#C9A25B]">
                    {formatCartCurrency(totalWithTaxes)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={items.length === 0}
                className="w-full rounded-full bg-[#C9A25B] px-6 py-3.5 text-base font-medium text-black transition hover:bg-[#d6b36d] disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/32"
              >
                Checkout / Order
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

const maisonNoirScenes = [
  {
    id: "top",
    number: "01",
    title: "Arrival",
    label: "Opening Scene",
    marker: "ARRIVAL",
    mood: "Black velvet / gold fire",
    accent: "rgba(201,162,91,0.55)",
    glowA: "rgba(201,162,91,0.18)",
    glowB: "rgba(255,112,42,0.14)",
    x: "50%",
    y: "20%",
  },
  {
    id: "menu",
    number: "02",
    title: "Signature",
    label: "Featured Plates",
    marker: "SIGNATURE",
    mood: "First taste / house icons",
    accent: "rgba(246,211,139,0.52)",
    glowA: "rgba(201,162,91,0.15)",
    glowB: "rgba(255,146,72,0.12)",
    x: "20%",
    y: "62%",
  },
  {
    id: "full-menu",
    number: "03",
    title: "Course Theater",
    label: "Full Menu",
    marker: "COURSES",
    mood: "Guided route / fire / cellar",
    accent: "rgba(201,162,91,0.62)",
    glowA: "rgba(255,92,38,0.15)",
    glowB: "rgba(201,162,91,0.16)",
    x: "78%",
    y: "56%",
  },
  {
    id: "story",
    number: "04",
    title: "Philosophy",
    label: "The Room",
    marker: "ROOM",
    mood: "Restraint / patience / atmosphere",
    accent: "rgba(201,162,91,0.48)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.06)",
    x: "36%",
    y: "44%",
  },
  {
    id: "chef",
    number: "05",
    title: "Craft",
    label: "Open Flame",
    marker: "FIRE",
    mood: "Knife / ember / precision",
    accent: "rgba(255,105,42,0.58)",
    glowA: "rgba(255,92,38,0.18)",
    glowB: "rgba(201,162,91,0.12)",
    x: "80%",
    y: "36%",
  },
  {
    id: "private",
    number: "06",
    title: "Private Dining",
    label: "The Cellar",
    marker: "CELLAR",
    mood: "Closed room / gold service",
    accent: "rgba(201,162,91,0.58)",
    glowA: "rgba(201,162,91,0.14)",
    glowB: "rgba(85,46,26,0.2)",
    x: "24%",
    y: "72%",
  },
  {
    id: "gallery",
    number: "07",
    title: "Gallery",
    label: "Visual Proof",
    marker: "DETAILS",
    mood: "Texture / smoke / glass",
    accent: "rgba(246,211,139,0.48)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.07)",
    x: "62%",
    y: "48%",
  },
  {
    id: "testimonials",
    number: "08",
    title: "Proof",
    label: "Guest Response",
    marker: "PROOF",
    mood: "Reputation / trust / memory",
    accent: "rgba(201,162,91,0.5)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.05)",
    x: "34%",
    y: "66%",
  },
  {
    id: "reserve",
    number: "09",
    title: "Reserve",
    label: "Book the Evening",
    marker: "RESERVE",
    mood: "Table held / room prepared",
    accent: "rgba(201,162,91,0.7)",
    glowA: "rgba(201,162,91,0.2)",
    glowB: "rgba(255,112,42,0.12)",
    x: "50%",
    y: "70%",
  },
  {
    id: "visit",
    number: "10",
    title: "Visit",
    label: "Final Details",
    marker: "VISIT",
    mood: "Address / hours / arrival",
    accent: "rgba(201,162,91,0.46)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.05)",
    x: "72%",
    y: "32%",
  },
];

export default function MaisonNoir() {
  const pageRef = useRef(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartLayerMounted, setCartLayerMounted] = useState(false);
  const [floatingControlsVisible, setFloatingControlsVisible] = useState(true);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + parsePrice(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const addToCart = ({ category, item }) => {
    const [name, price, description, image] = item;
    const id = `${category}-${name}`;

    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === id);

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [
        ...prev,
        {
          id,
          category,
          name,
          price,
          description,
          image,
          quantity: 1,
        },
      ];
    });
  };

  const updateCartQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];

        const quantity = item.quantity + change;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      })
    );
  };

  const removeCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAllCartItems = () => {
    setCartItems([]);
  };

  useEffect(() => {
    setCartLayerMounted(true);
  }, []);

  useEffect(() => {
    let rafId = null;

    const updateFloatingControls = () => {
      rafId = null;

      const page = pageRef.current;
      if (!page) return;

      const rect = page.getBoundingClientRect();
      const controlLine = window.innerHeight - 24;
      const nextVisible = rect.top < controlLine && rect.bottom > controlLine;

      setFloatingControlsVisible(nextVisible);
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateFloatingControls);
    };

    updateFloatingControls();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!floatingControlsVisible) {
      setCartOpen(false);
    }
  }, [floatingControlsVisible]);

  return (
    <main
      ref={pageRef}
      className="relative bg-[#050505] text-[#F5F2EB] selection:bg-[#C9A25B] selection:text-black"
    >
      <ExperienceShell scenes={maisonNoirScenes}>
        <div
          className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
        <div className="pointer-events-none fixed inset-0 z-[59] bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,91,0.08),transparent_35%)]" />

        <OpeningArrivalGate />

        <SceneChapter sceneId="top">
          <Hero />
        </SceneChapter>

        <SceneChapter sceneId="menu">
          <SignatureMenu />

          <FoodFilmRunway />
        </SceneChapter>

        <SignatureToFullMenuTransition />

        <SceneChapter sceneId="full-menu">
          <FullMenu onAddToCart={addToCart} />
        </SceneChapter>
        <SceneChapter sceneId="story">
          <Philosophy />
        </SceneChapter>

        <SceneChapter sceneId="chef">
          <ChefCraft />
        </SceneChapter>

        <SceneChapter sceneId="private">
          <PrivateDining />
        </SceneChapter>

        <SceneChapter sceneId="gallery">
          <Gallery />
        </SceneChapter>

        <SceneChapter sceneId="testimonials">
          <Testimonials />
        </SceneChapter>

        <SceneChapter sceneId="reserve">
          <Reservation />
        </SceneChapter>

        <SceneChapter sceneId="visit">
          <Visit />
        </SceneChapter>

        <Footer />
      </ExperienceShell>

      <MaisonConcierge visible={floatingControlsVisible} />

      {cartLayerMounted
        ? createPortal(
            <>
              <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
              {floatingControlsVisible ? (
                <FloatingCartButton count={cartCount} onClick={() => setCartOpen(true)} />
              ) : null}
              <CartDrawer
                open={cartOpen}
                items={cartItems}
                subtotal={cartSubtotal}
                onClose={() => setCartOpen(false)}
                onRemoveAll={removeAllCartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeCartItem}
              />
            </>,
            document.body
          )
        : null}
    </main>
  );
}
