import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1.48, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.18]);
  const steakGlowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[118svh] overflow-hidden bg-[#050302]"
    >
      <motion.div
        style={reduce ? undefined : { scale: heroScale, y: heroY }}
        animate={
          reduce
            ? {}
            : {
              y: [0, -8, 0],
              rotate: [0, -0.45, 0.25, 0],
            }
        }
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 origin-bottom"
      >
        <motion.img
          src="/images/MaisonNoir/hero.webp"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt="Luxury steak dinner at Maison Noir"
          className="absolute inset-0 w-full h-full object-cover object-[55%_64%] opacity-100"
        />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { opacity: steakGlowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_66%,rgba(255,176,74,0.42),transparent_38%)]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_32%,rgba(201,162,91,0.20),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(255,122,40,0.22),transparent_32%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/88 via-black/38 to-[#050302]/70" />
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black via-black/30 to-transparent blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/76 via-black/12 to-black/66" />
      <div className="absolute inset-0 shadow-[inset_0_0_130px_rgba(0,0,0,0.94)]" />

      <motion.div
        className="absolute left-[10%] top-[26%] h-32 w-32 rounded-full bg-[#C9A25B]/22 blur-3xl"
        animate={
          reduce
            ? {}
            : {
              x: [0, 18, -10, 0],
              y: [0, -12, 10, 0],
              opacity: [0.25, 0.58, 0.35, 0.25],
            }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[8%] top-[44%] h-40 w-40 rounded-full bg-orange-500/18 blur-3xl"
        animate={
          reduce
            ? {}
            : {
              x: [0, -16, 10, 0],
              y: [0, 14, -8, 0],
              opacity: [0.22, 0.5, 0.3, 0.22],
            }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute left-[-25%] top-[42%] h-80 w-[150%] rotate-[-13deg] bg-gradient-to-r from-transparent via-[#FFD27A]/14 to-transparent blur-xl"
        initial={reduce ? false : { x: "-120%", opacity: 0 }}
        animate={reduce ? {} : { x: "120%", opacity: [0, 1, 0] }}
        transition={{ duration: 3, delay: 1.1, ease: "easeInOut" }}
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 min-h-[100svh] px-5 sm:px-6 flex flex-col items-center justify-start pt-32 sm:pt-40 text-center"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#C9A25B] tracking-[0.52em] uppercase text-[11px] sm:text-xs mb-7"
        >
          Maison Noir
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-[4.15rem] min-[390px]:text-[4.85rem] sm:text-[6.5rem] lg:text-[8.5rem] leading-[0.84] tracking-tight max-w-5xl"
        >
          Maison
          <br className="sm:hidden" /> Noir
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-6 text-white/82 tracking-[0.18em] uppercase text-xs sm:text-sm max-w-2xl"
        >
          An unforgettable steakhouse experience.
        </motion.p>

        <motion.a
          href="#reserve"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="group mt-9 inline-flex items-center justify-center gap-3 rounded-full border border-[#C9A25B]/70 bg-black/35 px-8 py-4 text-[#C9A25B] backdrop-blur-md shadow-[0_0_55px_-22px_rgba(201,162,91,1)] hover:bg-[#C9A25B] hover:text-black hover:shadow-[0_0_70px_-16px_rgba(201,162,91,1)] hover:-translate-y-1 transition-all duration-300"
        >
          Reserve Your Table
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-7 flex flex-row flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm text-white/72"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-[#C9A25B] text-[#C9A25B]" />
            4.9 Rating
          </span>

          <span className="text-[#C9A25B]/45">•</span>

          <span>2,000+ Guests</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-9 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-[#C9A25B]">
        <motion.div
          animate={reduce ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
        <span className="text-[9px] tracking-[0.35em] uppercase text-white/45">
          Scroll
        </span>
      </div>
    </section>
  );
}