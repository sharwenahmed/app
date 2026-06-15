import React, { useEffect, useRef } from "react";

/**
 * Page-wide mouse-reactive purple glow. Position is lerped with rAF so it feels
 * weighted and premium, not jittery. Disabled on touch devices.
 */
export default function MouseGradient() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    let raf;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      if (ref.current) {
        ref.current.style.background = `radial-gradient(620px 620px at ${cx}px ${cy}px, rgba(168,85,247,0.16), rgba(99,102,241,0.05) 35%, transparent 60%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] mix-blend-screen hidden md:block"
    />
  );
}
