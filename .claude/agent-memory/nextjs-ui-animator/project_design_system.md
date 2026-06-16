---
name: Beonedge Presentation Design System
description: Netflix-inspired dark design system for Beonedge wealth management presentation slides — cards, colors, animations, spacing conventions
type: project
---

Netflix-inspired presentation design with dark backgrounds, no glassmorphism on cards.

**Why:** Premium financial presentation for Beonedge Wealth Management requiring viewport-adaptive slides with no scrolling.

**How to apply:**
- Cards: `bg-[#141414] border border-white/8 rounded-xl` — solid dark, NO blur
- Inner cards: `bg-[#1c1c1c] border border-white/6 rounded-lg`
- `.glass-panel` class = `bg-[#141414]/85 border border-white/8 rounded-xl backdrop-blur-lg` (used only for GraphAnimation)
- Text: titles white, body `text-neutral-300`, secondary `text-neutral-400`
- Red accent line: `<div className="h-[2px] w-16 bg-red-600 mt-2 mb-[1.5vh]" />`
- Gold gradient: `text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500`
- Red accent: `#e50914` / `text-red-500`
- Emerald for growth/positive: `text-emerald-400`
- Viewport-relative spacing: `gap-[1.5vh]`, `p-[2vw]`, `mb-[1vh]`
- NO scrolling, NO overflow-auto
- Animation: popupVars with `scale: 0.96`, duration 0.6, ease `[0.25, 0.1, 0.25, 1] as const`
- Container stagger: `{ staggerChildren: 0.12, delayChildren: 0.06 }`
- Subtitles: `text-red-500 font-medium tracking-widest uppercase text-xs md:text-sm`
