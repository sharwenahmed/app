import { useEffect, useRef, useState } from "react";

export default function useSectionPresence(scenes = []) {
  const rafRef = useRef(null);
  const sceneLayoutRef = useRef([]);
  const [activeId, setActiveId] = useState(scenes[0]?.id || "top");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const measureScenes = () => {
      sceneLayoutRef.current = scenes
        .map((scene) => {
          const element = document.getElementById(scene.id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();

          return {
            id: scene.id,
            top: rect.top + window.scrollY,
            height: rect.height || element.offsetHeight || 1,
          };
        })
        .filter(Boolean);
    };

    const updateActiveScene = () => {
      rafRef.current = null;

      const focusY = window.scrollY + window.innerHeight * 0.42;
      let nextId = sceneLayoutRef.current[0]?.id || scenes[0]?.id || "top";

      sceneLayoutRef.current.forEach((scene) => {
        if (focusY >= scene.top - window.innerHeight * 0.18) {
          nextId = scene.id;
        }
      });

      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const scheduleUpdate = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(updateActiveScene);
    };

    const handleResize = () => {
      measureScenes();
      scheduleUpdate();
    };

    measureScenes();
    updateActiveScene();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, [scenes]);

  return activeId;
}
