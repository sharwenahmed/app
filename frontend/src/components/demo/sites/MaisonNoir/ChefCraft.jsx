import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ChefCraft() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 0.42, 1], [42, 0, -24]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.26, 0.9], [0.42, 1, 1]);
  const imageRotateY = useTransform(scrollYProgress, [0, 0.52, 1], [-7, 3, 0]);
  const imageX = useTransform(scrollYProgress, [0, 0.52, 1], [-18, 12, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.52, 1], [0.98, 1.035, 1]);
  const imageFilter = useTransform(
    scrollYProgress,
    [0, 0.28, 0.54, 0.78, 1],
    [
      "brightness(0.82) contrast(1.12) blur(0px)",
      "brightness(0.98) contrast(1.08) blur(0px)",
      "brightness(0.86) contrast(1.08) blur(1.6px)",
      "brightness(1.03) contrast(1.04) blur(0px)",
      "brightness(0.96) contrast(1.08) blur(0px)",
    ]
  );
  const philosophySharpness = useTransform(scrollYProgress, [0.32, 0.56, 0.78], [0.6, 1, 0.78]);
  const cardOneY = useTransform(scrollYProgress, [0.42, 0.72], [36, 0]);
  const cardTwoY = useTransform(scrollYProgress, [0.5, 0.82], [44, 0]);
  const cardOneOpacity = useTransform(scrollYProgress, [0.42, 0.66], [0, 1]);
  const cardTwoOpacity = useTransform(scrollYProgress, [0.5, 0.76], [0, 1]);
  const edgeLightX = useTransform(scrollYProgress, [0, 1], ["-18%", "62%"]);
  const edgeLightOpacity = useTransform(scrollYProgress, [0.1, 0.42, 0.84], [0, 0.72, 0]);

  return (
    <section
      id="chef"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050608] px-6 py-32"
    >
      <div className="absolute right-[-180px] top-24 hidden h-[500px] w-[500px] rounded-full bg-[#C9A25B]/10 blur-[140px] md:block" />
      <div className="absolute left-[-160px] bottom-12 h-[420px] w-[420px] rounded-full bg-[#4A1418]/20 blur-[140px]" />
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { x: edgeLightX, opacity: edgeLightOpacity }}
        className="pointer-events-none absolute inset-y-24 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-[#C9A25B] to-transparent shadow-[0_0_48px_rgba(201,162,91,0.82)] md:block"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
        <motion.div
          style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
          className="lg:col-span-5"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#C9A25B]">
            Craftsmanship
          </p>

          <h2 className="font-serif text-6xl leading-[0.9] tracking-tight lg:text-7xl">
            The Person
            <br />
            Behind
            <br />
            Every Plate.
          </h2>

          <motion.p
            style={reduce ? undefined : { opacity: philosophySharpness }}
            className="mt-8 text-lg leading-8 text-white/60"
          >
            Every evening service begins hours before the first reservation.
            Ingredients are inspected one by one, sauces simmer slowly, and
            every steak is cooked over open flame with precision, patience, and
            restraint.
          </motion.p>

          <motion.p
            style={reduce ? undefined : { opacity: philosophySharpness }}
            className="mt-6 text-lg leading-8 text-white/60"
          >
            Luxury isn’t excess. It’s consistency.
          </motion.p>

          <a
            href="#story"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/40 px-6 py-3 text-[#C9A25B] transition hover:bg-[#C9A25B] hover:text-black"
          >
            Meet Our Philosophy
            <ArrowUpRight size={18} />
          </a>
        </motion.div>

        <div className="relative lg:col-span-7" style={{ perspective: "1200px" }}>
          <motion.div
            style={
              reduce
                ? undefined
                : {
                    rotateY: imageRotateY,
                    x: imageX,
                    scale: imageScale,
                    filter: imageFilter,
                    transformStyle: "preserve-3d",
                  }
            }
            className="overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] shadow-[0_50px_140px_-70px_rgba(201,162,91,0.45)]"
          >
            <img
              loading="lazy"
              decoding="async"
              src="/images/MaisonNoir/people/chef.webp"
              alt="Maison Noir executive chef plating a dish"
              className="h-[720px] w-full object-cover object-center"
            />
          </motion.div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              style={reduce ? undefined : { y: cardOneY, opacity: cardOneOpacity }}
              className="rounded-[2rem] border border-[#C9A25B]/20 bg-white/[0.04] p-7 backdrop-blur-xl"
            >
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#C9A25B]">
                Experience
              </p>

              <div className="flex items-end gap-4">
                <h3 className="font-serif text-6xl leading-none text-white">
                  18
                </h3>

                <p className="pb-1 text-sm leading-relaxed text-white/58">
                  Years mastering open-fire cuisine
                </p>
              </div>
            </motion.div>

            <motion.div
              style={reduce ? undefined : { y: cardTwoY, opacity: cardTwoOpacity }}
              className="rounded-[2rem] border border-white/10 bg-black/35 p-7"
            >
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#C9A25B]">
                Service Ritual
              </p>

              <p className="font-serif text-2xl leading-tight text-white/86">
                Every plate leaves the kitchen only when heat, timing, and
                silence agree.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
