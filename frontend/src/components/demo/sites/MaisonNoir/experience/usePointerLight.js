import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { getSectionLight, MAISON_PERFORMANCE_MODE } from "./SectionLightMap";

function canUsePointerLight() {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function shouldDimPointerLight(target) {
  if (!target || !target.closest) return false;

  return Boolean(
    target.closest(
      [
        "[role='dialog']",
        "[data-maison-scroll-prevent]",
        "[data-maison-concierge]",
        "[data-maison-order-chrome]",
        "form",
        "input",
        "textarea",
        "select",
      ].join(",")
    )
  );
}

export default function usePointerLight(activeSceneId, performanceMode) {
  const activeSceneIdRef = useRef(activeSceneId);

  useEffect(() => {
    activeSceneIdRef.current = activeSceneId;
  }, [activeSceneId]);

  useEffect(() => {
    if (
      performanceMode !== MAISON_PERFORMANCE_MODE.FULL ||
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      !canUsePointerLight()
    ) {
      return undefined;
    }

    const root = document.documentElement;
    const xTo = gsap.quickTo(root, "--mn-light-x", {
      duration: 0.9,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(root, "--mn-light-y", {
      duration: 0.9,
      ease: "power3.out",
    });
    const pointerXTo = gsap.quickTo(root, "--mn-pointer-x", {
      duration: 0.72,
      ease: "power3.out",
    });
    const pointerYTo = gsap.quickTo(root, "--mn-pointer-y", {
      duration: 0.72,
      ease: "power3.out",
    });
    const opacityTo = gsap.quickTo(root, "--mn-pointer-opacity", {
      duration: 0.45,
      ease: "power2.out",
    });

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      const sceneLight = getSectionLight(activeSceneIdRef.current);
      const strength = shouldDimPointerLight(event.target)
        ? 0
        : Math.min(sceneLight.pointer || 0, 0.38);

      pointerXTo(x);
      pointerYTo(y);
      opacityTo(strength);

      if (strength > 0.16) {
        xTo(sceneLight.lightX * 0.86 + x * 0.14);
        yTo(sceneLight.lightY * 0.88 + y * 0.12);
      }
    };

    const handlePointerLeave = () => {
      opacityTo(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      opacityTo(0);
    };
  }, [performanceMode]);
}
