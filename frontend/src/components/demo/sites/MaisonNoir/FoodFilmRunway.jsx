import React, { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";

const foodFilms = [
  {
    number: "01",
    eyebrow: "The Coast",
    title: "Sea broil",
    description:
      "Cold-water seafood touched by flame, smoke, and a final moment of restraint.",
    video: "/images/MaisonNoir/videos/food-runway/seaBroil.mp4",
    mobileShape: "aspect-[16/10]",
    width: "clamp(13rem, 18vw, 22rem)",
    height: "clamp(8rem, 12vw, 15rem)",
    x: -290,
    y: 110,
    z: -80,
    rotateX: 2,
    rotateY: 22,
    rotateZ: -6,
    scrollX: 80,
    scrollY: -80,
    scrollZ: 120,
    scrollRotY: -24,
    scrollRotZ: 10,
  },
  {
    number: "02",
    eyebrow: "The Cut",
    title: "Tomahawk",
    description:
      "A centerpiece built for the table — carved slowly, served with ceremony.",
    video: "/images/MaisonNoir/videos/food-runway/tomahawk.mp4",
    mobileShape: "aspect-[16/9]",
    width: "clamp(15rem, 22vw, 27rem)",
    height: "clamp(9rem, 13vw, 16rem)",
    x: 0,
    y: -70,
    z: 80,
    rotateX: -2,
    rotateY: -5,
    rotateZ: 1,
    scrollX: -60,
    scrollY: 70,
    scrollZ: -80,
    scrollRotY: 28,
    scrollRotZ: -6,
  },
  {
    number: "03",
    eyebrow: "Open Flame",
    title: "Steak flipping",
    description:
      "Heat, timing, and instinct. The kitchen speaks before the dining room does.",
    video: "/images/MaisonNoir/videos/food-runway/steakFlipping.mp4",
    mobileShape: "aspect-[4/5]",
    width: "clamp(10rem, 15vw, 18rem)",
    height: "clamp(14rem, 22vw, 26rem)",
    x: 300,
    y: -105,
    z: -130,
    rotateX: 4,
    rotateY: -26,
    rotateZ: 8,
    scrollX: -90,
    scrollY: 120,
    scrollZ: 140,
    scrollRotY: -34,
    scrollRotZ: -10,
  },
  {
    number: "04",
    eyebrow: "At The Table",
    title: "Two steaks",
    description: "The evening slows down when the plates arrive together.",
    video: "/images/MaisonNoir/videos/food-runway/TwoSteakOnTable.mp4",
    mobileShape: "aspect-[16/10]",
    width: "clamp(12rem, 17vw, 21rem)",
    height: "clamp(8rem, 11vw, 14rem)",
    x: -230,
    y: -210,
    z: -240,
    rotateX: -5,
    rotateY: 32,
    rotateZ: 10,
    scrollX: 140,
    scrollY: 130,
    scrollZ: 190,
    scrollRotY: -42,
    scrollRotZ: -12,
  },
  {
    number: "05",
    eyebrow: "Final Course",
    title: "Chocolate cake",
    description:
      "Dark chocolate, soft light, and one final indulgence after the fire.",
    video: "/images/MaisonNoir/videos/food-runway/chocolateCake.mp4",
    mobileShape: "aspect-[4/5]",
    width: "clamp(10rem, 14vw, 18rem)",
    height: "clamp(14rem, 22vw, 26rem)",
    x: 235,
    y: 195,
    z: -270,
    rotateX: 6,
    rotateY: -34,
    rotateZ: -8,
    scrollX: -120,
    scrollY: -120,
    scrollZ: 230,
    scrollRotY: 44,
    scrollRotZ: 12,
  },
];

const emberParticles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${5 + ((index * 11) % 90)}%`,
  delay: index * 0.26,
  duration: 7 + (index % 7),
  size: index % 5 === 0 ? "h-1.5 w-1.5" : "h-1 w-1",
}));

function DesktopVortexCard({ film, index, setCardRef }) {
  return (
    <article
      ref={(element) => setCardRef(element, index)}
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: film.width,
        height: film.height,
        transformStyle: "preserve-3d",
        transform: `translate3d(calc(-50% + ${film.x}px), calc(-50% + ${film.y}px), ${film.z}px) rotateX(${film.rotateX}deg) rotateY(${film.rotateY}deg) rotateZ(${film.rotateZ}deg)`,
      }}
    >
      <div className="group relative h-full w-full overflow-hidden border border-[#C9A25B]/22 bg-black/45 shadow-[0_55px_150px_-90px_rgba(201,162,91,0.85)]">
        <div className="pointer-events-none absolute -inset-8 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,91,0.14),transparent_64%)] blur-2xl" />
        <div className="pointer-events-none absolute inset-3 z-20 border border-[#C9A25B]/16" />

        <video
          src={film.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="relative z-10 h-full w-full object-cover opacity-95 transition duration-[1800ms] group-hover:scale-[1.03]"
        />

        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/78 via-black/12 to-black/28" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_55%,transparent,rgba(0,0,0,0.52)_82%)]" />

        <motion.div
          initial={{ x: "-130%", opacity: 0 }}
          animate={{ x: "140%", opacity: [0, 0.28, 0] }}
          transition={{
            duration: 4.8 + index * 0.2,
            delay: index * 0.42,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-y-0 left-[-45%] z-30 w-[48%] rotate-[13deg] bg-gradient-to-r from-transparent via-white/14 to-transparent blur-xl"
        />

        <div className="absolute bottom-4 left-4 right-4 z-30">
          <p className="mb-2 text-[8px] uppercase tracking-[0.38em] text-[#C9A25B]/78">
            {film.number} / {film.eyebrow}
          </p>

          <h3 className="font-serif text-[clamp(2rem,3vw,3.7rem)] leading-[0.82] tracking-[-0.07em] text-white">
            {film.title}
          </h3>
        </div>
      </div>
    </article>
  );
}

function MobileFilmCard({ film, index }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 70, filter: "blur(12px)" }}
      whileInView={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{
        duration: 1.1,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div className="pointer-events-none absolute -inset-5 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,91,0.14),transparent_70%)] blur-2xl" />

      <div
        className={`relative overflow-hidden border border-[#C9A25B]/22 bg-black/40 shadow-[0_45px_120px_-70px_rgba(201,162,91,0.75)] ${film.mobileShape}`}
      >
        <div className="pointer-events-none absolute inset-3 z-20 border border-[#C9A25B]/16" />

        <video
          src={film.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-95"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-black/18" />

        <div className="absolute bottom-5 left-5 right-5">
          <p className="mb-3 text-[9px] uppercase tracking-[0.38em] text-[#C9A25B]/78">
            {film.number} / {film.eyebrow}
          </p>

          <h3 className="font-serif text-5xl leading-[0.82] tracking-[-0.07em] text-white">
            {film.title}
          </h3>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-white/52">
        {film.description}
      </p>
    </motion.article>
  );
}

export function FoodFilmRunway() {
  const sectionRef = useRef(null);
  const vortexRef = useRef(null);
  const centerTextRef = useRef(null);
  const subTextRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);

  const progressRef = useRef(0);
  const gateActiveRef = useRef(false);
  const gateCompleteRef = useRef(false);

  const reduce = useReducedMotion();

  const setCardRef = (element, index) => {
    cardRefs.current[index] = element;
  };

  useLayoutEffect(() => {
    if (reduce) return undefined;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1280px)", () => {
      const cards = cardRefs.current.filter(Boolean);

      if (
        !sectionRef.current ||
        !vortexRef.current ||
        !centerTextRef.current ||
        !subTextRef.current ||
        !ringRef.current ||
        cards.length === 0
      ) {
        return undefined;
      }

      const clamp = gsap.utils.clamp(0, 1);

      const getSectionTop = () =>
        sectionRef.current.getBoundingClientRect().top + window.scrollY;

      const lockToSection = () => {
        const top = getSectionTop();
        window.scrollTo({
          top,
          left: 0,
          behavior: "auto",
        });
      };

      const renderScene = (progress, immediate = false) => {
        const duration = immediate ? 0 : 0.42;
        const textIn = clamp(progress / 0.1);
        const textOut = clamp((progress - 0.34) / 0.34);
        const textOpacity = textIn * (1 - textOut);
        const subOpacity = textIn * (1 - textOut * 0.95);

        gsap.to(vortexRef.current, {
          rotationY: -360 * progress,
          rotationX: -5 + 3 * progress,
          y: 92 - 58 * progress,
          z: -500 + 160 * progress,
          scale: 1 + 0.1 * progress,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(ringRef.current, {
          rotationZ: 240 * progress,
          scale: 0.82 + 0.42 * progress,
          opacity: 0.16 + 0.18 * progress,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(cards, {
          x: (index) => foodFilms[index].x + foodFilms[index].scrollX * progress,
          y: (index) => foodFilms[index].y + foodFilms[index].scrollY * progress,
          z: (index) => foodFilms[index].z + foodFilms[index].scrollZ * progress,
          rotationX: (index) => foodFilms[index].rotateX,
          rotationY: (index) =>
            foodFilms[index].rotateY + foodFilms[index].scrollRotY * progress,
          rotationZ: (index) =>
            foodFilms[index].rotateZ + foodFilms[index].scrollRotZ * progress,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(centerTextRef.current, {
          opacity: textOpacity,
          y: 38 * (1 - textIn) - 54 * textOut,
          scale: 1 - 0.08 * textOut,
          filter: `blur(${16 * (1 - textIn) + 10 * textOut}px)`,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(subTextRef.current, {
          opacity: subOpacity,
          y: 26 * (1 - textIn) - 34 * textOut,
          filter: `blur(${12 * (1 - textIn) + 7 * textOut}px)`,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      gsap.set(vortexRef.current, {
        transformStyle: "preserve-3d",
        transformPerspective: 2800,
        rotationX: -5,
        rotationY: 0,
        y: 92,
        z: -500,
        scale: 1,
      });

      gsap.set(cards, {
        opacity: 1,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
      });

      cards.forEach((card, index) => {
        const film = foodFilms[index];

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: film.x,
          y: film.y,
          z: film.z,
          rotationX: film.rotateX,
          rotationY: film.rotateY,
          rotationZ: film.rotateZ,
        });
      });

      gsap.set(ringRef.current, {
        opacity: 0.16,
        rotationZ: 0,
        scale: 0.82,
      });

      gsap.set(centerTextRef.current, {
        opacity: 0,
        y: 38,
        scale: 1,
        filter: "blur(16px)",
      });

      gsap.set(subTextRef.current, {
        opacity: 0,
        y: 26,
        filter: "blur(12px)",
      });

      renderScene(0, true);

      const activateGate = () => {
        if (gateCompleteRef.current) return;
        gateActiveRef.current = true;
        lockToSection();
      };

      const completeGate = () => {
        progressRef.current = 1;
        gateActiveRef.current = false;
        gateCompleteRef.current = true;
        renderScene(1);
      };

      const resetGateIfAbove = () => {
        const sectionTop = getSectionTop();

        if (window.scrollY < sectionTop - window.innerHeight * 0.25) {
          progressRef.current = 0;
          gateActiveRef.current = false;
          gateCompleteRef.current = false;
          renderScene(0, true);
        }
      };

      const handleWheel = (event) => {
        const sectionTop = getSectionTop();
        const y = window.scrollY;
        const viewport = window.innerHeight;

        const isInsideVortex =
          y >= sectionTop - 4 && y < sectionTop + viewport * 0.75;

        const isApproachingVortex =
          event.deltaY > 0 &&
          y >= sectionTop - viewport * 0.45 &&
          y < sectionTop;

        if (
          !gateCompleteRef.current &&
          (gateActiveRef.current || isInsideVortex || isApproachingVortex)
        ) {
          event.preventDefault();
          event.stopPropagation();

          activateGate();

          const lockDistance = Math.max(window.innerHeight * 7, 4200);
          const nextProgress = clamp(
            progressRef.current + event.deltaY / lockDistance
          );

          progressRef.current = nextProgress;
          renderScene(nextProgress);

          if (nextProgress >= 1) {
            completeGate();
          }
        }
      };

      const handleKeyDown = (event) => {
        const sectionTop = getSectionTop();
        const y = window.scrollY;
        const viewport = window.innerHeight;

        const keys = [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          " ",
          "Spacebar",
        ];

        if (!keys.includes(event.key)) return;

        const isNearVortex =
          y >= sectionTop - viewport * 0.3 &&
          y < sectionTop + viewport * 0.75;

        if (!gateCompleteRef.current && (gateActiveRef.current || isNearVortex)) {
          event.preventDefault();

          activateGate();

          const direction =
            event.key === "ArrowUp" || event.key === "PageUp" ? -1 : 1;

          const step =
            event.key === "ArrowDown" || event.key === "ArrowUp"
              ? 1 / 14
              : 1 / 7;

          const nextProgress = clamp(progressRef.current + direction * step);

          progressRef.current = nextProgress;
          renderScene(nextProgress);

          if (nextProgress >= 1) {
            completeGate();
          }

          if (nextProgress <= 0 && direction < 0) {
            gateActiveRef.current = false;
          }
        }
      };

      const handleScroll = () => {
        if (gateActiveRef.current && !gateCompleteRef.current) {
          lockToSection();
        }

        resetGateIfAbove();
      };

      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("scroll", handleScroll);
      };
    });

    return () => {
      matchMedia.revert();
    };
  }, [reduce]);

  return (
    <section
      id="food-film-runway"
      ref={sectionRef}
      className="relative bg-[#050302] xl:h-screen xl:overflow-visible"
    >
      {/* XL screen 3D vortex */}
      <div className="relative hidden h-screen overflow-hidden bg-[#050302] xl:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,162,91,0.14),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_70%,rgba(74,20,24,0.32),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_20%,rgba(119,63,139,0.16),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060403] via-transparent to-[#050302]" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_210px_rgba(0,0,0,0.98)]" />

        {!reduce &&
          emberParticles.map((particle) => (
            <motion.span
              key={particle.id}
              className={`pointer-events-none absolute bottom-[-4rem] rounded-full bg-[#C9A25B]/55 blur-[1px] ${particle.size}`}
              style={{ left: particle.left }}
              animate={{
                y: ["0vh", "-110vh"],
                x: [0, particle.id % 2 === 0 ? 22 : -22, 0],
                opacity: [0, 0.3, 0.1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

        <div className="absolute left-6 top-6 z-40 flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-white/36">
          <span>Maison Noir</span>
          <span className="h-px w-14 bg-[#C9A25B]/38" />
          <span>360° scroll vortex</span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-40 flex items-center justify-between text-[10px] uppercase tracking-[0.36em] text-white/30">
          <span>Scroll to rotate</span>
          <span>One full turn to continue</span>
        </div>

        <div
          className="absolute inset-0"
          style={{
            perspective: "2800px",
            perspectiveOrigin: "50% 56%",
          }}
        >
          <div
            ref={ringRef}
            className="pointer-events-none absolute left-1/2 top-[58%] h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A25B]/18"
          />

          <div
            ref={vortexRef}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {foodFilms.map((film, index) => (
              <DesktopVortexCard
                key={film.video}
                film={film}
                index={index}
                setCardRef={setCardRef}
              />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-30 flex translate-y-16 items-center justify-center px-6 text-center">
          <div className="max-w-5xl">
            <p
              ref={subTextRef}
              className="mb-7 text-xs uppercase tracking-[0.54em] text-[#C9A25B]"
            >
              Food Film Runway
            </p>

            <h2
              ref={centerTextRef}
              className="font-serif text-[clamp(4rem,8vw,8.5rem)] leading-[0.78] tracking-[-0.085em] text-white"
            >
              The night moves
              <br />
              around the flame.
            </h2>
          </div>
        </div>
      </div>

      {/* Below XL: clean cinematic stack */}
      <div className="relative bg-[#050302] px-6 py-28 xl:hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(201,162,91,0.1),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_46%,rgba(74,20,24,0.28),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.96)]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20 text-center"
          >
            <p className="mb-5 text-xs uppercase tracking-[0.5em] text-[#C9A25B]">
              Food Film Runway
            </p>

            <h2 className="font-serif text-[clamp(4rem,10vw,7rem)] leading-[0.82] tracking-[-0.075em] text-white">
              The night moves around the flame.
            </h2>

            <p className="mx-auto mt-6 max-w-sm text-sm uppercase leading-relaxed tracking-[0.18em] text-white/42">
              A cinematic sequence of fire, texture, plating, and silence.
            </p>
          </motion.div>

          <div className="space-y-24">
            {foodFilms.map((film, index) => (
              <MobileFilmCard key={film.video} film={film} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FoodFilmRunway;