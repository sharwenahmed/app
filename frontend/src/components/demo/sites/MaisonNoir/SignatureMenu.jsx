import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const dishes = [
  {
    number: "01",
    name: "45 Day Dry-Aged Ribeye",
    short: "Ribeye",
    price: "$68",
    description:
      "Prime ribeye aged in-house, finished over open flame, served with smoked marrow butter and sea salt.",
    image: "/images/MaisonNoir/ribeye.webp",
  },
  {
    number: "02",
    name: "Black Truffle Filet",
    short: "Filet",
    price: "$74",
    description:
      "Center-cut filet with pommes purée, black truffle jus, and charred seasonal greens.",
    image: "/images/MaisonNoir/fillet.webp",
  },
  {
    number: "03",
    name: "A5 Japanese Wagyu",
    short: "Wagyu",
    price: "$128",
    description:
      "Exquisitely marbled A5 wagyu, grilled over binchotan charcoal and finished with smoked sea salt.",
    image: "/images/MaisonNoir/wagyu.webp",
  },
];

export default function SignatureMenu() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const dish = dishes[active];

  return (
    <section
      id="menu"
      className="relative min-h-screen bg-[#070504] px-6 py-32 md:py-44 border-t border-white/10 overflow-hidden"
    >
     <div className="hidden md:block absolute top-[-220px] right-[-120px] w-[560px] h-[560px] rounded-full bg-[#4A1418]/30 blur-[150px]" />

<div className="hidden md:block absolute bottom-[-240px] left-[-160px] w-[560px] h-[560px] rounded-full bg-[#C9A25B]/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
          <div className="max-w-4xl">
            <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-5">
              Signature Experience
            </p>

            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tight">
              The menu does not shout.
              <br />
              It smolders.
            </h2>
          </div>

          <p className="text-white/55 text-lg max-w-sm leading-relaxed">
            Three house signatures. Each built around patience, fire, and the
            quiet confidence of premium ingredients.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={dish.name}
                initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? {} : { opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.45 }}
              >
                <div className="text-[#C9A25B]/70 tracking-[0.4em] uppercase text-xs mb-8">
                  {dish.number} / 03
                </div>

                <h3 className="font-serif text-6xl md:text-8xl leading-[0.85] tracking-tight">
                  {dish.short}
                </h3>

                <div className="mt-8 flex items-start justify-between gap-8 border-t border-white/10 pt-8">
                  <div>
                    <h4 className="font-serif text-3xl">{dish.name}</h4>
                    <p className="mt-4 text-white/55 leading-relaxed max-w-md">
                      {dish.description}
                    </p>
                  </div>

                  <motion.div
                    key={dish.price}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={reduce ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="font-serif text-4xl text-[#C9A25B]"
                  >
                    {dish.price}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap gap-3">
              {dishes.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setActive(index)}
                  className={`rounded-full px-5 py-3 text-sm transition-all duration-300 ${
                    active === index
                      ? "bg-[#C9A25B] text-black shadow-[0_18px_45px_-20px_rgba(201,162,91,0.9)]"
                      : "border border-white/10 text-white/60 hover:text-white hover:border-[#C9A25B]/50 hover:-translate-y-0.5"
                  }`}
                >
                  {item.short}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_50px_140px_-65px_rgba(201,162,91,0.55)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={dish.image}
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  decoding="async"
                  initial={reduce ? false : { opacity: 0, scale: 1.08, filter: "blur(10px)" }}
                  animate={reduce ? {} : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={reduce ? {} : { opacity: 0, scale: 1.03, filter: "blur(8px)" }}
                  transition={{ duration: 0.65 }}
                  className="aspect-[16/11] w-full object-cover opacity-95"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-6">
                <div className="rounded-full border border-white/10 bg-black/50 backdrop-blur-xl px-5 py-3 text-sm text-white/70">
                  House signature · Open flame
                </div>

                <a
                  href="#reserve"
                  className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#C9A25B] px-5 py-3 text-sm text-black font-medium hover:bg-[#e0bd73] hover:-translate-y-1 transition"
                >
                  Reserve
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-white/45 max-w-xl">
            A full seasonal menu, wine pairings, and private tasting options are
            available for an elevated evening.
          </p>

          <a
            href="#reserve"
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/40 px-6 py-3.5 text-[#C9A25B] hover:bg-[#C9A25B] hover:text-black hover:-translate-y-1 transition"
          >
            View Reservation Options
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}