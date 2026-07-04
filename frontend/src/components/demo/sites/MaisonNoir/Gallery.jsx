import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function RevealImage({ src, alt, label, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -30]);

  return (
    <motion.figure
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8 }}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] ${className}`}
    >
      <motion.img
  src={src}
  alt={alt}
  loading="lazy"
  decoding="async"
  style={reduce ? undefined : { scale, y }}
  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-700"
/>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

      <figcaption className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4">
        <span className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs">
          {label}
        </span>
        <span className="hidden sm:inline text-white/45 text-sm">
          Maison Noir
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative bg-[#050505] px-6 py-32 md:py-44 overflow-hidden border-t border-white/10"
    >
      <div className="hidden md:block absolute left-[-180px] top-20 w-[520px] h-[520px] rounded-full bg-[#C9A25B]/10 blur-[150px]" />
      <div className="hidden md:block absolute right-[-180px] bottom-20 w-[520px] h-[520px] rounded-full bg-[#4A1418]/25 blur-[150px]" />
         

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-5xl mb-20">
          <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-6">
            An Evening At Maison Noir
          </p>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.86] tracking-tight">
  From arrival
  <br />
  to the final bite.
</h2>
        </div>

        <div className="space-y-8 md:space-y-10">
          <RevealImage
            src="/images/MaisonNoir/interior.webp"
            alt="Maison Noir restaurant interior"
            label="Chapter I · Arrival"
            className="h-[520px] md:h-[760px]"
          />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
            <RevealImage
              src="/images/MaisonNoir/ribeye.webp"
              alt="Maison Noir ribeye"
              label="Chapter II · The Fire"
              className="h-[520px] md:h-[660px]"
            />

            <RevealImage
              src="/images/MaisonNoir/chef.webp"
              alt="Maison Noir chef"
              label="Chapter III · The Craft"
              className="h-[520px] md:h-[660px]"
            />
          </div>

          <RevealImage
            src="/images/MaisonNoir/wine-cellar.webp"
            alt="Maison Noir wine cellar"
            label="Chapter IV · The Cellar"
            className="h-[520px] md:h-[720px]"
          />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
            <RevealImage
              src="/images/MaisonNoir/cocktail.webp"
              alt="Maison Noir signature cocktail"
              label="Chapter V · The Pour"
              className="h-[520px] md:h-[660px]"
            />

            <RevealImage
              src="/images/MaisonNoir/dessert.webp"
              alt="Maison Noir dessert"
              label="Chapter VI · The Finale"
              className="h-[520px] md:h-[660px]"
            />
          </div>
        </div>

        
      </div>
    </section>
  );
}