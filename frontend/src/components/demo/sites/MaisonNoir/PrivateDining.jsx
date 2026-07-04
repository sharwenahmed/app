import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Users, Wine } from "lucide-react";

export default function PrivateDining() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section
      id="private"
      ref={ref}
      className="relative bg-[#060303] px-6 py-32 md:py-44 overflow-hidden border-t border-white/10"
    >
      <div className="absolute left-[-180px] top-20 w-[520px] h-[520px] rounded-full bg-[#4A1418]/25 blur-[150px]" />
      <div className="absolute right-[-180px] bottom-10 w-[520px] h-[520px] rounded-full bg-[#C9A25B]/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          style={reduce ? undefined : { y: textY }}
          className="max-w-5xl mb-20"
        >
          <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-6">
            Private Dining
          </p>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.86] tracking-tight">
            A room reserved
            <br />
            for the unforgettable.
          </h2>
        </motion.div>

        <div className="relative rounded-[2.75rem] overflow-hidden border border-white/10 min-h-[760px] shadow-[0_60px_140px_-70px_rgba(201,162,91,0.45)]">
          <motion.img
            src="/images/MaisonNoir/privateDining.webp"
            alt="Private dining room at Maison Noir"
            style={reduce ? undefined : { scale: imageScale, y: imageY }}
            className="absolute inset-0 w-full h-full object-cover opacity-90 will-change-transform"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

          <div className="relative z-10 min-h-[760px] p-8 md:p-12 lg:p-16 flex flex-col justify-end">
            <div className="max-w-xl">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="text-white/70 text-lg leading-relaxed"
              >
                Behind a velvet partition, Maison Noir hosts intimate dinners,
                business evenings, anniversaries, and tasting menus designed
                around the table.
              </motion.p>

              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6"
                >
                  <Users className="w-5 h-5 text-[#C9A25B] mb-4" />
                  <div className="font-serif text-5xl">14</div>
                  <p className="text-white/50 mt-2">
                    Seats in the private room
                  </p>
                </motion.div>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6"
                >
                  <Wine className="w-5 h-5 text-[#C9A25B] mb-4" />
                  <div className="font-serif text-5xl">120+</div>
                  <p className="text-white/50 mt-2">
                    Cellar-selected pairings
                  </p>
                </motion.div>
              </div>

              <motion.a
                href="#reserve"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#C9A25B] px-7 py-4 text-black font-medium hover:bg-[#e0bd73] hover:-translate-y-1 transition"
              >
                Request Private Room
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}