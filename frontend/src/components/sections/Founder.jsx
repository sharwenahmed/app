import React from "react";
import { MapPin, Quote, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TiltCard from "@/components/motion/TiltCard";

export default function Founder() {
  return (
    <section id="founder" className="relative py-32 sm:py-44 overflow-hidden">
      <div className="aurora aurora-violet -left-32 top-1/4 w-[460px] h-[460px] opacity-25" />
      <div className="aurora aurora-purple -right-32 bottom-1/4 w-[460px] h-[460px] opacity-20" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs tracking-eyebrow text-purple-300">
              Meet the founder
            </div>
            <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight leading-[1.05]">
              The person behind{" "}
              <span className="text-gradient-violet">every line of code.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-20 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <Reveal delay={0.05} className="lg:col-span-5">
            <TiltCard intensity={3} className="rounded-3xl">
              <div className="relative gradient-border rounded-3xl overflow-hidden">
                <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden rounded-3xl bg-[#0a0418]">
                  <img
                    src="/founder.jpg"
                    alt="Sharwen Ahmed, founder of A-Designs"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.18),transparent_45%)]" />
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl" />

                  <div className="absolute top-5 left-5 chrome-pill rounded-full px-3 py-1 text-[10px] tracking-eyebrow text-white/80">
                    Founder & Web Designer
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[10px] tracking-eyebrow text-purple-300/80">
                        Founder
                      </div>
                      <div className="text-2xl font-display font-semibold text-white">
                        Sharwen Ahmed
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full chrome-pill text-[10px] text-white/75 shrink-0">
                      <MapPin className="w-3 h-3 text-purple-300" />
                      Halifax, NS
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative">
              <Quote
                className="absolute -top-6 -left-2 w-12 h-12 text-purple-400/30"
                aria-hidden="true"
              />

              <p className="relative font-display text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.25] tracking-tight text-white/90">
                <span className="text-gradient-violet font-medium">
                  Hi, I'm Sharwen.
                </span>{" "}
                I started A-Designs to help Halifax businesses compete with
                larger brands through modern website design.
              </p>

              <p className="mt-7 text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl">
                Many local businesses provide amazing services but have websites
                that don't reflect the quality of their work. My goal is to help
                them build trust, stand out from competitors, and attract more
                customers through thoughtful design — without outsourcing or
                templates.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });

                    setTimeout(
                      () =>
                        window.dispatchEvent(
                          new CustomEvent("a-designs:prefill-mockup")
                        ),
                      600
                    );
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-[0_24px_60px_-15px_rgba(147,51,234,0.7)] hover:shadow-[0_32px_70px_-12px_rgba(147,51,234,0.85)] transition-all"
                >
                  Get A Free Website Mockup
                  <ArrowRight className="w-4 h-4" />
                </a>

                <span className="text-xs text-white/45">
                  No pressure · Reply within 1 business day
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
