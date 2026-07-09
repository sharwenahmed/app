import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const OPENING_VIDEO_SRC = "/images/MaisonNoir/videos/hero/maison-noir-opening.mp4";
const POSTER_SRC = "/images/MaisonNoir/branding/hero.webp";

const wordmarkLetters = "MAISON NOIR".split("");
const taglineWords = ["STEAKHOUSE", "•", "COCKTAILS", "•", "PRIVATE DINING"];

function WordmarkLetter({ letter, index, progress, reduce }) {
  const isSpace = letter === " ";

  const center = wordmarkLetters.length / 2;
  const distanceFromCenter = index - center;

  const startX = distanceFromCenter * 8;
  const startY = index % 2 === 0 ? 18 : -18;
  const startRotate = index % 2 === 0 ? -2.5 : 2.5;

  const start = 0.22 + index * 0.01;
  const end = 0.48 + index * 0.01;

  const letterX = useTransform(progress, [start, end], [startX, 0]);
  const letterY = useTransform(progress, [start, end], [startY, 0]);
  const letterRotate = useTransform(progress, [start, end], [startRotate, 0]);

  const letterOpacity = useTransform(
    progress,
    [0.1, start, end],
    [isSpace ? 0 : 0.12, isSpace ? 0 : 0.38, isSpace ? 0 : 1]
  );

  const letterFilter = useTransform(
    progress,
    [start, end],
    ["blur(7px)", "blur(0px)"]
  );

  return (
    <motion.span
      style={
        reduce
          ? undefined
          : {
              x: letterX,
              y: letterY,
              rotate: letterRotate,
              opacity: letterOpacity,
              filter: letterFilter,
            }
      }
      className={isSpace ? "inline-block w-[0.28em] shrink-0" : "inline-block shrink-0"}
    >
      {isSpace ? "\u00A0" : letter}
    </motion.span>
  );
}

function PremiumMonogram({ progress, reduce }) {
  const groupOpacity = useTransform(
    progress,
    [0, 0.12, 0.78, 0.94],
    [0.82, 1, 1, 0]
  );

  const groupScale = useTransform(progress, [0, 0.54, 0.92], [0.92, 1, 1.08]);
  const groupY = useTransform(progress, [0, 0.54, 0.94], [12, 0, -24]);

  const frameDraw = useTransform(progress, [0.12, 0.38], [0, 1]);
  const frameOpacity = useTransform(progress, [0.08, 0.3, 0.86], [0, 0.75, 0.55]);

  const mDraw = useTransform(progress, [0.04, 0.34], [0, 1]);
  const nDraw = useTransform(progress, [0.12, 0.44], [0, 1]);
  const slashDraw = useTransform(progress, [0.24, 0.52], [0, 1]);

  const mX = useTransform(progress, [0.02, 0.38], [-28, 0]);
  const mY = useTransform(progress, [0.02, 0.38], [-18, 0]);
  const mRotate = useTransform(progress, [0.02, 0.38], [-4, 0]);

  const nX = useTransform(progress, [0.08, 0.44], [28, 0]);
  const nY = useTransform(progress, [0.08, 0.44], [18, 0]);
  const nRotate = useTransform(progress, [0.08, 0.44], [4, 0]);

  const slashX = useTransform(progress, [0.2, 0.52], [18, 0]);
  const slashY = useTransform(progress, [0.2, 0.52], [-28, 0]);
  const slashRotate = useTransform(progress, [0.2, 0.52], [-7, 0]);

  const shineX = useTransform(progress, [0.42, 0.76], ["-135%", "135%"]);
  const shineOpacity = useTransform(progress, [0.38, 0.5, 0.72, 0.82], [0, 0.9, 0.9, 0]);

  const diamondOpacity = useTransform(progress, [0.42, 0.58, 0.86], [0, 1, 0.7]);
  const diamondScale = useTransform(progress, [0.42, 0.58], [0.45, 1]);

  return (
    <motion.div
      style={
        reduce
          ? undefined
          : {
              opacity: groupOpacity,
              scale: groupScale,
              y: groupY,
            }
      }
      className="relative h-[11.5rem] w-[18rem] sm:h-[14rem] sm:w-[22rem] lg:h-[15.5rem] lg:w-[24.5rem]"
    >
      <svg
        viewBox="0 0 420 310"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mnGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2b8" />
            <stop offset="28%" stopColor="#d8b35f" />
            <stop offset="55%" stopColor="#9d6a28" />
            <stop offset="78%" stopColor="#f2d48a" />
            <stop offset="100%" stopColor="#b98636" />
          </linearGradient>

          <linearGradient id="mnDimGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6e4b20" />
            <stop offset="55%" stopColor="#c79d4b" />
            <stop offset="100%" stopColor="#4a3116" />
          </linearGradient>

          <filter id="mnGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="mnSoftGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.82  0 1 0 0 0.58  0 0 1 0 0.24  0 0 0 0.55 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M84 270 C84 270 121 286 210 286 C299 286 336 270 336 270"
          fill="none"
          stroke="url(#mnDimGold)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={reduce ? undefined : { pathLength: frameDraw, opacity: frameOpacity }}
        />

        <motion.path
          d="M84 42 C84 42 121 24 210 24 C299 24 336 42 336 42"
          fill="none"
          stroke="url(#mnDimGold)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={reduce ? undefined : { pathLength: frameDraw, opacity: frameOpacity }}
        />

        <path
          d="M98 250 L98 62 L160 172 L222 62 L222 250"
          fill="none"
          stroke="#4d3317"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.28"
        />

        <path
          d="M198 250 L198 62 L322 250 L322 62"
          fill="none"
          stroke="#4d3317"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        />

        <motion.g
          style={
            reduce
              ? undefined
              : {
                  x: mX,
                  y: mY,
                  rotate: mRotate,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }
          }
        >
          <motion.path
            d="M98 250 L98 62 L160 172 L222 62 L222 250"
            fill="none"
            stroke="url(#mnGold)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#mnGlow)"
            style={reduce ? undefined : { pathLength: mDraw }}
          />

          <motion.path
            d="M98 250 L98 62 L160 172 L222 62 L222 250"
            fill="none"
            stroke="#fff4bd"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.72"
            style={reduce ? undefined : { pathLength: mDraw }}
          />
        </motion.g>

        <motion.g
          style={
            reduce
              ? undefined
              : {
                  x: nX,
                  y: nY,
                  rotate: nRotate,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }
          }
        >
          <motion.path
            d="M198 250 L198 62 L322 250 L322 62"
            fill="none"
            stroke="url(#mnGold)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#mnGlow)"
            style={reduce ? undefined : { pathLength: nDraw }}
          />

          <motion.path
            d="M198 250 L198 62 L322 250 L322 62"
            fill="none"
            stroke="#fff4bd"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.68"
            style={reduce ? undefined : { pathLength: nDraw }}
          />
        </motion.g>

        <motion.g
          style={
            reduce
              ? undefined
              : {
                  x: slashX,
                  y: slashY,
                  rotate: slashRotate,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }
          }
        >
          <motion.path
            d="M250 68 L170 252"
            fill="none"
            stroke="url(#mnGold)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#mnSoftGlow)"
            style={reduce ? undefined : { pathLength: slashDraw }}
          />

          <motion.path
            d="M250 68 L170 252"
            fill="none"
            stroke="#fff6c7"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
            style={reduce ? undefined : { pathLength: slashDraw }}
          />
        </motion.g>

        <motion.g
          style={
            reduce
              ? undefined
              : {
                  opacity: diamondOpacity,
                  scale: diamondScale,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }
          }
        >
          <path d="M210 7 L218 16 L210 25 L202 16 Z" fill="url(#mnGold)" />
          <path d="M210 285 L218 294 L210 303 L202 294 Z" fill="url(#mnGold)" opacity="0.82" />
        </motion.g>
      </svg>

      <motion.div
        style={reduce ? undefined : { x: shineX, opacity: shineOpacity }}
        className="pointer-events-none absolute inset-y-2 left-[-45%] w-[55%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent blur-md"
      />
    </motion.div>
  );
}

export default function OpeningArrivalGate() {
  const sectionRef = useRef(null);
  const releaseTimerRef = useRef(null);
  const touchStartYRef = useRef(null);
  const progressRef = useRef(0);

  const reduce = useReducedMotion();
  const [hasCompleted, setHasCompleted] = useState(false);

  const rawProgress = useMotionValue(0);

  const cinematicProgress = useSpring(rawProgress, {
    stiffness: 34,
    damping: 24,
    mass: 1.65,
  });

  const completeArrival = useCallback(() => {
    setHasCompleted(true);
    progressRef.current = 1;
    rawProgress.set(1);

    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current);
    }

    releaseTimerRef.current = window.setTimeout(() => {
      const hero = document.getElementById("top");

      if (hero) {
        hero.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 620);
  }, [rawProgress]);

  const updateGateProgress = useCallback(
    (delta) => {
      if (hasCompleted) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const targetY = window.scrollY + rect.top;

      window.scrollTo({
        top: targetY,
        behavior: "auto",
      });

      const resistance = 3350;

      const nextProgress = Math.min(
        Math.max(progressRef.current + delta / resistance, 0),
        1
      );

      progressRef.current = nextProgress;
      rawProgress.set(nextProgress);

      if (nextProgress >= 0.995) {
        completeArrival();
      }
    },
    [completeArrival, hasCompleted, rawProgress]
  );

  useEffect(() => {
    const isAtGate = () => {
      const section = sectionRef.current;
      if (!section || hasCompleted) return false;

      const rect = section.getBoundingClientRect();

      return (
        rect.top <= window.innerHeight * 0.86 &&
        rect.bottom >= window.innerHeight * 0.18
      );
    };

    const handleWheel = (event) => {
      if (!isAtGate()) return;

      const scrollingForward = event.deltaY > 0;
      const alreadyStarted = progressRef.current > 0;

      if (scrollingForward || alreadyStarted) {
        event.preventDefault();
        updateGateProgress(event.deltaY);
      }
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event) => {
      if (!isAtGate()) return;

      const currentY = event.touches[0]?.clientY ?? null;
      const startY = touchStartYRef.current;

      if (currentY === null || startY === null) return;

      const delta = startY - currentY;
      const scrollingForward = delta > 0;
      const alreadyStarted = progressRef.current > 0;

      if (scrollingForward || alreadyStarted) {
        event.preventDefault();
        updateGateProgress(delta * 3.4);
      }

      touchStartYRef.current = currentY;
    };

    const handleKeyDown = (event) => {
      if (!isAtGate()) return;

      const forwardKeys = ["ArrowDown", "PageDown", " ", "End"];
      const backwardKeys = ["ArrowUp", "PageUp", "Home"];

      if (forwardKeys.includes(event.key)) {
        event.preventDefault();
        updateGateProgress(420);
      }

      if (backwardKeys.includes(event.key) && progressRef.current > 0) {
        event.preventDefault();
        updateGateProgress(-420);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasCompleted, updateGateProgress]);

  const roomOpacity = useTransform(cinematicProgress, [0, 1], [1, 1]);

  const roomScale = useTransform(
    cinematicProgress,
    [0, 0.72, 1],
    [1.1, 1.04, 1]
  );

  const roomFilter = useTransform(
    cinematicProgress,
    [0, 0.68, 1],
    [
      "brightness(1.45) contrast(1.08) saturate(1.22) blur(2px)",
      "brightness(1.62) contrast(1.05) saturate(1.18) blur(1px)",
      "brightness(1.72) contrast(1.02) saturate(1.12) blur(0px)",
    ]
  );

  const darknessOpacity = useTransform(
    cinematicProgress,
    [0, 0.72, 0.92, 1],
    [0.12, 0.18, 0.08, 0]
  );

  const logoPlateOpacity = useTransform(
    cinematicProgress,
    [0, 0.2, 0.78, 0.96],
    [0.38, 0.46, 0.36, 0]
  );

  const logoGroupY = useTransform(cinematicProgress, [0, 0.72, 1], [8, 0, -34]);

  const logoGroupScale = useTransform(
    cinematicProgress,
    [0, 0.72, 1],
    [0.96, 1, 1.06]
  );

  const wordmarkOpacity = useTransform(
    cinematicProgress,
    [0.12, 0.42, 0.82, 0.95],
    [0.18, 1, 1, 0]
  );

  const wordmarkY = useTransform(
    cinematicProgress,
    [0.12, 0.52, 0.94],
    [28, 0, -26]
  );

  const lineScale = useTransform(cinematicProgress, [0.46, 0.66], [0, 1]);
  const lineOpacity = useTransform(cinematicProgress, [0.42, 0.66, 0.92], [0, 1, 0]);

  const diamondOpacity = useTransform(cinematicProgress, [0.52, 0.7, 0.92], [0, 1, 0]);
  const diamondRotate = useTransform(cinematicProgress, [0.52, 0.72], [45, 0]);

  const taglineOpacity = useTransform(
    cinematicProgress,
    [0.6, 0.78, 0.9, 0.98],
    [0, 1, 1, 0]
  );

  const taglineY = useTransform(cinematicProgress, [0.6, 0.78, 0.98], [18, 0, -18]);

  const curtainTopY = useTransform(
    cinematicProgress,
    [0, 0.34, 0.76, 0.94, 1],
    ["-62%", "-38%", "-38%", "-78%", "-116%"]
  );

  const curtainBottomY = useTransform(
    cinematicProgress,
    [0, 0.34, 0.76, 0.94, 1],
    ["62%", "38%", "38%", "78%", "116%"]
  );

  const apertureScaleX = useTransform(
    cinematicProgress,
    [0.72, 0.9, 1],
    [0, 1.1, 1.55]
  );

  const apertureOpacity = useTransform(
    cinematicProgress,
    [0.68, 0.88, 1],
    [0, 0.9, 0]
  );

  const sweepX = useTransform(cinematicProgress, [0.16, 0.94], ["-165%", "165%"]);

  const sweepOpacity = useTransform(
    cinematicProgress,
    [0.12, 0.34, 0.72, 0.96],
    [0, 0.72, 0.72, 0]
  );

  const progressScale = useTransform(cinematicProgress, [0, 1], [0, 1]);

  const statusOpacity = useTransform(
    cinematicProgress,
    [0.12, 0.3, 0.86, 0.98],
    [0, 1, 1, 0]
  );

  const statusY = useTransform(cinematicProgress, [0.12, 0.32, 1], [18, 0, -18]);

  return (
    <section
      ref={sectionRef}
      aria-label="Maison Noir logo assembly"
      className="relative z-40 h-screen bg-[#050404]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050404]">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          style={
            reduce
              ? {
                  opacity: 1,
                  filter: "brightness(1.35) contrast(1.04) saturate(1.14)",
                }
              : {
                  opacity: roomOpacity,
                  scale: roomScale,
                  filter: roomFilter,
                }
          }
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        >
          <source src={OPENING_VIDEO_SRC} type="video/mp4" />
        </motion.video>

        <motion.div
          style={reduce ? undefined : { opacity: darknessOpacity }}
          className="absolute inset-0 z-10 bg-black"
        />

        <div className="absolute inset-0 z-[11] bg-[radial-gradient(circle_at_50%_45%,transparent,rgba(0,0,0,0.48)_74%)]" />
        <div className="absolute inset-0 z-[12] bg-[linear-gradient(90deg,rgba(0,0,0,0.34),transparent_42%,rgba(0,0,0,0.38))]" />
        <div className="absolute inset-0 z-[13] shadow-[inset_0_0_90px_rgba(0,0,0,0.55)]" />

        <div className="pointer-events-none absolute inset-0 z-[14] opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />

        <motion.div
          style={reduce ? undefined : { y: curtainTopY }}
          className="absolute left-0 right-0 top-0 z-20 h-[56%] bg-[linear-gradient(180deg,#000000,rgba(3,3,3,0.86),rgba(8,6,5,0.52))]"
        />

        <motion.div
          style={reduce ? undefined : { y: curtainBottomY }}
          className="absolute bottom-0 left-0 right-0 z-20 h-[56%] bg-[linear-gradient(0deg,#000000,rgba(3,3,3,0.86),rgba(8,6,5,0.52))]"
        />

        <motion.div
          style={reduce ? undefined : { scaleX: apertureScaleX, opacity: apertureOpacity }}
          className="absolute left-1/2 top-1/2 z-[28] h-px w-[92vw] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-[#D8B35F] to-transparent shadow-[0_0_56px_rgba(216,179,95,0.85)]"
        />

        <motion.div
          style={reduce ? undefined : { scaleX: apertureScaleX, opacity: apertureOpacity }}
          className="absolute left-1/2 top-[calc(50%-18px)] z-[28] h-px w-[70vw] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        <motion.div
          style={reduce ? undefined : { scaleX: apertureScaleX, opacity: apertureOpacity }}
          className="absolute left-1/2 top-[calc(50%+18px)] z-[28] h-px w-[70vw] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-[#D8B35F]/35 to-transparent"
        />

        <motion.div
          style={reduce ? undefined : { x: sweepX, opacity: sweepOpacity }}
          className="absolute inset-y-0 left-[-44%] z-30 w-[72vw] rotate-[-13deg] bg-gradient-to-r from-transparent via-[#D8B35F]/65 to-transparent blur-xl"
        />

        <motion.div
          style={reduce ? undefined : { x: sweepX, opacity: sweepOpacity }}
          className="absolute inset-y-0 left-[-64%] z-30 w-[96vw] rotate-[8deg] bg-gradient-to-r from-transparent via-white/18 to-transparent blur-2xl"
        />

        <motion.div
          style={reduce ? undefined : { opacity: logoPlateOpacity }}
          className="absolute left-1/2 top-1/2 z-[35] h-[min(36rem,82vh)] w-[min(54rem,94vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.5)_38%,transparent_72%)] blur-sm"
        />

        <div className="absolute inset-0 z-40 flex items-center justify-center px-5 text-center">
          <motion.div
            style={
              reduce
                ? undefined
                : {
                    y: logoGroupY,
                    scale: logoGroupScale,
                  }
            }
            className="relative z-10 flex w-full max-w-5xl flex-col items-center"
          >
            <PremiumMonogram progress={cinematicProgress} reduce={reduce} />

            <motion.div
              style={reduce ? undefined : { opacity: wordmarkOpacity, y: wordmarkY }}
              className="mt-1 flex max-w-[96vw] flex-nowrap justify-center gap-[0.12em] whitespace-nowrap font-serif text-[clamp(1.55rem,4.8vw,5.1rem)] leading-none tracking-[0.08em] text-[#D8B35F] drop-shadow-[0_0_22px_rgba(216,179,95,0.28)] sm:gap-[0.2em] sm:tracking-[0.13em] lg:gap-[0.26em] lg:tracking-[0.16em]"
            >
              {wordmarkLetters.map((letter, index) => (
                <WordmarkLetter
                  key={`${letter}-${index}`}
                  letter={letter}
                  index={index}
                  progress={cinematicProgress}
                  reduce={reduce}
                />
              ))}
            </motion.div>

            <div className="mt-7 flex w-[min(32rem,76vw)] items-center justify-center gap-3">
              <motion.div
                style={reduce ? undefined : { scaleX: lineScale, opacity: lineOpacity }}
                className="h-px flex-1 origin-right bg-gradient-to-r from-transparent via-[#D8B35F] to-[#D8B35F]"
              />

              <motion.div
                style={reduce ? undefined : { opacity: diamondOpacity, rotate: diamondRotate }}
                className="relative h-5 w-5"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#D8B35F]" />
                <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#D8B35F]/75" />
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#D8B35F]/55" />
                <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#D8B35F]/55" />
              </motion.div>

              <motion.div
                style={reduce ? undefined : { scaleX: lineScale, opacity: lineOpacity }}
                className="h-px flex-1 origin-left bg-gradient-to-l from-transparent via-[#D8B35F] to-[#D8B35F]"
              />
            </div>

            <motion.div
              style={reduce ? undefined : { opacity: taglineOpacity, y: taglineY }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] uppercase tracking-[0.38em] text-[#D8B35F]/90 sm:text-[11px] sm:tracking-[0.46em]"
            >
              {taglineWords.map((word, index) => (
                <span key={`${word}-${index}`}>{word}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={reduce ? undefined : { opacity: statusOpacity, y: statusY }}
          className="absolute bottom-12 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-4 rounded-full border border-[#D8B35F]/15 bg-black/36 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-white/48 backdrop-blur-2xl md:flex"
        >
          <span>Maison Noir</span>
          <span className="h-px w-10 bg-[#D8B35F]/60" />
          <span className="text-[#D8B35F]">Scroll to compose</span>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 z-[60] h-px w-[min(36rem,72vw)] -translate-x-1/2 overflow-hidden bg-white/10">
          <motion.div
            style={reduce ? undefined : { scaleX: progressScale }}
            className="h-full w-full origin-left bg-gradient-to-r from-transparent via-[#D8B35F] to-transparent"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-8 top-8 z-50 hidden h-px bg-gradient-to-r from-transparent via-[#D8B35F]/30 to-transparent md:block" />
        <div className="pointer-events-none absolute bottom-8 left-8 top-8 z-50 hidden w-px bg-gradient-to-b from-transparent via-[#D8B35F]/24 to-transparent md:block" />
        <div className="pointer-events-none absolute bottom-8 right-8 top-8 z-50 hidden w-px bg-gradient-to-b from-transparent via-white/12 to-transparent md:block" />
      </div>
    </section>
  );
}