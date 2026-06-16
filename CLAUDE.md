# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An animated investor presentation for **Beonedge Wealth Management** built as a Next.js web app. It renders a full-screen, keyboard-navigable slide deck with glassmorphism styling and Framer Motion animations.

## Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run test:e2e     # Run Playwright E2E tests (auto-starts dev server if not running)

# Run a single test by name
npx playwright test -g "test name substring"

# Run tests headed (visible browser)
npx playwright test --headed
```

## Architecture

### Slide System

`SlideContainer` (`components/SlideContainer.tsx`) is the central state manager:
- Tracks `currentSlide` index and handles keyboard navigation (Space / ArrowRight = next, ArrowLeft = prev)
- Renders one `Slide` at a time via `AnimatePresence mode="wait"` for exit-then-enter sequencing
- Exposes `data-current-slide` and `data-total-slides` attributes on the root element for Playwright tests

`Slide` (`components/Slide.tsx`) wraps each slide's content in a `motion.section` with enter/exit animations. It reads animation constants from `presentationMotion.ts` and respects `prefers-reduced-motion`.

Individual slides live in `slides/Slide1.tsx` through `Slide8.tsx`. To add a new slide: create `slides/SlideN.tsx`, import it in `app/page.tsx`, and add it inside `<SlideContainer>`.

### Animation Constants

All timing and easing values are centralized in `components/presentationMotion.ts`:
- `SLIDE_TRANSITION_MS` (700ms) — shell enter/exit
- `CONTENT_TRANSITION_MS` (600ms) — per-element staggered content
- `GRAPH_DRAW_MS` (900ms) — SVG path draw animation
- `PREMIUM_EASE` / `CONTENT_EASE` — reusable cubic-bezier arrays

Playwright tests assert that `SLIDE_TRANSITION_MS` and `GRAPH_DRAW_MS` stay between 300–800ms, so keep timing changes within that window.

### Custom Graph

`GraphAnimation` (`components/GraphAnimation.tsx`) is a hand-crafted SVG chart (not Recharts, even though Recharts is installed). It compares Beonedge (16% CAGR) vs Nifty 50 (~11.6% CAGR) performance with animated `pathLength` line drawing and staggered data-point circles. Animation state (`idle → running → complete`) is tracked via `data-graph-animation-state` for E2E tests.

### Styling

- Tailwind CSS v4 (configured via `@import "tailwindcss"` in `globals.css`, no separate config file)
- Global glassmorphism utilities defined in `globals.css`: `.glass`, `.glass-elevated`, `.glass-panel`
- `.text-gradient` utility for the amber/yellow gradient used on brand names
- Dark deep-navy background (`#060d18`) with subtle radial gradient overlays; `overflow: hidden` on `html` and `body` prevents scroll

### Test Conventions

`tests/presentation.spec.ts` uses `data-testid` attributes to locate elements — never text selectors for structural assertions. Key testids: `presentation-root`, `active-slide`, `layout-container`, `graph-container`, `graph-svg`, `graph-legend`, `graph-axis-label`.

The `goToSlide(page, index)` helper in the test file advances slides by pressing Space and asserting `data-current-slide` after each step — use it when writing new slide-specific tests.
