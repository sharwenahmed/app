import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMaisonScroll } from "./scroll/MaisonScrollDirector";
import { MAISON_SCROLL_LOCKS } from "./scroll/scrollChoreography";

export default function SignatureToFullMenuTransition() {
  const sectionRef = useRef(null);
  const releaseTimerRef = useRef(null);
  const touchStartYRef = useRef(null);
  const progressRef = useRef(0);
  const releaseScrollLockRef = useRef(null);

  const reduce = useReducedMotion();
  const { lockScroll, scrollTo, unlockScroll } = useMaisonScroll();

  const [hasCompleted, setHasCompleted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const rawProgress = useMotionValue(0);

  const cinematicProgress = useSpring(rawProgress, {
    stiffness: 42,
    damping: 24,
    mass: 1.45,
  });

  const releaseTransitionScrollLock = useCallback(() => {
    if (releaseScrollLockRef.current) {
      releaseScrollLockRef.current();
      releaseScrollLockRef.current = null;
      return;
    }

    unlockScroll(MAISON_SCROLL_LOCKS.signatureToMenu);
  }, [unlockScroll]);

  const engageTransitionScrollLock = useCallback(() => {
    if (releaseScrollLockRef.current) return;
    releaseScrollLockRef.current = lockScroll(MAISON_SCROLL_LOCKS.signatureToMenu);
  }, [lockScroll]);

  const completeTransition = useCallback(() => {
    setHasCompleted(true);
    setIsLocked(false);
    rawProgress.set(1);
    progressRef.current = 1;

    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current);
    }

    releaseTimerRef.current = window.setTimeout(() => {
      const fullMenu = document.getElementById("full-menu");

      if (fullMenu) {
        scrollTo(fullMenu, {
          behavior: "smooth",
          offset: 0,
          duration: 0.95,
        });
      }

      releaseTransitionScrollLock();
    }, 520);
  }, [rawProgress, releaseTransitionScrollLock, scrollTo]);

  const resetIfAboveTransition = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();

    if (rect.top > window.innerHeight * 0.55) {
      setHasCompleted(false);
      setIsLocked(false);
      progressRef.current = 0;
      rawProgress.set(0);
      releaseTransitionScrollLock();
    }
  }, [rawProgress, releaseTransitionScrollLock]);

  const snapToGate = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const targetY = window.scrollY + rect.top;

    window.scrollTo({
      top: targetY,
      behavior: "auto",
    });
  }, []);

  const updateGateProgress = useCallback(
    (delta) => {
      if (hasCompleted) return;

      setIsLocked(true);
      engageTransitionScrollLock();
      snapToGate();
  
      const resistance = 2850;
  
      const nextProgress = Math.min(
        Math.max(progressRef.current + delta / resistance, 0),
        1
      );
  
      progressRef.current = nextProgress;
      rawProgress.set(nextProgress);

      if (nextProgress <= 0.001 && delta < 0) {
        setIsLocked(false);
        releaseTransitionScrollLock();
      }
  
      if (nextProgress >= 0.995) {
        completeTransition();
      }
    },
    [
      completeTransition,
      engageTransitionScrollLock,
      hasCompleted,
      rawProgress,
      releaseTransitionScrollLock,
      snapToGate,
    ]
  );

  useEffect(() => {
    const isAtGateZone = () => {
      const section = sectionRef.current;
      if (!section || hasCompleted) return false;
  
      const rect = section.getBoundingClientRect();
  
      return (
        rect.top <= window.innerHeight * 0.72 &&
        rect.bottom >= window.innerHeight * 0.28
      );
    };
  
    const handleWheel = (event) => {
      resetIfAboveTransition();
  
      if (!isAtGateZone()) return;
  
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
      resetIfAboveTransition();
  
      if (!isAtGateZone()) return;
  
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
      resetIfAboveTransition();
  
      if (!isAtGateZone()) return;
  
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
      releaseTransitionScrollLock();

      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }
  
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    hasCompleted,
    releaseTransitionScrollLock,
    resetIfAboveTransition,
    updateGateProgress,
  ]);

  const darkness = useTransform(
    cinematicProgress,
    [0, 0.12, 0.28, 0.72, 0.9, 1],
    [0, 0.42, 1, 1, 0.68, 0]
  );

  const roomOpacity = useTransform(
    cinematicProgress,
    [0.12, 0.28, 0.58, 0.82, 1],
    [0, 0.18, 0.42, 0.26, 0]
  );

  const roomScale = useTransform(
    cinematicProgress,
    [0.12, 0.48, 0.82, 1],
    [0.88, 1, 1.08, 1.18]
  );

  const topCurtainY = useTransform(
    cinematicProgress,
    [0.04, 0.24, 0.64, 0.84, 1],
    ["-115%", "0%", "0%", "-42%", "-115%"]
  );

  const bottomCurtainY = useTransform(
    cinematicProgress,
    [0.04, 0.24, 0.64, 0.84, 1],
    ["115%", "0%", "0%", "42%", "115%"]
  );

  const markOpacity = useTransform(
    cinematicProgress,
    [0.2, 0.34, 0.66, 0.82],
    [0, 0.62, 0.62, 0]
  );

  const markScale = useTransform(
    cinematicProgress,
    [0.2, 0.48, 0.72, 0.9],
    [0.72, 0.96, 1.06, 1.34]
  );

  const markRotate = useTransform(cinematicProgress, [0.18, 0.82], [-2, 2]);

  const titleOpacity = useTransform(
    cinematicProgress,
    [0.34, 0.46, 0.72, 0.88],
    [0, 1, 1, 0]
  );

  const titleY = useTransform(
    cinematicProgress,
    [0.34, 0.5, 0.74, 0.9],
    [70, 0, 0, -70]
  );

  const titleScale = useTransform(
    cinematicProgress,
    [0.34, 0.5, 0.74, 0.9],
    [0.92, 1, 1, 1.08]
  );

  const titleClip = useTransform(
    cinematicProgress,
    [0.34, 0.5, 0.76, 0.9],
    [
      "inset(50% 0% 50% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 100% 0%)",
    ]
  );

  const sweepX = useTransform(cinematicProgress, [0.28, 0.82], ["-165%", "165%"]);

  const sweepOpacity = useTransform(
    cinematicProgress,
    [0.22, 0.38, 0.64, 0.84],
    [0, 0.95, 0.78, 0]
  );

  const apertureScaleX = useTransform(
    cinematicProgress,
    [0.48, 0.68, 0.86, 1],
    [0, 0.34, 0.82, 1.35]
  );

  const apertureOpacity = useTransform(
    cinematicProgress,
    [0.42, 0.62, 0.88, 1],
    [0, 0.9, 0.58, 0]
  );

  const loadingOpacity = useTransform(
    cinematicProgress,
    [0.14, 0.28, 0.68, 0.82],
    [0, 1, 1, 0]
  );

  const loadingY = useTransform(cinematicProgress, [0.14, 0.32, 0.82], [28, 0, -28]);

  const bottomStatusOpacity = useTransform(
    cinematicProgress,
    [0.46, 0.62, 0.88, 1],
    [0, 1, 1, 0]
  );

  const bottomStatusY = useTransform(
    cinematicProgress,
    [0.46, 0.64, 1],
    [28, 0, -18]
  );

  const progressScale = useTransform(cinematicProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="Opening the full menu"
      className="relative z-30 h-screen bg-[#050404]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050404]">
        
        <motion.div
          style={reduce ? undefined : { opacity: darkness }}
          className="absolute inset-0 z-10 bg-black"
        />

        <motion.div
          style={
            reduce
              ? {
                  backgroundImage: "url('/images/MaisonNoir/branding/hero.webp')",
                }
              : {
                  opacity: roomOpacity,
                  scale: roomScale,
                  backgroundImage: "url('/images/MaisonNoir/branding/hero.webp')",
                }
          }
          className="absolute inset-0 z-[11] bg-cover bg-center"
        />

        <div className="absolute inset-0 z-[12] bg-[radial-gradient(circle_at_50%_44%,transparent,rgba(0,0,0,0.96)_64%)]" />
        <div className="absolute inset-0 z-[13] bg-[linear-gradient(90deg,rgba(0,0,0,0.94),transparent_42%,rgba(0,0,0,0.94))]" />
        <div className="absolute inset-0 z-[14] shadow-[inset_0_0_180px_rgba(0,0,0,1)]" />

        <div className="pointer-events-none absolute inset-0 z-[15] opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />

        <motion.div
          style={reduce ? undefined : { y: topCurtainY }}
          className="absolute left-0 right-0 top-0 z-20 h-[56%] bg-[linear-gradient(180deg,#000000,rgba(3,3,3,1),rgba(8,6,5,0.98))]"
        />

        <motion.div
          style={reduce ? undefined : { y: bottomCurtainY }}
          className="absolute bottom-0 left-0 right-0 z-20 h-[56%] bg-[linear-gradient(0deg,#000000,rgba(3,3,3,1),rgba(8,6,5,0.98))]"
        />

        <motion.div
          style={reduce ? undefined : { scaleX: apertureScaleX, opacity: apertureOpacity }}
          className="absolute left-1/2 top-1/2 z-[26] h-px w-[92vw] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-[#C9A25B] to-transparent shadow-[0_0_56px_rgba(201,162,91,0.85)]"
        />

        <motion.div
          style={reduce ? undefined : { scaleX: apertureScaleX, opacity: apertureOpacity }}
          className="absolute left-1/2 top-[calc(50%-18px)] z-[26] h-px w-[70vw] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-purple-300/40 to-transparent"
        />

        <motion.div
          style={reduce ? undefined : { scaleX: apertureScaleX, opacity: apertureOpacity }}
          className="absolute left-1/2 top-[calc(50%+18px)] z-[26] h-px w-[70vw] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-purple-300/25 to-transparent"
        />

        <motion.div
          style={reduce ? undefined : { x: sweepX, opacity: sweepOpacity }}
          className="absolute inset-y-0 left-[-44%] z-30 w-[72vw] rotate-[-13deg] bg-gradient-to-r from-transparent via-[#C9A25B]/75 to-transparent blur-xl"
        />

        <motion.div
          style={reduce ? undefined : { x: sweepX, opacity: sweepOpacity }}
          className="absolute inset-y-0 left-[-64%] z-30 w-[96vw] rotate-[8deg] bg-gradient-to-r from-transparent via-purple-400/28 to-transparent blur-2xl"
        />

        <div className="absolute inset-0 z-40 flex items-center justify-center px-6 text-center">
          <motion.div
            style={
              reduce
                ? undefined
                : {
                    opacity: markOpacity,
                    scale: markScale,
                    rotate: markRotate,
                  }
            }
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[clamp(8rem,25vw,28rem)] leading-none tracking-[-0.12em] text-white/[0.08]"
          >
            MN
          </motion.div>

          <motion.div
            style={reduce ? undefined : { opacity: loadingOpacity, y: loadingY }}
            className="absolute left-1/2 top-[17%] hidden -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-black/48 px-5 py-3 text-[10px] uppercase tracking-[0.34em] text-white/42 backdrop-blur-2xl md:flex"
          >
            <span>Signature Experience closes</span>
            <span className="h-px w-12 bg-[#C9A25B]/50" />
            <span className="text-[#C9A25B]">The Menu opens</span>
          </motion.div>

          <motion.div
            style={
              reduce
                ? undefined
                : {
                    opacity: titleOpacity,
                    y: titleY,
                    scale: titleScale,
                    clipPath: titleClip,
                  }
            }
            className="relative z-10"
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#C9A25B]">
              Maison Noir
            </p>

            <h2 className="font-serif text-[clamp(4rem,12vw,11rem)] leading-[0.76] tracking-[-0.09em] text-white">
              The Menu
            </h2>

            <div className="mx-auto mt-8 h-px w-[min(36rem,74vw)] origin-center bg-gradient-to-r from-transparent via-[#C9A25B] to-transparent" />

            <p className="mx-auto mt-6 max-w-xl text-xs uppercase leading-relaxed tracking-[0.28em] text-white/42">
              A new chapter opens — fire, cellar, course, and ritual.
            </p>
          </motion.div>
        </div>

        <motion.div
          style={reduce ? undefined : { opacity: bottomStatusOpacity, y: bottomStatusY }}
          className="absolute bottom-12 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-black/50 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-white/45 backdrop-blur-2xl md:flex"
        >
          <span>Scroll to open</span>
          <span className="h-px w-10 bg-[#C9A25B]/60" />
          <span className="text-[#C9A25B]">Course Theater</span>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 z-[60] h-px w-[min(36rem,72vw)] -translate-x-1/2 overflow-hidden bg-white/10">
          <motion.div
            style={reduce ? undefined : { scaleX: progressScale }}
            className="h-full w-full origin-left bg-gradient-to-r from-transparent via-[#C9A25B] to-transparent"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-8 top-8 z-50 hidden h-px bg-gradient-to-r from-transparent via-[#C9A25B]/35 to-transparent md:block" />
        <div className="pointer-events-none absolute bottom-8 left-8 top-8 z-50 hidden w-px bg-gradient-to-b from-transparent via-[#C9A25B]/28 to-transparent md:block" />
        <div className="pointer-events-none absolute bottom-8 right-8 top-8 z-50 hidden w-px bg-gradient-to-b from-transparent via-purple-300/18 to-transparent md:block" />
      </div>
    </section>
  );
}
