import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, ShoppingCart, X } from "lucide-react";

const links = [
  { label: "Story", href: "#story" },
  { label: "Private Dining", href: "#private" },
  { label: "Reserve", href: "#reserve" },
];

const menuCategories = [
  { label: "Starters", href: "#menu-starters" },
  { label: "Steaks", href: "#menu-steaks" },
  { label: "Seafood", href: "#menu-seafood" },
  { label: "Sides", href: "#menu-sides" },
  { label: "Desserts", href: "#menu-desserts" },
  { label: "Cocktails", href: "#menu-cocktails" },
];

function CartControl({ count, onClick }) {
  const hasItems = count > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}
      className="group relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white/75 shadow-[0_16px_55px_-34px_rgba(201,162,91,0.85)] backdrop-blur-xl transition hover:border-[#C9A25B]/55 hover:bg-[#C9A25B] hover:text-black lg:h-[3.05rem] lg:w-[3.05rem]"
    >
      <ShoppingCart
        size={19}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />

      <AnimatePresence mode="popLayout">
        {hasItems ? (
          <motion.span
            key={count}
            initial={{ opacity: 0, scale: 0.45, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -6 }}
            transition={{ type: "spring", stiffness: 520, damping: 24 }}
            className="absolute -right-2 -top-2 flex min-h-6 min-w-6 items-center justify-center rounded-full border border-black/35 bg-[#C9A25B] px-1.5 text-[11px] font-semibold leading-none text-black shadow-[0_12px_34px_-16px_rgba(201,162,91,0.95)]"
          >
            {count}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar({ cartCount = 0, onCartOpen = () => {} }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeOnOutsidePress = (event) => {
      if (!menuRef.current || menuRef.current.contains(event.target)) return;
      setMenuOpen(false);
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 2147482000 }}
        className="fixed left-0 right-0 top-0 py-4 transition-all duration-500"
      >
        <div className="mx-4 rounded-full border border-white/10 bg-black/45 px-5 shadow-2xl backdrop-blur-xl transition-all duration-500 md:mx-6 md:px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}

            <a
              href="#top"
              className="font-serif text-3xl tracking-tight text-[#F5F2EB]"
            >
              Maison Noir
            </a>

            {/* Desktop */}

            <nav className="hidden items-center gap-10 lg:flex">
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-expanded={menuOpen}
                  aria-controls="maison-noir-menu-categories"
                  className="group relative inline-flex items-center gap-1.5 uppercase tracking-[0.18em] text-[12px] text-white/70 transition hover:text-white"
                >
                  Menu
                  <ChevronDown
                    size={14}
                    strokeWidth={1.8}
                    className={`transition-transform duration-300 ${
                      menuOpen ? "rotate-180 text-[#C9A25B]" : ""
                    }`}
                  />

                  <span className="absolute left-0 -bottom-2 h-px w-0 bg-[#C9A25B] transition-all duration-300 group-hover:w-full" />
                </button>

                <AnimatePresence>
                  {menuOpen ? (
                    <motion.div
                      id="maison-noir-menu-categories"
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-9 w-64 -translate-x-1/2 overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/[0.86] p-2 shadow-[0_30px_90px_-40px_rgba(201,162,91,0.72)] backdrop-blur-2xl"
                    >
                      {menuCategories.map((category) => (
                        <a
                          key={category.label}
                          href={category.href}
                          onClick={closeMenus}
                          className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-white/68 transition hover:bg-[#C9A25B] hover:text-black"
                        >
                          <span>{category.label}</span>
                          <span className="text-[10px] uppercase tracking-[0.24em] opacity-60">
                            Course
                          </span>
                        </a>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenus}
                  className="group relative uppercase tracking-[0.18em] text-[12px] text-white/70 hover:text-white transition"
                >
                  {link.label}

                  <span className="absolute left-0 -bottom-2 h-px w-0 bg-[#C9A25B] transition-all duration-300 group-hover:w-full" />

                </a>
              ))}

            </nav>

            <div className="flex items-center gap-3">
              <CartControl count={cartCount} onClick={onCartOpen} />

              <a
                href="#reserve"
                className="hidden items-center rounded-full bg-[#C9A25B] px-6 py-3 text-black font-medium transition hover:scale-105 lg:inline-flex"
              >
                Reserve
              </a>

              {/* Mobile */}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}

      <motion.div
        initial={false}
        animate={{
          height: mobileOpen ? "auto" : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        style={{ zIndex: 2147481999 }}
        className="fixed left-6 right-6 top-24 overflow-hidden rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl lg:hidden"
      >
        <div className="p-8 space-y-6">

          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#C9A25B]">
              Menu
            </p>
            <div className="grid grid-cols-2 gap-2">
              {menuCategories.map((category) => (
                <a
                  key={category.label}
                  href={category.href}
                  onClick={closeMenus}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/76 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
                >
                  {category.label}
                </a>
              ))}
            </div>
          </div>

          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenus}
              className="block text-white/80 text-lg"
            >
              {link.label}
            </a>
          ))}

        </div>
      </motion.div>
    </>
  );
}
