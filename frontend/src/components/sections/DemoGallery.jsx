import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MonitorSmartphone, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import DesktopMockup from "@/components/mockups/DesktopMockup";
import MobileMockup from "@/components/mockups/MobileMockup";
import { DEMOS, INDUSTRIES } from "@/data/demos";
import { HOME } from "@/constants/testIds";

export default function DemoGallery() {
  const [active, setActive] = useState(INDUSTRIES[0].id);
  const [focused, setFocused] = useState(null); // demo slug currently expanded

  const concepts = DEMOS[active] || [];

  return (
    <section id="work" data-testid={HOME.demoGallery} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="aurora aurora-purple left-[-180px] top-[10%] w-[480px] h-[480px] opacity-30" />
      <div className="aurora aurora-violet right-[-180px] bottom-[10%] w-[460px] h-[460px] opacity-25" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-2xl">
              <div className="text-xs tracking-eyebrow text-purple-300">Demo Gallery</div>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight">
                Twenty concepts.{" "}
                <span className="text-gradient-violet">Five industries. One studio.</span>
              </h2>
            </div>
            <p className="text-white/65 max-w-md text-sm sm:text-base">
              Every concept below was designed in-house. Tap a card to preview
              the desktop & mobile mockups side by side.
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap gap-2 sm:gap-3">
          {INDUSTRIES.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                data-testid={HOME.demoTab(cat.id)}
                onClick={() => {
                  setActive(cat.id);
                  setFocused(null);
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "text-white"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="demo-tab-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_10px_30px_-12px_rgba(147,51,234,0.7)]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Concepts grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid md:grid-cols-2 gap-6 sm:gap-8"
          >
            {concepts.map((demo, idx) => (
              <motion.div
                key={demo.slug}
                data-testid={HOME.demoCard(demo.slug)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                onMouseEnter={() => setFocused(demo.slug)}
                onMouseLeave={() => setFocused(null)}
                className="group relative glass glass-hover rounded-3xl p-5 sm:p-7"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[10px] tracking-eyebrow text-purple-300/85">
                      {demo.tagline} · {demo.city}
                    </div>
                    <div className="mt-1.5 font-display text-xl sm:text-2xl font-medium">
                      {demo.name}
                    </div>
                  </div>
                  <div className="text-[10px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-white/65">
                    <MonitorSmartphone className="w-3 h-3" /> Desktop + Mobile
                  </div>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-12 gap-3 sm:gap-4 items-end">
                    <motion.div
                      className="col-span-8 sm:col-span-9"
                      animate={{
                        scale: focused === demo.slug ? 1.015 : 1,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <DesktopMockup demo={demo} />
                    </motion.div>
                    <motion.div
                      className="col-span-4 sm:col-span-3 pb-2"
                      animate={{
                        y: focused === demo.slug ? -8 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <MobileMockup demo={demo} />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: focused === demo.slug ? 1 : 0,
                      y: focused === demo.slug ? 0 : 8,
                    }}
                    transition={{ duration: 0.35 }}
                    className="hidden sm:flex absolute top-3 right-3 items-center gap-2 px-3 py-1.5 rounded-full glass-strong text-xs"
                  >
                    <Sparkles className="w-3 h-3 text-purple-300" />
                    <span>Live concept preview</span>
                  </motion.div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-white/55">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {demo.url}
                  </span>
                  <span className="inline-flex items-center gap-1.5 group-hover:text-white transition-colors">
                    Concept by A-Designs <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
