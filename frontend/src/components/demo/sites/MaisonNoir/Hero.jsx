import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { useMaisonScroll } from "./scroll/MaisonScrollDirector";
import { MAISON_SCROLL_LOCKS } from "./scroll/scrollChoreography";

export default function Hero() {
  const sectionRef = useRef(null);
  const pointerRafRef = useRef(null);
  const touchStartYRef = useRef(null);
  const progressRef = useRef(0);
  const releaseScrollLockRef = useRef(null);

  const reduce = useReducedMotion();
  const { lockScroll, unlockScroll } = useMaisonScroll();

  const [pointer, setPointer] = useState({ x: 50, y: 58 });
  const [hasCompleted, setHasCompleted] = useState(false);

  const rawProgress = useMotionValue(0);

  const heroProgress = useSpring(rawProgress, {
    stiffness: 38,
    damping: 24,
    mass: 1.55,
  });

  const releaseHeroScrollLock = useCallback(() => {
    if (releaseScrollLockRef.current) {
      releaseScrollLockRef.current();
      releaseScrollLockRef.current = null;
      return;
    }

    unlockScroll(MAISON_SCROLL_LOCKS.hero);
  }, [unlockScroll]);

  const engageHeroScrollLock = useCallback(() => {
    if (releaseScrollLockRef.current) return;
    releaseScrollLockRef.current = lockScroll(MAISON_SCROLL_LOCKS.hero);
  }, [lockScroll]);

  const completeHeroReveal = useCallback(() => {
    progressRef.current = 1;
    rawProgress.set(1);
    setHasCompleted(true);
    releaseHeroScrollLock();
  }, [rawProgress, releaseHeroScrollLock]);

  const updateHeroProgress = useCallback(
    (delta) => {
      if (reduce || hasCompleted) return;

      const section = sectionRef.current;
      if (!section) return;

      engageHeroScrollLock();

      const rect = section.getBoundingClientRect();
      const targetY = window.scrollY + rect.top;

      window.scrollTo({
        top: targetY,
        behavior: "auto",
      });

      const cappedDelta = Math.max(Math.min(delta, 520), -520);
      const resistance = 4200;

      const nextProgress = Math.min(
        Math.max(progressRef.current + cappedDelta / resistance, 0),
        1
      );

      progressRef.current = nextProgress;
      rawProgress.set(nextProgress);

      if (nextProgress <= 0.001 && cappedDelta < 0) {
        releaseHeroScrollLock();
      }

      if (nextProgress >= 0.995) {
        completeHeroReveal();
      }
    },
    [
      completeHeroReveal,
      engageHeroScrollLock,
      hasCompleted,
      rawProgress,
      reduce,
      releaseHeroScrollLock,
    ]
  );

  useEffect(() => {
    if (reduce || hasCompleted) return;

    const isAtHeroGate = () => {
      const section = sectionRef.current;
      if (!section) return false;

      const rect = section.getBoundingClientRect();

      return (
        rect.top <= window.innerHeight * 0.12 &&
        rect.bottom >= window.innerHeight * 0.7
      );
    };

    const handleWheel = (event) => {
      if (!isAtHeroGate()) return;

      const scrollingForward = event.deltaY > 0;
      const alreadyStarted = progressRef.current > 0;

      if (scrollingForward || alreadyStarted) {
        event.preventDefault();
        updateHeroProgress(event.deltaY);
      }
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event) => {
      if (!isAtHeroGate()) return;

      const currentY = event.touches[0]?.clientY ?? null;
      const startY = touchStartYRef.current;

      if (currentY === null || startY === null) return;

      const delta = startY - currentY;
      const scrollingForward = delta > 0;
      const alreadyStarted = progressRef.current > 0;

      if (scrollingForward || alreadyStarted) {
        event.preventDefault();
        updateHeroProgress(delta * 3.2);
      }

      touchStartYRef.current = currentY;
    };

    const handleKeyDown = (event) => {
      if (!isAtHeroGate()) return;

      const forwardKeys = ["ArrowDown", "PageDown", " ", "End"];
      const backwardKeys = ["ArrowUp", "PageUp", "Home"];

      if (forwardKeys.includes(event.key)) {
        event.preventDefault();
        updateHeroProgress(420);
      }

      if (backwardKeys.includes(event.key) && progressRef.current > 0) {
        event.preventDefault();
        updateHeroProgress(-420);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      releaseHeroScrollLock();

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasCompleted, reduce, releaseHeroScrollLock, updateHeroProgress]);

  const heroScale = useTransform(heroProgress, [0, 0.5, 1], [1.24, 1.1, 1.03]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 34]);
  const heroRotate = useTransform(heroProgress, [0, 1], [0, -0.65]);

  const contentY = useTransform(heroProgress, [0, 0.34, 1], [34, 0, 0]);
  const contentOpacity = useTransform(heroProgress, [0, 0.12, 1], [0.92, 1, 1]);

  const giantY = useTransform(heroProgress, [0, 1], ["-8%", "5%"]);
  const giantX = useTransform(heroProgress, [0, 1], ["-2%", "2%"]);

  const frameScale = useTransform(heroProgress, [0, 1], [1, 0.94]);
  const frameOpacity = useTransform(heroProgress, [0, 1], [1, 0.56]);

  const progressScale = useTransform(heroProgress, [0, 1], [0, 1]);

  const thresholdLeftX = useTransform(heroProgress, [0, 0.5, 1], ["0%", "-18%", "-72%"]);
  const thresholdRightX = useTransform(heroProgress, [0, 0.5, 1], ["0%", "18%", "72%"]);
  const thresholdOpacity = useTransform(heroProgress, [0, 0.62, 1], [0.82, 0.48, 0.08]);
  const thresholdBlur = useTransform(
    heroProgress,
    [0, 0.62, 1],
    ["blur(0px)", "blur(3px)", "blur(8px)"]
  );

  const glowOpacity = useTransform(heroProgress, [0, 0.48, 1], [0.34, 0.78, 0.92]);

  const heroRevealOpacity = useTransform(
    heroProgress,
    [0, 0.28, 0.72],
    [0.68, 0.88, 1]
  );

  const heroRevealFilter = useTransform(
    heroProgress,
    [0, 0.32, 0.72],
    [
      "brightness(0.58) contrast(1.18) saturate(0.92) blur(12px)",
      "brightness(0.78) contrast(1.12) saturate(1) blur(6px)",
      "brightness(1) contrast(1.04) saturate(1.04) blur(0px)",
    ]
  );

  const arrivalShadeOpacity = useTransform(
    heroProgress,
    [0, 0.68, 1],
    [0.58, 0.24, 0]
  );

  const contentFilter = useTransform(
    heroProgress,
    [0, 0.28, 0.54],
    ["blur(12px)", "blur(5px)", "blur(0px)"]
  );

  const eyebrowOpacity = useTransform(heroProgress, [0.04, 0.16], [0, 1]);
  const eyebrowY = useTransform(heroProgress, [0.04, 0.16], [38, 0]);

  const headlineOneOpacity = useTransform(heroProgress, [0.16, 0.3], [0, 1]);
  const headlineOneY = useTransform(heroProgress, [0.16, 0.3], [76, 0]);

  const headlineTwoOpacity = useTransform(heroProgress, [0.3, 0.46], [0, 1]);
  const headlineTwoY = useTransform(heroProgress, [0.3, 0.46], [82, 0]);

  const headlineThreeOpacity = useTransform(heroProgress, [0.46, 0.62], [0, 1]);
  const headlineThreeY = useTransform(heroProgress, [0.46, 0.62], [88, 0]);

  const paragraphOpacity = useTransform(heroProgress, [0.62, 0.74], [0, 1]);
  const paragraphY = useTransform(heroProgress, [0.62, 0.74], [42, 0]);

  const ctaOpacity = useTransform(heroProgress, [0.74, 0.86], [0, 1]);
  const ctaY = useTransform(heroProgress, [0.74, 0.86], [38, 0]);

  const statsOpacity = useTransform(heroProgress, [0.84, 0.96], [0, 1]);
  const statsY = useTransform(heroProgress, [0.84, 0.96], [28, 0]);

  const scrollCueOpacity = useTransform(heroProgress, [0, 0.82, 1], [1, 0.7, 0]);
  const scrollCueY = useTransform(heroProgress, [0, 1], [0, 18]);

  const handlePointerMove = (event) => {
    if (reduce) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    if (pointerRafRef.current) {
      window.cancelAnimationFrame(pointerRafRef.current);
    }

    pointerRafRef.current = window.requestAnimationFrame(() => {
      setPointer({ x, y });
      pointerRafRef.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (pointerRafRef.current) {
        window.cancelAnimationFrame(pointerRafRef.current);
      }
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setPointer({ x: 50, y: 58 })}
      className="relative h-screen overflow-hidden bg-[#050302]"
    >
      {/* Scroll progress line */}
      <motion.div
        style={reduce ? undefined : { scaleX: progressScale }}
        className="fixed left-0 top-0 z-[9999] h-px w-full origin-left bg-gradient-to-r from-transparent via-[#C9A25B] to-transparent"
      />

      {/* Background image */}
      <motion.div
        style={
          reduce
            ? undefined
            : {
                scale: heroScale,
                y: heroY,
                rotate: heroRotate,
                opacity: heroRevealOpacity,
                filter: heroRevealFilter,
              }
        }
        className="absolute inset-0 origin-bottom"
      >
        <img
          src="/images/MaisonNoir/branding/hero.webp"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt="Luxury steak dinner at Maison Noir"
          className="absolute inset-0 h-full w-full object-cover object-[55%_64%] opacity-100"
        />
      </motion.div>

      {/* Deep cinematic overlays */}
      <motion.div
        style={reduce ? undefined : { opacity: glowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_66%,rgba(255,176,74,0.46),transparent_36%)]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(201,162,91,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_38%,rgba(255,105,36,0.20),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_92%,rgba(201,162,91,0.16),transparent_36%)]" />

      {/* Cursor-reactive light */}
      <div
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(246,211,139,0.22), transparent 32%)`,
        }}
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen transition-opacity duration-500"
      />

      {/* Dark shaping */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/34 to-[#050302]/82" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/10 to-black/72" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#050302] via-[#050302]/60 to-transparent" />
      <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.96)]" />

      <motion.div
        style={reduce ? undefined : { opacity: arrivalShadeOpacity }}
        className="absolute inset-0 z-[4] bg-[radial-gradient(circle_at_50%_58%,rgba(0,0,0,0.42),rgba(0,0,0,0.9)_72%)]"
      />

      <motion.div
        style={
          reduce
            ? undefined
            : {
                x: thresholdLeftX,
                opacity: thresholdOpacity,
                filter: thresholdBlur,
              }
        }
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] hidden w-[24vw] bg-gradient-to-r from-black via-black/82 to-transparent md:block"
      />

      <motion.div
        style={
          reduce
            ? undefined
            : {
                x: thresholdRightX,
                opacity: thresholdOpacity,
                filter: thresholdBlur,
              }
        }
        className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-[24vw] bg-gradient-to-l from-black via-black/82 to-transparent md:block"
      />

      {/* Subtle grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />

      {/* Giant ghost typography */}
      <motion.div
        style={reduce ? undefined : { y: giantY, x: giantX }}
        className="pointer-events-none absolute left-[-0.08em] top-[16%] z-[1] hidden select-none font-serif text-[clamp(8rem,19vw,21rem)] leading-none tracking-[-0.1em] text-white/[0.065] mix-blend-screen lg:block"
      >
        NOIR
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: giantY }}
        className="pointer-events-none absolute bottom-[9%] right-[-0.06em] z-[1] hidden select-none font-serif text-[clamp(5rem,13vw,15rem)] leading-none tracking-[-0.09em] text-[#C9A25B]/[0.055] md:block"
      >
        FIRE
      </motion.div>

      {/* Animated light beam */}
      <motion.div
        className="pointer-events-none absolute left-[-25%] top-[44%] z-[3] h-80 w-[150%] rotate-[-13deg] bg-gradient-to-r from-transparent via-[#FFD27A]/14 to-transparent blur-xl"
        initial={reduce ? false : { x: "-120%", opacity: 0 }}
        animate={reduce ? {} : { x: "120%", opacity: [0, 1, 0] }}
        transition={{ duration: 3.4, delay: 1.1, ease: "easeInOut" }}
      />

      {/* Floating atmosphere glows */}
      <motion.div
        className="absolute left-[9%] top-[24%] z-[3] h-32 w-32 rounded-full bg-[#C9A25B]/20 blur-3xl"
        animate={
          reduce
            ? {}
            : {
                x: [0, 18, -10, 0],
                y: [0, -12, 10, 0],
                opacity: [0.22, 0.56, 0.32, 0.22],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[8%] top-[46%] z-[3] h-40 w-40 rounded-full bg-orange-500/16 blur-3xl"
        animate={
          reduce
            ? {}
            : {
                x: [0, -16, 10, 0],
                y: [0, 14, -8, 0],
                opacity: [0.2, 0.48, 0.3, 0.2],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Interface frame */}
      <motion.div
        style={reduce ? undefined : { opacity: frameOpacity }}
        className="pointer-events-none absolute inset-x-5 top-5 z-20 hidden h-[calc(100svh-2.5rem)] rounded-[2rem] border border-white/10 md:block"
      />

      <motion.div
        style={reduce ? undefined : { scaleX: frameScale, opacity: frameOpacity }}
        className="pointer-events-none absolute left-8 right-8 top-8 z-20 hidden h-px origin-left bg-gradient-to-r from-transparent via-[#C9A25B]/70 to-transparent md:block"
      />

      <motion.div
        style={reduce ? undefined : { scaleY: frameScale, opacity: frameOpacity }}
        className="pointer-events-none absolute bottom-8 left-8 top-8 z-20 hidden w-px origin-top bg-gradient-to-b from-transparent via-[#C9A25B]/60 to-transparent md:block"
      />

      <motion.div
        style={reduce ? undefined : { scaleY: frameScale, opacity: frameOpacity }}
        className="pointer-events-none absolute bottom-8 right-8 top-8 z-20 hidden w-px origin-bottom bg-gradient-to-b from-transparent via-[#C9A25B]/45 to-transparent md:block"
      />

      {/* Main content */}
      <motion.div
        style={
          reduce
            ? undefined
            : {
                y: contentY,
                opacity: contentOpacity,
                filter: contentFilter,
              }
        }
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pb-16 pt-24 text-center sm:px-6 lg:pb-12"
      >
        <motion.p
          style={reduce ? undefined : { opacity: eyebrowOpacity, y: eyebrowY }}
          className="mb-6 text-[11px] uppercase tracking-[0.52em] text-[#C9A25B] sm:text-xs"
        >
          Maison Noir
        </motion.p>

        <h1 className="max-w-6xl font-serif text-[3.85rem] leading-[0.84] tracking-[-0.06em] text-white min-[390px]:text-[4.4rem] sm:text-[6.2rem] lg:text-[8.1rem]">
          <motion.span
            style={
              reduce
                ? undefined
                : {
                    opacity: headlineOneOpacity,
                    y: headlineOneY,
                  }
            }
            className="block"
          >
            The evening
          </motion.span>

          <motion.span
            style={
              reduce
                ? undefined
                : {
                    opacity: headlineTwoOpacity,
                    y: headlineTwoY,
                  }
            }
            className="block"
          >
            begins before
          </motion.span>

          <motion.span
            style={
              reduce
                ? undefined
                : {
                    opacity: headlineThreeOpacity,
                    y: headlineThreeY,
                  }
            }
            className="block"
          >
            you arrive.
          </motion.span>
        </h1>

        <motion.p
          style={reduce ? undefined : { opacity: paragraphOpacity, y: paragraphY }}
          className="mt-7 max-w-2xl text-sm uppercase leading-relaxed tracking-[0.18em] text-white/78 sm:text-base"
        >
          Fire, cellar, atmosphere, and a table prepared for the night ahead.
        </motion.p>

        <motion.div
          style={reduce ? undefined : { opacity: ctaOpacity, y: ctaY }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#reserve"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#C9A25B]/70 bg-[#C9A25B] px-8 py-4 text-black shadow-[0_0_65px_-24px_rgba(201,162,91,1)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#d8b36a] hover:shadow-[0_0_80px_-20px_rgba(201,162,91,1)]"
          >
            Reserve the Evening
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#full-menu"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-black/32 px-8 py-4 text-[#C9A25B] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A25B]/70 hover:bg-black/48"
          >
            Explore the Menu
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { opacity: statsOpacity, y: statsY }}
          className="mt-8 flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/70"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-[#C9A25B] text-[#C9A25B]" />
            4.9 Rating
          </span>

          <span className="text-[#C9A25B]/45">•</span>

          <span>2,000+ Guests</span>

          <span className="hidden text-[#C9A25B]/45 sm:inline">•</span>

          <span className="hidden sm:inline">Open Flame Dining</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={reduce ? undefined : { opacity: scrollCueOpacity, y: scrollCueY }}
        className="absolute bottom-9 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-[#C9A25B]"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full border border-[#C9A25B]/35 bg-black/30 p-3 backdrop-blur-xl"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>

        <span className="text-[9px] uppercase tracking-[0.35em] text-white/45">
          Enter
        </span>
      </motion.div>
    </section>
  );
}
