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

const PROOF_LOGOS = [
  "Halifax Restaurants",
  "Nova Scotia Cafes",
  "HRM Barbershops",
  "Maritime Salons",
  "East-Coast Roofers",
  "Atlantic Cleaning Co.",
];

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
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const float1Y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const float2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const float3Y = useTransform(scrollYProgress, [0, 1], [0, -160]);

  const featureDemo = DEMOS.restaurants[0];
  const mobileDemo = DEMOS.barbers[0];

  const goTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      className="relative min-h-[110vh] pt-40 sm:pt-52 lg:pt-60 pb-32 sm:pb-44 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="aurora aurora-purple top-[-200px] left-[-160px] w-[640px] h-[640px]" />
      <div className="aurora aurora-violet top-[120px] right-[-200px] w-[560px] h-[560px] opacity-55" />
      <div className="aurora aurora-indigo bottom-[-220px] left-[18%] w-[520px] h-[520px] opacity-45" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Eyebrow */}
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

        {/* Headline */}
        <motion.div
          style={reduce ? undefined : { y: headlineY, opacity: headlineOpacity }}
          className="mt-12 sm:mt-16 max-w-[1280px]"
          data-testid={HOME.heroHeadline}
        >
          <h1 className="font-display text-display-xl font-medium text-white">
            <SplitWords text="Websites that make" duration={0.85} stagger={0.05} />
            <br />
            <SplitWords
              text="your business look like"
              duration={0.85}
              stagger={0.05}
              delay={0.18}
            />
            <br />
            <span className="text-gradient-purple inline-block">
              <SplitWords
                text="the best in town."
                duration={0.9}
                stagger={0.05}
                delay={0.38}
              />
            </span>
          </h1>
        </motion.div>

        {/* Sub + CTAs */}
        <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-16 mt-14 sm:mt-20 items-start">
          <div className="lg:col-span-5 lg:pt-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="text-lg sm:text-xl text-white/70 leading-[1.55] max-w-[42ch]"
            >
              We design modern, conversion-focused websites that help Halifax
              and Nova Scotia businesses attract more customers, build instant
              trust, and outclass competitors stuck on outdated sites.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
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

            {/* Credibility chips (no fake metrics) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="mt-12 flex flex-wrap gap-2"
            >
              {CRED_CHIPS.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full chrome-pill text-[11px] text-white/75"
                >
                  <Check className="w-3 h-3 text-purple-300" />
                  {c}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Featured mockup column */}
          <div className="lg:col-span-7 relative min-h-[500px]">
            <motion.div
              style={
                reduce
                  ? undefined
                  : { y: mockupY, scale: mockupScale, rotate: mockupRotate }
              }
              className="relative will-change-transform"
            >
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pr-0 sm:pr-20 lg:pr-24"
              >
                <TiltCard intensity={5} className="rounded-3xl">
                  <div className="ring-aurora rounded-2xl">
                    <DesktopMockup demo={featureDemo} />
                  </div>
                </TiltCard>

                {/* Floating mobile mockup — sits in the reserved right gutter
                    so it never overlaps content inside the desktop preview.
                    Hidden on small viewports where there is no room. */}
                <motion.div
                  style={reduce ? undefined : { y: float1Y }}
                  className="hidden sm:block absolute bottom-6 right-0 w-16 sm:w-20 lg:w-24 float-med pointer-events-none"
                >
                  <MobileMockup demo={mobileDemo} />
                </motion.div>

                {/* Floating credibility card — truthful, not metric */}
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  style={reduce ? undefined : { y: float2Y }}
                  className="hidden sm:block absolute -top-7 -left-4 sm:-left-8 chrome-pill rounded-2xl p-3.5 backdrop-blur-md float-slow"
                >
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
                </motion.div>

                {/* Floating "live preview" label — labelling not a claim */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 1.35 }}
                  style={reduce ? undefined : { y: float3Y }}
                  className="absolute top-6 -right-2 sm:-right-2 lg:right-4 chrome-pill rounded-full px-3.5 py-2 text-xs text-white/85 inline-flex items-center gap-2 float-fast"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                  Concept preview
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Industry proof marquee — positioning, not metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="mt-32 sm:mt-44 row-fade-mask overflow-hidden"
        >
          <div className="text-[10px] tracking-eyebrow text-white/35 mb-4 text-center">
            Designing for Nova Scotia local businesses
          </div>
          <div className="marquee gap-12 text-xs sm:text-sm tracking-wide uppercase text-white/35">
            {[...PROOF_LOGOS, ...PROOF_LOGOS].map((l, i) => (
              <span key={i} className="inline-flex items-center gap-12 whitespace-nowrap">
                {l}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/15" />
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => goTo("#why")}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 text-[10px] tracking-eyebrow text-white/45 hover:text-white/80 transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          Scroll to explore
        </motion.button>
      </div>
    </section>
  );
}
