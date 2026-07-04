import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Story", href: "#philosophy" },
  { label: "Private Dining", href: "#private" },
  { label: "Reserve", href: "#reserve" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4"
            : "py-7"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 transition-all duration-500 rounded-full ${
            scrolled
              ? "bg-black/45 backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between h-20">

            {/* Logo */}

            <a
              href="#top"
              className="font-serif text-3xl tracking-tight text-[#F5F2EB]"
            >
              Maison Noir
            </a>

            {/* Desktop */}

            <nav className="hidden lg:flex items-center gap-10">

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative uppercase tracking-[0.18em] text-[12px] text-white/70 hover:text-white transition"
                >
                  {link.label}

                  <span className="absolute left-0 -bottom-2 h-px w-0 bg-[#C9A25B] transition-all duration-300 group-hover:w-full" />

                </a>
              ))}

            </nav>

            {/* Button */}

            <a
              href="#reserve"
              className="hidden lg:inline-flex items-center rounded-full bg-[#C9A25B] px-6 py-3 text-black font-medium hover:scale-105 transition"
            >
              Reserve
            </a>

            {/* Mobile */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

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
        className="fixed top-24 left-6 right-6 overflow-hidden rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 z-40 lg:hidden"
      >
        <div className="p-8 space-y-6">

          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
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