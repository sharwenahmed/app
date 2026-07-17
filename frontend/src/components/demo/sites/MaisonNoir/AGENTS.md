# A-Design Frontend Instructions

## Project

This repository contains the A-Design portfolio website and premium demo websites, including Maison Noir.

## Current Stack

- React
- CRACO
- Framer Motion
- Lucide React
- CSS and existing project styling conventions
- Vercel deployment

## Core Working Rules

- Inspect the existing component and surrounding architecture before editing.
- Do not change stable components unless the task specifically requires it.
- Keep changes limited to the requested scope.
- Preserve existing imports, routes, and project structure unless a change is necessary.
- Prefer reusable components and configurable data over duplicated code.
- Do not add new dependencies unless clearly justified.
- Preserve accessibility and responsive behavior.
- Avoid excessive animations that reduce performance or usability.
- Run the project build after meaningful changes.
- Report every file changed and explain why.
- Never claim a task is complete if the build fails.

## Maison Noir Stable Decisions

Do not modify these systems unless explicitly requested:

- OpeningArrivalGate cinematic introduction
- Hero scroll-gated reveal structure
- Current page order
- Signature Experience core direction
- Maison Noir asset directory structure

## Maison Noir Asset Structure

public/images/MaisonNoir/
- branding/
- menu/starters/
- menu/steaks/
- menu/seafood/
- menu/sides/
- menu/desserts/
- menu/cocktails/
- gallery/
- videos/

Use absolute public paths beginning with:

/images/MaisonNoir/

## Design Standard

A-Design creates premium, cinematic, conversion-focused websites.

Every implementation should prioritize:

1. Clear business purpose
2. Strong visual hierarchy
3. Responsive mobile experience
4. Smooth but restrained motion
5. Performance
6. Accessibility
7. Reusability

## Development Workflow

For each task:

1. Inspect the relevant code.
2. Explain the intended change briefly.
3. Implement the smallest complete solution.
4. Run the appropriate build or test command.
5. Review the resulting diff.
6. Report what changed, what was verified, and any remaining risks.

## Build Commands

- Development: npm start
- Production build: npm run build

## Completion Standard

A task is complete only when:

- The requested behavior is implemented.
- Existing behavior is not unintentionally broken.
- The production build passes.
- Responsive behavior has been considered.
- Changed files are clearly reported.