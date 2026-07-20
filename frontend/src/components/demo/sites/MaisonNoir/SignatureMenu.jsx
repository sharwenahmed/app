import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useMaisonScroll } from "./scroll/MaisonScrollDirector";
import { MAISON_SCROLL_LOCKS } from "./scroll/scrollChoreography";

const dishes = [
  {
    number: "01",
    name: "45 Day Dry-Aged Ribeye",
    short: "Ribeye",
    subtitle: "45 DAY DRY AGED",
    price: "$68",
    details: "Dry Aged · Open Flame · Marrow Butter",
    story:
      "Dry-aged for forty-five days in our cellar before being finished over open flame and rested with smoked marrow butter. Prepared only in limited quantities each evening.",
    image: "/images/MaisonNoir/menu/steaks/45-day-dry-aged-ribeye.webp",
  },
  {
    number: "02",
    name: "Black Truffle Filet",
    short: "Filet",
    subtitle: "BLACK TRUFFLE JUS",
    price: "$74",
    details: "Center Cut · Pommes Purée · Seasonal Greens",
    story:
      "A center-cut filet seared with restraint, finished with black truffle jus and served beside pommes purée. Quiet, polished, and deeply luxurious.",
    image: "/images/MaisonNoir/menu/steaks/black-truffle-filet-mignon.webp",
  },
  {
    number: "03",
    name: "A5 Japanese Wagyu",
    short: "Wagyu",
    subtitle: "BINCHOTAN CHARCOAL",
    price: "$128",
    details: "A5 Wagyu · Smoked Salt · Limited Cut",
    story:
      "Exquisitely marbled A5 wagyu grilled over binchotan charcoal and finished with smoked sea salt. A rare cut designed to be experienced slowly.",
    image: "/images/MaisonNoir/menu/steaks/a5-japanese-wagyu.webp",
  },
];

function LetterReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
  cycleDuration = 5.8,
}) {
  const reduce = useReducedMotion();
  const characters = text.split("");

  if (reduce) {
    return (
      <span className={className} aria-label={text}>
        {text}
      </span>
    );
  }

  return (
    <span className={className} aria-label={text}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{
            opacity: 0,
            y: 36,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [36, 0, 0, -12],
          }}
          transition={{
            duration: cycleDuration,
            delay: delay + index * stagger,
            repeat: Infinity,
            repeatDelay: 0.45,
            times: [0, 0.2, 0.76, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const SIGNATURE_STAGE = {
  INTRO: 0,
  RIBEYE: 1,
  FILET: 2,
  WAGYU: 3,
  EXITING: 4,
  COMPLETE: 5,
};

const SIGNATURE_STAGE_NAMES = [
  "intro",
  "dishes",
  "dishes",
  "dishes",
  "exiting",
  "complete",
];

const WHEEL_INTENT_THRESHOLD = 118;
const TOUCH_INTENT_THRESHOLD = 56;
const STAGE_SETTLE_MS = 560;
const ENTRY_SETTLE_MS = 560;
const EXIT_SETTLE_MS = 860;
const AUTOPLAY_DELAY = 3600;

const emberParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 17) % 84)}%`,
  delay: index * 0.38,
  duration: 7 + (index % 5),
  size: index % 3 === 0 ? "h-1.5 w-1.5" : "h-1 w-1",
}));

export default function SignatureMenu() {
  const [stage, setStage] = useState(SIGNATURE_STAGE.INTRO);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const dishChapterRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartYRef = useRef(null);
  const stageRef = useRef(SIGNATURE_STAGE.INTRO);
  const wheelIntentRef = useRef(0);
  const lastIntentDirectionRef = useRef(0);
  const inputLockedUntilRef = useRef(0);
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(0);
  const viewGateActiveRef = useRef(false);
  const viewGateCompleteRef = useRef(false);
  const transitionTimerRef = useRef(null);
  const exitTimerRef = useRef(null);
  const naturalScrollReleaseTimerRef = useRef(null);
  const releaseScrollLockRef = useRef(null);
  const reduce = useReducedMotion();
  const { lockScroll, unlockScroll } = useMaisonScroll();

  const dish = dishes[active];
  const showIntroChapter = reduce || stage === SIGNATURE_STAGE.INTRO;
  const showDishChapter =
    reduce ||
    (stage !== SIGNATURE_STAGE.INTRO && stage !== SIGNATURE_STAGE.COMPLETE);
  const isExiting = stage === SIGNATURE_STAGE.EXITING;

  useEffect(() => {
    if (reduce || isPaused || isReserving || !showDishChapter || isExiting) {
      return undefined;
    }

    intervalRef.current = window.setInterval(() => {
      setActive((current) => (current + 1) % dishes.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isExiting, isPaused, isReserving, reduce, showDishChapter]);

  const resetInputIntent = React.useCallback(() => {
    wheelIntentRef.current = 0;
    lastIntentDirectionRef.current = 0;
  }, []);

  const lockInputFor = React.useCallback((duration) => {
    inputLockedUntilRef.current = performance.now() + duration;

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      inputLockedUntilRef.current = 0;
      transitionTimerRef.current = null;
    }, duration);
  }, []);

  const markSignatureStage = React.useCallback((nextStage) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const complete = nextStage === SIGNATURE_STAGE.COMPLETE;

    root.dataset.mnSignatureExperienceComplete = complete ? "true" : "false";
    root.dataset.mnSignatureStage =
      SIGNATURE_STAGE_NAMES[nextStage] || "active";
  }, []);

  const markSignatureReadyForRunway = React.useCallback(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.dataset.mnSignatureExperienceComplete = "true";
    root.dataset.mnSignatureStage = "dishes";
  }, []);

  const measureSignature = React.useCallback(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;

    sectionTopRef.current = section.getBoundingClientRect().top + window.scrollY;
    sectionHeightRef.current = section.offsetHeight;
  }, []);

  const releaseSignatureScrollLock = React.useCallback(() => {
    if (releaseScrollLockRef.current) {
      releaseScrollLockRef.current();
      releaseScrollLockRef.current = null;
      return;
    }

    unlockScroll(MAISON_SCROLL_LOCKS.signature);
  }, [unlockScroll]);

  const engageSignatureScrollLock = React.useCallback(() => {
    if (releaseScrollLockRef.current) return;
    releaseScrollLockRef.current = lockScroll(MAISON_SCROLL_LOCKS.signature);
  }, [lockScroll]);

  const getSignatureTargetY = React.useCallback(() => {
    if (typeof window === "undefined") return 0;

    const offset = window.innerWidth >= 768 ? 28 : 12;
    return Math.max(sectionTopRef.current - offset, 0);
  }, []);

  const lockToSignature = React.useCallback(() => {
    if (typeof window === "undefined") return;

    const targetY = getSignatureTargetY();

    if (Math.abs(window.scrollY - targetY) > 2) {
      window.scrollTo({
        top: targetY,
        behavior: "auto",
      });
    }
  }, [getSignatureTargetY]);

  const completeSignatureExperience = React.useCallback(
    (handoffToRunway = false) => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }

      if (naturalScrollReleaseTimerRef.current) {
        window.clearTimeout(naturalScrollReleaseTimerRef.current);
        naturalScrollReleaseTimerRef.current = null;
      }

      resetInputIntent();
      inputLockedUntilRef.current = 0;
      stageRef.current = SIGNATURE_STAGE.COMPLETE;
      viewGateActiveRef.current = false;
      viewGateCompleteRef.current = true;
      setStage(SIGNATURE_STAGE.COMPLETE);
      markSignatureStage(SIGNATURE_STAGE.COMPLETE);
      releaseSignatureScrollLock();

      if (!handoffToRunway) return;

      window.requestAnimationFrame(() => {
        const runwaySection = document.getElementById("food-film-runway");

        if (runwaySection) {
          runwaySection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    },
    [markSignatureStage, releaseSignatureScrollLock, resetInputIntent]
  );

  const releaseDishChapterToNaturalScroll = React.useCallback(() => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    if (naturalScrollReleaseTimerRef.current) {
      window.clearTimeout(naturalScrollReleaseTimerRef.current);
      naturalScrollReleaseTimerRef.current = null;
    }

    resetInputIntent();
    inputLockedUntilRef.current = 0;
    viewGateActiveRef.current = false;
    viewGateCompleteRef.current = true;
    markSignatureReadyForRunway();
    releaseSignatureScrollLock();
  }, [
    markSignatureReadyForRunway,
    releaseSignatureScrollLock,
    resetInputIntent,
  ]);

  const goToSignatureStage = React.useCallback(
    (nextStage, settleMs = STAGE_SETTLE_MS) => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }

      if (naturalScrollReleaseTimerRef.current) {
        window.clearTimeout(naturalScrollReleaseTimerRef.current);
        naturalScrollReleaseTimerRef.current = null;
      }

      const stageValue = Math.min(
        Math.max(nextStage, SIGNATURE_STAGE.INTRO),
        SIGNATURE_STAGE.EXITING
      );

      resetInputIntent();
      viewGateActiveRef.current = true;
      viewGateCompleteRef.current = false;
      stageRef.current = stageValue;
      setStage(stageValue);
      markSignatureStage(stageValue);
      lockInputFor(settleMs);
      lockToSignature();

      if (stageValue === SIGNATURE_STAGE.INTRO) {
        setActive(0);
      } else if (stageValue === SIGNATURE_STAGE.RIBEYE) {
        setActive(0);
        naturalScrollReleaseTimerRef.current = window.setTimeout(
          releaseDishChapterToNaturalScroll,
          Math.min(settleMs, 520)
        );
      } else if (stageValue === SIGNATURE_STAGE.EXITING) {
        exitTimerRef.current = window.setTimeout(() => {
          completeSignatureExperience(true);
        }, EXIT_SETTLE_MS);
      }
    },
    [
      completeSignatureExperience,
      lockInputFor,
      lockToSignature,
      markSignatureStage,
      releaseDishChapterToNaturalScroll,
      resetInputIntent,
    ]
  );

  const activateSignatureGate = React.useCallback(
    (initialStage = SIGNATURE_STAGE.INTRO) => {
      if (viewGateActiveRef.current) return;

      viewGateActiveRef.current = true;
      viewGateCompleteRef.current = false;
      measureSignature();
      lockToSignature();
      engageSignatureScrollLock();
      goToSignatureStage(initialStage, ENTRY_SETTLE_MS);
    },
    [
      engageSignatureScrollLock,
      goToSignatureStage,
      lockToSignature,
      measureSignature,
    ]
  );

  const releaseToPreviousSection = React.useCallback(() => {
    if (exitTimerRef.current) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    if (naturalScrollReleaseTimerRef.current) {
      window.clearTimeout(naturalScrollReleaseTimerRef.current);
      naturalScrollReleaseTimerRef.current = null;
    }

    resetInputIntent();
    inputLockedUntilRef.current = 0;
    stageRef.current = SIGNATURE_STAGE.INTRO;
    viewGateActiveRef.current = false;
    viewGateCompleteRef.current = false;
    setStage(SIGNATURE_STAGE.INTRO);
    setActive(0);
    markSignatureStage(SIGNATURE_STAGE.INTRO);
    releaseSignatureScrollLock();

    window.requestAnimationFrame(() => {
      window.scrollBy({
        top: -Math.min(window.innerHeight * 0.46, 430),
        behavior: "smooth",
      });
    });
  }, [markSignatureStage, releaseSignatureScrollLock, resetInputIntent]);

  const consumeSignatureIntent = React.useCallback(
    (direction) => {
      const currentStage = stageRef.current;

      if (direction > 0) {
        if (currentStage === SIGNATURE_STAGE.INTRO) {
          goToSignatureStage(SIGNATURE_STAGE.RIBEYE);
          return;
        }

        if (
          currentStage === SIGNATURE_STAGE.RIBEYE ||
          currentStage === SIGNATURE_STAGE.FILET ||
          currentStage === SIGNATURE_STAGE.WAGYU
        ) {
          goToSignatureStage(SIGNATURE_STAGE.EXITING, EXIT_SETTLE_MS);
        }

        return;
      }

      if (currentStage === SIGNATURE_STAGE.EXITING) {
        goToSignatureStage(SIGNATURE_STAGE.RIBEYE);
        return;
      }

      if (
        currentStage === SIGNATURE_STAGE.RIBEYE ||
        currentStage === SIGNATURE_STAGE.FILET ||
        currentStage === SIGNATURE_STAGE.WAGYU
      ) {
        goToSignatureStage(SIGNATURE_STAGE.INTRO);
        return;
      }

      if (currentStage === SIGNATURE_STAGE.INTRO) {
        releaseToPreviousSection();
      }
    },
    [goToSignatureStage, releaseToPreviousSection]
  );

  const handleSelectDish = React.useCallback(
    (index) => {
      resetInputIntent();
      setActive(index);

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (stageRef.current === SIGNATURE_STAGE.INTRO) {
        stageRef.current = SIGNATURE_STAGE.RIBEYE;
        setStage(SIGNATURE_STAGE.RIBEYE);
        markSignatureStage(SIGNATURE_STAGE.RIBEYE);
      }

      viewGateCompleteRef.current = false;
    },
    [markSignatureStage, resetInputIntent]
  );

  const releaseForAnchorNavigation = React.useCallback(() => {
    completeSignatureExperience();
  }, [completeSignatureExperience]);

  const handleReserveExperience = (event) => {
    event.preventDefault();

    completeSignatureExperience();
    setIsReserving(true);

    window.setTimeout(() => {
      const reserveSection =
        document.getElementById("reserve") ||
        document.getElementById("reservation");

      if (reserveSection) {
        reserveSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 1250);

    window.setTimeout(() => {
      setIsReserving(false);
    }, 2050);
  };

  useEffect(() => {
    const hydrateInitialStage = () => {
      measureSignature();

      if (reduce) {
        completeSignatureExperience();
        return;
      }

      const sectionBottom = sectionTopRef.current + sectionHeightRef.current;
      const isAlreadyBelowSignature =
        window.scrollY > sectionBottom - window.innerHeight * 0.2;

      if (isAlreadyBelowSignature) {
        completeSignatureExperience();
        return;
      }

      markSignatureStage(stageRef.current);
    };

    const animationFrame = window.requestAnimationFrame(hydrateInitialStage);
    const measureTimer = window.setTimeout(measureSignature, 260);

    window.addEventListener("resize", measureSignature, { passive: true });
    window.addEventListener("load", measureSignature, { once: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(measureTimer);
      window.removeEventListener("resize", measureSignature);
      window.removeEventListener("load", measureSignature);
      releaseSignatureScrollLock();

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }

      if (naturalScrollReleaseTimerRef.current) {
        window.clearTimeout(naturalScrollReleaseTimerRef.current);
      }

      if (typeof document !== "undefined") {
        delete document.documentElement.dataset.mnSignatureExperienceComplete;
        delete document.documentElement.dataset.mnSignatureStage;
      }
    };
  }, [
    completeSignatureExperience,
    markSignatureStage,
    measureSignature,
    reduce,
    releaseSignatureScrollLock,
  ]);

  useEffect(() => {
    if (reduce) return undefined;

    const ctx = gsap.context(() => {
      if (stage === SIGNATURE_STAGE.INTRO && introRef.current) {
        gsap.fromTo(
          introRef.current,
          { autoAlpha: 0.92, y: 18, scale: 0.992 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.82,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          }
        );
      }

      if (!dishChapterRef.current) return;

      if (stage === SIGNATURE_STAGE.EXITING) {
        gsap.to(dishChapterRef.current, {
          autoAlpha: 0,
          y: -30,
          scale: 0.985,
          duration: 0.72,
          ease: "power3.out",
        });
        return;
      }

      if (stage !== SIGNATURE_STAGE.INTRO) {
        gsap.fromTo(
          dishChapterRef.current,
          { autoAlpha: 0.82, y: 24, scale: 0.988 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.62,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce, stage]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(measureSignature);

    return () => window.cancelAnimationFrame(frame);
  }, [measureSignature, stage]);

  useEffect(() => {
    if (reduce) return undefined;

    const managedSelectors =
      "input, textarea, select, [contenteditable='true'], [role='dialog'], [data-lenis-prevent], [data-maison-scroll-prevent]";
    const keyManagedSelectors =
      "input, textarea, select, [contenteditable='true'], [role='dialog']";

    const stopManagedEvent = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
    };

    const getSignatureBounds = () => {
      if (!sectionHeightRef.current) {
        measureSignature();
      }

      return {
        top: sectionTopRef.current,
        height: sectionHeightRef.current,
        bottom: sectionTopRef.current + sectionHeightRef.current,
      };
    };

    const resetIfBeforeSignature = () => {
      if (viewGateActiveRef.current) return;

      const { top } = getSignatureBounds();

      if (window.scrollY + window.innerHeight * 0.58 < top) {
        stageRef.current = SIGNATURE_STAGE.INTRO;
        viewGateCompleteRef.current = false;
        setStage(SIGNATURE_STAGE.INTRO);
        setActive(0);
        markSignatureStage(SIGNATURE_STAGE.INTRO);
      }
    };

    const isForwardGateZone = (deltaY = 0) => {
      const { top, height } = getSignatureBounds();
      const viewportHeight = window.innerHeight;
      const entryLine = window.scrollY + viewportHeight * 1.05;
      const projectedScrollY =
        window.scrollY + Math.min(Math.max(deltaY, 0), viewportHeight * 1.35);

      return (
        entryLine >= top &&
        projectedScrollY + viewportHeight * 0.82 >= top &&
        window.scrollY < top + height * 0.72
      );
    };

    const isInputLocked = () => performance.now() < inputLockedUntilRef.current;

    const advanceByWheelIntent = (deltaY) => {
      const direction = deltaY > 0 ? 1 : -1;
      const clampedDelta = Math.max(Math.min(deltaY, 160), -160);

      if (lastIntentDirectionRef.current !== direction) {
        wheelIntentRef.current = 0;
        lastIntentDirectionRef.current = direction;
      }

      wheelIntentRef.current += Math.abs(clampedDelta);

      if (wheelIntentRef.current >= WHEEL_INTENT_THRESHOLD) {
        consumeSignatureIntent(direction);
      }
    };

    const handleWheel = (event) => {
      if (event.defaultPrevented || event.target?.closest?.(managedSelectors)) {
        return;
      }

      if (Math.abs(event.deltaY) < 1) return;

      const direction = event.deltaY > 0 ? 1 : -1;

      if (!viewGateActiveRef.current) {
        resetIfBeforeSignature();

        if (direction > 0) {
          if (viewGateCompleteRef.current || !isForwardGateZone(event.deltaY)) {
            return;
          }

          stopManagedEvent(event);
          activateSignatureGate(SIGNATURE_STAGE.INTRO);
          return;
        }

        return;
      }

      stopManagedEvent(event);
      lockToSignature();

      if (isInputLocked()) return;

      advanceByWheelIntent(event.deltaY);
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event) => {
      if (event.target?.closest?.(managedSelectors)) return;

      const currentY = event.touches[0]?.clientY ?? null;
      const startY = touchStartYRef.current;

      if (currentY === null || startY === null) return;

      const delta = startY - currentY;

      if (Math.abs(delta) < TOUCH_INTENT_THRESHOLD) return;

      const direction = delta > 0 ? 1 : -1;

      if (!viewGateActiveRef.current) {
        resetIfBeforeSignature();

        if (direction > 0) {
          if (viewGateCompleteRef.current || !isForwardGateZone(delta)) {
            touchStartYRef.current = currentY;
            return;
          }

          stopManagedEvent(event);
          activateSignatureGate(SIGNATURE_STAGE.INTRO);
          touchStartYRef.current = currentY;
          return;
        }

        touchStartYRef.current = currentY;
        return;
      }

      stopManagedEvent(event);
      lockToSignature();
      touchStartYRef.current = currentY;

      if (isInputLocked()) return;

      consumeSignatureIntent(direction);
    };

    const handleKeyDown = (event) => {
      if (
        event.defaultPrevented ||
        document.activeElement?.closest?.(keyManagedSelectors)
      ) {
        return;
      }

      const forwardKeys = ["ArrowDown", "PageDown", "End"];
      const backwardKeys = ["ArrowUp", "PageUp", "Home"];
      const isSpace = event.key === " ";
      const isForward =
        forwardKeys.includes(event.key) || (isSpace && !event.shiftKey);
      const isBackward =
        backwardKeys.includes(event.key) || (isSpace && event.shiftKey);

      if (!isForward && !isBackward) return;

      const direction = isForward ? 1 : -1;

      if (!viewGateActiveRef.current) {
        resetIfBeforeSignature();

        if (direction > 0) {
          if (viewGateCompleteRef.current || !isForwardGateZone(120)) return;

          stopManagedEvent(event);
          activateSignatureGate(SIGNATURE_STAGE.INTRO);
          return;
        }

        return;
      }

      stopManagedEvent(event);
      lockToSignature();

      if (isInputLocked()) return;

      consumeSignatureIntent(direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activateSignatureGate,
    consumeSignatureIntent,
    lockToSignature,
    markSignatureStage,
    measureSignature,
    reduce,
  ]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#060403] px-6 py-16 md:py-20 lg:min-h-screen lg:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,162,91,0.08),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_82%,rgba(74,20,24,0.28),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(201,162,91,0.09),transparent_34%)]" />

      <motion.div
        className="pointer-events-none absolute left-[-20%] top-[18%] h-80 w-[140%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[#C9A25B]/8 to-transparent blur-2xl"
        animate={
          reduce
            ? {}
            : {
                x: ["-18%", "18%", "-18%"],
                opacity: [0.12, 0.32, 0.12],
              }
        }
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {!reduce &&
        emberParticles.map((particle) => (
          <motion.span
            key={particle.id}
            className={`pointer-events-none absolute bottom-[-4rem] rounded-full bg-[#C9A25B]/55 blur-[1px] ${particle.size}`}
            style={{ left: particle.left }}
            animate={{
              y: ["0vh", "-92vh"],
              x: [0, particle.id % 2 === 0 ? 18 : -18, 0],
              opacity: [0, 0.32, 0.12, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          {showIntroChapter && (
            <motion.div
              key="signature-intro"
              ref={introRef}
              initial={reduce ? false : { opacity: 1 }}
              animate={reduce ? {} : { opacity: 1 }}
              exit={reduce ? {} : { opacity: 0, y: -26, scale: 0.985 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-0 mx-auto mb-14 max-w-5xl text-center md:mb-20 lg:mb-24"
            >
              <p className="mb-7 text-xs uppercase tracking-[0.56em] text-[#C9A25B]">
                <LetterReveal
                  text="SIGNATURE EXPERIENCE"
                  delay={0.05}
                  stagger={0.055}
                />
              </p>

              <h2 className="font-serif text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.82] tracking-[-0.075em] text-white">
                <span className="block">
                  <LetterReveal
                    text="One masterpiece."
                    delay={0.2}
                    stagger={0.06}
                  />
                </span>

                <span className="block">
                  <LetterReveal
                    text="Slowly revealed."
                    delay={1.05}
                    stagger={0.06}
                  />
                </span>
              </h2>

              <p className="mx-auto mt-9 max-w-2xl text-sm uppercase leading-relaxed tracking-[0.22em] text-white/48">
                <LetterReveal
                  text="Three house signatures, presented with the silence and ceremony of a private tasting room."
                  delay={2.0}
                  stagger={0.012}
                />
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showDishChapter && (
            <motion.div
              key="signature-dishes"
              ref={dishChapterRef}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.988 }}
              animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? {} : { opacity: 0, y: -24, scale: 0.985 }}
              transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:flex lg:min-h-[calc(100vh-7rem)] lg:flex-col lg:justify-center ${
                isExiting ? "pointer-events-none" : ""
              }`}
            >
              <div className="relative z-20 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="mb-5 flex items-center gap-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={dish.number}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  exit={reduce ? {} : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-[clamp(3.8rem,8vw,7rem)] leading-none text-[#C9A25B]/30"
                >
                  {dish.number}
                </motion.div>
              </AnimatePresence>

              <div className="h-px flex-1 bg-gradient-to-r from-[#C9A25B]/60 to-transparent" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={dish.name}
                initial={
                  reduce
                    ? false
                    : { opacity: 0, y: 32 }
                }
                animate={
                  reduce
                    ? {}
                    : { opacity: 1, y: 0 }
                }
                exit={
                  reduce
                    ? {}
                    : { opacity: 0, y: -18 }
                }
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-[#C9A25B]/80">
                  {dish.subtitle}
                </p>

                <h3 className="font-serif text-[clamp(3.8rem,8vw,7.4rem)] leading-[0.78] tracking-[-0.08em] text-white">
                  {dish.short}
                </h3>

                <p className="mt-5 text-[10px] uppercase tracking-[0.38em] text-[#C9A25B]/70">
                  {dish.details}
                </p>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/58 lg:text-lg">
                  {dish.story}
                </p>

                <div className="mt-8 flex items-end justify-between gap-8 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.36em] text-white/32">
                      Evening allocation
                    </p>
                    <p className="mt-2 text-sm text-white/52">
                      Prepared in limited quantities.
                    </p>
                  </div>

                  <motion.div
                    key={dish.price}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={reduce ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.28 }}
                    className="font-serif text-5xl leading-none text-[#C9A25B] md:text-6xl"
                  >
                    {dish.price}
                  </motion.div>
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={handleReserveExperience}
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#C9A25B]/60 bg-[#C9A25B]/10 px-7 py-4 text-sm text-[#F2D48A] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-[#C9A25B] hover:text-black"
                  >
                    Reserve This Experience
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <a
                    href="#full-menu"
                    onClick={releaseForAnchorNavigation}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-7 py-4 text-sm text-white/58 transition duration-500 hover:-translate-y-1 hover:border-[#C9A25B]/40 hover:text-[#C9A25B]"
                  >
                    See the full menu
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {dishes.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleSelectDish(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={`group relative overflow-hidden border px-4 py-5 text-left transition duration-500 ${
                    active === index
                      ? "border-[#C9A25B]/55 bg-[#C9A25B]/8"
                      : "border-white/10 bg-white/[0.02] hover:border-[#C9A25B]/35"
                  }`}
                >
                  <p
                    className={`font-serif text-3xl leading-none transition ${
                      active === index ? "text-[#C9A25B]" : "text-white/38"
                    }`}
                  >
                    {item.number}
                  </p>

                  <p
                    className={`mt-3 text-[9px] uppercase tracking-[0.3em] transition ${
                      active === index ? "text-white/70" : "text-white/34"
                    }`}
                  >
                    {item.short}
                  </p>

                  {active === index && !reduce && !isPaused && (
                    <motion.span
                      key={`selector-progress-${active}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: AUTOPLAY_DELAY / 1000,
                        ease: "linear",
                      }}
                      className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#C9A25B]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative z-30 order-1 lg:order-2 lg:col-span-7"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 60, scale: 0.96 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-30"
            >
              <motion.div
                key={`dish-spotlight-${active}`}
                initial={reduce ? false : { opacity: 0.12, scale: 0.96 }}
                animate={reduce ? {} : { opacity: 0.34, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_52%,rgba(201,162,91,0.2),transparent_64%)] blur-2xl"
              />

              <div className="relative overflow-hidden border border-[#C9A25B]/24 bg-black/30 shadow-[0_70px_180px_-90px_rgba(201,162,91,0.75)]">
                <div className="pointer-events-none absolute inset-3 z-30 border border-[#C9A25B]/24" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={dish.image}
                    initial={
                      reduce
                        ? false
                        : {
                            opacity: 0,
                            clipPath: "inset(0 100% 0 0)",
                            scale: 0.985,
                          }
                    }
                    animate={
                      reduce
                        ? {}
                        : {
                            opacity: 1,
                            clipPath: "inset(0 0% 0 0)",
                            scale: 1,
                          }
                    }
                    exit={
                      reduce
                        ? {}
                        : {
                            opacity: 0,
                            clipPath: "inset(0 0 0 100%)",
                            scale: 1.01,
                          }
                    }
                    transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <motion.img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      decoding="async"
                      animate={
                        reduce
                          ? {}
                          : {
                              scale: [1.015, 1.035, 1.015],
                            }
                      }
                      transition={{
                        duration: 6.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="aspect-[4/5] max-h-[58vh] w-full object-cover opacity-95 sm:aspect-[16/10]"
                    />
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  key={`knife-${active}`}
                  initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                  animate={
                    reduce ? {} : { scaleX: [0, 1, 0], opacity: [0, 1, 0] }
                  }
                  transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute left-0 top-1/2 z-40 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#F2D48A] to-transparent shadow-[0_0_36px_rgba(242,212,138,0.95)]"
                />

                <motion.div
                  key={`shimmer-${active}`}
                  initial={reduce ? false : { x: "-120%", opacity: 0 }}
                  animate={reduce ? {} : { x: "130%", opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.65, delay: 0.28, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-y-0 left-[-40%] z-40 w-[48%] rotate-[13deg] bg-gradient-to-r from-transparent via-white/18 to-transparent blur-xl"
                />

                {!reduce && (
                  <>
                    <motion.div
                      className="pointer-events-none absolute left-[18%] top-[18%] z-30 h-40 w-24 rounded-full bg-white/10 blur-3xl"
                      animate={{
                        y: [0, -18, 0],
                        x: [0, 8, 0],
                        opacity: [0.04, 0.13, 0.04],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.div
                      className="pointer-events-none absolute right-[18%] top-[36%] z-30 h-48 w-28 rounded-full bg-[#C9A25B]/10 blur-3xl"
                      animate={{
                        y: [0, -24, 0],
                        x: [0, -10, 0],
                        opacity: [0.04, 0.16, 0.04],
                      }}
                      transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/8 to-black/8" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_58%,transparent,rgba(0,0,0,0.42)_80%)]" />

                <div className="absolute left-6 right-6 top-6 z-50 flex items-center gap-2 md:left-9 md:right-9 md:top-9">
                  {dishes.map((item, index) => (
                    <div
                      key={`progress-${item.name}`}
                      className="h-px flex-1 overflow-hidden bg-white/14"
                    >
                      <motion.div
                        key={
                          active === index && !isPaused
                            ? `active-progress-${index}-${active}`
                            : `inactive-progress-${index}`
                        }
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX:
                            index < active
                              ? 1
                              : active === index && !reduce && !isPaused
                                ? 1
                                : active === index
                                  ? 0.42
                                  : 0,
                        }}
                        transition={{
                          duration:
                            active === index && !isPaused && !reduce
                              ? AUTOPLAY_DELAY / 1000
                              : 0.35,
                          ease:
                            active === index && !isPaused ? "linear" : "easeOut",
                        }}
                        className="h-full w-full origin-left bg-gradient-to-r from-[#C9A25B] to-[#f3d48a]"
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-50 flex items-end justify-between gap-6 md:bottom-9 md:left-9 md:right-9">
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`image-number-${dish.number}`}
                        initial={reduce ? false : { opacity: 0, y: 14 }}
                        animate={reduce ? {} : { opacity: 1, y: 0 }}
                        exit={reduce ? {} : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.38 }}
                        className="mb-4 text-[10px] uppercase tracking-[0.42em] text-[#C9A25B]/80"
                      >
                        {dish.number} / 03
                      </motion.p>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.h4
                        key={`image-title-${dish.short}`}
                        initial={
                          reduce
                            ? false
                            : { opacity: 0, y: 24 }
                        }
                        animate={
                          reduce
                            ? {}
                            : { opacity: 1, y: 0 }
                        }
                        exit={
                          reduce
                            ? {}
                            : { opacity: 0, y: -16 }
                        }
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-serif text-5xl leading-[0.9] tracking-tight text-white md:text-7xl"
                      >
                        {dish.short}
                      </motion.h4>
                    </AnimatePresence>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`image-price-${dish.price}`}
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      animate={reduce ? {} : { opacity: 1, y: 0 }}
                      exit={reduce ? {} : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.46, delay: 0.1 }}
                      className="font-serif text-4xl text-[#C9A25B] md:text-5xl"
                    >
                      {dish.price}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

              <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center lg:mt-12">
                <p className="max-w-xl text-white/42">
                  A full seasonal menu, wine pairings, and private tasting options are
                  available for an elevated evening.
                </p>

                <a
                  href="#full-menu"
                  onClick={releaseForAnchorNavigation}
                  className="inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/40 px-6 py-3.5 text-[#C9A25B] transition duration-500 hover:-translate-y-1 hover:bg-[#C9A25B] hover:text-black"
                >
                  View the complete menu
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, scaleX: 0.72 }}
        whileInView={reduce ? {} : { opacity: 1, scaleX: 1 }}
        viewport={{ once: false, amount: 0.86 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-44 origin-center bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,162,91,0.22),rgba(74,20,24,0.2)_32%,transparent_68%)]"
      />

      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 42 }}
        whileInView={reduce ? {} : { opacity: 0.72, y: 0 }}
        viewport={{ once: false, amount: 0.9 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-4 left-1/2 z-[9] h-px w-[min(44rem,70vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A25B] to-transparent shadow-[0_0_42px_rgba(201,162,91,0.72)]"
      />

      <AnimatePresence>
        {isReserving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/92 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -18 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center px-6 text-center"
            >
              <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.4, 0.18] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[#C9A25B]/30 blur-3xl"
                />

                <div className="relative font-serif text-6xl tracking-[-0.16em] text-[#C9A25B]">
                  MN
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-[min(26rem,74vw)] origin-center bg-gradient-to-r from-transparent via-[#C9A25B] to-transparent"
              />

              <p className="mt-8 text-[10px] uppercase tracking-[0.44em] text-white/48">
                Opening the reservation room
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
