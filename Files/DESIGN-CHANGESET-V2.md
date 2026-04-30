# Design Changeset v2 — Technical Execution Plan

**Source:** `Files/Article Files/Draft design.txt`
**Status:** Planning only — no changes made yet

---

## Feasibility Overview

| # | Original Request | Feasibility | Effort |
|---|-----------------|-------------|--------|
| 1 | Background more interactive / dots playable | ✅ High | Medium |
| 2 | Each section has themed interactive animation | ✅ High | High |
| 3 | Light theme animations as visible as dark | ✅ High | Low |
| 4 | Sections/subsections can be thematic | ✅ Medium | Medium |
| 5 | Swap Skills ↔ Architecture Principles tab order | ✅ High | Trivial |
| 6 | Education title matches other section title styles | ✅ High | Low |
| 7 | Hero code snippet: add typing animation | ✅ Medium | Low |
| 8 | Certificates use issuer brand colors (Claude, LinkedIn) | ✅ High | Low |
| 9 | Claude Code has full design authority | ✅ N/A — Permission grant | — |

---

## Phase A — Trivial Fixes
> Effort: ~30 min · No risk · Zero JS changes

---

### A.1 — Swap Technical Profile Tab Order
**Source:** Request 5
**Feasibility:** Trivial — 2-line change

**Current state:** Default tab is "Architecture Principles" (`_activeTab = "arch"`). Skills is the second tab.
**Target state:** Default tab is "Skills". Architecture Principles becomes the second tab.

**Technical steps:**
- [x] In `Components/Sections/ArchitecturePrinciplesSection.razor` `@code` block: change `_activeTab = "arch"` → `_activeTab = "skills"`
- [x] In the same file, swap the two `<button class="arch-tab">` elements so Skills button renders first, Architecture Principles second

---

### A.2 — Education Section Title Styling
**Source:** Request 6
**Feasibility:** High — CSS-only fix

**Current state:** Education is a sub-section inside `ExperienceTimelineSection`. The "Education" heading uses `.edu-divider-label` — a small monospace uppercase label (0.75rem) centred between two horizontal rules. This looks like a divider tag, not a section title.
**Target state:** The Education heading should use the same visual weight, font size, and style as the `SectionTitle` component's `<h2>` (used in all other sections).

**Technical steps:**
- [x] In `Components/Sections/ExperienceTimelineSection.razor.css`, replaced `.edu-divider-label` with `.edu-section-title` matching `SectionTitle` heading: 2.25rem, weight 700, `var(--text)`, letter-spacing -0.02em
- [x] Kept the horizontal rule lines; resized label to h2-level prominence
- [x] Replaced `<span class="edu-divider-label">` with `<h2 class="edu-section-title">` for correct semantic HTML; removed `aria-hidden` from wrapper

---

## Phase B — Light Theme Visibility Fixes
> Effort: ~45 min · CSS value adjustments only

---

### B.1 — Constellation Particles (Light Theme)
**Source:** Request 3
**Feasibility:** High

**Current state:** Light theme particles: `rgba(37,99,235, 0.38)` — too faint on white `#f8fafc` background.
Connection lines: `rgba(37,99,235, alpha)` where alpha max ≈ 0.12 — nearly invisible.
**Target state:** Particles clearly visible on both themes. Lines should be subtly visible on light.

**Technical steps:**
- [x] In `wwwroot/js/site.js` → `initializeConstellation()`: increased light-theme particle fill to `rgba(37,99,235, 0.55)` (was 0.38); reduced-motion static frame also raised from 0.25 → 0.45
- [x] Increased light-theme line alpha multiplier from `0.12` → `0.20`

---

### B.2 — Cursor Spotlight (Light Theme)
**Source:** Request 3
**Feasibility:** High

**Current state:** Light theme spotlight: `rgba(37, 99, 235, 0.03)` — effectively invisible.
**Target state:** Subtle warm spotlight visible on light theme (increased to ~0.05–0.06 opacity).

**Technical steps:**
- [x] In `wwwroot/css/enhancements.css` → `[data-theme="light"] .cursor-spotlight`: increased opacity from `0.03` → `0.055`

---

### B.3 — Section Number Watermarks (Light Theme)
**Source:** Request 3
**Feasibility:** High

**Current state:** Watermarks use `color: var(--text); opacity: 0.028`. On light theme `--text` is `#0f172a` (very dark) — watermarks may actually be more visible on light than dark. Verify visually and tune.
**Target state:** Consistent faintness on both themes (approx. same perceived opacity).

**Technical steps:**
- [x] In `wwwroot/css/enhancements.css` → `section[id]:not(#home)::after`: added `[data-theme="light"]` override reducing opacity to `0.018`

---

### B.4 — Tech Stack Marquee Badges (Light Theme)
**Source:** Request 3
**Feasibility:** High

**Current state:** `.tech-mq-badge` uses `background: var(--primary-soft); color: var(--primary)` — should be visible on both themes. **No change likely needed** — verify visually.

**Technical steps:**
- [x] Added `border: 1px solid rgba(37, 99, 235, 0.22)` on `.tech-mq-badge` for light theme — defines badge outline against the white background

---

## Phase C — Hero Code Snippet Typing Effect
> Effort: ~1.5h · New JS function only

---

### C.1 — Typewriter Animation for Floating Code Snippet
**Source:** Request 7
**Feasibility:** Medium (requires careful handling of syntax-highlighted HTML spans)

**Current state:** Code snippet fades in at 14% opacity with `hero-enter` CSS animation.
**Target state:** The code types itself character by character — each line appears sequentially. Syntax coloring (`hcs-kw`, `hcs-str`) is preserved as each token types in.

**Approach:** Token-aware typewriter — iterate over the child nodes of `<pre>`, reveal text nodes character by character and span nodes word-by-word in order, keeping the HTML structure intact.

**Technical steps:**
- [x] Added `initializeCodeTypewriter(elementId)` to `wwwroot/js/site.js` — tokenizes existing DOM (text nodes + spans), clears `pre`, reveals container, then replays each character at 28ms/char with 85ms pause on newlines; spans recreated with correct class
- [x] In `Components/Sections/HeroSection.razor` `OnAfterRenderAsync`: calls `initializeCodeTypewriter("hero-code-snippet")` after `initializeConstellation`; starts at 1800ms to let hero entrance animations settle first
- [x] Removed `hero-enter` CSS animation from `.hero-code-snippet`; replaced with `opacity: 0` + `transition: opacity 0.3s ease` — JS sets opacity 0.14 before typing begins; reduced-motion path shows full text immediately

---

## Phase D — Certificate Issuer Brand Theming
> Effort: ~1h · C# + CSS changes

---

### D.1 — Map Issuer to Brand Color
**Source:** Request 8
**Feasibility:** High

**Current state:** `GetCategoryColor(cert.Category)` drives accent panel color. A "Claude Code in Action" cert and "SAP ERP" cert both show the same AI/Dev category color regardless of who issued them.
**Target state:** Accent panel color reflects the issuer's visual brand identity.

**Issuer → Brand Color mapping:**
| Issuer | Brand Color | Notes |
|--------|------------|-------|
| Anthropic | `#D97757` | Claude's signature coral-orange |
| LinkedIn Learning | `#0A66C2` | LinkedIn official blue |
| (default) | existing `GetCategoryColor` fallback | all other issuers |

**Technical steps:**
- [x] Added `GetIssuerColor(string issuer)` to `CertificatesSection.razor` — "Anthropic" → `#D97757` (Claude coral-orange), "LinkedIn Learning" → `#0A66C2` (LinkedIn blue), unknown → `null`
- [x] Updated `style="--cat-color: ..."` to `@(GetIssuerColor(cert.Issuer) ?? GetCategoryColor(cert.Category))` — issuer brand takes priority
- [x] Seal initials unchanged — existing logic already produces "AN" for Anthropic and "LL" for LinkedIn Learning
- [x] No light theme override needed — both brand colors are dark enough to carry white text on both themes

---

## Phase E — Interactive Background Enhancement
> Effort: ~2h · site.js enhancements

---

### E.1 — Constellation: More Interactive / "Playable"
**Source:** Request 1
**Feasibility:** High

**Current state:** Constellation is on hero only. Mouse moves particles; repel radius = 100px.
**Target state:** The experience feels "playable" — user can interact and see responsive behaviour.

**Enhancements to implement:**
- [x] **Click-to-burst**: clicking anywhere on the hero canvas spawns 8–12 new particles at the click position that drift outward and then settle into the network. Each click adds temporary velocity burst.
- [x] **Increase repel radius & strength**: from 100px / 0.65 force → 130px / 1.0 force for more dramatic cursor interaction
- [x] **Connection pulse on cursor proximity**: lines near the cursor briefly glow brighter (opacity spike then fade)
- [x] **Right-click / double-click**: double-click launches a "system disturbance" — all particles get a random velocity spike for 1s, then dampen back to calm. (Desktop only)
- [x] **Performance guard**: cap max live particles at 80 (default 60 + click-spawned cap)

---

## Phase F — Section-Specific Themed Animations
> Effort: ~4h · One animation per section · All IntersectionObserver-triggered

---

**Design principle:** Each animation fires once when the section scrolls into view, triggered by IntersectionObserver. All have `prefers-reduced-motion` overrides.

---

### F.1 — Selected Impact: Icon Pulse Rings
**Source:** Request 2 — section theme: measurable outcomes, metrics
**Feasibility:** High (CSS only)

- [x] On scroll-into-view, `.impact-icon` elements emit 2 expanding ring pulses (CSS `@keyframes`, triggered by adding `.animated` class via existing `initializeCardAnimations()` observer)
- [x] Ring colour: `var(--primary)`, 60px max-radius, opacity 0 → 0.4 → 0

---

### F.2 — Experience Timeline: Line Draw-In
**Source:** Request 2 — section theme: journey, time progression
**Feasibility:** High

**Current state:** The vertical timeline line between experience entries is a static CSS `::before` pseudo-element.
**Target state:** On scroll-in, the vertical line "draws" itself from top to bottom using `stroke-dashoffset` or `scaleY` animation.

- [x] In `ExperienceTimelineSection.razor.css`: add `transform-origin: top center; transform: scaleY(0); transition: transform 0.8s ease` to the timeline line element
- [x] In `site.js` or existing `initializeSectionObserver()`: when `#experience` becomes visible, add `.animated` class that sets `scaleY(1)`

---

### F.3 — Technical Profile: Circuit Trace Border
**Source:** Request 2 — section theme: engineering precision, circuits
**Feasibility:** Medium

- [x] On `arch-card` hover (already has tilt), add a `border-color` animated trace effect: a CSS `@keyframes` animation cycles a gradient border clockwise around the card using `background-clip: border-box` technique
- [x] Uses `@property --border-angle` CSS custom property (modern browsers) for the rotating conic-gradient border
- [x] Fallback: simple `border-color` pulse for browsers without `@property` support

---

### F.4 — Case Studies: Tag Cascade Reveal
**Source:** Request 2 — section theme: code, engineering artefacts
**Feasibility:** High

- [x] When a case study card becomes visible, its technology tags (`TagBadge` elements) animate in with a staggered cascade: each tag slides up from below with a 40ms delay between tags
- [x] Controlled by `initializeCardAnimations()` or a new `initializeCsTagAnimations()` function
- [x] Tags start at `opacity: 0; transform: translateY(8px)` and transition to visible

---

### F.5 — GitHub Section: Contribution Pixel Paint
**Source:** Request 2 — section theme: code contribution, activity
**Feasibility:** Medium (depends on how GitHub section renders the activity grid)

- [x] Contribution calendar squares animate in with a "pixel paint" effect — each cell scales from 0 to 1 with random per-cell delay (0–300ms)
- [x] Triggered by IntersectionObserver on the GitHub section
- [x] Note: GitHub section has no calendar grid; adapted to stagger-animate `.gh-stat-item` (slide-up) and `.gh-lang-badge` (scale-in) instead

---

### F.6 — Certificates: Seal Stamp-In
**Source:** Request 2 — section theme: achievement, credentials
**Feasibility:** High

- [x] When a certificate card becomes visible or is navigated to, the `.cert-seal` element plays a "stamp" animation: `scale(1.4) → scale(0.9) → scale(1)` with a brief `rotate(−5deg) → rotate(0)`, duration 400ms
- [x] A faint "ink spread" pulse ring expands from the seal centre (similar to Impact icon rings)
- [x] One-shot per card visible event (not repeated on hover)

---

### F.7 — Writing/Medium: Article Card Text Blur-Reveal
**Source:** Request 2 — section theme: writing, publishing
**Feasibility:** High

- [x] `.med-card` added to `initializeCardAnimations()` selectors so cards get `card-enter` slide-up on scroll
- [x] Blur effect skipped per user preference — standard card-enter animation only

---

### F.8 — Contact Section: Form Field Glow Sequence
**Source:** Request 2 — section theme: connection, reach-out
**Feasibility:** Medium (depends on contact form structure)

- [x] On section scroll-in, each form field or contact method highlights in sequence with a brief `box-shadow` glow using `var(--primary)`, 150ms apart
- [x] Adds a welcoming "come talk to me" energy to the section
- [x] `.ct-card` links are the contact methods — each gets `.ct-glow` with staggered setTimeout

---

## Phase G — Section Thematic Visual Identity
> Effort: ~3h · Subtle differentiators, not full redesigns

---

### G.1 — Subtle Background Accents per Section
**Source:** Request 4
**Feasibility:** Medium

**Design approach:** Each section gets a unique ultra-faint SVG or CSS-drawn decorative motif in one corner — at 2–3% opacity, purely atmospheric. Visible on close inspection, not distracting.

| Section | Motif | Implementation |
|---------|-------|---------------|
| Selected Impact | Faint radial pulse rings | CSS `::before` radial gradient |
| Case Studies | Code brackets `{ }` in corner | CSS `::after` content with mono font |
| Technical Profile | Circuit-dot grid | CSS `background-image: radial-gradient` dot pattern |
| Experience | Vertical timeline extension glow | CSS gradient on existing timeline line |
| GitHub | `</>` tag mark | CSS `::after` mono content |
| Certificates | Faint seal/badge outline | CSS `::after` with border-radius + border |
| Writing | Open quote marks `"` | CSS `::before` large mono quote character |
| Contact | Diagonal line texture | CSS `repeating-linear-gradient` |

- [x] Implement per-section motifs in respective `*.razor.css` files using `::before` on each section's `.inner` div
- [x] All at ≤ 3% opacity, pointer-events: none
- [x] No conflict with section number watermarks — `::before` on inner divs is completely safe from global `::after` on section elements

---

## Progress Tracker

| Phase | Description | Status |
|-------|-------------|--------|
| A | Trivial Fixes (tab swap, edu title) | ✅ Done |
| B | Light Theme Visibility | ✅ Done |
| C | Hero Code Snippet Typing | ✅ Done |
| D | Certificate Issuer Theming | ✅ Done |
| E | Constellation Interactivity | ✅ Done |
| F | Section-Specific Animations | ✅ Done |
| G | Section Thematic Identity | ✅ Done |

---

## Notes & Design Authority (Request 9)

Claude Code has been granted full authority to propose and implement additional design improvements beyond the above list. Any additions made under this authority will be documented here with a `[CC-Auto]` tag.

**Candidate improvements under consideration:**
- Smooth scroll snapping between sections (optional, debatable UX)
- Hero name text: subtle gradient colour on the "Shoaib Shahriar" h1 (primary → violet)
- Back-to-top button: add a circular progress ring that shows scroll position (combines with scroll bar)
- Nav brand "SS": add a subtle shimmer/glint animation on hover

These will be evaluated during execution phases and implemented if they strengthen the overall design.

---

*Created: 2026-03-30 | Execute phases via separate instruction*
