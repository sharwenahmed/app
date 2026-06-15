import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Splits a string into words and reveals each with a stagger + blur, Framer-style.
 * Whitespace is preserved by emitting a non-breaking space between words.
 */
export default function SplitWords({
  text,
  className = "",
  delay = 0,
  duration = 0.7,
  stagger = 0.045,
  yOffset = 28,
  as: As = "span",
}) {
  const reduce = useReducedMotion();
  const words = String(text).split(" ");

  if (reduce) {
    return <As className={className}>{text}</As>;
  }

  return (
    <As className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            initial={{ y: yOffset, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
            className="inline-block will-change-transform"
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </As>
  );
}
