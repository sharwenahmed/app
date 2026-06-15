import React from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-32 sm:py-44 overflow-hidden">
      <div className="aurora aurora-purple right-[-120px] top-[20%] w-[460px] h-[460px] opacity-25" />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="text-xs tracking-eyebrow text-purple-300">About A-Designs</div>
              <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight leading-[1.05]">
                We help local businesses{" "}
                <span className="text-gradient-violet">compete with the big brands.</span>
              </h2>
              <p className="mt-8 text-white/70 leading-relaxed text-lg max-w-2xl">
                A-Designs was created in Halifax to give independent restaurants,
                barbers, salons, roofers and cleaning companies the same calibre
                of website that national chains spend tens of thousands on. We
                believe great design shouldn't be a luxury — it should be the
                baseline for any business that wants to grow.
              </p>
              <p className="mt-5 text-white/65 leading-relaxed max-w-2xl">
                Every project is led personally — no agencies, no outsourcing,
                no templates. Just considered design, clean code, and a real
                human picking up the phone when you call.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-3">
                <a
                  href="tel:+19029894072"
                  className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <span className="inline-flex w-10 h-10 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 items-center justify-center text-purple-200">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-eyebrow text-white/45">Call</div>
                    <div className="text-sm font-medium">902-989-4072</div>
                  </div>
                </a>
                <a
                  href="mailto:sharwen.ahmed@yahoo.com"
                  className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <span className="inline-flex w-10 h-10 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 items-center justify-center text-purple-200">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-eyebrow text-white/45">Email</div>
                    <div className="text-sm font-medium break-all">
                      sharwen.ahmed@yahoo.com
                    </div>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/adesignshalifax/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <span className="inline-flex w-10 h-10 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 items-center justify-center text-purple-200">
                    <Instagram className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-eyebrow text-white/45">Instagram</div>
                    <div className="text-sm font-medium">@adesignshalifax</div>
                  </div>
                </a>
                <div className="glass rounded-2xl p-4 flex items-center gap-3">
                  <span className="inline-flex w-10 h-10 rounded-xl bg-purple-500/15 ring-1 ring-purple-400/30 items-center justify-center text-purple-200">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-eyebrow text-white/45">Studio</div>
                    <div className="text-sm font-medium">Halifax, NS, Canada</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative gradient-border rounded-3xl overflow-hidden">
                <div className="relative p-6 sm:p-8 grid gap-4">
                  {[
                    { k: "Quality", v: "Every pixel handled in Halifax — no outsourcing." },
                    { k: "Simplicity", v: "Sites your customers (and you) can actually use." },
                    { k: "Modern Design", v: "Studio-grade aesthetics for local budgets." },
                    { k: "Local-first", v: "Built for the way Maritime businesses actually grow." },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="rounded-2xl bg-black/30 ring-1 ring-white/5 p-4"
                    >
                      <div className="text-[10px] tracking-eyebrow text-purple-300">{row.k}</div>
                      <div className="mt-1 text-sm text-white/85">{row.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
