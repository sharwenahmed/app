import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 20 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: reduce ? {} : { opacity: 0, y, filter: "blur(6px)" },
        show: reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
