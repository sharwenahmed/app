import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, TrendingUp, Eye } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

const POINTS = [
  {
    icon: Eye,
    eyebrow: "First impressions",
    title: "75% of customers judge a business by its website.",
    body: "Your homepage is your storefront online. A modern, considered design tells customers you take your business as seriously as they do.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Credibility",
    title: "An outdated site quietly costs you clients.",
    body: "Customers comparison-shop in seconds. If your competitor's website looks more premium, the call rarely comes to you.",
  },
  {
    icon: Smartphone,
    eyebrow: "Mobile-first",
    title: "Over 70% of local searches happen on mobile.",
    body: "Sites that aren't built mobile-first lose customers before they read a word. A-Designs builds mobile-perfect by default.",
  },
  {
    icon: TrendingUp,
    eyebrow: "More leads",
    title: "Modern websites convert 3-5× better.",
    body: "Clear calls to action, fast loads, trust signals, and click-to-call CTAs are the difference between visitors and customers.",
  },
];

export default function WhyModern() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="aurora aurora-purple -left-32 top-1/3 w-[460px] h-[460px] opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs tracking-eyebrow text-purple-300">Why modern websites matter</div>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight leading-tight">
              In 2026, your website is the first conversation{" "}
              <span className="text-gradient-violet">you ever have with a customer.</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid md:grid-cols-2 gap-5 sm:gap-7">
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="glass glass-hover rounded-3xl p-7 sm:p-9 h-full"
                >
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-purple-500/15 text-purple-200 ring-1 ring-purple-500/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[10px] tracking-eyebrow text-white/40">{p.eyebrow}</div>
                  </div>
                  <h3 className="mt-6 font-display text-xl sm:text-2xl font-medium leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-white/65 text-sm sm:text-base leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
