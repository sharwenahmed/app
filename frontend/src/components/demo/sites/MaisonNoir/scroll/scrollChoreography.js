export const MAISON_SCROLL_LOCKS = {
  openingArrival: "opening-arrival-gate",
  hero: "hero-reveal-gate",
  signature: "signature-menu-hold",
  signatureToMenu: "signature-to-full-menu-gate",
  foodRunway: "food-film-runway-gate",
};

export const maisonScrollSettings = {
  desktopQuery: "(min-width: 768px)",
  smoothScroll: {
    lerp: 0.085,
    duration: 1.08,
    wheelMultiplier: 0.88,
    touchMultiplier: 1.0,
  },
  anchorOffset: 76,
};

export const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export const clamp01 = (value) => clamp(value, 0, 1);

export const easeOutQuart = (value) => 1 - Math.pow(1 - clamp01(value), 4);

export const getSceneProgress = (element) => {
  if (!element || typeof window === "undefined") return 0;

  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const travel = rect.height + viewportHeight;

  return clamp01((viewportHeight - rect.top) / travel);
};

export const getScrollTargetY = (target, offset = 0) => {
  if (typeof window === "undefined") return 0;

  const element =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!element || !element.getBoundingClientRect) {
    return typeof target === "number" ? target : window.scrollY;
  }

  return Math.max(element.getBoundingClientRect().top + window.scrollY - offset, 0);
};
