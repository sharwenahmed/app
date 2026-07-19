import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function SmokeTransition({
  className = "",
  intensity = 0.48,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-28 overflow-hidden bg-[#050505] ${className}`}
    >
      <motion.div
        className="absolute inset-x-[-12%] top-1/2 h-24 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(201,162,91,0.12),rgba(83,41,88,0.16),rgba(74,20,24,0.12),transparent)] blur-2xl"
        initial={reduceMotion ? false : { x: "-8%", opacity: intensity * 0.62 }}
        animate={reduceMotion ? {} : { x: ["-8%", "8%", "-8%"], opacity: [intensity * 0.42, intensity, intensity * 0.42] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
  );
}
