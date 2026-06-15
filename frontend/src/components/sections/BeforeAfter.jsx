import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BEFORE_AFTER } from "@/data/demos";

function CompareSlider({ before, after, title }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const move = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, next)));
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      move(x);
    };
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <div className="glass rounded-3xl p-3 sm:p-4">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl aspect-[16/10] select-none cursor-ew-resize ring-1 ring-white/10"
        onMouseDown={(e) => {
          dragging.current = true;
          move(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          move(e.touches[0].clientX);
        }}
      >
        {/* After (full) */}
        <img
          src={after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Before clipped to pos% */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={before}
            alt="Before"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] tracking-eyebrow bg-black/60 text-white/85">
          Before
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] tracking-eyebrow bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
          After · A-Designs
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/70"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-strong grid place-items-center text-white shadow-[0_0_24px_rgba(168,85,247,0.5)]">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="mt-3 px-1 flex items-center justify-between text-xs text-white/60">
        <span className="font-medium text-white/85">{title}</span>
        <span>Drag to compare →</span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="relative py-32 sm:py-44">
      <div className="aurora aurora-indigo left-1/2 -translate-x-1/2 top-1/3 w-[520px] h-[520px] opacity-30" />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs tracking-eyebrow text-purple-300">
              Before & after
            </div>
            <h2 className="mt-5 font-display text-display-lg font-medium tracking-tight">
              The difference is{" "}
              <span className="text-gradient-purple">night and day.</span>
            </h2>
            <p className="mt-7 text-white/65 max-w-2xl text-base sm:text-lg leading-relaxed">
              We rebuild outdated, hard-to-read websites into modern, mobile-first
              experiences. Drag the slider to see the transformation.
            </p>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 grid md:grid-cols-2 gap-6 sm:gap-8"
        >
          {BEFORE_AFTER.map((b) => (
            <CompareSlider key={b.title} {...b} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
