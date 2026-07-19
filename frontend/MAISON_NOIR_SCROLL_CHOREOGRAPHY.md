# Maison Noir Scroll Choreography

## Narrative Sequence

Maison Noir is directed as one continuous evening:

1. Arrival at the entrance.
2. Door/shadow release into the dining room.
3. Hero camera push into the room.
4. Signature dish pause.
5. Food Film Runway vortex.
6. Full menu exploration.
7. Philosophy quiets the room.
8. ChefCraft moves around the chef's table.
9. Smoke carries the guest into Private Dining.
10. Gallery becomes a memory corridor.
11. Testimonials pass like conversations in the room.
12. Reservation narrows to the desk.
13. Visit and Footer close the evening calmly.

## Pinned And Gated Sections

- `OpeningArrivalGate`: gated. Owns the logo assembly and entrance door release.
- `Hero`: gated. Uses the existing scroll lock to reveal the room and headline sequence.
- `SignatureMenu`: briefly gated. Creates a deliberate pause at the signature dish.
- `FoodFilmRunway`: gated on XL screens. Each scroll advances the 360-degree food vortex.
- `SignatureToFullMenuTransition`: gated handoff into the readable full menu.

All gates coordinate with `MaisonScrollDirector` through shared `lockScroll(reason)` and `unlockScroll(reason)` calls so Lenis does not fight component-level wheel handlers.

## Section Beats

- OpeningArrivalGate: logo assembly, gold aperture, architectural shadows open, scroll releases to Hero.
- Hero: room image pushes forward, threshold shadows recede, copy arrives in sequence, page releases.
- SignatureMenu: house dish focus, dish image and copy sequence, gold exit glow pulls into the runway.
- FoodFilmRunway: intro darkness, scroll-driven rotation, center spotlight card, 100% release to the menu handoff.
- FullMenu: category bar becomes the anchor, active category lighting shifts, hover preview is scoped to the menu.
- Philosophy: text enters from darkness, image drifts slowly, one gold light line bridges toward fire.
- ChefCraft: planar orbit, brief rack-focus, cards enter separately, fire edge light moves across the scene.
- ChefCraft to PrivateDining: one smoke transition creates near-black continuity.
- PrivateDining: foreground room frame moves away, private room image settles, CTA appears late.
- Gallery: vertical image journey, alternating depth drift, captions arrive as chapter markers.
- Testimonials: existing marquee preserved, edge fades and focus pause keep quotes readable.
- Reservation: movement calms, desk light narrows, form becomes the sharpest element.
- Visit/Footer: details remain clear while ambient light lowers.

## Reduced Motion

Reduced-motion users keep all content and controls. Lenis is disabled, decorative parallax/camera movement is skipped or simplified, smoke animation becomes static, and the FoodFilmRunway uses its non-gated responsive presentation outside XL.

## Mobile

Below the desktop smooth-scroll breakpoint, native scrolling is used. Long pins and 3D-style movement are reduced. Fixed controls remain body-level so Maison Concierge, online order, and nav cart do not overlap section transforms.

## Performance Decisions

- One Lenis instance is created at the Maison Noir page level.
- Lenis uses the GSAP ticker instead of a second RAF loop.
- Continuous motion uses transform and opacity.
- Heavy blur is limited to short atmospheric moments.
- Existing images/videos and lazy loading are preserved.
- FoodFilmRunway keeps its existing media strategy and does not duplicate menu data.
