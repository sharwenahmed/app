import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Users, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import MagneticButton from "@/components/motion/MagneticButton";
import { HOME } from "@/constants/testIds";

const PLANS = [
  {
    slug: "starter",
    name: "Starter",
    originalPrice: "CA$999",
    price: "From CA$499",
    save: "Save CA$500",
    badge: "Founding Offer",
    desc: "Perfect for startups and new businesses.",
    spots: "Only 2 Starter spots left this month",
    features: [
      "Single-page custom design",
      "Mobile-first responsive build",
      "Contact form + click-to-call",
      "Basic on-page SEO",
      "1 round of revisions",
    ],
    cta: "Start small",
    featured: false,
  },
  {
    slug: "business",
    name: "Business",
    originalPrice: "CA$1,999",
    price: "From CA$999",
    save: "Save CA$1,000",
    badge: "Founding Offer",
    desc: "Ideal for local businesses ready to grow.",
    spots: "Only 3 Business spots left this month",
    features: [
      "Up to 6 custom-designed pages",
      "Blog or menu / services system",
      "Google Business + reviews integration",
      "Performance & accessibility tuning",
      "30 days post-launch edits",
      "2 rounds of revisions",
    ],
    cta: "Start growing",
    featured: true,
  },
  {
    slug: "premium",
    name: "Premium",
    originalPrice: "CA$2,999",
    price: "From CA$1,999",
    save: "Save CA$1,000",
    badge: "Limited Availability",
    desc: "For established businesses ready to dominate.",
    spots: "Only 1 Premium spot left this month",
    features: [
      "10+ page custom website",
      "Logo & brand identity refresh",
      "Advanced animations & interactions",
      "Local SEO + schema markup",
      "Booking / e-commerce integration",
      "3 months priority support",
    ],
    cta: "Go premium",
    featured: false,
  },
];

export default function Pricing() {
  const goToContact = (planName) => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("a-designs:prefill", {
          detail: {
            subject: `Inquiry: ${planName} package`,
            message: `Hi A-Designs, I'd like to learn more about the ${planName} package for my business.`,
          },
        })
      );
    }, 500);
  };

  return (
    <section id="pricing" className="relative py-32 sm:py-44">
      <div className="aurora aurora-purple left-1/2 -translate-x-1/2 top-0 w-[520px] h-[520px] opacity-25" />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center">
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 text-xs font-semibold uppercase tracking-wider text-fuchsia-200">
    🔥 Founding Client Pricing
  </div>

  <h2 className="mt-6 font-display text-display-lg font-medium tracking-tight">
    Get a premium website{" "}
    <span className="text-gradient-violet">before our rates increase.</span>
  </h2>

  <p className="mt-6 text-white/65 max-w-3xl mx-auto text-base sm:text-lg">
    To build our client portfolio, we're offering reduced pricing for a limited
    number of local businesses.
  </p>

  <div className="mt-7 inline-flex items-center gap-3 px-6 py-3 rounded-full glass text-white font-medium">
    <Users className="w-5 h-5 text-fuchsia-300" />
    <span>
      <span className="text-fuchsia-300 font-bold">6</span> discounted client spots remaining this month
    </span>
  </div>
</div>
        </Reveal>

        <div className="mt-20 grid lg:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.slug}
              data-testid={HOME.pricingCard(p.slug)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`relative ${
                p.featured
                  ? "lg:-mt-6 lg:scale-[1.04] z-10"
                  : ""
              }`}
            >
              <TiltCard intensity={p.featured ? 4 : 3} className="h-full">
                <div
                  className={`relative h-full rounded-3xl p-8 sm:p-10 ${
                    p.featured
                      ? "gradient-border bg-[#120524]"
                      : "glass glass-hover"
                  }`}
                >
                  {p.featured && (
  <div className="absolute -top-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 text-xs font-bold uppercase tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(236,72,153,0.9)]">
    <Sparkles className="w-3.5 h-3.5" /> Most popular
  </div>
)}

<div className="relative">
  <div className="flex items-start justify-between gap-4">
    <div>
      <div className="text-xs tracking-eyebrow text-purple-300">
        {p.name}
      </div>
      <p className="mt-4 text-white/75 text-sm leading-relaxed">{p.desc}</p>
    </div>

    <div className="px-3 py-2 rounded-xl bg-purple-600/30 border border-purple-400/30 text-[11px] font-bold uppercase text-white text-center">
      {p.badge}
    </div>
  </div>

  <div className="mt-7 pt-6 border-t border-white/10">
    <div className="text-white/45 line-through text-lg">
      {p.originalPrice}
    </div>

    <div className="mt-2 font-display text-[2.5rem] sm:text-5xl font-medium tracking-tight leading-none">
      <span className="text-white text-2xl sm:text-3xl mr-2">From</span>
      <span className={p.featured ? "text-fuchsia-400" : "text-purple-400"}>
        {p.price.replace("From ", "")}
      </span>
    </div>

    <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-sm font-semibold">
      {p.save}
    </div>
  </div>

                    <MagneticButton
                      onClick={() => goToContact(p.name)}
                      data-testid={HOME.pricingCta(p.slug)}
                      strength={0.2}
                      className={`mt-7 w-full px-5 py-3.5 rounded-full text-sm font-medium transition-all sheen ${
                        p.featured
                          ? "text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_20px_50px_-15px_rgba(147,51,234,0.7)] hover:shadow-[0_28px_60px_-12px_rgba(147,51,234,0.85)]"
                          : "text-white glass hover:bg-white/10"
                      }`}
                    >
                      {p.cta}
                    </MagneticButton>

                    <ul className="mt-7 space-y-3 text-sm text-white/80">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <span className="mt-1 inline-flex w-4 h-4 rounded-full bg-purple-500/20 ring-1 ring-purple-400/40 items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-purple-200" />
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
  <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-3 text-sm text-white/80">
  <Clock className={p.featured ? "w-5 h-5 text-fuchsia-400" : "w-5 h-5 text-purple-400"} />
  <span>{p.spots}</span>
</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
