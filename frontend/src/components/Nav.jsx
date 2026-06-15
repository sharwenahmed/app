import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Instagram } from "lucide-react";
import { HOME } from "@/constants/testIds";

const NAV_LINKS = [
  { id: "work", label: "Work", testId: HOME.navLinkWork, href: "#work" },
  { id: "services", label: "Services", testId: HOME.navLinkServices, href: "#services" },
  { id: "pricing", label: "Pricing", testId: HOME.navLinkPricing, href: "#pricing" },
  { id: "about", label: "About", testId: HOME.navLinkAbout, href: "#about" },
  { id: "contact", label: "Contact", testId: HOME.navLinkContact, href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleNav = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  const handleConsult = (e) => {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("a-designs:prefill-consult"));
    }, 600);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`flex items-center justify-between rounded-full px-3 sm:px-5 py-2.5 transition-all duration-500 ${
              scrolled ? "glass-strong" : "glass"
            }`}
          >
            <Link
              to="/"
              data-testid={HOME.navBrand}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/5 transition-colors"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <span className="relative inline-flex w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_24px_rgba(168,85,247,0.55)]" aria-hidden="true">
                <span className="absolute inset-[3px] rounded-md bg-black/60 backdrop-blur-sm grid place-items-center text-[10px] font-bold tracking-tight text-white">
                  A
                </span>
              </span>
              <span className="font-display text-base sm:text-lg font-medium tracking-tight">
                A-Designs
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  data-testid={l.testId}
                  onClick={(e) => handleNav(e, l.href)}
                  className="px-3 py-1.5 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="tel:+19029894072"
                data-testid={HOME.navPhone}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                902-989-4072
              </a>
              <a
                href="https://www.instagram.com/adesignshalifax/"
                target="_blank"
                rel="noreferrer"
                data-testid={HOME.navInstagram}
                aria-label="Instagram"
                className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={handleConsult}
                data-testid={HOME.navCtaConsult}
                className="relative group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_10px_30px_-10px_rgba(147,51,234,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(147,51,234,0.8)] transition-all"
              >
                <span>Book Consult</span>
              </button>
              <button
                onClick={() => setOpen((v) => !v)}
                data-testid={HOME.navMobileToggle}
                aria-label="Menu"
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-x-4 top-[68px] z-40 glass-strong rounded-3xl p-3"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  data-testid={`${l.testId}-mobile`}
                  onClick={(e) => handleNav(e, l.href)}
                  className="px-4 py-3 text-base text-white/85 hover:text-white border-b border-white/5 last:border-b-0"
                >
                  {l.label}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-2 p-2 mt-1">
                <a
                  href="tel:+19029894072"
                  className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-sm bg-white/5 text-white/85"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href="https://www.instagram.com/adesignshalifax/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-sm bg-white/5 text-white/85"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
