import React from "react";
import { motion } from "framer-motion";
import {
  Layout,
  RefreshCcw,
  FileText,
  Search,
  Smartphone,
  Wrench,
  Brush,
  ArrowUpRight,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { HOME } from "@/constants/testIds";

const SERVICES = [
  {
    slug: "website-design",
    icon: Layout,
    name: "Website Design",
    body: "Custom websites built from scratch — branded, fast, and conversion-driven.",
    benefits: ["Custom design", "Built mobile-first", "SEO foundations"],
  },
  {
    slug: "website-redesign",
    icon: RefreshCcw,
    name: "Website Redesign",
    body: "Make your existing site work for you. Modern visual identity, faster pages.",
    benefits: ["Brand refresh", "Performance audit", "Content migration"],
  },
  {
    slug: "landing-pages",
    icon: FileText,
    name: "Landing Pages",
    body: "Single-page campaigns engineered for ads, launches, and promotions.",
    benefits: ["A/B ready", "Form integrations", "Pixel tracking"],
  },
  {
    slug: "local-seo",
    icon: Search,
    name: "Local SEO",
    body: "Show up when your neighbours search. Schema, sitemaps, Google Business setup.",
    benefits: ["Schema markup", "Local keyword strategy", "GBP optimization"],
  },
  {
    slug: "mobile-optimization",
    icon: Smartphone,
    name: "Mobile Optimization",
    body: "Premium mobile experience: instant taps, fast loads, sticky CTAs.",
    benefits: ["Mobile UX audit", "Tap targets", "Performance fixes"],
  },
  {
    slug: "website-maintenance",
    icon: Wrench,
    name: "Website Maintenance",
    body: "Ongoing hosting, updates, edits and emergency response handled in-house.",
    benefits: ["Hosting included", "Monthly edits", "Same-day support"],
  },
  {
    slug: "branding-support",
    icon: Brush,
    name: "Branding Support",
    body: "Logos, palettes, and visual systems that your website can actually live inside.",
    benefits: ["Logo refresh", "Brand guidelines", "Asset library"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 sm:py-44">
      <div className="aurora aurora-purple right-[-180px] top-[20%] w-[460px] h-[460px] opacity-25" />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-2xl">
              <div className="text-xs tracking-eyebrow text-purple-300">Services</div>
              <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight">
                Everything your business needs{" "}
                <span className="text-gradient-violet">to win online.</span>
              </h2>
            </div>
            <p className="text-white/65 max-w-md text-base sm:text-lg">
              We bundle design, development, copy, and growth into one studio.
              Built for owners who don't want to manage agencies.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const featured = i === 0 || i === 3;
            return (
              <StaggerItem
                key={s.slug}
                className={featured ? "lg:row-span-2" : ""}
              >
                <TiltCard intensity={5} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    data-testid={HOME.serviceCard(s.slug)}
                    className={`relative glass glass-hover rounded-3xl p-8 sm:p-9 h-full overflow-hidden ${
                      featured ? "min-h-[300px]" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-200 ring-1 ring-purple-500/30">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/40" />
                    </div>
                    <h3 className="mt-7 font-display text-2xl sm:text-[1.65rem] font-medium leading-tight">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-white/65 text-sm sm:text-base leading-relaxed">
                      {s.body}
                    </p>

                    <ul className="mt-6 space-y-2 text-xs text-white/70">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <span className="inline-block w-1 h-1 rounded-full bg-purple-300" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {featured && (
                      <div className="pointer-events-none absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-purple-500/15 blur-3xl" />
                    )}
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
