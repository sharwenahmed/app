import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <motion.img
  src="/images/MaisonNoir/hero.webp"
  loading="eager"
  fetchPriority="high"
  decoding="async"
        alt="Luxury steak dinner at Maison Noir"
        style={reduce ? undefined : { scale: imageScale }}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/55" />

      <motion.div
        style={reduce ? undefined : { y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 min-h-[100svh] flex items-center"
      >
        <div className="w-full max-w-3xl pt-28 pb-16">
          <p className="text-[#C9A25B] tracking-[0.28em] sm:tracking-[0.35em] uppercase text-[10px] sm:text-xs mb-5">
            Dry-aged steakhouse · Downtown Halifax
          </p>

          <h1 className="font-serif text-[3.6rem] sm:text-[4.8rem] md:text-[6rem] lg:text-[7.25rem] leading-[0.9] tracking-tight max-w-full">
            An evening
            <br />
            cut from
            <br />
            prime.
          </h1>

          <p className="mt-7 text-base sm:text-lg md:text-xl text-white/65 max-w-xl leading-relaxed">
            A cinematic dining experience built around hand-selected cuts,
            private cellars, slow fire, and evenings worth remembering.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#reserve"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A25B] px-7 py-4 text-black font-medium hover:bg-[#e0bd73] transition"
            >
              Reserve Table
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#menu"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-white/80 hover:bg-white/10 transition"
            >
              Explore Menu
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg border-t border-white/10 pt-6">
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#C9A25B]">
                45
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/45">
                Day aged
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#C9A25B]">
                12
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/45">
                Wagyu cuts
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#C9A25B]">
                4.9
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/45">
                Guest rating
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}