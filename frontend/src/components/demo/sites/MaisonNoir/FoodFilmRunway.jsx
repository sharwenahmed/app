import React, { useCallback, useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { menuItems } from "./FullMenu";
import { useMaisonScroll } from "./scroll/MaisonScrollDirector";
import { MAISON_SCROLL_LOCKS } from "./scroll/scrollChoreography";

const cardShapes = [
  {
    mobileShape: "aspect-[16/10]",
    width: "clamp(5.6rem, 6.6vw, 8.8rem)",
    height: "clamp(3.5rem, 4.4vw, 5.6rem)",
  },
  {
    mobileShape: "aspect-[4/5]",
    width: "clamp(4.45rem, 5.2vw, 6.9rem)",
    height: "clamp(5.65rem, 6.7vw, 8.8rem)",
  },
  {
    mobileShape: "aspect-[16/9]",
    width: "clamp(5.9rem, 7vw, 9.4rem)",
    height: "clamp(3.35rem, 4vw, 5.3rem)",
  },
  {
    mobileShape: "aspect-square",
    width: "clamp(4.9rem, 5.8vw, 7.6rem)",
    height: "clamp(4.9rem, 5.8vw, 7.6rem)",
  },
];

const buildRunwayLayout = (index, total) => {
  const itemsPerRing = 5;
  const ringCount = Math.ceil(total / itemsPerRing);
  const ring = Math.floor(index / itemsPerRing);
  const slot = index % itemsPerRing;
  const ringProgress = ringCount <= 1 ? 0 : ring / (ringCount - 1);
  const angle = (slot / itemsPerRing) * Math.PI * 2 + ring * 0.76 - Math.PI / 2;
  const side = Math.cos(angle);
  const depth = Math.sin(angle);
  const shape = cardShapes[index % cardShapes.length];
  const cone = 0.38 + ringProgress * 0.62;
  const radiusX = 260 + cone * 320 + (slot % 2) * 20;
  const radiusZ = 90 + cone * 190;
  const ySpan = 720;

  return {
    ...shape,
    x: side * radiusX + depth * 24,
    y:
      -ySpan / 2 +
      ringProgress * ySpan +
      depth * 34 +
      (slot % 2 === 0 ? -12 : 12),
    z: depth * radiusZ - 300,
    scale: 0.82 + Math.max(depth, 0) * 0.12 + ringProgress * 0.035,
    layer: Math.round((depth + 1) * 100) + ring,
    rotateX: ((slot % 3) - 1) * 1.2,
    rotateY: -side * 24 + depth * 6,
    rotateZ: ((slot % 4) - 1.5) * 1.1,
    scrollX: Math.cos(angle + Math.PI / 2) * (56 + ringProgress * 32),
    scrollY: (0.5 - ringProgress) * 92 + Math.sin(angle * 2) * 14,
    scrollZ: 74 + Math.cos(angle * 1.25) * 32,
    scrollRotY: -side * 16 + depth * 8,
    scrollRotZ: ((slot % 3) - 1) * 1.8,
  };
};

const smoothFocus = (value) => value * value * (3 - 2 * value);

const getFocusAmount = (index, activePosition) => {
  const distance = Math.abs(index - activePosition);

  if (distance <= 0.2) return 1;
  if (distance >= 1.08) return 0;

  return smoothFocus(1 - (distance - 0.2) / 0.88);
};

const menuEntries = Object.entries(menuItems).flatMap(([category, items]) =>
  items.map(([title, price, description, image]) => ({
    category,
    title,
    price,
    description,
    image,
  }))
);

const foodFilms = menuEntries.map((item, index) => ({
  ...item,
  ...buildRunwayLayout(index, menuEntries.length),
  id: `${item.category}-${item.title}`,
  number: String(index + 1).padStart(2, "0"),
  eyebrow: item.category,
}));

const lateMenuStartIndex = foodFilms.findIndex(
  (film) => film.category === "Desserts"
);

const shouldPrioritizeFilm = (index) =>
  index < 8 || (lateMenuStartIndex !== -1 && index >= lateMenuStartIndex);

const emberParticles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${5 + ((index * 11) % 90)}%`,
  delay: index * 0.26,
  duration: 7 + (index % 7),
  size: index % 5 === 0 ? "h-1.5 w-1.5" : "h-1 w-1",
}));

function DesktopVortexCard({ film, index, setCardRef }) {
  const showShine = index % 4 === 0;

  return (
    <article
      ref={(element) => setCardRef(element, index)}
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: film.width,
        height: film.height,
        backfaceVisibility: "hidden",
        zIndex: film.layer,
        transformStyle: "preserve-3d",
        transform: `translate3d(calc(-50% + ${film.x}px), calc(-50% + ${film.y}px), ${film.z}px) rotateX(${film.rotateX}deg) rotateY(${film.rotateY}deg) rotateZ(${film.rotateZ}deg) scale(${film.scale})`,
      }}
    >
      <div className="group relative h-full w-full overflow-hidden rounded-[6px] border border-[#C9A25B]/30 bg-[#090604]/75 shadow-[0_48px_140px_-78px_rgba(201,162,91,0.95),0_24px_80px_-68px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.04]">
        <div className="pointer-events-none absolute -inset-8 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,91,0.16),transparent_64%)] blur-2xl" />
        <div className="pointer-events-none absolute -inset-px z-20 rounded-[6px] border border-white/[0.05]" />
        <div className="pointer-events-none absolute inset-[0.42rem] z-20 rounded-[4px] border border-[#C9A25B]/16" />

        {film.video ? (
          <video
            src={film.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="relative z-10 h-full w-full object-cover opacity-90 brightness-[0.92] contrast-[1.08] saturate-[0.86] transition [transition-duration:1800ms] group-hover:scale-[1.035] group-hover:opacity-100 group-hover:saturate-100"
          />
        ) : (
          <img
            src={film.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="relative z-10 h-full w-full object-cover opacity-90 brightness-[0.92] contrast-[1.08] saturate-[0.86] transition [transition-duration:1800ms] group-hover:scale-[1.035] group-hover:opacity-100 group-hover:saturate-100"
          />
        )}

        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/82 via-black/10 to-black/34" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_55%,transparent,rgba(0,0,0,0.52)_82%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-white/[0.08] to-transparent opacity-50" />

        {showShine ? (
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
        ) : null}

      </div>
    </article>
  );
}

function DesktopSpotlightCard({ film, index, setSpotlightRef }) {
  return (
    <article
      ref={(element) => setSpotlightRef(element, index)}
      className="pointer-events-none absolute left-1/2 top-1/2 z-50 h-[min(56vh,34rem)] w-[min(58vw,46rem)] isolate overflow-hidden rounded-[8px] border border-[#C9A25B]/36 bg-[#050302] opacity-0 shadow-[0_55px_170px_-60px_rgba(201,162,91,0.95),0_30px_100px_-55px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.06] will-change-[opacity,transform]"
      style={{
        transform: "translate3d(-50%, -50%, 0) scale(0.92)",
      }}
    >
      <div className="pointer-events-none absolute inset-[0.55rem] z-20 rounded-[5px] border border-[#C9A25B]/18" />

      {film.video ? (
        <video
          src={film.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="block h-full w-full object-cover"
        />
      ) : (
        <img
          src={film.image}
          alt=""
          loading="eager"
          fetchPriority={shouldPrioritizeFilm(index) ? "high" : "auto"}
          decoding="async"
          className="block h-full w-full object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/[0.05] via-transparent to-transparent" />
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

        {film.video ? (
          <video
            src={film.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover opacity-95"
          />
        ) : (
          <img
            src={film.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-95"
          />
        )}

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
  const progressFillRef = useRef(null);
  const progressLabelRef = useRef(null);
  const cardRefs = useRef([]);
  const spotlightRefs = useRef([]);
  const progressRef = useRef(0);
  const gateActiveRef = useRef(false);
  const gateCompleteRef = useRef(false);
  const releaseScrollLockRef = useRef(null);

  const reduce = useReducedMotion();
  const { lockScroll, unlockScroll } = useMaisonScroll();

  const releaseRunwayScrollLock = useCallback(() => {
    if (releaseScrollLockRef.current) {
      releaseScrollLockRef.current();
      releaseScrollLockRef.current = null;
      return;
    }

    unlockScroll(MAISON_SCROLL_LOCKS.foodRunway);
  }, [unlockScroll]);

  const engageRunwayScrollLock = useCallback(() => {
    if (releaseScrollLockRef.current) return;
    releaseScrollLockRef.current = lockScroll(MAISON_SCROLL_LOCKS.foodRunway);
  }, [lockScroll]);

  const setCardRef = (element, index) => {
    cardRefs.current[index] = element;
  };

  const setSpotlightRef = (element, index) => {
    spotlightRefs.current[index] = element;
  };

  useLayoutEffect(() => {
    if (reduce) return undefined;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1280px)", () => {
      const cards = foodFilms.map((_, index) => cardRefs.current[index]);
      const spotlightCards = foodFilms.map((_, index) => spotlightRefs.current[index]);

      if (
        !sectionRef.current ||
        !vortexRef.current ||
        !centerTextRef.current ||
        !subTextRef.current ||
        !progressFillRef.current ||
        !progressLabelRef.current ||
        cards.some((card) => !card) ||
        spotlightCards.some((card) => !card)
      ) {
        return undefined;
      }

      const clamp = gsap.utils.clamp(0, 1);

      const getSectionTop = () =>
        sectionRef.current.getBoundingClientRect().top + window.scrollY;

      const focusStart = 0.2;
      const focusEnd = 0.96;
      const lockDistance = Math.max(window.innerHeight * 4.8, foodFilms.length * 360);
      const wheelPace = 2.05;
      const itemProgressStep =
        (focusEnd - focusStart) / Math.max(foodFilms.length - 1, 1);
      const preloadedImages = [];
      const preloadLinks = [];

      foodFilms.forEach((film, index) => {
        if (!film.image) return;

        if (shouldPrioritizeFilm(index)) {
          const link = document.createElement("link");

          link.rel = "preload";
          link.as = "image";
          link.href = film.image;
          link.fetchPriority = "high";
          document.head.appendChild(link);
          preloadLinks.push(link);
        }

        const image = new window.Image();
        image.decoding = "async";
        image.loading = "eager";
        image.fetchPriority = shouldPrioritizeFilm(index) ? "high" : "auto";
        image.src = film.image;
        image.decode?.().catch(() => {});
        preloadedImages.push(image);
      });

      const lockToSection = () => {
        const sectionTop = getSectionTop();

        if (Math.abs(window.scrollY - sectionTop) > 1) {
          window.scrollTo({
            top: sectionTop,
            behavior: "auto",
          });
        }
      };

      const renderScene = (progress) => {
        const vortexRotationY = -360 * progress;
        const vortexRotationX = -5 + 3 * progress;
        const vortexRotationYRadians = (vortexRotationY * Math.PI) / 180;
        const vortexRotationXRadians = (vortexRotationX * Math.PI) / 180;
        const vortexY = 92 - 58 * progress;
        const focusDepth = 540;
        const focusX = -Math.sin(vortexRotationYRadians) * focusDepth;
        const focusY =
          (Math.sin(vortexRotationXRadians) * focusDepth - vortexY) /
          Math.cos(vortexRotationXRadians);
        const focusZ = Math.cos(vortexRotationYRadians) * focusDepth;
        const textIn = clamp(progress / 0.1);
        const textOut = clamp((progress - 0.08) / 0.14);
        const textOpacity = textIn * (1 - textOut);
        const subOpacity = textIn * (1 - textOut * 0.95);
        const focusProgress = clamp((progress - focusStart) / (focusEnd - focusStart));
        const focusStrength = clamp((progress - 0.18) / 0.08);
        const activePosition = focusProgress * (foodFilms.length - 1);
        const focusAmounts = foodFilms.map((_, index) => {
          return getFocusAmount(index, activePosition) * focusStrength;
        });
        const activeSpotlightIndex = Math.round(activePosition);

        gsap.set(vortexRef.current, {
          rotationY: vortexRotationY,
          rotationX: vortexRotationX,
          y: vortexY,
          z: -500 + 160 * progress,
          scale: 1 + 0.1 * progress,
          force3D: true,
        });

        gsap.set(progressFillRef.current, {
          scaleX: progress,
          opacity: 0.48 + progress * 0.52,
          force3D: true,
        });

        progressLabelRef.current.textContent = `${Math.round(progress * 100)
          .toString()
          .padStart(2, "0")}%`;

        gsap.set(cards, {
          x: (index) => {
            const film = foodFilms[index];
            const focus = focusAmounts[index];
            const baseX = film.x + film.scrollX * progress;

            return baseX * (1 - focus) + focusX * focus;
          },
          y: (index) => {
            const film = foodFilms[index];
            const focus = focusAmounts[index];
            const baseY = film.y + film.scrollY * progress;

            return baseY * (1 - focus) + focusY * focus;
          },
          z: (index) => {
            const film = foodFilms[index];
            const focus = focusAmounts[index];
            const baseZ = film.z + film.scrollZ * progress;

            return baseZ * (1 - focus) + focusZ * focus;
          },
          scale: (index) => {
            const film = foodFilms[index];
            const focus = focusAmounts[index];

            return film.scale + (3.05 - film.scale) * focus;
          },
          rotationX: (index) => {
            const focus = focusAmounts[index];

            return foodFilms[index].rotateX * (1 - focus) - vortexRotationX * focus;
          },
          rotationY: (index) => {
            const film = foodFilms[index];
            const focus = focusAmounts[index];
            const baseRotation = film.rotateY + film.scrollRotY * progress;

            return baseRotation * (1 - focus) - vortexRotationY * focus;
          },
          rotationZ: (index) => {
            const film = foodFilms[index];
            const focus = focusAmounts[index];
            const baseRotation = film.rotateZ + film.scrollRotZ * progress;

            return baseRotation * (1 - focus);
          },
          opacity: (index) => 0.48 + (1 - focusAmounts[index]) * 0.34,
          zIndex: (index) =>
            Math.round(foodFilms[index].layer + focusAmounts[index] * 1000),
          force3D: true,
        });

        gsap.set(spotlightCards, {
          autoAlpha: (index) =>
            index === activeSpotlightIndex ? Math.pow(focusAmounts[index] || 0, 1.45) : 0,
          scale: (index) =>
            index === activeSpotlightIndex ? 0.94 + (focusAmounts[index] || 0) * 0.06 : 0.94,
          filter: "none",
          zIndex: (index) => (index === activeSpotlightIndex ? 1000 : 900),
          force3D: true,
        });

        gsap.set(centerTextRef.current, {
          opacity: textOpacity,
          y: 38 * (1 - textIn) - 54 * textOut,
          scale: 1 - 0.08 * textOut,
          filter: `blur(${16 * (1 - textIn) + 10 * textOut}px)`,
          force3D: true,
        });

        gsap.set(subTextRef.current, {
          opacity: subOpacity,
          y: 26 * (1 - textIn) - 34 * textOut,
          filter: `blur(${12 * (1 - textIn) + 7 * textOut}px)`,
          force3D: true,
        });
      };

      let renderFrame = null;
      let queuedProgress = 0;
      let renderedProgress = 0;

      const renderNow = (progress) => {
        queuedProgress = clamp(progress);
        renderedProgress = queuedProgress;

        if (renderFrame !== null) {
          window.cancelAnimationFrame(renderFrame);
          renderFrame = null;
        }

        renderScene(queuedProgress);
      };

      const animateRender = () => {
        const distance = queuedProgress - renderedProgress;

        if (Math.abs(distance) < 0.00045) {
          renderedProgress = queuedProgress;
          renderFrame = null;
          renderScene(renderedProgress);
          return;
        }

        renderedProgress += distance * 0.32;
        renderScene(renderedProgress);
        renderFrame = window.requestAnimationFrame(animateRender);
      };

      const scheduleRender = (progress) => {
        queuedProgress = clamp(progress);

        if (renderFrame !== null) return;

        renderFrame = window.requestAnimationFrame(animateRender);
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
        force3D: true,
      });

      gsap.set(spotlightCards, {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 0.9,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      cards.forEach((card, index) => {
        const film = foodFilms[index];

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: film.x,
          y: film.y,
          z: film.z,
          scale: film.scale,
          rotationX: film.rotateX,
          rotationY: film.rotateY,
          rotationZ: film.rotateZ,
        });
      });

      gsap.set(progressFillRef.current, {
        opacity: 0.48,
        scaleX: 0,
        transformOrigin: "0% 50%",
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

      renderNow(0);

      const activateGate = () => {
        if (gateCompleteRef.current || gateActiveRef.current) return;

        gateActiveRef.current = true;
        progressRef.current = 0;
        engageRunwayScrollLock();
        renderNow(0);
        lockToSection();
      };

      const completeGate = () => {
        gateCompleteRef.current = true;
        gateActiveRef.current = false;
        progressRef.current = 1;
        renderNow(1);
        releaseRunwayScrollLock();

        window.requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (!section) return;

          window.scrollTo({
            top: getSectionTop() + window.innerHeight * 0.92,
            behavior: "smooth",
          });
        });
      };

      const resetGateIfAbove = () => {
        const sectionTop = getSectionTop();

        if (window.scrollY < sectionTop - window.innerHeight * 0.35) {
          gateCompleteRef.current = false;
          gateActiveRef.current = false;
          progressRef.current = 0;
          releaseRunwayScrollLock();
          renderNow(0);
        }
      };

      const isInGateZone = () => {
        const section = sectionRef.current;
        if (!section) return false;

        const rect = section.getBoundingClientRect();

        return (
          rect.top <= window.innerHeight * 0.12 &&
          rect.bottom >= window.innerHeight * 0.55
        );
      };

      const handleWheel = (event) => {
        if (!gateActiveRef.current) {
          resetGateIfAbove();
        }

        const scrollingForward = event.deltaY > 0;

        if (gateCompleteRef.current && scrollingForward) return;
        if (!gateActiveRef.current && !isInGateZone()) return;

        if (!gateActiveRef.current && scrollingForward) {
          activateGate();
        }

        if (!gateActiveRef.current) return;

        event.preventDefault();
        event.stopPropagation();

        const wheelDelta = Math.max(Math.min(event.deltaY, 320), -320);
        const nextProgress = clamp(
          progressRef.current + (wheelDelta * wheelPace) / lockDistance
        );
        progressRef.current = nextProgress;

        if (nextProgress >= 0.995 && scrollingForward) {
          completeGate();
          return;
        }

        if (nextProgress <= 0.001 && event.deltaY < 0) {
          gateActiveRef.current = false;
          releaseRunwayScrollLock();
          renderNow(0);
          return;
        }

        scheduleRender(nextProgress);
      };

      const handleKeyDown = (event) => {
        const forwardKeys = ["ArrowDown", "PageDown", " ", "End"];
        const backwardKeys = ["ArrowUp", "PageUp", "Home"];
        const isForward = forwardKeys.includes(event.key);
        const isBackward = backwardKeys.includes(event.key);

        if (!isForward && !isBackward) return;

        if (!gateActiveRef.current) {
          resetGateIfAbove();
        }

        if (gateCompleteRef.current && isForward) return;
        if (!gateActiveRef.current && !isInGateZone()) return;

        if (!gateActiveRef.current && isForward) {
          activateGate();
        }

        if (!gateActiveRef.current) return;

        event.preventDefault();

        const direction = isForward ? 1 : -1;
        const isPageKey = ["PageDown", "PageUp", "End", "Home"].includes(event.key);
        const nextProgress = clamp(
          progressRef.current + direction * itemProgressStep * (isPageKey ? 4 : 1)
        );
        progressRef.current = nextProgress;

        if (nextProgress >= 0.995 && isForward) {
          completeGate();
          return;
        }

        if (nextProgress <= 0.001 && isBackward) {
          gateActiveRef.current = false;
          releaseRunwayScrollLock();
          renderNow(0);
          return;
        }

        scheduleRender(nextProgress);
      };

      const handleScroll = () => {
        resetGateIfAbove();

        if (gateActiveRef.current) {
          lockToSection();
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        releaseRunwayScrollLock();
        preloadLinks.forEach((link) => link.remove());
        preloadedImages.length = 0;

        if (renderFrame !== null) {
          window.cancelAnimationFrame(renderFrame);
        }

        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("scroll", handleScroll);
      };
    });

    return () => {
      matchMedia.revert();
    };
  }, [engageRunwayScrollLock, reduce, releaseRunwayScrollLock]);

  return (
    <section
      id="food-film-runway"
      ref={sectionRef}
      className="relative bg-[#050302] xl:h-screen xl:overflow-visible"
    >
      {/* XL screen 3D vortex */}
      <div className="relative isolate hidden h-screen overflow-hidden bg-[#050302] xl:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,162,91,0.14),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_70%,rgba(74,20,24,0.32),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_20%,rgba(119,63,139,0.16),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060403] via-transparent to-[#050302]" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_210px_rgba(0,0,0,0.98)]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black/70 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-[52%] z-10 h-[28rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] bg-gradient-to-r from-transparent via-[#C9A25B]/[0.08] to-transparent blur-3xl" />
        <div className="pointer-events-none absolute inset-x-10 top-12 z-20 h-px bg-gradient-to-r from-transparent via-[#C9A25B]/24 to-transparent" />
        <div className="pointer-events-none absolute inset-x-10 bottom-12 z-20 h-px bg-gradient-to-r from-transparent via-[#C9A25B]/18 to-transparent" />

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

        <div className="absolute bottom-7 left-8 right-8 z-40 grid grid-cols-[auto_1fr_auto] items-center gap-5 text-[10px] uppercase tracking-[0.32em] text-white/34">
          <span>Scroll to rotate</span>
          <div
            className="h-px overflow-hidden bg-white/10"
            aria-hidden="true"
          >
            <div
              ref={progressFillRef}
              className="h-full w-full origin-left bg-gradient-to-r from-[#C9A25B]/25 via-[#F1D38A]/80 to-[#C9A25B]/25"
            />
          </div>
          <div className="flex items-center gap-3 text-right">
            <span
              ref={progressLabelRef}
              className="min-w-[3rem] text-[#C9A25B]/70"
            >
              00%
            </span>
            <span className="text-white/30">One full turn</span>
          </div>
        </div>

        <div
          className="absolute inset-0 z-30"
          style={{
            perspective: "2800px",
            perspectiveOrigin: "50% 56%",
          }}
        >
          <div
            ref={vortexRef}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {foodFilms.map((film, index) => (
              <DesktopVortexCard
                key={film.id}
                film={film}
                index={index}
                setCardRef={setCardRef}
              />
            ))}
          </div>

          {foodFilms.map((film, index) => (
            <DesktopSpotlightCard
              key={`${film.id}-spotlight`}
              film={film}
              index={index}
              setSpotlightRef={setSpotlightRef}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex translate-y-16 items-center justify-center px-6 text-center">
          <div className="max-w-5xl">
            <p
              ref={subTextRef}
              className="mb-7 text-xs uppercase tracking-[0.54em] text-[#C9A25B]"
            >
              Food Film Runway
            </p>

            <h2
              ref={centerTextRef}
              className="font-serif text-[clamp(4rem,8vw,8.5rem)] leading-[0.78] tracking-[-0.085em] text-[#F7F0E7] [text-shadow:0_32px_90px_rgba(0,0,0,0.82)]"
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
              <MobileFilmCard key={film.id} film={film} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FoodFilmRunway;
