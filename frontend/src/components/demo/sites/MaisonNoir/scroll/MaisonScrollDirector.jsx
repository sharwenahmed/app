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

export default function MaisonScrollDirector({
  children,
  scenes = [],
}) {
  const reduceMotion = useReducedMotion();
  const lockReasonsRef = useRef(new Set());
  const scrollStateRef = useRef(defaultScrollState);

  const [activeScene, setActiveSceneState] = useState(scenes[0] || null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

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
      root.dataset.mnActiveScene = scene.id;
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
    setIsScrollLocked(hasLocks);

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.toggle("maison-scroll-locked", hasLocks);

      if (hasLocks) {
        root.dataset.mnScrollLocks = Array.from(lockReasonsRef.current).join(" ");
      } else {
        delete root.dataset.mnScrollLocks;
      }
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

      window.scrollTo({
        top: y,
        behavior: immediate ? "auto" : options.behavior || "smooth",
      });
    },
    [reduceMotion]
  );

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("maison-scroll-locked");
        delete document.documentElement.dataset.mnScrollLocks;
      }
    };
  }, []);

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
      lenis: null,
      reducedMotion: Boolean(reduceMotion),
      scrollState: scrollStateRef.current,
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
          html,
          body {
            overflow-x: clip;
          }

          [data-lenis-prevent],
          [data-maison-scroll-prevent],
          [role='dialog'] {
            overscroll-behavior: contain;
          }

          html.maison-scroll-locked,
          html.maison-scroll-locked body {
            overflow: hidden;
          }
        `}
      </style>
      {children}
    </MaisonScrollContext.Provider>
  );
}
