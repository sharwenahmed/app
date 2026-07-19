# Maison Noir Living Experience

## Narrative Progression

Maison Noir now moves as one continuous evening: arrival, entrance, dining room, signature dish, culinary energy, full menu exploration, philosophy, chef and fire, private dining, memories, testimonials, reservation, visit, and departure.

## Lighting Map

- Opening and Hero: dark room with an expanding amber reveal.
- Signature: focused gold table light with burgundy shadows.
- FoodFilmRunway: strongest gold and fire energy.
- FullMenu: calmer readable warmth with category shifts.
- Philosophy: quieter edge light and lower intensity.
- ChefCraft: firelit contrast and warm side light.
- PrivateDining: softer wine-red room warmth.
- Gallery: chapter-specific amber, cellar, fire, and dessert tones.
- Testimonials: candlelike centre focus with faded edges.
- Reservation: narrow desk light and darker surroundings.
- Visit and Footer: reduced glow and still atmosphere.

## Section Camera Language

- Hero pushes into the room while threshold shadows open.
- SignatureMenu keeps the active dish forward with a restrained spotlight.
- FoodFilmRunway preserves its existing gated vortex and stoplight moments.
- FullMenu remains stable and uses category focus rather than whole-page movement.
- Philosophy drifts laterally with a slow image counter-move.
- ChefCraft uses a restrained planar orbit and moving edge light.
- PrivateDining glides forward with slight lateral room parallax.
- Gallery preserves alternating horizontal image reveals.
- Testimonials keep horizontal movement with subtle edge lighting.
- Reservation stops camera movement around the form.

## Atmosphere Rules

The shared LivingAtmosphere layer owns the page-wide haze, vignette, amber, burgundy, fire, scene depth, scroll velocity, and pointer reflection variables. Continuous scroll progress is published through CSS variables, not React state.

## Scene Transitions

Scene transitions use the existing gates and smoke handoff. The global light map smooths the emotional shift between scenes, while gallery chapters briefly retune the atmosphere as each image becomes active.

## Performance Modes

- FULL: desktop lighting, pointer reflection, subtle haze and dust.
- LITE: tablets, touch devices, and lower hardware reduce haze, remove pointer reflection, and simplify ambient layers.
- REDUCED: prefers-reduced-motion shows content immediately with no parallax, particles, pointer light, or atmosphere animation.

## Mobile Alternatives

Mobile keeps native scrolling, simplified environmental layers, no cursor effect, shorter image motion, and no extra fixed visual layer above cart or concierge controls.

## Reduced-Motion Alternatives

Reduced motion disables moving haze, dust, pointer reflection, parallax, and horizontal reveal motion where possible while preserving all content and layout.

## Cleanup Responsibilities

Component-owned ScrollTriggers are created in GSAP contexts and reverted on unmount. Scroll locks remain owned by their existing gated components. The shared scroll director remains the only Lenis owner and the only GSAP ticker bridge.

## Effects By Section

- OpeningArrivalGate: existing cinematic gate with shared arrival lighting.
- Hero: scroll-gated camera reveal plus shared pointer reflection.
- SignatureMenu: active dish spotlight and calm dish transition.
- FoodFilmRunway: optimized existing 3D rotation and media behavior.
- FullMenu: category staging, paused hero video offscreen, and stable ordering UI.
- Philosophy: lateral drift and gold edge light.
- ChefCraft: orbit, fire edge light, and no continuous blur.
- PrivateDining: room glide, frame opening, and offscreen video pause.
- Gallery: six alternating reveals with chapter light shifts.
- Testimonials: paused-offscreen marquee, hover/focus pause, and edge light.
- Reservation: still form and narrowed desk light.
- Visit/Footer: closing light and still final information.
