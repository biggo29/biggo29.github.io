# Marvel Opening — Portfolio Loader: Design Plan

> **Status:** Draft — Awaiting approval before development begins.

---

## Concept Overview

Replicate the iconic **Marvel Studios opening sequence** as a full-screen portfolio loader:

| Marvel Original | Portfolio Version |
|---|---|
| Rapid comic book panel flips | Rapid tech stack card flips |
| Red "MARVEL" letters slam into frame | "SHOAIB SHAHRIAR" slams into frame |
| White flash burst | White flash burst |
| Film plays | Portfolio launches |

The entire sequence runs **~3.5–4 seconds**, non-skippable but snappy enough to feel cinematic rather than slow.

---

## Animation Phases

### Phase 1 — Black Screen (0ms–200ms)
- Full-screen black overlay mounts over the portfolio
- A subtle film-grain texture flickers in (CSS noise animation)
- Prepares the eye for the rapid sequence

### Phase 2 — Tech Stack Panel Shuffle (200ms–2400ms)
- **~16–20 frames** flash in rapid succession, each showing one tech name
- Each frame: dark panel background with a large, bold, centered tech word
- Frame rate accelerates: starts at ~120ms per frame, speeds up to ~40ms near the end — mimicking the Marvel comic page acceleration
- Tech items sourced from the portfolio stack:
  ```
  C#  ·  .NET  ·  ASP.NET Core  ·  CQRS  ·  Azure  ·  Docker
  SQL Server  ·  Microservices  ·  Clean Architecture  ·  NServiceBus
  TDD  ·  Java  ·  ELK Stack  ·  Blazor  ·  TypeScript  ·  REST APIs
  ```
- Each panel has a slight **page-turn / cut effect** (CSS transform: rotateY brief flip or abrupt cut)
- Color treatment: near-black panels with the tech name in a muted off-white/grey — not colorful, staying cinematic

### Phase 3 — Red Flash Burst (2400ms–2700ms)
- A bright **red flash** (#E8042C — Marvel red) washes out the screen
- Lasts ~150ms, then fades back to black
- This is the dramatic "beat" before the name

### Phase 4 — Name Reveal (2700ms–3400ms)
- **"SHOAIB SHAHRIAR"** slams into frame letter-by-letter or as two words
- Typography: ultra-bold, condensed, all-caps — using **Bebas Neue** (Google Font, free) or **Anton** as a fallback — both closely match Marvel's display style
- Letters animate in from slight scale-up + opacity (scale 1.2 → 1.0, opacity 0 → 1), very fast (~80ms per word)
- Color: bright white on black initially, then a **deep red wash** sweeps across the letters left-to-right (CSS gradient mask animation)
- A subtle **letterpress / emboss** effect via text-shadow

### Phase 5 — White Flash & Exit (3400ms–3800ms)
- Full white flash (same as Marvel's blinding white before the film)
- Flash peaks at ~3550ms then fades out
- As white recedes, the portfolio `<body>` content is revealed underneath
- The loader overlay fades to `opacity: 0` then `display: none`

---

## Technical Architecture

### New Files
```
wwwroot/
  css/
    marvel-loader.css       ← All loader styles, isolated
  js/
    marvel-loader.js        ← Sequencer logic, frame timing, teardown
```

### Integration Point
- `wwwroot/index.html` — loader HTML injected as the **very first child of `<body>`**, before the Blazor `<div id="app">` mount point
- The loader is pure HTML/CSS/JS — **zero Blazor dependency** — so it fires instantly before the WASM runtime loads
- Once the sequence ends, a CSS class `loader-done` is added to `<body>`, which removes the overlay and triggers a short fade-in on `#app`

### Loader HTML Structure
```html
<div id="marvel-loader">
  <div id="ml-panels"></div>       <!-- tech stack frames injected by JS -->
  <div id="ml-flash-red"></div>    <!-- red burst overlay -->
  <div id="ml-name">
    <span>SHOAIB</span>
    <span>SHAHRIAR</span>
  </div>
  <div id="ml-flash-white"></div>  <!-- exit white flash -->
</div>
```

### Sequencer (marvel-loader.js)
- Self-contained IIFE, runs on `DOMContentLoaded`
- Uses `setTimeout` chains (no external libraries) for precise frame timing
- Acceleration curve for panel flipping:
  ```
  Frame intervals (ms): 130, 120, 110, 100, 90, 80, 70, 60, 55, 50, 45, 40, 40, 40, 40
  ```
- On completion: removes `#marvel-loader` from DOM entirely (no lingering paint cost)

### Font
- Load **Bebas Neue** from Google Fonts in `index.html` `<head>` with `display=swap`
- Used only in loader — does not affect the rest of the portfolio typography

---

## Visual Style Reference

```
┌────────────────────────────────────┐
│                                    │  ← Phase 1: Black
└────────────────────────────────────┘

┌────────────────────────────────────┐
│                                    │
│           ASP.NET CORE             │  ← Phase 2: Panel shuffle
│                                    │     (repeats ~16–20x, accelerating)
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ ██████████████████████████████████ │  ← Phase 3: Red flash
│ ██████████  #E8042C  ██████████████│
└────────────────────────────────────┘

┌────────────────────────────────────┐
│                                    │
│   SHOAIB                           │  ← Phase 4: Name reveal
│   SHAHRIAR                         │     (white → red sweep)
│                                    │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← Phase 5: White flash out
│ ░░░░░░░░░  fading  ░░░░░░░░░░░░░░░ │     → Portfolio visible
└────────────────────────────────────┘
```

---

## Timing Summary

| Phase | Start | End | Duration |
|---|---|---|---|
| Black screen | 0ms | 200ms | 200ms |
| Tech panel shuffle (accel.) | 200ms | 2400ms | ~2200ms |
| Red flash burst | 2400ms | 2700ms | 300ms |
| Name reveal | 2700ms | 3400ms | 700ms |
| White flash + portfolio fade-in | 3400ms | 3800ms | 400ms |
| **Total** | | | **~3.8s** |

---

## Scope & Constraints

- **No external animation libraries** — pure CSS keyframes + JS `setTimeout`
- **No impact on portfolio CSS** — loader styles are fully scoped to `#marvel-loader`
- **One-shot only** — plays once per visit; `sessionStorage` flag prevents replay on navigation
- **Accessible** — respects `prefers-reduced-motion`: if set, skips directly to portfolio with a simple 300ms fade
- **Mobile** — works at any viewport; panel text scales with `vw` units

---

## Open Questions for Review

1. **Font choice** — Bebas Neue vs. Anton vs. a custom CSS stencil approach (no Google Fonts dependency)?
2. **Panel style** — pure text only, or add a faint background grid/halftone texture to each panel to feel more "comic book"?
3. **Name colour** — white slamming in then red sweep, or straight red from the start like the actual Marvel title card?
4. **Replay** — should there be a hidden trigger (e.g. clicking the site logo) to replay the intro?
5. **Sound** — Marvel's intro has that iconic audio swell. Out of scope for web (autoplay blocked), but worth noting.
