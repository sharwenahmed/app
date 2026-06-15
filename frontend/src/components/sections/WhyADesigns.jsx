import React from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Smartphone,
  Zap,
  MousePointerClick,
  MapPin,
  LifeBuoy,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import TiltCard from "@/components/motion/TiltCard";

const PILLARS = [
  {
    icon: Palette,
    title: "Modern Design",
    body: "Sites that look like they belong on Awwwards, not a 2014 template.",
    span: "md:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    body: "Every layout designed on a phone first, then scaled up beautifully.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    body: "Optimized assets and code splitting. Pages load in under 2 seconds.",
  },
  {
    icon: MousePointerClick,
    title: "Conversion Focused",
    body: "Every section is wired to drive bookings, calls, or quote requests.",
    span: "md:col-span-2",
  },
  {
    icon: MapPin,
    title: "Local Business Friendly",
    body: "Google Maps, hours, click-to-call, reviews — set up correctly.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support",
    body: "Hosting, updates, edits and emergencies handled by us.",
  },
];

export default function WhyADesigns() {
  return (
    <section id="why-a-designs" className="relative py-32 sm:py-44">
      <div className="aurora aurora-violet right-[-200px] top-[20%] w-[520px] h-[520px] opacity-25" />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-2xl">
              <div className="text-xs tracking-eyebrow text-purple-300">Why A-Designs</div>
              <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight">
                Studio-grade work,{" "}
                <span className="text-gradient-purple">priced for local businesses.</span>
              </h2>
            </div>
            <p className="text-white/65 text-base sm:text-lg max-w-md leading-relaxed">
              We work with one local business at a time, end to end. No outsourcing,
              no templates — just thoughtful, conversion-focused design.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-20 grid md:grid-cols-3 gap-5 sm:gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title} className={p.span || ""}>
                <TiltCard intensity={5} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className="relative gradient-border h-full overflow-hidden"
                  >
                    <div className="relative p-7 sm:p-9 h-full">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-200 ring-1 ring-purple-500/30">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="mt-7 font-display text-2xl sm:text-[1.65rem] font-medium leading-tight">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-white/65 text-sm sm:text-base leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
