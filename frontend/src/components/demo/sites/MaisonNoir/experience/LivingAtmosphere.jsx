import React, { useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";

import { useMaisonScroll } from "../scroll/MaisonScrollDirector";
import {
  getSectionLight,
  MAISON_PERFORMANCE_MODE,
  scaleLightForMode,
} from "./SectionLightMap";
import usePointerLight from "./usePointerLight";

function getPerformanceMode(reduceMotion) {
  if (reduceMotion || typeof window === "undefined") {
    return MAISON_PERFORMANCE_MODE.REDUCED;
  }

  const touchDevice =
    window.matchMedia("(hover: none), (pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0;
  const tabletOrSmaller = window.matchMedia("(max-width: 1279px)").matches;
  const lowerHardware =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency > 0 &&
    navigator.hardwareConcurrency <= 4;

  if (touchDevice || tabletOrSmaller || lowerHardware) {
    return MAISON_PERFORMANCE_MODE.LITE;
  }

  return MAISON_PERFORMANCE_MODE.FULL;
}

function useMaisonPerformanceMode(reduceMotion) {
  const [mode, setMode] = useState(() => getPerformanceMode(reduceMotion));

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncMode = () => {
      setMode(getPerformanceMode(reduceMotion));
    };

    syncMode();
    window.addEventListener("resize", syncMode);

    return () => {
      window.removeEventListener("resize", syncMode);
    };
  }, [reduceMotion]);

  return mode;
}

function applyImmediateLight(root, light) {
  Object.entries({
    "--mn-light-x": light.lightX,
    "--mn-light-y": light.lightY,
    "--mn-light-intensity": light.intensity,
    "--mn-amber": light.amber,
    "--mn-burgundy": light.burgundy,
    "--mn-fire": light.fire,
    "--mn-haze": light.haze,
    "--mn-vignette": light.vignette,
    "--mn-scene-depth": light.depth,
    "--mn-pointer-opacity": light.pointer,
  }).forEach(([property, value]) => {
    root.style.setProperty(property, String(value));
  });
}

export default function LivingAtmosphere() {
  const reduceMotion = useReducedMotion();
  const { activeSceneId } = useMaisonScroll();
  const performanceMode = useMaisonPerformanceMode(reduceMotion);
  const activeLight = scaleLightForMode(
    getSectionLight(activeSceneId),
    performanceMode
  );

  usePointerLight(activeSceneId, performanceMode);

  useLayoutEffect(() => {
    if (typeof document === "undefined") return undefined;

    const root = document.documentElement;
    root.dataset.mnPerformanceMode = performanceMode;
    root.dataset.mnActiveScene = activeSceneId || "top";

    if (performanceMode === MAISON_PERFORMANCE_MODE.REDUCED) {
      applyImmediateLight(root, activeLight);
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.to(root, {
        "--mn-light-x": activeLight.lightX,
        "--mn-light-y": activeLight.lightY,
        "--mn-light-intensity": activeLight.intensity,
        "--mn-amber": activeLight.amber,
        "--mn-burgundy": activeLight.burgundy,
        "--mn-fire": activeLight.fire,
        "--mn-haze": activeLight.haze,
        "--mn-vignette": activeLight.vignette,
        "--mn-scene-depth": activeLight.depth,
        duration: performanceMode === MAISON_PERFORMANCE_MODE.LITE ? 0.9 : 1.45,
        ease: "power2.out",
        overwrite: true,
      });
    });

    return () => {
      context.revert();
    };
  }, [activeLight, activeSceneId, performanceMode]);

  const atmosphereClass =
    performanceMode === MAISON_PERFORMANCE_MODE.FULL
      ? "maison-living-atmosphere maison-living-atmosphere--full"
      : "maison-living-atmosphere maison-living-atmosphere--lite";

  return (
    <>
      <style>
        {`
          :root {
            --mn-light-x: 50;
            --mn-light-y: 28;
            --mn-light-intensity: 0.6;
            --mn-amber: 0.18;
            --mn-burgundy: 0.12;
            --mn-fire: 0.08;
            --mn-haze: 0.1;
            --mn-vignette: 0.7;
            --mn-scene-depth: 0.3;
            --mn-scroll-velocity: 0;
            --mn-pointer-x: 50;
            --mn-pointer-y: 50;
            --mn-pointer-opacity: 0;
          }

          .maison-living-atmosphere {
            pointer-events: none;
            position: fixed;
            inset: 0;
            z-index: 4;
            overflow: hidden;
            contain: paint;
          }

          .maison-living-atmosphere__light,
          .maison-living-atmosphere__haze {
            position: absolute;
            inset: 0;
            will-change: transform, opacity;
          }

          .maison-living-atmosphere__light {
            opacity: calc(0.52 + (var(--mn-light-intensity) * 0.28));
            background:
              radial-gradient(ellipse at calc(var(--mn-light-x) * 1%) calc(var(--mn-light-y) * 1%), rgba(201, 162, 91, var(--mn-amber)), transparent 36%),
              radial-gradient(ellipse at 82% 28%, rgba(74, 20, 24, var(--mn-burgundy)), transparent 38%),
              radial-gradient(ellipse at 50% 96%, rgba(255, 112, 42, var(--mn-fire)), transparent 34%),
              radial-gradient(circle at 50% 50%, transparent 52%, rgba(0, 0, 0, var(--mn-vignette)) 100%);
            transform: translate3d(0, 0, 0) scale(calc(1 + (var(--mn-scene-depth) * 0.018)));
          }

          .maison-living-atmosphere__haze {
            opacity: var(--mn-haze);
            background:
              linear-gradient(108deg, transparent 18%, rgba(255, 255, 255, 0.09) 48%, transparent 78%),
              radial-gradient(ellipse at 24% 68%, rgba(99, 48, 105, 0.18), transparent 48%);
          }

          .maison-living-atmosphere__pointer {
            position: absolute;
            inset: -18%;
            opacity: var(--mn-pointer-opacity);
            background: radial-gradient(ellipse at calc(var(--mn-pointer-x) * 1%) calc(var(--mn-pointer-y) * 1%), rgba(255, 231, 176, 0.16), transparent 28%);
            transform: translate3d(0, 0, 0);
          }

          .maison-living-atmosphere__dust {
            position: absolute;
            inset: -10%;
            opacity: 0.075;
            background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.64) 1px, transparent 0);
            background-size: 34px 34px;
            transform: translate3d(0, 0, 0);
          }

          .maison-living-atmosphere--full .maison-living-atmosphere__haze {
            animation: maisonLivingHaze 18s ease-in-out infinite alternate;
          }

          .maison-living-atmosphere--full .maison-living-atmosphere__dust {
            animation: maisonLivingDust 28s linear infinite;
          }

          @keyframes maisonLivingHaze {
            0% { transform: translate3d(-6px, 3px, 0) scale(1); }
            55% { transform: translate3d(7px, -5px, 0) scale(1.006); }
            100% { transform: translate3d(2px, 8px, 0) scale(1.01); }
          }

          @keyframes maisonLivingDust {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(18px, -24px, 0); }
          }

          [data-mn-performance-mode="reduced"] .maison-living-atmosphere__haze,
          [data-mn-performance-mode="reduced"] .maison-living-atmosphere__pointer,
          [data-mn-performance-mode="reduced"] .maison-living-atmosphere__dust {
            display: none;
          }

          @media (max-width: 1279px) {
            .maison-living-atmosphere__pointer,
            .maison-living-atmosphere__dust {
              display: none;
            }

            .maison-living-atmosphere__haze {
              opacity: calc(var(--mn-haze) * 0.48);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .maison-living-atmosphere__haze,
            .maison-living-atmosphere__dust {
              animation: none !important;
            }
          }
        `}
      </style>

      <div aria-hidden="true" className={atmosphereClass}>
        <div className="maison-living-atmosphere__light" />
        <div className="maison-living-atmosphere__haze" />
        <div className="maison-living-atmosphere__pointer" />
        <div className="maison-living-atmosphere__dust" />
      </div>
    </>
  );
}
