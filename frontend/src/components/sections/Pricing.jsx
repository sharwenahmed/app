import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import MagneticButton from "@/components/motion/MagneticButton";
import { HOME } from "@/constants/testIds";

const PLANS = [
  {
    slug: "starter",
    name: "Starter",
    price: "From CA$499",
    desc: "A premium one-page website to launch fast.",
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
    slug: "growth",
    name: "Growth",
    price: "From CA$999",
    desc: "Our most popular package for local businesses ready to scale.",
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
    price: "From CA$1,999",
    desc: "Custom brand + website + ongoing growth support.",
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
          <div className="max-w-3xl">
            <div className="text-xs tracking-eyebrow text-purple-300">Pricing</div>
            <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight">
              Premium work,{" "}
              <span className="text-gradient-violet">priced honestly.</span>
            </h2>
            <p className="mt-7 text-white/65 max-w-2xl text-base sm:text-lg">
              Every project is quoted custom — these are starting points that
              cover most local businesses. No hidden fees, no surprise invoices.
            </p>
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
                    <div className="absolute top-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-[10px] tracking-eyebrow text-white shadow-[0_10px_30px_-10px_rgba(147,51,234,0.7)]">
                      <Sparkles className="w-3 h-3" /> Most popular
                    </div>
                  )}
                  <div className="relative">
                    <div className="text-xs tracking-eyebrow text-purple-300">
                      {p.name}
                    </div>
                    <div className="mt-4 font-display text-[2.5rem] sm:text-5xl font-medium tracking-tight leading-none">
                      {p.price}
                    </div>
                    <p className="mt-4 text-white/65 text-sm leading-relaxed">{p.desc}</p>

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
