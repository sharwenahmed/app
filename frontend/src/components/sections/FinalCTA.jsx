import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";

export default function FinalCTA() {
  const goWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };
  const goConsult = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(
      () => window.dispatchEvent(new CustomEvent("a-designs:prefill-mockup")),
      600
    );
  };

  return (
    <section className="relative py-32 sm:py-44">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 sm:p-16 lg:p-24">
            <div className="aurora aurora-purple -left-32 -top-32 w-[420px] h-[420px]" />
            <div className="aurora aurora-violet -right-32 -bottom-32 w-[420px] h-[420px] opacity-60" />
            <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none" />

            <div className="relative">
              <div className="text-xs tracking-eyebrow text-purple-300">Ready when you are</div>
              <h2 className="mt-5 font-display text-display-xl font-medium tracking-tighter leading-[0.95]">
                See what your business <br className="hidden sm:block" />
                <span className="text-gradient-purple">could look like.</span>
              </h2>
              <p className="mt-7 text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed">
                Send us your details and we'll put together a free, custom
                concept of what your new website could look like. No pressure,
                no obligations — just possibilities.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <MagneticButton
                  onClick={goConsult}
                  className="group px-7 py-4 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_28px_70px_-15px_rgba(147,51,234,0.75)] hover:shadow-[0_36px_80px_-12px_rgba(147,51,234,0.9)] transition-all sheen"
                >
                  Get A Free Website Mockup
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </MagneticButton>
                <MagneticButton
                  onClick={goWork}
                  strength={0.22}
                  className="group px-7 py-4 rounded-full text-sm font-medium glass hover:bg-white/10 transition-colors"
                >
                  View Demo Gallery
                  <ArrowDown className="w-4 h-4 opacity-60 transition-transform group-hover:translate-y-0.5" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
