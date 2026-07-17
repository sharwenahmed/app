import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const defaultScenes = [
  {
    id: "top",
    number: "01",
    title: "Arrival",
    label: "Opening Scene",
    marker: "ARRIVAL",
    mood: "Black velvet / gold fire",
    accent: "rgba(201,162,91,0.55)",
    glowA: "rgba(201,162,91,0.18)",
    glowB: "rgba(255,112,42,0.14)",
    x: "50%",
    y: "20%",
  },
  {
    id: "menu",
    number: "02",
    title: "Signature",
    label: "Featured Plates",
    marker: "SIGNATURE",
    mood: "First taste / house icons",
    accent: "rgba(246,211,139,0.52)",
    glowA: "rgba(201,162,91,0.15)",
    glowB: "rgba(255,146,72,0.12)",
    x: "20%",
    y: "62%",
  },
  {
    id: "full-menu",
    number: "03",
    title: "Course Theater",
    label: "Full Menu",
    marker: "COURSES",
    mood: "Guided route / fire / cellar",
    accent: "rgba(201,162,91,0.62)",
    glowA: "rgba(255,92,38,0.15)",
    glowB: "rgba(201,162,91,0.16)",
    x: "78%",
    y: "56%",
  },
  {
    id: "story",
    number: "04",
    title: "Philosophy",
    label: "The Room",
    marker: "ROOM",
    mood: "Restraint / patience / atmosphere",
    accent: "rgba(201,162,91,0.48)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.06)",
    x: "36%",
    y: "44%",
  },
  {
    id: "chef",
    number: "05",
    title: "Craft",
    label: "Open Flame",
    marker: "FIRE",
    mood: "Knife / ember / precision",
    accent: "rgba(255,105,42,0.58)",
    glowA: "rgba(255,92,38,0.18)",
    glowB: "rgba(201,162,91,0.12)",
    x: "80%",
    y: "36%",
  },
  {
    id: "private",
    number: "06",
    title: "Private Dining",
    label: "The Cellar",
    marker: "CELLAR",
    mood: "Closed room / gold service",
    accent: "rgba(201,162,91,0.58)",
    glowA: "rgba(201,162,91,0.14)",
    glowB: "rgba(85,46,26,0.2)",
    x: "24%",
    y: "72%",
  },
  {
    id: "gallery",
    number: "07",
    title: "Gallery",
    label: "Visual Proof",
    marker: "DETAILS",
    mood: "Texture / smoke / glass",
    accent: "rgba(246,211,139,0.48)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.07)",
    x: "62%",
    y: "48%",
  },
  {
    id: "reserve",
    number: "08",
    title: "Reserve",
    label: "Book the Evening",
    marker: "RESERVE",
    mood: "Table held / room prepared",
    accent: "rgba(201,162,91,0.7)",
    glowA: "rgba(201,162,91,0.2)",
    glowB: "rgba(255,112,42,0.12)",
    x: "50%",
    y: "70%",
  },
  {
    id: "visit",
    number: "09",
    title: "Visit",
    label: "Final Details",
    marker: "VISIT",
    mood: "Address / hours / arrival",
    accent: "rgba(201,162,91,0.46)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.05)",
    x: "72%",
    y: "32%",
  },
];

export function SceneChapter({ children, sceneId }) {
  return (
    <motion.div
      data-scene-chapter={sceneId}
      initial={{ opacity: 0.96 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}

export default function ExperienceShell({ children, scenes = defaultScenes }) {
  const reduce = useReducedMotion();
  const rafRef = useRef(null);
  const activeIdRef = useRef(scenes[0]?.id || "top");
  const [activeId, setActiveId] = useState(scenes[0]?.id || "top");

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  const activeScene = useMemo(
    () => scenes.find((scene) => scene.id === activeId) || scenes[0],
    [activeId, scenes]
  );

  const updateActiveScene = useCallback(() => {
    const trigger = window.innerHeight * 0.42;
    let nextScene = scenes[0];

    scenes.forEach((scene) => {
      const el = document.getElementById(scene.id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      if (rect.top <= trigger) {
        nextScene = scene;
      }
    });

    if (nextScene && activeIdRef.current !== nextScene.id) {
      activeIdRef.current = nextScene.id;
      setActiveId(nextScene.id);
    }
  }, [scenes]);

  useEffect(() => {
    const scheduleUpdate = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateActiveScene();
      });
    };

    updateActiveScene();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateActiveScene]);

  const scrollToScene = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = id === "top" ? 0 : 76;
    const y = Math.max(el.getBoundingClientRect().top + window.scrollY - offset, 0);

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const showSceneChrome = activeScene.id !== "top";

  return (
    <div className="relative overflow-hidden bg-[#050505]">
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed left-0 top-0 z-[100000] h-px w-full origin-left bg-gradient-to-r from-transparent via-[#C9A25B] to-transparent"
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[#050505]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`atmosphere-${activeScene.id}`}
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-[1]"
          style={{
            background: `radial-gradient(circle at ${activeScene.x} ${activeScene.y}, ${activeScene.glowA}, transparent 38%), radial-gradient(circle at 82% 30%, ${activeScene.glowB}, transparent 34%), linear-gradient(135deg, rgba(0,0,0,0.96), rgba(0,0,0,0.74))`,
          }}
        />
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(circle_at_50%_50%,transparent,rgba(0,0,0,0.68)_72%)]" />
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.045] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`marker-${activeScene.id}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={reduce ? { opacity: 0.055 } : { opacity: 0.055, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24, scale: 1.02 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed left-1/2 top-1/2 z-[3] hidden -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[clamp(7rem,18vw,21rem)] leading-none tracking-[-0.1em] text-white lg:block"
        >
          {activeScene.marker}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`scene-wipe-${activeScene.id}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: "-120%", skewX: -14 }}
          animate={reduce ? { opacity: 0 } : { opacity: [0, 0.22, 0], x: ["-120%", "0%", "120%"], skewX: -14 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-y-0 left-0 z-[45] hidden w-[46vw] bg-gradient-to-r from-transparent via-[#C9A25B]/45 to-transparent blur-md md:block"
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showSceneChrome ? (
          <motion.div
            key={`scene-title-${activeScene.id}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={reduce ? { opacity: 0 } : { opacity: [0, 0.9, 0], y: [22, 0, -18], filter: ["blur(8px)", "blur(0px)", "blur(6px)"] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed left-1/2 top-1/2 z-[46] hidden -translate-x-1/2 -translate-y-1/2 text-center md:block"
          >
            <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-[#C9A25B]">
              Scene {activeScene.number} / {String(scenes.length).padStart(2, "0")}
            </p>
            <p className="font-serif text-5xl leading-none text-white lg:text-7xl">
              {activeScene.title}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none fixed left-5 top-1/2 z-[70] hidden -translate-y-1/2 md:block">
        <div className="rounded-full border border-white/10 bg-black/30 px-3 py-5 backdrop-blur-2xl">
          <div className="flex flex-col items-center gap-3">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => scrollToScene(scene.id)}
                className="pointer-events-auto group relative flex h-2.5 w-2.5 items-center justify-center rounded-full"
                aria-label={`Go to ${scene.title}`}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                    activeId === scene.id
                      ? "border-[#C9A25B] bg-[#C9A25B] shadow-[0_0_22px_rgba(201,162,91,0.95)]"
                      : "border-white/20 bg-white/10 group-hover:border-[#C9A25B]/70"
                  }`}
                />
                <span className="pointer-events-none absolute left-6 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-white/55 opacity-0 backdrop-blur-xl transition-opacity duration-300 group-hover:opacity-100">
                  {String(index + 1).padStart(2, "0")} / {scene.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showSceneChrome ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -18 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed left-5 right-5 top-5 z-[80] hidden items-center justify-between md:flex"
        >
          <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-white/45 backdrop-blur-2xl">
            Maison Noir / Experience
          </div>

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/45 backdrop-blur-2xl">
            <span className="text-[#C9A25B]">Scene {activeScene.number}</span>
            <span className="h-px w-8 bg-[#C9A25B]/45" />
            <span>{activeScene.title}</span>
          </div>
        </motion.div>
      ) : null}

      {showSceneChrome ? (
        <div className="pointer-events-none fixed bottom-5 left-5 right-5 z-[80] hidden items-end justify-between md:flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hud-left-${activeScene.id}`}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-black/34 px-4 py-3 backdrop-blur-2xl"
            >
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                {activeScene.label}
              </p>
              <p className="mt-1 font-serif text-xl text-white">{activeScene.mood}</p>
            </motion.div>
          </AnimatePresence>

        </div>
      ) : null}

      {showSceneChrome ? (
        <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-[80] md:hidden">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-2xl">
            <div>
              <p className="text-[8px] uppercase tracking-[0.26em] text-white/35">
                Scene {activeScene.number}
              </p>
              <p className="font-serif text-base leading-none text-white">{activeScene.title}</p>
            </div>
            <button
              type="button"
              onClick={() => scrollToScene("reserve")}
              className="pointer-events-auto rounded-full border border-[#C9A25B]/35 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-[#C9A25B]"
            >
              Reserve
            </button>
          </div>
        </div>
      ) : null}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
