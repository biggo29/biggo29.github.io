# Portfolio Enhancement — Creative Brief
**Role:** Senior UI/UX Designer
**Goal:** Transform a solid portfolio into an *unforgettable* one

---

## The Problem

The portfolio content is strong — enterprise scale, WSIS award, 30+ microservices. But the visual experience doesn't match the calibre of the work. Both themes feel like reading a well-structured document. Visitors scroll passively and leave without feeling anything.

**Root causes:**
- Every section uses the same flat card pattern and the same background rhythm
- Animations are functional (fade-up, hover border) but not *delightful*
- Nothing surprises the visitor — there are no moments of "oh, that's cool"
- The page doesn't communicate *personality* — it could belong to anyone

**The goal:** Make visitors feel the same thing they feel when landing on Linear, Vercel, or Stripe's pages — that the person behind this is sharp, confident, and pays attention to details.

---

## Creative Vision

> *"A backend engineer's portfolio should feel like stepping inside a running system — alive, precise, and powerful."*

The visual identity already has a strong foundation: dark navy, blue primary, clean typography. We don't break that. We **breathe life into it**.

---

## The Ideas

---

### TIER 1 — The Big Wins
*Maximum visual impact. These alone will transform the page.*

---

#### 1. 🌌 Hero Constellation Background
**"Your microservices, visualised."**

Replace the static hero background image with a live particle network canvas. 50–60 floating dots connected by thin lines when near each other. On mouse move, particles gently repel from the cursor — like disturbing a calm system.

This directly represents what you *build*: distributed, interconnected services. It's not decoration — it's a metaphor.

```
  ·  ·——·          ·
  |  |  \    ·——·  |
  ·——·   ·  /    \ ·
       ·——·        ·——·
```

- Canvas API, ~100 lines of JS
- Completely replaces hero-bg-dark.webp / hero-bg-light.webp
- Light theme: particles are soft grey on white
- Performance: throttled to 60fps, paused when off-screen

---

#### 2. 🎯 Cursor Spotlight (Whole Page)
**"Like a flashlight in a dark room."**

A soft radial gradient glow (600px radius, 6% opacity) follows the cursor across every dark section. Creates the impression that your portfolio is *aware* of the visitor. Used famously by Stripe and Linear.

```css
/* Effect: barely visible, but you feel its absence when gone */
background: radial-gradient(600px at var(--cx) var(--cy),
    rgba(59,130,246,0.06), transparent 80%);
```

- Pure JS: 3 lines to track `--cx` / `--cy` on `:root`
- Pure CSS: one `::before` pseudo-element on each section
- Light theme version: subtle warm glow, near invisible
- Zero performance cost (CSS `transform` layer)

---

#### 3. 📊 Impact Metrics Marquee Strip
**"Stop the scroll with numbers."**

A full-width horizontal scrolling strip placed *between* the Hero and Impact sections. High contrast (solid primary blue background). Infinite loop. The numbers are the resume highlights.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ◆ 15,000+ Daily Users  ◆ 30+ Microservices
  ◆ 99%+ Test Coverage   ◆ 8+ Years Engineering
  ◆ WSIS Award 2021      ◆ £1M+ Monthly Sales
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

- Two rows scrolling in *opposite* directions (top: left→right, bottom: right→left)
- Pauses on hover for readability
- Pure CSS `@keyframes` scroll — zero JS
- Hard break in the page rhythm — visitor *has* to notice it

---

#### 4. 🃏 3D Card Tilt on Hover
**"Cards that feel physical."**

Every card across every section gets a subtle 3D perspective tilt following the mouse. Max ±8° rotation. A highlight glare moves with the tilt (like a holographic card).

```
Before hover:          On hover (cursor top-right):
┌──────────────┐       ╱──────────────╱
│              │      ╱              ╱ ← glare moves
│   flat card  │     ╱  tilted card ╱
│              │    ╱              ╱
└──────────────┘   ╱──────────────╱
```

- JS: `mousemove` on each card → `rotateX` + `rotateY`
- CSS: `perspective: 800px` on card container
- The glare is a `::after` radial gradient repositioned by JS
- Applied to: impact cards, case study cards, arch principles, cert cards

---

#### 5. 📍 Vertical Section Navigator (Right Side)
**"The visitor always knows where they are."**

Fixed dots on the right edge — one per section. Active dot expands to show the section name. Clicking navigates there. Solves the "I don't know how much is left" anxiety and *encourages* scrolling.

```
  (side of screen)
        ●  home
        ○
        ○
        ○  ← hover: shows "Experience"
        ○
        ○
```

- Enhances the existing `initializeNavHighlight()` logic
- Replaces nothing — purely additive
- Hides on mobile (too small)

---

### TIER 2 — Personality Boosters
*Adds character and makes visitors smile.*

---

#### 6. 🔧 Tech Stack Marquee (Enhance Capabilities Section)
**"Show, don't list."**

Two infinite-scroll rows of tech badges in the Capabilities section, scrolling in opposite directions. Pauses on hover.

```
→  C#  .NET 8  ASP.NET Core  CQRS  NServiceBus  SQL Server  Docker  Azure  →
←  TDD  XUnit  Clean Architecture  EF Core  JWT  RBAC  Microservices  Kibana  ←
```

---

#### 7. 〰️ Section Shape Dividers
**"End flat section cuts forever."**

Between key sections, a subtle diagonal SVG divider creates flow and transition. The page feels like it has *momentum* instead of stopping and starting.

```
Current:        Proposed:
────────        ────────
[section A]     [section A]
────────         ╲________
[section B]       [section B]
```

Candidates: Hero→Impact, Experience→GitHub, Writing→Contact

---

#### 8. 💥 Button Particle Burst on Click
**"Reward the click."**

When a visitor clicks any primary CTA, a brief burst of 12 small particles explodes outward in the brand colour and fades in 600ms.

Small detail. Enormous delight.

---

#### 9. 💻 Floating Code Snippet in Hero
**"Sign your work."**

A small, semi-transparent code block floats in the hero background. Low opacity (~20%), desktop only.

```typescript
const engineer = {
  name:  "Shoaib Shahriar",
  stack: [".NET", "CQRS", "Microservices"],
  uptime: "99.9%",
};
```

---

#### 10. 📈 Scroll Progress Bar
**"Show them there's more."**

A 2px line at the very top of the page fills left-to-right as the user scrolls. Rewards continued scrolling.

---

### TIER 3 — Finishing Touches
*The 1% details that separate good from great.*

#### 11. 🔢 Faint Section Numbers in Background
Large (10–14rem), very faint (4% opacity) section numbers watermarked behind each section.

#### 12. 🧲 Magnetic Buttons
Primary CTA buttons subtly attract toward the cursor within ~80px. Springs back on leave.

#### 13. ✨ Theme Toggle Sparkle
When toggling theme, 6–8 small star/sun particles burst from the button.

---

---

## Execution Plan — Phase by Phase

---

### Phase 1 — Quick Wins
> Effort: ~1.5h · 3 features · Immediate atmosphere change

- [x] **1.1** Scroll Progress Bar — 2px primary-blue line at top of page, fills as user scrolls
- [x] **1.2** Cursor Spotlight — soft radial glow follows mouse across all sections (dark + light variants)
- [x] **1.3** Vertical Section Navigator — fixed right-side dot list, hover reveals section name, click navigates, hidden on mobile

---

### Phase 2 — The Scroll Stopper
> Effort: ~1h · 1 component · Breaks the monotony dead

- [x] **2.1** Metrics Marquee Strip — full-width component inserted between Hero and Impact sections
- [x] **2.2** Row 1 scrolls left→right: `15,000+ Daily Users · 30+ Microservices · 99%+ Test Coverage · 8+ Years`
- [x] **2.3** Row 2 scrolls right→left: `WSIS Award 2021 · £1M+ Monthly Sales · 99.9% Uptime · Near-Zero Defects`
- [x] **2.4** Pauses both rows on hover
- [x] **2.5** Theme-aware colours (blue bg on dark, subtle bordered strip on light)

---

### Phase 3 — Depth & Physicality
> Effort: ~2.5h · Applied to all card types

- [x] **3.1** Add `initializeTilt()` JS function to site.js — handles `mousemove`, `mouseleave` per card
- [x] **3.2** Apply tilt to `.impact-card` elements
- [x] **3.3** Apply tilt to `.arch-card` elements
- [x] **3.4** Apply tilt to `.cs-card` (case study) elements
- [x] **3.5** Skip cert-card (full-width banner — tilt on a 100% wide element is awkward)
- [x] **3.6** Glare overlay injected as child element by JS (avoids scoped CSS conflicts)
- [x] **3.7** Disabled on touch devices (`hover:none`) and `prefers-reduced-motion`

---

### Phase 4 — Hero Transformation
> Effort: ~2h · Hero section only · Most visually striking change

- [x] **4.1** Create `initializeConstellation(canvasId)` JS function in site.js
- [x] **4.2** Add `<canvas>` element to HeroSection.razor behind existing content
- [x] **4.3** Spawn 60 particles with random positions, velocities, and sizes
- [x] **4.4** Draw connection lines between particles within 120px of each other
- [x] **4.5** Mouse repel: particles gently push away from cursor within 100px
- [x] **4.6** Light theme: translucent blue particles and lines at lower opacity
- [x] **4.7** Pause canvas `requestAnimationFrame` loop when hero scrolls off-screen (IntersectionObserver)
- [x] **4.8** Floating code snippet — small semi-transparent code block in hero (desktop only, fade-in last)

---

### Phase 5 — Personality Layer
> Effort: ~2h · Four distinct features

- [x] **5.1** Tech Stack Marquee — two scrolling rows added to Technical Profile section header
- [ ] **5.2** Section dividers — skipped (all sections share same `--bg`, dividers invisible)
- [x] **5.3** Button particle burst — `initializeParticleBurst()` JS, triggers on `.cta-primary` click
- [x] **5.4** Theme toggle sparkle — sun rays on switch-to-light, stars on switch-to-dark

---

### Phase 6 — Polish & Finishing Touches
> Effort: ~1h · Refinement pass

- [x] **6.1** Faint section numbers — large watermark numbers (01–08) via CSS counter + `::after`
- [x] **6.2** Magnetic buttons — `initializeMagneticButtons()` JS on all `.cta-primary` elements
- [x] **6.3** `prefers-reduced-motion` audit — all new animations have `reduce` overrides
- [x] **6.4** Mobile audit — spotlight/nav/tilt/magnetic/code-snippet all hidden/skipped on mobile; marquees + scroll-bar work on all sizes
- [x] **6.5** Performance audit — all event listeners passive; canvas pauses via IntersectionObserver; tilt uses MutationObserver scoped to body; no layout-blocking resources added

---

## Progress Tracker

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 1 | Quick Wins — Scroll bar, Cursor spotlight, Side nav | ✅ Done |
| Phase 2 | Scroll Stopper — Metrics marquee strip | ✅ Done |
| Phase 3 | Depth & Physicality — 3D card tilt | ✅ Done |
| Phase 4 | Hero Transformation — Constellation + code snippet | ✅ Done |
| Phase 5 | Personality Layer — Marquee, particle burst, sparkle | ✅ Done |
| Phase 6 | Polish & Finishing Touches | ✅ Done |

---

## Guiding Principles for Execution

1. **Never sacrifice readability** — every effect disappears if content contrast drops below WCAG AA
2. **Respects `prefers-reduced-motion`** — all animations have a `reduce` override
3. **Mobile gets the content, desktop gets the magic** — most effects are desktop-only
4. **No third-party libraries** — vanilla JS + CSS only, keeps the bundle tiny
5. **Progressive enhancement** — everything works without JS; JS is the enhancement layer
