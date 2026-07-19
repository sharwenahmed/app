import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

const AUTOPLAY_DELAY = 5200;

const emberParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 17) % 84)}%`,
  delay: index * 0.38,
  duration: 7 + (index % 5),
  size: index % 3 === 0 ? "h-1.5 w-1.5" : "h-1 w-1",
}));

export default function SignatureMenu() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartYRef = useRef(null);
  const viewProgressRef = useRef(0);
  const viewGateActiveRef = useRef(false);
  const viewGateCompleteRef = useRef(false);
  const releaseTimerRef = useRef(null);
  const releaseScrollLockRef = useRef(null);
  const reduce = useReducedMotion();
  const { lockScroll, unlockScroll } = useMaisonScroll();

  const dish = dishes[active];

  useEffect(() => {
    if (reduce || isPaused || isReserving) return;

    intervalRef.current = window.setInterval(() => {
      setActive((current) => (current + 1) % dishes.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isReserving, reduce]);

  const handleSelectDish = (index) => {
    setActive(index);

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  };

  const handleReserveExperience = (event) => {
    event.preventDefault();

    setIsReserving(true);
    setIsPaused(true);

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
      setIsPaused(false);
    }, 2050);
  };

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

  useEffect(() => {
    if (reduce) return undefined;

    const clamp = (value) => Math.min(Math.max(value, 0), 1);

    const getTargetY = () => {
      const section = sectionRef.current;
      if (!section) return 0;

      const offset = window.innerWidth >= 768 ? 28 : 12;
      return Math.max(section.getBoundingClientRect().top + window.scrollY - offset, 0);
    };

    const lockToSignature = () => {
      const targetY = getTargetY();

      if (Math.abs(window.scrollY - targetY) > 1) {
        window.scrollTo({
          top: targetY,
          behavior: "auto",
        });
      }
    };

    const releaseGate = () => {
      viewGateActiveRef.current = false;
      viewGateCompleteRef.current = true;
      viewProgressRef.current = 1;
      releaseSignatureScrollLock();

      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
    };

    const activateGate = () => {
      if (viewGateActiveRef.current || viewGateCompleteRef.current) return;

      viewGateActiveRef.current = true;
      viewProgressRef.current = 0;
      engageSignatureScrollLock();
      lockToSignature();

      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }

      releaseTimerRef.current = window.setTimeout(releaseGate, 1100);
    };

    const resetIfAbove = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();

      if (rect.top > window.innerHeight * 0.72) {
        viewGateActiveRef.current = false;
        viewGateCompleteRef.current = false;
        viewProgressRef.current = 0;
        releaseSignatureScrollLock();

        if (releaseTimerRef.current) {
          window.clearTimeout(releaseTimerRef.current);
          releaseTimerRef.current = null;
        }
      }
    };

    const isSignatureApproaching = () => {
      const section = sectionRef.current;
      if (!section) return false;

      const rect = section.getBoundingClientRect();

      const entryLine = Math.min(window.innerHeight * 0.46, 460);

      return rect.top <= entryLine && rect.bottom >= window.innerHeight * 0.42;
    };

    const consumeForwardScroll = (delta) => {
      lockToSignature();
      viewProgressRef.current = clamp(viewProgressRef.current + delta / 1150);

      if (viewProgressRef.current >= 1) {
        releaseGate();
      }
    };

    const handleWheel = (event) => {
      if (!viewGateActiveRef.current) {
        resetIfAbove();
      }

      const scrollingForward = event.deltaY > 0;

      if (!scrollingForward || viewGateCompleteRef.current) return;
      if (!viewGateActiveRef.current && !isSignatureApproaching()) return;

      activateGate();

      event.preventDefault();
      event.stopPropagation();
      consumeForwardScroll(event.deltaY);
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event) => {
      if (!viewGateActiveRef.current) {
        resetIfAbove();
      }

      const currentY = event.touches[0]?.clientY ?? null;
      const startY = touchStartYRef.current;

      if (currentY === null || startY === null) return;

      const delta = startY - currentY;
      const scrollingForward = delta > 0;

      if (!scrollingForward || viewGateCompleteRef.current) {
        touchStartYRef.current = currentY;
        return;
      }

      if (!viewGateActiveRef.current && !isSignatureApproaching()) {
        touchStartYRef.current = currentY;
        return;
      }

      activateGate();

      event.preventDefault();
      consumeForwardScroll(delta * 2.6);
      touchStartYRef.current = currentY;
    };

    const handleKeyDown = (event) => {
      const forwardKeys = ["ArrowDown", "PageDown", " ", "End"];

      if (!forwardKeys.includes(event.key)) return;
      if (!viewGateActiveRef.current) {
        resetIfAbove();
      }

      if (viewGateCompleteRef.current) return;
      if (!viewGateActiveRef.current && !isSignatureApproaching()) return;

      activateGate();
      event.preventDefault();
      consumeForwardScroll(390);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      releaseSignatureScrollLock();

      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [engageSignatureScrollLock, reduce, releaseSignatureScrollLock]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#060403] px-6 py-24 md:py-36"
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
        <motion.div
          initial={reduce ? false : { opacity: 1 }}
          whileInView={reduce ? {} : { opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
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

        <div className="relative z-20 grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="mb-10 flex items-center gap-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={dish.number}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={reduce ? {} : { opacity: 1, y: 0 }}
                  exit={reduce ? {} : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-[clamp(5rem,11vw,10rem)] leading-none text-[#C9A25B]/30"
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
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-5 text-[10px] uppercase tracking-[0.48em] text-[#C9A25B]/80">
                  {dish.subtitle}
                </p>

                <h3 className="font-serif text-[clamp(4.4rem,9vw,8.6rem)] leading-[0.78] tracking-[-0.08em] text-white">
                  {dish.short}
                </h3>

                <p className="mt-7 text-[10px] uppercase tracking-[0.38em] text-[#C9A25B]/70">
                  {dish.details}
                </p>

                <p className="mt-8 max-w-xl text-lg leading-8 text-white/58">
                  {dish.story}
                </p>

                <div className="mt-12 flex items-end justify-between gap-8 border-t border-white/10 pt-8">
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

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={handleReserveExperience}
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#C9A25B]/60 bg-[#C9A25B]/10 px-7 py-4 text-sm text-[#F2D48A] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-[#C9A25B] hover:text-black"
                  >
                    Reserve This Experience
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <a
                    href="#full-menu"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-7 py-4 text-sm text-white/58 transition duration-500 hover:-translate-y-1 hover:border-[#C9A25B]/40 hover:text-[#C9A25B]"
                  >
                    See the full menu
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-14 grid grid-cols-3 gap-3">
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
                    transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
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
                        duration: 8.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="aspect-[4/5] w-full object-cover opacity-95 sm:aspect-[16/11]"
                    />
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  key={`knife-${active}`}
                  initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                  animate={
                    reduce ? {} : { scaleX: [0, 1, 0], opacity: [0, 1, 0] }
                  }
                  transition={{ duration: 1.18, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute left-0 top-1/2 z-40 h-px w-full origin-left bg-gradient-to-r from-transparent via-[#F2D48A] to-transparent shadow-[0_0_36px_rgba(242,212,138,0.95)]"
                />

                <motion.div
                  key={`shimmer-${active}`}
                  initial={reduce ? false : { x: "-120%", opacity: 0 }}
                  animate={reduce ? {} : { x: "130%", opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2.4, delay: 0.45, ease: "easeInOut" }}
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
                        transition={{ duration: 0.5 }}
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
                          duration: 0.75,
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
                      transition={{ duration: 0.65, delay: 0.18 }}
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

        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-white/42">
            A full seasonal menu, wine pairings, and private tasting options are
            available for an elevated evening.
          </p>

          <a
            href="#full-menu"
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/40 px-6 py-3.5 text-[#C9A25B] transition duration-500 hover:-translate-y-1 hover:bg-[#C9A25B] hover:text-black"
          >
            View the complete menu
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
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
