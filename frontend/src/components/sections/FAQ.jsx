import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { HOME } from "@/constants/testIds";

const FAQS = [
  {
    q: "How long does a website take?",
    a: "Most Starter sites launch in 1–2 weeks. Growth packages typically take 3–4 weeks. Premium projects with branding and integrations run 4–8 weeks. We hold a clear weekly call so you always know where things stand.",
  },
  {
    q: "Can you redesign my current website?",
    a: "Yes — redesigns are one of our most common projects. We audit your existing site, keep what works, modernise the rest, and migrate your content carefully so you don't lose Google rankings.",
  },
  {
    q: "Is my website mobile-friendly?",
    a: "Every A-Designs site is mobile-first. We design on phones first, then scale up. We also test on real devices (iOS / Android) before launch — not just emulators.",
  },
  {
    q: "Do you offer maintenance?",
    a: "Yes. Our maintenance plan covers hosting, security updates, monthly edits, performance monitoring, and emergency response. Most clients add it on at launch.",
  },
  {
    q: "What industries do you work with?",
    a: "We specialise in local service businesses — restaurants, cafes, barbers, hair salons, roofing, cleaning and other trades. If you serve a local market, we can help.",
  },
  {
    q: "Do you write the website copy?",
    a: "We help. We provide structured prompts, sample copy and edits — and if you'd like fully done-for-you copywriting we can quote that as an add-on.",
  },
  {
    q: "Will I be able to update the site myself?",
    a: "Yes. We hand over a clean CMS with documented sections so you can update menus, services, prices and photos without breaking the design.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="aurora aurora-violet left-1/4 top-1/3 w-[420px] h-[420px] opacity-25" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs tracking-eyebrow text-purple-300">FAQ</div>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight">
              Questions, answered{" "}
              <span className="text-gradient-purple">honestly.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <Accordion type="single" collapsible className="mt-12 glass rounded-3xl divide-y divide-white/5">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                data-testid={HOME.faqItem(i)}
                className="border-b-0 px-2 sm:px-4"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:no-underline py-5 px-2 sm:px-4">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/65 text-sm sm:text-base leading-relaxed pb-6 px-2 sm:px-4">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
