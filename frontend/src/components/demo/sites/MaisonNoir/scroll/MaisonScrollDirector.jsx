import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";

import {
  getScrollTargetY,
  maisonScrollSettings,
} from "./scrollChoreography";

const MaisonScrollContext = createContext(null);

const defaultScrollState = {
  direction: 0,
  progress: 0,
  velocity: 0,
};

const fallbackDirector = {
  activeScene: null,
  activeSceneId: null,
  isScrollLocked: false,
  lenis: null,
  reducedMotion: false,
  scrollState: defaultScrollState,
  setActiveScene: () => {},
  lockScroll: () => () => {},
  unlockScroll: () => {},
  scrollTo: (target, options = {}) => {
    if (typeof window === "undefined") return;

    const y = getScrollTargetY(target, options.offset || 0);
    window.scrollTo({
      top: y,
      behavior: options.behavior || "smooth",
    });
  },
  updateSceneProgress: () => {},
};

export function useMaisonScroll() {
  return useContext(MaisonScrollContext) || fallbackDirector;
}

function getShouldSmoothScroll(reduceMotion) {
  if (typeof window === "undefined" || reduceMotion) return false;

  return window.matchMedia(maisonScrollSettings.desktopQuery).matches;
}

function shouldPreventLenis(target) {
  if (!target || !target.closest) return false;

  return Boolean(
    target.closest(
      [
        "[data-lenis-prevent]",
        "[data-maison-scroll-prevent]",
        "[role='dialog']",
        "input",
        "textarea",
        "select",
      ].join(",")
    )
  );
}

export default function MaisonScrollDirector({
  children,
  scenes = [],
}) {
  const reduceMotion = useReducedMotion();
  const lenisRef = useRef(null);
  const lockReasonsRef = useRef(new Set());
  const scrollStateRef = useRef(defaultScrollState);
  const lastNativeScrollRef = useRef({
    time: 0,
    y: 0,
  });
  const nativeRafRef = useRef(null);

  const [activeScene, setActiveSceneState] = useState(scenes[0] || null);
  const [scrollState, setScrollState] = useState(defaultScrollState);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [smoothEnabled, setSmoothEnabled] = useState(false);

  const publishScrollState = useCallback((nextState) => {
    scrollStateRef.current = nextState;
    setScrollState((current) => {
      const velocityDelta = Math.abs(current.velocity - nextState.velocity);

      if (
        current.direction === nextState.direction &&
        Math.abs(current.progress - nextState.progress) < 0.002 &&
        velocityDelta < 0.2
      ) {
        return current;
      }

      return nextState;
    });

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--maison-scroll-progress", String(nextState.progress));
      root.style.setProperty("--maison-scroll-direction", String(nextState.direction));
      root.style.setProperty(
        "--maison-scroll-velocity",
        String(Math.min(Math.abs(nextState.velocity) / 90, 1))
      );
    }
  }, []);

  const setActiveScene = useCallback((scene) => {
    if (!scene) return;

    setActiveSceneState((current) => {
      if (current?.id === scene.id) return current;
      return scene;
    });

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--maison-scene-accent", scene.accent || "rgba(201,162,91,0.5)");
      root.style.setProperty("--maison-glow-a", scene.glowA || "rgba(201,162,91,0.12)");
      root.style.setProperty("--maison-glow-b", scene.glowB || "rgba(74,20,24,0.18)");
      root.style.setProperty("--maison-glow-x", scene.x || "50%");
      root.style.setProperty("--maison-glow-y", scene.y || "50%");
    }
  }, []);

  const updateSceneProgress = useCallback((sceneId, progress) => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty(
      `--maison-scene-${sceneId}-progress`,
      String(progress)
    );
  }, []);

  const applyLockState = useCallback(() => {
    const hasLocks = lockReasonsRef.current.size > 0;
    const lenis = lenisRef.current;

    setIsScrollLocked(hasLocks);

    if (!lenis) return;

    if (hasLocks) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, []);

  const unlockScroll = useCallback(
    (reason = "scene") => {
      lockReasonsRef.current.delete(reason);
      applyLockState();
    },
    [applyLockState]
  );

  const lockScroll = useCallback(
    (reason = "scene") => {
      lockReasonsRef.current.add(reason);
      applyLockState();

      return () => {
        lockReasonsRef.current.delete(reason);
        applyLockState();
      };
    },
    [applyLockState]
  );

  const scrollTo = useCallback(
    (target, options = {}) => {
      if (typeof window === "undefined") return;

      const offset = options.offset ?? maisonScrollSettings.anchorOffset;
      const y = getScrollTargetY(target, offset);
      const immediate = options.behavior === "auto" || reduceMotion;
      const lenis = lenisRef.current;

      if (lenis && smoothEnabled) {
        lenis.scrollTo(y, {
          immediate,
          force: true,
          duration: options.duration || maisonScrollSettings.smoothScroll.duration,
          easing: (value) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
        });
        return;
      }

      window.scrollTo({
        top: y,
        behavior: immediate ? "auto" : options.behavior || "smooth",
      });
    },
    [reduceMotion, smoothEnabled]
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncMode = () => {
      setSmoothEnabled(getShouldSmoothScroll(reduceMotion));
    };

    syncMode();
    window.addEventListener("resize", syncMode);

    return () => {
      window.removeEventListener("resize", syncMode);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (typeof window === "undefined" || !smoothEnabled) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: maisonScrollSettings.smoothScroll.lerp,
      duration: maisonScrollSettings.smoothScroll.duration,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: maisonScrollSettings.smoothScroll.wheelMultiplier,
      touchMultiplier: maisonScrollSettings.smoothScroll.touchMultiplier,
      prevent: shouldPreventLenis,
    });

    lenisRef.current = lenis;

    const onLenisScroll = (instance) => {
      publishScrollState({
        direction: instance.direction || 0,
        progress: instance.progress || 0,
        velocity: instance.velocity || 0,
      });
    };

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    applyLockState();

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
      setIsScrollLocked(false);
    };
  }, [applyLockState, publishScrollState, smoothEnabled]);

  useEffect(() => {
    if (typeof window === "undefined" || smoothEnabled) {
      return undefined;
    }

    const updateNativeState = () => {
      nativeRafRef.current = null;

      const now = performance.now();
      const y = window.scrollY;
      const elapsed = Math.max(now - lastNativeScrollRef.current.time, 16);
      const distance = y - lastNativeScrollRef.current.y;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;

      lastNativeScrollRef.current = {
        time: now,
        y,
      };

      publishScrollState({
        direction: Math.sign(distance),
        progress: Math.min(Math.max(y / maxScroll, 0), 1),
        velocity: distance / (elapsed / 16.67),
      });
    };

    const scheduleNativeState = () => {
      if (nativeRafRef.current) return;
      nativeRafRef.current = window.requestAnimationFrame(updateNativeState);
    };

    updateNativeState();
    window.addEventListener("scroll", scheduleNativeState, { passive: true });
    window.addEventListener("resize", scheduleNativeState);

    return () => {
      if (nativeRafRef.current) {
        window.cancelAnimationFrame(nativeRafRef.current);
      }

      window.removeEventListener("scroll", scheduleNativeState);
      window.removeEventListener("resize", scheduleNativeState);
    };
  }, [publishScrollState, smoothEnabled]);

  useEffect(() => {
    if (scenes[0]) {
      setActiveScene(scenes[0]);
    }
  }, [scenes, setActiveScene]);

  const value = useMemo(
    () => ({
      activeScene,
      activeSceneId: activeScene?.id || null,
      isScrollLocked,
      lenis: lenisRef.current,
      reducedMotion: Boolean(reduceMotion),
      scrollState,
      setActiveScene,
      lockScroll,
      unlockScroll,
      scrollTo,
      updateSceneProgress,
    }),
    [
      activeScene,
      isScrollLocked,
      lockScroll,
      reduceMotion,
      scrollState,
      scrollTo,
      setActiveScene,
      unlockScroll,
      updateSceneProgress,
    ]
  );

  return (
    <MaisonScrollContext.Provider value={value}>
      <style>
        {`
          html.lenis {
            height: auto;
          }

          .lenis.lenis-smooth {
            scroll-behavior: auto !important;
          }

          .lenis.lenis-smooth [data-lenis-prevent],
          .lenis.lenis-smooth [data-maison-scroll-prevent],
          .lenis.lenis-smooth [role='dialog'] {
            overscroll-behavior: contain;
          }

          .lenis.lenis-stopped {
            overflow: hidden;
          }
        `}
      </style>
      {children}
    </MaisonScrollContext.Provider>
  );
}
