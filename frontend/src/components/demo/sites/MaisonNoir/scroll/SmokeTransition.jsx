import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function SmokeTransition({
  className = "",
  intensity = 0.66,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const effectsActive = !reduceMotion && isVisible;

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "18% 0px 18% 0px",
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-maison-smoke-transition
      className={`pointer-events-none relative h-[54vh] min-h-[22rem] overflow-hidden bg-[#050505] md:h-[72vh] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-black to-[#060303]" />

      <motion.div
        className="absolute inset-x-[-18%] bottom-[-10%] h-[58%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,162,91,0.22),rgba(74,20,24,0.24)_34%,transparent_72%)] blur-3xl"
        initial={reduceMotion ? false : { y: "14%", opacity: intensity * 0.52 }}
        animate={
          effectsActive
            ? {
                y: ["14%", "-6%", "10%"],
                opacity: [intensity * 0.42, intensity, intensity * 0.46],
              }
            : {
                y: "8%",
                opacity: intensity * 0.24,
              }
        }
        transition={{
          duration: effectsActive ? 9.5 : 0.45,
          repeat: effectsActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-x-[-22%] top-[18%] h-[34%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),rgba(83,41,88,0.18),rgba(201,162,91,0.12),transparent)] blur-3xl"
        initial={reduceMotion ? false : { x: "-12%", opacity: intensity * 0.4 }}
        animate={
          effectsActive
            ? {
                x: ["-12%", "12%", "-8%"],
                opacity: [intensity * 0.28, intensity * 0.72, intensity * 0.34],
              }
            : {
                x: "-4%",
                opacity: intensity * 0.2,
              }
        }
        transition={{
          duration: effectsActive ? 11 : 0.45,
          repeat: effectsActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-y-0 left-[-18%] w-[54%] bg-[radial-gradient(ellipse_at_0%_52%,rgba(255,255,255,0.08),transparent_62%)] blur-2xl"
        initial={reduceMotion ? false : { x: "-8%", opacity: 0 }}
        whileInView={reduceMotion ? {} : { x: "12%", opacity: intensity * 0.48 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute inset-y-0 right-[-18%] w-[54%] bg-[radial-gradient(ellipse_at_100%_52%,rgba(201,162,91,0.1),transparent_62%)] blur-2xl"
        initial={reduceMotion ? false : { x: "8%", opacity: 0 }}
        whileInView={reduceMotion ? {} : { x: "-12%", opacity: intensity * 0.52 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 1.75, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-black/35 to-[#060303]" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
    </div>
  );
}
