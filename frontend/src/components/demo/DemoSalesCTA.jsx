import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DemoSalesCTA({ demo }) {
  return (
    <section className="max-w-[1280px] mx-auto mt-8 sm:mt-10 rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.08] to-purple-950/25 px-6 sm:px-10 py-10 sm:py-14 text-center shadow-[0_30px_100px_-60px_rgba(147,51,234,0.8)]">
      <div className="text-[11px] tracking-[0.35em] uppercase text-purple-300/90">
        Love this style?
      </div>
      <h2 className="mt-5 font-display text-3xl sm:text-5xl font-medium tracking-tight text-white">
        Get a custom version for your business.
      </h2>
      <p className="mt-5 max-w-2xl mx-auto text-white/60 leading-relaxed">
        This is a concept website. A-Designs can build a completely custom version with your brand, photos, services, and booking flow.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-medium shadow-[0_24px_60px_-15px_rgba(147,51,234,0.7)]"
        >
          Get My Free Mockup
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <Link to="/" className="inline-flex px-7 py-3.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.04] text-sm transition-colors">
          Back to A-Designs
        </Link>
      </div>
    </section>
  );
}
