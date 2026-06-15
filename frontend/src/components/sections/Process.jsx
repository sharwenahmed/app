import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Discovery",
    body: "We learn your business, customers, and competitors. Decide what success looks like.",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Design",
    body: "Wireframes → high-fidelity design in Figma. You see your new site before a line of code.",
  },
  {
    n: "03",
    icon: Code2,
    title: "Development",
    body: "We hand-code the site for performance & SEO. No bloated builders, no slow themes.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Launch",
    body: "We migrate your domain, set up analytics, schema and Google Business — then go live.",
  },
  {
    n: "05",
    icon: LifeBuoy,
    title: "Support",
    body: "Ongoing hosting, edits, and support so your site keeps improving over time.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="aurora aurora-violet left-1/3 top-1/4 w-[380px] h-[380px] opacity-30" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs tracking-eyebrow text-purple-300">Our Process</div>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight">
              From discovery to launch, in{" "}
              <span className="text-gradient-purple">five careful steps.</span>
            </h2>
          </div>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            style={{ height }}
            className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 top-0 w-px bg-gradient-to-b from-purple-400 via-fuchsia-500 to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]"
          />

          <div className="space-y-12 sm:space-y-16">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 items-center`}
                >
                  {/* Node */}
                  <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 top-2 sm:top-1/2 sm:-translate-y-1/2 z-10">
                    <div className="relative w-12 h-12 rounded-full bg-black ring-1 ring-purple-400/40 grid place-items-center">
                      <span className="absolute inset-0 rounded-full bg-purple-500/20 blur-md" />
                      <Icon className="relative w-5 h-5 text-purple-200" />
                    </div>
                  </div>

                  <div
                    className={`pl-20 sm:pl-0 ${
                      left ? "sm:text-right sm:pr-16" : "sm:order-2 sm:pl-16"
                    }`}
                  >
                    <div className="text-[10px] tracking-eyebrow text-purple-300">
                      Step {s.n}
                    </div>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-medium">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-white/65 text-sm sm:text-base leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                  <div className="hidden sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
