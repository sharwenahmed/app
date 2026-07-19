import React, { useLayoutEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

const galleryChapterLights = [
  { lightX: 42, lightY: 52, amber: 0.16, burgundy: 0.18, fire: 0.04 },
  { lightX: 58, lightY: 58, amber: 0.2, burgundy: 0.12, fire: 0.13 },
  { lightX: 50, lightY: 44, amber: 0.17, burgundy: 0.1, fire: 0.08 },
  { lightX: 36, lightY: 48, amber: 0.14, burgundy: 0.24, fire: 0.03 },
  { lightX: 62, lightY: 46, amber: 0.19, burgundy: 0.16, fire: 0.05 },
  { lightX: 54, lightY: 60, amber: 0.16, burgundy: 0.12, fire: 0.02 },
];

function RevealImage({ src, alt, label, title, className = "", index = 0 }) {
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;

    if (!frame || !image) {
      return undefined;
    }

    const direction = index % 2 === 0 ? -1 : 1;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      if (reduce) {
        gsap.set(frame, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          rotation: 0,
          clearProps: "willChange",
        });
        gsap.set(image, { y: 0, scale: 1, clearProps: "willChange,filter" });
        return;
      }

      media.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        ({ conditions }) => {
          const isMobile = conditions?.isMobile;
          const enterX = direction * (isMobile ? 56 : 140);
          const enterScale = isMobile ? 0.985 : 0.97;
          const enterRotate = isMobile ? 0 : direction * 1.5;

          gsap.set(frame, {
            autoAlpha: 0,
            x: enterX,
            scale: enterScale,
            rotation: enterRotate,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          gsap.to(frame, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: isMobile ? 0.8 : 1.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: frame,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
            onComplete: () => {
              gsap.set(frame, { clearProps: "willChange" });
            },
          });

          gsap.set(image, {
            y: isMobile ? 0 : 14,
            scale: 1,
            transformOrigin: "center center",
          });

          if (!isMobile) {
            gsap.to(image, {
              y: -14,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.45,
              },
            });

            ScrollTrigger.create({
              trigger: frame,
              start: "top 58%",
              end: "bottom 42%",
              onEnter: () => {
                const light = galleryChapterLights[index] || galleryChapterLights[0];

                gsap.to(document.documentElement, {
                  "--mn-light-x": light.lightX,
                  "--mn-light-y": light.lightY,
                  "--mn-amber": light.amber,
                  "--mn-burgundy": light.burgundy,
                  "--mn-fire": light.fire,
                  duration: 0.8,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
              onEnterBack: () => {
                const light = galleryChapterLights[index] || galleryChapterLights[0];

                gsap.to(document.documentElement, {
                  "--mn-light-x": light.lightX,
                  "--mn-light-y": light.lightY,
                  "--mn-amber": light.amber,
                  "--mn-burgundy": light.burgundy,
                  "--mn-fire": light.fire,
                  duration: 0.8,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
            });
          }
        }
      );
    }, frame);

    return () => {
      media.revert();
      context.revert();
    };
  }, [index, reduce]);

  return (
    <figure
      ref={frameRef}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] shadow-[0_45px_120px_-80px_rgba(201,162,91,0.55)] ${className}`}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover opacity-90 transition-[transform,filter,opacity] duration-300 ease-out md:group-hover:scale-[1.02] md:group-hover:brightness-[1.06] md:group-hover:opacity-100"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/18 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,transparent,rgba(0,0,0,0.42)_78%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-white/10 opacity-0 transition duration-700 group-hover:opacity-100" />

      <figcaption className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
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
      </figcaption>
    </figure>
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
          {galleryMoments.map((moment, index) => (
            <RevealImage key={moment.src} {...moment} index={index} />
          ))}
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
