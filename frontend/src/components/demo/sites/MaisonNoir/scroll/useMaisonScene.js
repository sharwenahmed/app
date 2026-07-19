import { useEffect, useRef, useState } from "react";

import { getSceneProgress } from "./scrollChoreography";
import { useMaisonScroll } from "./MaisonScrollDirector";

export default function useMaisonScene(sceneId) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const { activeSceneId, updateSceneProgress } = useMaisonScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateProgress = () => {
      rafRef.current = null;

      const nextProgress = getSceneProgress(ref.current);
      setProgress((current) =>
        Math.abs(current - nextProgress) < 0.01 ? current : nextProgress
      );
      updateSceneProgress(sceneId, nextProgress);
    };

    const scheduleProgress = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
    };
  }, [sceneId, updateSceneProgress]);

  return {
    ref,
    progress,
    isActive: activeSceneId === sceneId,
  };
}
