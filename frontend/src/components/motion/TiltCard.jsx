import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";

/**
 * 3D tilt card — rotates on mouse position, with a subtle highlight overlay that
 * follows the cursor for a glossy, premium feel. Disabled under reduced-motion.
 */
export default function TiltCard({
  children,
  intensity = 7,
  glare = true,
  className = "",
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(yRaw, { stiffness: 180, damping: 22, mass: 0.5 });

  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);
  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);

  const gxPct = useTransform(x, [-0.5, 0.5], [0, 100]);
  const gyPct = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(420px 320px at ${gxPct}% ${gyPct}%, rgba(255,255,255,0.18), transparent 60%)`;

  const onMove = (e) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRaw.set((e.clientX - r.left) / r.width - 0.5);
    yRaw.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    xRaw.set(0);
    yRaw.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }
      }
      className={`relative ${className}`}
    >
      <div className="relative" style={{ transform: "translateZ(0)" }}>
        {children}
        {glare && !reduce && (
          <motion.div
            aria-hidden="true"
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          />
        )}
      </div>
    </motion.div>
  );
}
