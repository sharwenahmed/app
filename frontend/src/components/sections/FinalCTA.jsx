import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function FinalCTA() {
  const goWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };
  const goConsult = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(
      () => window.dispatchEvent(new CustomEvent("a-designs:prefill-consult")),
      600
    );
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-8 sm:p-14 lg:p-20">
            <div className="aurora aurora-purple -left-32 -top-32 w-[420px] h-[420px]" />
            <div className="aurora aurora-violet -right-32 -bottom-32 w-[420px] h-[420px] opacity-60" />
            <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none" />

            <div className="relative">
              <div className="text-xs tracking-eyebrow text-purple-300">Ready when you are</div>
              <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-[5rem] font-medium tracking-tighter leading-[0.95]">
                Ready to upgrade <br className="hidden sm:block" />
                <span className="text-gradient-purple">your online presence?</span>
              </h2>
              <p className="mt-6 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
                Let's create a website your customers will remember — and tell
                their friends about. Free 20-minute consultation, no pressure.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={goConsult}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_24px_60px_-15px_rgba(147,51,234,0.7)] hover:shadow-[0_32px_70px_-12px_rgba(147,51,234,0.85)] transition-all"
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={goWork}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium glass hover:bg-white/10 transition-colors"
                >
                  View Demo Gallery
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
