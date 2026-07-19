import React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useMaisonScroll } from "./MaisonScrollDirector";

export default function AmbientLighting() {
  const reduceMotion = useReducedMotion();
  const { activeScene, scrollState } = useMaisonScroll();

  const glowX = activeScene?.x || "50%";
  const glowY = activeScene?.y || "50%";
  const glowA = activeScene?.glowA || "rgba(201,162,91,0.12)";
  const glowB = activeScene?.glowB || "rgba(74,20,24,0.18)";
  const velocityGlow = Math.min(Math.abs(scrollState.velocity) / 120, 0.32);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[4] hidden mix-blend-screen md:block"
      animate={
        reduceMotion
          ? { opacity: 0.36 }
          : {
              opacity: 0.44 + velocityGlow,
              backgroundPosition: ["0% 0%", "18% 12%", "0% 0%"],
            }
      }
      transition={{ duration: reduceMotion ? 0 : 9, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: [
          `radial-gradient(ellipse at ${glowX} ${glowY}, ${glowA}, transparent 42%)`,
          `radial-gradient(ellipse at 78% 28%, ${glowB}, transparent 36%)`,
          "linear-gradient(115deg, rgba(201,162,91,0.05), transparent 34%, rgba(76,34,84,0.08) 68%, transparent)",
        ].join(", "),
      }}
    />
  );
}
