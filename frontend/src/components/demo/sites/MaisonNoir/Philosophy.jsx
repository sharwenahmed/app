import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Philosophy() {
  const reduce = useReducedMotion();

  return (
    <section
      id="story"
      className="relative bg-[#050505] px-6 py-32 md:py-44 overflow-hidden border-t border-white/10"
    >
      <div className="absolute left-[-160px] top-1/3 w-[420px] h-[420px] rounded-full bg-[#4A1418]/20 blur-[120px]" />
      <div className="absolute right-[-160px] bottom-0 w-[420px] h-[420px] rounded-full bg-[#C9A25B]/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-6">
            Our Philosophy
          </p>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tight">
            Not every steak
            <br />
            deserves a fire.
          </h2>

          <p className="mt-8 font-serif text-3xl md:text-4xl leading-tight text-[#C9A25B]">
            Some deserve patience.
          </p>

          <div className="mt-10 space-y-5 text-white/58 text-lg leading-relaxed max-w-xl">
            <p>
              Cuts are selected with intention, aged in-house, and brought to
              flame only when they are ready.
            </p>

            <p>
              Craft takes time. Fire takes patience. The evening remembers both.
            </p>
          </div>

          <a
            href="#private"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/40 px-6 py-3.5 text-[#C9A25B] hover:bg-[#C9A25B] hover:text-black hover:-translate-y-1 transition"
          >
            Explore Private Dining
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 48, scale: 0.98 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="lg:col-span-6"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_40px_120px_-50px_rgba(201,162,91,0.35)]">
            <img
              src="/images/MaisonNoir/interior.webp"
              alt="Maison Noir dining room"
              className="w-full aspect-[4/5] object-cover opacity-85 hover:scale-105 transition duration-[1200ms]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6">
                <p className="text-[#C9A25B] tracking-[0.28em] uppercase text-[10px] mb-3">
                  Evening Ritual
                </p>

                <p className="font-serif text-2xl md:text-3xl leading-tight">
                  Quiet conversations, dark wine, and celebrations that do not
                  need to announce themselves.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}