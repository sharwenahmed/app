import React, { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Users, Wine, Utensils } from "lucide-react";

const privateFormats = [
  {
    title: "Private Room",
    detail: "Up to 14 guests",
    copy: "A candlelit room for anniversaries, birthdays, and executive dinners.",
    media: {
      type: "image",
      src: "/images/MaisonNoir/gallery/private-dining-room.webp",
      alt: "Private dining room with candlelit seating",
    },
  },
  {
    title: "Chef’s Table",
    detail: "6–8 guests",
    copy: "A closer view of the kitchen, built around a guided tasting menu.",
    media: {
      type: "video",
      src: "/images/MaisonNoir/videos/hero/chef-grilling-steak.mp4",
      poster: "/images/MaisonNoir/branding/chef.webp",
      alt: "Chef preparing dinner over open flame",
    },
  },
  {
    title: "Full Evening",
    detail: "By request",
    copy: "For brand dinners, celebrations, and private restaurant buyouts.",
    media: {
      type: "image",
      src: "/images/MaisonNoir/gallery/interior.webp",
      alt: "Maison Noir dining room prepared for a private evening",
    },
  },
];

function VisibleVideo({ src, poster, alt, className = "" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play?.().catch(() => {});
          return;
        }

        video.pause?.();
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause?.();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      className={className}
    />
  );
}

export default function PrivateDining() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 28]);
  const imageX = useTransform(scrollYProgress, [0, 1], [-10, 14]);
  const roomDepth = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.03, 1.01]);
  const frameLeftX = useTransform(scrollYProgress, [0.05, 0.48], ["0%", "-78%"]);
  const frameRightX = useTransform(scrollYProgress, [0.05, 0.48], ["0%", "78%"]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.42, 0.72], [0.78, 0.42, 0]);
  const copyLift = useTransform(scrollYProgress, [0.2, 0.7], [26, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.58, 0.82], [0, 1]);

  return (
    <section
      id="private"
      ref={ref}
      className="relative overflow-hidden border-t border-white/10 bg-[#060303] px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-[-180px] top-20 h-[520px] w-[520px] rounded-full bg-[#4A1418]/25 blur-[150px]" />
      <div className="pointer-events-none absolute right-[-180px] bottom-10 h-[520px] w-[520px] rounded-full bg-[#C9A25B]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 34 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#C9A25B]">
              Private Dining
            </p>

            <h2 className="font-serif text-[clamp(4rem,9vw,8rem)] leading-[0.86] tracking-[-0.06em] text-white">
              A room reserved
              <br />
              for the unforgettable.
            </h2>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 34 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-lg leading-8 text-white/58">
              Behind a velvet partition, Maison Noir hosts intimate dinners,
              business evenings, anniversaries, and tasting menus designed
              around the table.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 46, scale: 0.98 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-black/40 shadow-[0_60px_140px_-70px_rgba(201,162,91,0.45)] lg:col-span-8"
          >
            <div className="relative h-[560px] overflow-hidden md:h-[640px]">
              <motion.div
                aria-hidden="true"
                style={reduce ? undefined : { x: frameLeftX, opacity: frameOpacity }}
                className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden w-[32%] bg-gradient-to-r from-black via-black/82 to-transparent md:block"
              />

              <motion.div
                aria-hidden="true"
                style={reduce ? undefined : { x: frameRightX, opacity: frameOpacity }}
                className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-[32%] bg-gradient-to-l from-black via-black/82 to-transparent md:block"
              />

              <motion.img
                src="/images/MaisonNoir/gallery/private-dining-room.webp"
                alt="Private dining room at Maison Noir"
                style={reduce ? undefined : { scale: roomDepth, x: imageX, y: imageY }}
                className="absolute inset-0 h-full w-full object-cover opacity-90 will-change-transform"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/34 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/8 to-black/28" />
              <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.88)]" />

              <div className="absolute bottom-7 left-7 right-7 md:bottom-10 md:left-10 md:right-10">
                <motion.div
                  style={reduce ? undefined : { y: copyLift }}
                  className="max-w-xl rounded-[2rem] border border-white/10 bg-black/58 p-6 backdrop-blur-xl md:p-7"
                >
                  <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#C9A25B]">
                    The Velvet Room
                  </p>

                  <p className="font-serif text-3xl leading-tight text-white md:text-4xl">
                    Candlelight, cellar pairings, and a table set away from the
                    room.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 lg:col-span-4">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7"
            >
              <Users className="mb-5 h-5 w-5 text-[#C9A25B]" />
              <div className="font-serif text-6xl leading-none text-white">
                14
              </div>
              <p className="mt-3 text-white/50">Seats in the private room</p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7"
            >
              <Wine className="mb-5 h-5 w-5 text-[#C9A25B]" />
              <div className="font-serif text-6xl leading-none text-white">
                120+
              </div>
              <p className="mt-3 text-white/50">Cellar-selected pairings</p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="rounded-[2rem] border border-[#C9A25B]/20 bg-[#C9A25B]/8 p-7"
            >
              <Utensils className="mb-5 h-5 w-5 text-[#C9A25B]" />
              <div className="font-serif text-6xl leading-none text-white">
                3
              </div>
              <p className="mt-3 text-white/50">Private dining formats</p>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {privateFormats.map((format, index) => (
            <motion.div
              key={format.title}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 transition duration-500 hover:-translate-y-1 hover:border-[#C9A25B]/35"
            >
              <div className="relative h-72 overflow-hidden border-b border-white/10">
                {format.media.type === "video" ? (
                  <VisibleVideo
                    src={format.media.src}
                    poster={format.media.poster}
                    alt={format.media.alt}
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={format.media.src}
                    alt={format.media.alt}
                    onError={(event) => {
                      event.currentTarget.src =
                        "/images/MaisonNoir/gallery/private-dining-room.webp";
                    }}
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

                <p className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#C9A25B] backdrop-blur-xl">
                  {format.detail}
                </p>
              </div>

              <div className="p-7">
                <h3 className="font-serif text-3xl leading-tight text-white">
                  {format.title}
                </h3>

                <p className="mt-4 leading-7 text-white/50">{format.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="max-w-2xl text-white/45">
            Private dining is available by request. Our team will help shape the
            evening around the occasion, menu, wine, and pacing of service.
          </p>

          <motion.a
            href="#reserve"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={reduce ? undefined : { opacity: ctaOpacity }}
            className="inline-flex items-center gap-2 rounded-full bg-[#C9A25B] px-7 py-4 font-medium text-black transition hover:-translate-y-1 hover:bg-[#e0bd73]"
          >
            Request Private Dining
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
