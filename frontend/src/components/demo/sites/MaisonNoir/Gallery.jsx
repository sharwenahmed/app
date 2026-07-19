import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const galleryMoments = [
  {
    src: "/images/MaisonNoir/gallery/interior.webp",
    alt: "Maison Noir restaurant interior",
    label: "Chapter I · Arrival",
    title: "The room lowers its voice.",
    className: "h-[520px] md:h-[760px]",
    layout: "wide",
  },
  {
    src: "/images/MaisonNoir/branding/hero.webp",
    alt: "Maison Noir steak finished over open flame",
    label: "Chapter II · The Fire",
    title: "Flame, patience, and the first signature cut.",
    className: "h-[520px] md:h-[660px]",
    layout: "half",
  },
  {
    src: "/images/MaisonNoir/people/chef.webp",
    alt: "Maison Noir chef preparing a plate",
    label: "Chapter III · The Craft",
    title: "Every plate leaves only when it is ready.",
    className: "h-[520px] md:h-[660px]",
    layout: "half",
  },
  {
    src: "/images/MaisonNoir/branding/wine-cellar.webp",
    alt: "Maison Noir wine cellar and private wine selection",
    label: "Chapter IV · The Cellar",
    title: "A pairing chosen for the pace of the evening.",
    className: "h-[520px] md:h-[720px]",
    layout: "wide",
  },
  {
    src: "/images/MaisonNoir/gallery/bartender.webp",
    alt: "Maison Noir cocktail and wine service",
    label: "Chapter V · The Pour",
    title: "A final pour before the table settles in.",
    className: "h-[520px] md:h-[660px]",
    layout: "half",
  },
  {
    src: "/images/MaisonNoir/branding/dessert.webp",
    alt: "Maison Noir dessert served by candlelight",
    label: "Chapter VI · The Finale",
    title: "The last bite arrives slowly.",
    className: "h-[520px] md:h-[660px]",
    layout: "half",
  },
];

function RevealImage({ src, alt, label, title, className = "", index = 0 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, -32]);
  const figureX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -26 : 26, 0, index % 2 === 0 ? 12 : -12]
  );
  const captionY = useTransform(scrollYProgress, [0.2, 0.64], [22, 0]);

  return (
    <motion.figure
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 44, filter: "blur(10px)" }}
      whileInView={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={reduce ? undefined : { x: figureX }}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] shadow-[0_45px_120px_-80px_rgba(201,162,91,0.55)] ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { scale, y }}
        className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:opacity-100"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/18 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,transparent,rgba(0,0,0,0.42)_78%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-white/10 opacity-0 transition duration-700 group-hover:opacity-100" />

      <motion.figcaption
        style={reduce ? undefined : { y: captionY }}
        className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C9A25B]">
            {label}
          </span>

          <span className="hidden text-sm text-white/45 sm:inline">
            Maison Noir
          </span>
        </div>

        <p className="max-w-2xl font-serif text-3xl leading-tight text-white md:text-5xl">
          {title}
        </p>
      </motion.figcaption>
    </motion.figure>
  );
}

export default function Gallery() {
  const reduce = useReducedMotion();

  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-6 py-28 md:py-40"
    >
      <div className="absolute left-[-180px] top-20 hidden h-[520px] w-[520px] rounded-full bg-[#C9A25B]/10 blur-[150px] md:block" />
      <div className="absolute right-[-180px] bottom-20 hidden h-[520px] w-[520px] rounded-full bg-[#4A1418]/25 blur-[150px] md:block" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-5xl md:mb-20"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#C9A25B]">
            An Evening At Maison Noir
          </p>

          <h2 className="font-serif text-[clamp(4rem,9vw,8.8rem)] leading-[0.86] tracking-[-0.065em] text-white">
            From arrival
            <br />
            to the final bite.
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/52">
            A Maison Noir evening moves in chapters — arrival, fire, craft,
            cellar, pour, and finale. Each moment is paced to feel private,
            cinematic, and quietly unforgettable.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-10">
          <RevealImage {...galleryMoments[0]} index={0} />

          <div className="grid gap-8 md:gap-10 lg:grid-cols-2">
            <RevealImage {...galleryMoments[1]} index={1} />
            <RevealImage {...galleryMoments[2]} index={2} />
          </div>

          <RevealImage {...galleryMoments[3]} index={3} />

          <div className="grid gap-8 md:gap-10 lg:grid-cols-2">
            <RevealImage {...galleryMoments[4]} index={4} />
            <RevealImage {...galleryMoments[5]} index={5} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="max-w-2xl text-white/45">
            Every image is designed to show the restaurant as an experience, not
            just a menu — a complete evening from the first step inside to the
            final course.
          </p>

          <a
            href="#reserve"
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/40 px-7 py-4 text-[#C9A25B] transition duration-500 hover:-translate-y-1 hover:bg-[#C9A25B] hover:text-black"
          >
            Reserve an Evening
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
