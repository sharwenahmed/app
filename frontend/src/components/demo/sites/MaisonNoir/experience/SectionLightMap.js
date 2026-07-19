export const MAISON_PERFORMANCE_MODE = {
  FULL: "full",
  LITE: "lite",
  REDUCED: "reduced",
};

export const sectionLightMap = {
  top: {
    lightX: 50,
    lightY: 26,
    intensity: 0.74,
    amber: 0.24,
    burgundy: 0.15,
    fire: 0.16,
    haze: 0.18,
    vignette: 0.72,
    depth: 0.42,
    pointer: 0.38,
  },
  menu: {
    lightX: 42,
    lightY: 44,
    intensity: 0.64,
    amber: 0.25,
    burgundy: 0.24,
    fire: 0.12,
    haze: 0.14,
    vignette: 0.76,
    depth: 0.5,
    pointer: 0.3,
  },
  "full-menu": {
    lightX: 58,
    lightY: 40,
    intensity: 0.52,
    amber: 0.2,
    burgundy: 0.12,
    fire: 0.08,
    haze: 0.08,
    vignette: 0.58,
    depth: 0.24,
    pointer: 0.1,
  },
  story: {
    lightX: 34,
    lightY: 50,
    intensity: 0.38,
    amber: 0.15,
    burgundy: 0.12,
    fire: 0.04,
    haze: 0.1,
    vignette: 0.7,
    depth: 0.3,
    pointer: 0.14,
  },
  chef: {
    lightX: 72,
    lightY: 36,
    intensity: 0.66,
    amber: 0.22,
    burgundy: 0.16,
    fire: 0.24,
    haze: 0.12,
    vignette: 0.72,
    depth: 0.5,
    pointer: 0.32,
  },
  private: {
    lightX: 38,
    lightY: 58,
    intensity: 0.5,
    amber: 0.16,
    burgundy: 0.26,
    fire: 0.06,
    haze: 0.12,
    vignette: 0.62,
    depth: 0.4,
    pointer: 0.3,
  },
  gallery: {
    lightX: 56,
    lightY: 48,
    intensity: 0.46,
    amber: 0.17,
    burgundy: 0.16,
    fire: 0.06,
    haze: 0.1,
    vignette: 0.64,
    depth: 0.38,
    pointer: 0.18,
  },
  testimonials: {
    lightX: 46,
    lightY: 54,
    intensity: 0.36,
    amber: 0.14,
    burgundy: 0.1,
    fire: 0.05,
    haze: 0.07,
    vignette: 0.68,
    depth: 0.22,
    pointer: 0.1,
  },
  reserve: {
    lightX: 50,
    lightY: 62,
    intensity: 0.34,
    amber: 0.16,
    burgundy: 0.07,
    fire: 0.03,
    haze: 0.04,
    vignette: 0.76,
    depth: 0.08,
    pointer: 0,
  },
  visit: {
    lightX: 68,
    lightY: 36,
    intensity: 0.24,
    amber: 0.1,
    burgundy: 0.06,
    fire: 0.02,
    haze: 0.03,
    vignette: 0.82,
    depth: 0,
    pointer: 0,
  },
};

export const defaultSectionLight = sectionLightMap.top;

export function getSectionLight(sceneId) {
  return sectionLightMap[sceneId] || defaultSectionLight;
}

export function scaleLightForMode(light, mode) {
  if (mode === MAISON_PERFORMANCE_MODE.REDUCED) {
    return {
      ...light,
      intensity: 0,
      amber: 0,
      burgundy: 0,
      fire: 0,
      haze: 0,
      depth: 0,
      pointer: 0,
      vignette: 0.7,
    };
  }

  if (mode === MAISON_PERFORMANCE_MODE.LITE) {
    return {
      ...light,
      intensity: light.intensity * 0.72,
      amber: light.amber * 0.72,
      burgundy: light.burgundy * 0.62,
      fire: light.fire * 0.58,
      haze: light.haze * 0.44,
      depth: light.depth * 0.45,
      pointer: 0,
    };
  }

  return light;
}
