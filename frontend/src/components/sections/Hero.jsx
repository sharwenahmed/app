import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles, Check } from "lucide-react";
import { HOME } from "@/constants/testIds";
import { DEMOS } from "@/data/demos";
import DesktopMockup from "@/components/mockups/DesktopMockup";
import MobileMockup from "@/components/mockups/MobileMockup";
import MagneticButton from "@/components/motion/MagneticButton";
import TiltCard from "@/components/motion/TiltCard";
import SplitWords from "@/components/motion/SplitWords";

const CRED_CHIPS = [
  "Halifax-Based Studio",
  "Mobile-First Design",
  "Conversion Focused",
  "SEO Ready",
];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  const featureDemo = DEMOS.restaurants[0];
  const mobileDemo = DEMOS.barbers[0];

  const goTo = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goMockup = () => {
    goTo("#contact");
    setTimeout(
      () => window.dispatchEvent(new CustomEvent("a-designs:prefill-mockup")),
      600
    );
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] pt-24 sm:pt-28 lg:pt-32 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="aurora aurora-purple top-[-220px] left-[-180px] w-[620px] h-[620px]" />
      <div className="aurora aurora-violet top-[120px] right-[-220px] w-[560px] h-[560px] opacity-55" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full chrome-pill text-[11px] tracking-wide text-white/85"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Halifax web design studio · taking on local businesses</span>
            </motion.div>

            <motion.div className="mt-8" data-testid={HOME.heroHeadline}>
              <h1 className="font-display text-[clamp(3rem,5.2vw,5.8rem)] font-medium text-white leading-[0.94] tracking-tight">
                <SplitWords text="Websites that make" duration={0.85} stagger={0.05} />
                <br />
                <SplitWords
                  text="your business look"
                  duration={0.85}
                  stagger={0.05}
                  delay={0.18}
                />
                <br />
                <SplitWords text="like" duration={0.85} stagger={0.05} delay={0.3} />
                <br />
                <span className="text-gradient-purple inline-block">
                  the best in town.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-8 text-base sm:text-lg text-white/70 leading-[1.55] max-w-[44ch]"
            >
              We design modern, conversion-focused websites that help Halifax
              and Nova Scotia businesses attract more customers, build instant
              trust, and outclass competitors stuck on outdated sites.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78 }}
              className="mt-7 flex flex-col sm:flex-row gap-3"
            >
              <MagneticButton
                onClick={goMockup}
                data-testid={HOME.heroCtaConsult}
                className="group px-7 py-4 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_28px_60px_-18px_rgba(147,51,234,0.7)] hover:shadow-[0_36px_80px_-15px_rgba(147,51,234,0.9)] transition-shadow sheen"
              >
                Get A Free Website Mockup
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => goTo("#work")}
                data-testid={HOME.heroCtaDemoGallery}
                strength={0.22}
                className="group px-7 py-4 rounded-full text-sm font-medium text-white glass hover:bg-white/10 transition-colors"
              >
                View Demo Gallery
                <ArrowDown className="w-4 h-4 -rotate-45 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="mt-6 hero-chips-mask overflow-hidden"
            >
              <div className="hero-chips-track">
                {[...CRED_CHIPS, ...CRED_CHIPS].map((c, index) => (
                  <span
                    key={`${c}-${index}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full chrome-pill text-[11px] text-white/75 shrink-0"
                  >
                    <Check className="w-3 h-3 text-purple-300" />
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              style={reduce ? undefined : { y: mockupY, scale: mockupScale }}
              className="relative will-change-transform"
            >
              <TiltCard intensity={3} className="rounded-3xl">
                <div className="ring-aurora rounded-2xl">
                  <DesktopMockup demo={featureDemo} />
                </div>
              </TiltCard>

              <div className="hidden sm:block absolute -bottom-5 -right-4 w-20 lg:w-24 pointer-events-none">
                <MobileMockup demo={mobileDemo} />
              </div>

              <div className="hidden sm:block absolute -top-6 -left-5 chrome-pill rounded-2xl p-3.5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-9 h-9 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 items-center justify-center text-purple-200">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-eyebrow text-white/55">
                      Premium concepts
                    </div>
                    <div className="text-sm font-medium text-white">
                      Designed in Halifax
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-5 right-4 chrome-pill rounded-full px-3.5 py-2 text-xs text-white/85 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                Concept preview
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
