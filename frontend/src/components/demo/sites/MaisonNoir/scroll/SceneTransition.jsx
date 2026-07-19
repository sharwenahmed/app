import React, { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import useMaisonScene from "./useMaisonScene";

export default function SceneTransition({
  children,
  sceneId,
  className = "",
}) {
  const reduceMotion = useReducedMotion();
  const { ref, progress, isActive } = useMaisonScene(sceneId);
  const rawProgress = useMotionValue(progress);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 72,
    damping: 28,
    mass: 0.5,
  });

  useEffect(() => {
    rawProgress.set(progress);
  }, [progress, rawProgress]);

  const y = useTransform(smoothProgress, [0, 0.18, 0.86, 1], [26, 0, 0, -18]);
  const filter = useTransform(
    smoothProgress,
    [0, 0.18, 0.86, 1],
    ["blur(5px)", "blur(0px)", "blur(0px)", "blur(3px)"]
  );

  return (
    <motion.div
      ref={ref}
      data-scene-chapter={sceneId}
      data-maison-scene-active={isActive ? "true" : "false"}
      initial={{ opacity: 0.96 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={
        reduceMotion
          ? { "--maison-local-scene-progress": progress }
          : {
              "--maison-local-scene-progress": progress,
              y,
              filter,
            }
      }
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
