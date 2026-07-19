import { useEffect, useRef, useState } from "react";

import { useMaisonScroll } from "./MaisonScrollDirector";

export default function useMaisonScene(sceneId) {
  const ref = useRef(null);
  const { activeSceneId } = useMaisonScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setProgress(1);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setProgress((current) => {
          const nextProgress = entry.isIntersecting ? entry.intersectionRatio : 0;

          return Math.abs(current - nextProgress) < 0.08 ? current : nextProgress;
        });
      },
      {
        threshold: [0, 0.18, 0.42, 0.68, 0.86, 1],
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    ref,
    progress,
    isActive: activeSceneId === sceneId,
  };
}
