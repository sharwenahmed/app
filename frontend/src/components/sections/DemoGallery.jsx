import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MonitorSmartphone, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import DesktopMockup from "@/components/mockups/DesktopMockup";
import MobileMockup from "@/components/mockups/MobileMockup";
import TiltCard from "@/components/motion/TiltCard";
import { DEMOS, INDUSTRIES } from "@/data/demos";
import { HOME } from "@/constants/testIds";

function Thumb({ demo, active, onClick }) {
  return (
    <button
      data-testid={HOME.demoCard(demo.slug)}
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl p-3 sm:p-3.5 transition-all duration-300 ${
        active
          ? "bg-white/[0.05] ring-1 ring-purple-400/50 shadow-[0_18px_50px_-25px_rgba(168,85,247,0.6)]"
          : "ring-1 ring-white/5 hover:ring-purple-300/30 hover:bg-white/[0.03]"
      }`}
    >
      {active && (
        <motion.span
          layoutId="thumb-active-glow"
          className="absolute -inset-px rounded-2xl"
          style={{
            background:
              "linear-gradient(120deg, rgba(168,85,247,0.35), rgba(99,102,241,0.25))",
            filter: "blur(18px)",
            opacity: 0.55,
            zIndex: -1,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />
      )}
      <div className="relative rounded-xl overflow-hidden aspect-[16/10] ring-1 ring-white/10">
        <img
          src={demo.hero}
          alt={demo.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 45%, ${demo.palette.bg}e0 100%)`,
          }}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            active ? "opacity-0" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(120deg, rgba(168,85,247,0.18), transparent 60%)",
          }}
        />
        <div className="absolute bottom-2.5 left-3 right-3">
          <div
            className="text-[9px] tracking-eyebrow opacity-90"
            style={{ color: demo.palette.accent }}
          >
            {demo.tagline}
          </div>
          <div className="text-sm font-medium text-white leading-tight truncate">
            {demo.name}
          </div>
        </div>
        {active && (
          <div className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-[9px] tracking-eyebrow text-white shadow-[0_8px_24px_-10px_rgba(168,85,247,0.7)]">
            Now showing
          </div>
        )}
      </div>
    </button>
  );
}

export default function DemoGallery() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [activeCat, setActiveCat] = useState(INDUSTRIES[0].id);
  const [activeSlug, setActiveSlug] = useState(DEMOS[INDUSTRIES[0].id][0].slug);

  const concepts = DEMOS[activeCat] || [];
  const featured = concepts.find((d) => d.slug === activeSlug) || concepts[0];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [60, -120]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.97]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const stageRotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  const setCategory = (id) => {
    setActiveCat(id);
    setActiveSlug(DEMOS[id][0].slug);
  };

  return (
    <section
      id="work"
      ref={ref}
      data-testid={HOME.demoGallery}
      className="relative section-vignette py-32 sm:py-48 overflow-hidden"
    >
      <div className="aurora aurora-purple left-[-220px] top-[10%] w-[560px] h-[560px] opacity-30" />
      <div className="aurora aurora-violet right-[-220px] bottom-[10%] w-[520px] h-[520px] opacity-25" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          style={reduce ? undefined : { y: titleY }}
          className="max-w-3xl"
        >
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full chrome-pill text-[11px] tracking-wide text-white/85">
              <Sparkles className="w-3 h-3 text-purple-300" />
              <span>Demo Gallery</span>
              <span className="opacity-50">·</span>
              <span className="opacity-75">20 concepts · 5 industries</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-7 font-display text-display-lg font-medium tracking-tighter">
              Tap an industry. <br className="hidden sm:block" />
              <span className="text-gradient-violet">
                Watch a website come to life.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-white/65 text-lg max-w-2xl leading-relaxed">
              Every concept below was designed in-house — built to look like a
              boutique website that the business actually owns. Click a card to
              swap the featured preview.
            </p>
          </Reveal>
        </motion.div>

        {/* Industry tabs */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap gap-2 sm:gap-3 p-1.5 rounded-full chrome-pill w-fit max-w-full overflow-x-auto">
            {INDUSTRIES.map((cat) => {
              const isActive = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  data-testid={HOME.demoTab(cat.id)}
                  onClick={() => setCategory(cat.id)}
                  className={`relative whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="demo-industry-pill"
                      className="absolute inset-0 rounded-full tab-pill-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Stage */}
        <div className="mt-16 sm:mt-20 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Featured */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCat}-${activeSlug}`}
                initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97, filter: "blur(8px)" }}
                animate={reduce ? {} : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={reduce ? {} : { opacity: 0, y: -20, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Eyebrow + name */}
                <div className="flex items-start justify-between gap-6 flex-wrap mb-7">
                  <div>
                    <div className="text-[11px] tracking-eyebrow text-purple-300/85">
                      {featured.tagline} · {featured.city}
                    </div>
                    <div className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
                      {featured.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full chrome-pill text-xs text-white/70">
                      <MonitorSmartphone className="w-3.5 h-3.5" />
                      Desktop + Mobile preview
                    </div>
                    <Link
                      to={`/demos/${featured.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_18px_45px_-18px_rgba(147,51,234,0.8)] hover:shadow-[0_24px_55px_-16px_rgba(147,51,234,0.95)] transition-all"
                    >
                      Preview Live Website
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <motion.div
                  style={reduce ? undefined : { y: mockupY, scale: mockupScale, rotate: stageRotate }}
                  className="relative will-change-transform pl-0 sm:pl-20 lg:pl-24"
                >
                  <TiltCard intensity={5} className="rounded-3xl">
                    <div className="ring-aurora rounded-2xl">
                      <DesktopMockup demo={featured} />
                    </div>
                  </TiltCard>

                  {/* Floating phone — sits in the reserved left gutter, never
                      overlaps content inside the desktop preview. Hidden on
                      mobile because the small viewport doesn't have room. */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, x: -10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="hidden sm:block absolute bottom-6 left-0 w-16 sm:w-20 lg:w-24 float-med pointer-events-none"
                  >
                    <MobileMockup demo={featured} />
                  </motion.div>

                  {/* Floating URL pill */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute -top-5 left-12 sm:left-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full chrome-pill text-xs text-white/85"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                    <span className="opacity-55">https://</span>
                    <span>{featured.url}</span>
                  </motion.div>

                  {/* Floating credit */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="hidden sm:block absolute -top-6 -right-4 chrome-pill rounded-2xl px-3.5 py-2.5 backdrop-blur-md"
                  >
                    <div className="text-[10px] tracking-eyebrow text-white/55">
                      Concept by
                    </div>
                    <div className="text-sm font-medium text-white">A-Designs · Halifax</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail strip */}
          <div className="lg:col-span-4 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat}
                initial={reduce ? false : { opacity: 0, x: 20 }}
                animate={reduce ? {} : { opacity: 1, x: 0 }}
                exit={reduce ? {} : { opacity: 0, x: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="text-xs tracking-eyebrow text-white/45 mb-4">
                  {INDUSTRIES.find((i) => i.id === activeCat)?.label} · {concepts.length} concepts
                </div>
                {concepts.map((demo, i) => (
                  <motion.div
                    key={demo.slug}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={reduce ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <Thumb
                      demo={demo}
                      active={activeSlug === demo.slug}
                      onClick={() => setActiveSlug(demo.slug)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer of section: CTA strip */}
        <Reveal delay={0.05}>
          <div className="mt-28 sm:mt-36 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-white/5">
            <div>
              <div className="text-xs tracking-eyebrow text-purple-300">Your business is next</div>
              <div className="mt-2 font-display text-2xl sm:text-3xl font-medium">
                See what your business{" "}
                <span className="text-gradient-violet">could look like.</span>
              </div>
            </div>
            <button
              onClick={() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                setTimeout(
                  () => window.dispatchEvent(new CustomEvent("a-designs:prefill-mockup")),
                  600
                );
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_24px_60px_-15px_rgba(147,51,234,0.7)] hover:shadow-[0_32px_70px_-12px_rgba(147,51,234,0.85)] transition-all"
            >
              Get A Free Website Mockup
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
