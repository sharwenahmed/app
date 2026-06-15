import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic button — pulls toward the cursor on hover, with a spring-back on leave.
 * Renders a real <button> so onClick + data-testid still work. Falls back to a normal
 * button when prefers-reduced-motion is set.
 */
export default function MagneticButton({
  children,
  strength = 0.32,
  haloStrength = 0.18,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...rest
}) {
  const ref = useRef(null);
  const haloRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduce = useReducedMotion();
  const sx = useSpring(x, { stiffness: 240, damping: 20, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 240, damping: 20, mass: 0.45 });

  const onMouseMove = (e) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * strength);
    y.set(dy * strength);
    if (haloRef.current) {
      haloRef.current.style.transform = `translate(${dx * haloStrength}px, ${dy * haloStrength}px)`;
    }
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (haloRef.current) haloRef.current.style.transform = "translate(0,0)";
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      style={reduce ? undefined : { x: sx, y: sy }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={`relative inline-flex items-center justify-center ${className}`}
      {...rest}
    >
      <span
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.55), transparent 70%)" }}
      />
      <span className="relative inline-flex items-center justify-center gap-2 z-10">
        {children}
      </span>
    </motion.button>
  );
}
