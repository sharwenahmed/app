import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, Star, Sparkles } from "lucide-react";
import { HOME } from "@/constants/testIds";
import { DEMOS } from "@/data/demos";
import DesktopMockup from "@/components/mockups/DesktopMockup";
import MobileMockup from "@/components/mockups/MobileMockup";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const move = (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const goTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const featureDemo = DEMOS.restaurants[0];
  const mobileDemo = DEMOS.barbers[0];

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={{
        backgroundImage:
          "radial-gradient(600px 400px at var(--mx,50%) var(--my,30%), rgba(147,51,234,0.18), transparent 60%)",
      }}
    >
      {/* aurora orbs */}
      <div className="aurora aurora-purple top-[-160px] left-[-120px] w-[520px] h-[520px]" />
      <div className="aurora aurora-violet top-[180px] right-[-160px] w-[460px] h-[460px] opacity-50" />
      <div className="aurora aurora-indigo bottom-[-180px] left-[20%] w-[420px] h-[420px] opacity-40" />
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/80"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="tracking-wide">Halifax-based web design studio</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-white/55 pl-2 border-l border-white/10 ml-1">
            <Star className="w-3 h-3 fill-amber-300 text-amber-300" /> 4.9 client rating
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mt-8 items-center">
          <div className="lg:col-span-7">
            <motion.h1
              data-testid={HOME.heroHeadline}
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[2.6rem] sm:text-6xl lg:text-[5.2rem] font-medium tracking-tighter leading-[0.95]"
            >
              Websites that make your business{" "}
              <span className="text-gradient-purple">look like the best in town.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed max-w-2xl"
            >
              We design modern, conversion-focused websites that help local
              businesses attract more customers, build instant trust, and stand
              out from competitors with outdated sites.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => goTo("#work")}
                data-testid={HOME.heroCtaDemoGallery}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_20px_50px_-15px_rgba(147,51,234,0.7)] hover:shadow-[0_28px_60px_-12px_rgba(147,51,234,0.85)] transition-all"
              >
                View Demo Gallery
                <ArrowDown className="w-4 h-4 -rotate-45" />
              </button>
              <button
                onClick={() => {
                  goTo("#contact");
                  setTimeout(
                    () => window.dispatchEvent(new CustomEvent("a-designs:prefill-consult")),
                    600
                  );
                }}
                data-testid={HOME.heroCtaConsult}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white glass hover:bg-white/10 transition-colors"
              >
                Book Free Consultation
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex items-center gap-5 text-white/55"
            >
              <div className="flex -space-x-2">
                {["#A78BFA", "#F0ABFC", "#FACC15", "#67E8F9"].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block w-7 h-7 rounded-full border border-black/40"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="text-xs">
                <div className="text-white/85 font-medium">Trusted by local businesses</div>
                <div className="opacity-80">Restaurants · Salons · Trades</div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div style={{ y: y1 }} className="relative">
              <DesktopMockup demo={featureDemo} />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-10 -left-6 sm:left-2 w-32 sm:w-40 float-med"
            >
              <MobileMockup demo={mobileDemo} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-4 -right-2 sm:-right-4 w-40 sm:w-48 float-slow"
            >
              <div className="glass rounded-2xl p-3 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] tracking-eyebrow text-purple-300">Live preview</div>
                  <span className="text-[9px] text-emerald-300">● live</span>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="h-2 w-2/3 rounded-full bg-white/15" />
                  <div className="h-2 w-1/2 rounded-full bg-white/10" />
                  <div className="h-2 w-3/4 rounded-full bg-white/10" />
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px]">
                  <span className="text-white/55">Bookings</span>
                  <span className="text-emerald-300 font-medium">+38%</span>
                </div>
              </div>
            </motion.div>

            {/* tiny floating UI badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="absolute bottom-12 -right-3 sm:right-6 glass rounded-2xl px-3 py-2 text-xs text-white/80 float-fast"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                <span>+38% bookings (avg.)</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="hidden sm:flex items-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-eyebrow text-white/45"
        >
          <ArrowDown className="w-3 h-3 animate-bounce" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
