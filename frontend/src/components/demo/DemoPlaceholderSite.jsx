import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, MapPin, Star } from "lucide-react";

export default function DemoPlaceholderSite({ demo }) {
  const accent = demo.palette.accent;
  const services = demo.nav?.slice(0, 4) || ["Services", "About", "Gallery", "Contact"];

  return (
    <div className="font-display" style={{ background: demo.palette.bg, color: demo.palette.text }}>
      <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur-xl" style={{ background: `${demo.palette.bg}d9` }}>
        <div className="flex items-center justify-between gap-6 px-5 sm:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl" style={{ background: `linear-gradient(135deg, ${accent}, transparent)` }} />
            <div>
              <div className="font-semibold tracking-tight">{demo.name}</div>
              <div className="text-[10px] uppercase tracking-[0.22em] opacity-55">{demo.city}</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm opacity-70">
            {services.map((item) => <span key={item}>{item}</span>)}
          </nav>
          <button className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: accent, color: demo.palette.bg }}>
            {demo.cta}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <section className="relative min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${demo.hero})` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${demo.palette.bg}55 0%, ${demo.palette.bg}f2 82%)` }} />
        <div className="relative w-full px-5 sm:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="text-[11px] tracking-[0.35em] uppercase" style={{ color: accent }}>{demo.tagline}</div>
            <h1 className="mt-5 text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.92]">
              {demo.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-lg sm:text-xl leading-relaxed opacity-75">{demo.heroSub}</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold" style={{ background: accent, color: demo.palette.bg }}>
                {demo.cta}
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium border border-white/15 bg-white/5">
                Explore Website
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-12 border-y border-white/10" style={{ background: demo.palette.surface }}>
        <div className="grid sm:grid-cols-3 gap-4">
          {demo.stats.map((stat) => (
            <div key={stat.k + stat.v} className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 text-center">
              <div className="text-3xl sm:text-4xl font-semibold" style={{ color: accent }}>{stat.k}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] opacity-55">{stat.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[11px] tracking-[0.35em] uppercase" style={{ color: accent }}>Designed to convert</div>
            <h2 className="mt-5 text-4xl sm:text-6xl font-medium tracking-tight">A complete business website experience.</h2>
          </div>
          <div className="grid gap-3">
            {["Premium first impression", "Clear services and offers", "Mobile-friendly booking flow", "Local trust and review sections"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <CheckCircle2 className="w-5 h-5" style={{ color: accent }} />
                <span className="opacity-80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-20 sm:pb-28">
        <div className="grid md:grid-cols-3 gap-4">
          {[demo.hero, demo.mobileHero || demo.hero, demo.hero].map((image, index) => (
            <div key={index} className="min-h-[320px] rounded-[2rem] bg-cover bg-center border border-white/10 overflow-hidden" style={{ backgroundImage: `url(${image})` }} />
          ))}
        </div>
      </section>

      <footer className="px-5 sm:px-8 py-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: demo.palette.surface }}>
        <div>
          <div className="font-semibold">{demo.name}</div>
          <div className="mt-1 flex items-center gap-2 text-sm opacity-60"><MapPin className="w-4 h-4" /> {demo.city}, Nova Scotia</div>
        </div>
        <div className="flex items-center gap-2 text-sm opacity-70"><Star className="w-4 h-4" style={{ color: accent }} /> Concept website by A-Designs</div>
      </footer>
    </div>
  );
}
