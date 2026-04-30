# UX Design Phase — Portfolio Redesign

**Branch:** `feature/portfolio-redesign-theme`  
**Project:** Shoaib Shahriar — Lead Software Engineer Portfolio  
**Stack:** Blazor WebAssembly · .NET 10 · Scoped CSS  
**Sessions covered:** 4 iterative design & implementation sessions

---

## Table of Contents

1. [Overview & Problem Statement](#1-overview--problem-statement)
2. [Phase 1 — Scroll Reduction](#2-phase-1--scroll-reduction)
3. [Phase 2 — Progressive Disclosure Cards](#3-phase-2--progressive-disclosure-cards)
4. [Phase 3 — Grid Bug Fix & Interactivity](#4-phase-3--grid-bug-fix--interactivity)
5. [Phase 4 — Writing Nav Item](#5-phase-4--writing-nav-item)
6. [Files Changed Summary](#6-files-changed-summary)
7. [UX Principles Applied](#7-ux-principles-applied)
8. [Responsive Behaviour](#8-responsive-behaviour)
9. [Accessibility Checklist](#9-accessibility-checklist)
10. [Further Improvement Ideas](#10-further-improvement-ideas)

---

## 1. Overview & Problem Statement

The original portfolio rendered **9 full sections** stacked vertically with all content always visible:

| # | Section | Approx. Height | Problem |
|---|---|---|---|
| 1 | Hero | ~100vh | ✅ Fine |
| 2 | Impact | ~400px | ✅ Fine |
| 3 | Case Studies | ~1,400px | 3 detailed cards, all content always visible |
| 4 | Architecture Principles | ~600px | 6 full cards with descriptions |
| 5 | Capabilities / Skills | ~700px | 8 groups × 6–10 tag badges |
| 6 | Experience | ~1,500px | 4 jobs × 5 bullets + tech tags + education |
| 7 | GitHub | ~500px | ✅ Fine |
| 8 | Writing (Medium) | ~400px | Not linked in nav |
| 9 | Contact | ~300px | ✅ Fine |

**Total locked scroll depth: ~6,000–7,000px.**  
Users had to scroll through everything regardless of interest.  
The Writing section had no nav entry.

**Core UX problem:** Information overload with no progressive disclosure.

---

## 2. Phase 1 — Scroll Reduction

### 2a. Collapsible Experience Timeline

**File:** `Components/Sections/ExperienceTimelineSection.razor` + `.css`

**What changed:**
- Converted `@foreach` loop to `@for` loop to track index per entry.
- Each job card's header (`role`, `company`, `duration`) is now a `<button>` toggle.
- Accomplishments, summary paragraph, and tech tags are wrapped in a `.exp-details` panel animated with `grid-template-rows: 0fr → 1fr` CSS transition.
- Only the **most recent job (index 0)** is expanded by default via `HashSet<int> _expanded = new() { 0 }`.
- A rotating **chevron ▼** in the header indicates collapsed/expanded state.
- `aria-expanded` attribute is toggled correctly for screen readers.

**Result:** Experience section reduced from ~1,500px to ~280px on first load (4 collapsed cards + open card).

**CSS additions:**
```css
/* Button reset on the toggle header */
.exp-toggle { appearance: none; background: none; border: none; cursor: pointer; ... }

/* CSS grid height animation */
.exp-details { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.25s ease; }
.exp-details.is-visible { grid-template-rows: 1fr; }
.exp-details-inner { overflow: hidden; }

/* Chevron rotation */
.exp-chevron { transition: transform 0.25s ease; }
.exp-chevron.is-open { transform: rotate(180deg); }
```

---

### 2b. Architecture + Skills Merged into Tabbed "Technical Profile"

**Files:**
- `Components/Sections/ArchitecturePrinciplesSection.razor` — repurposed as the combined section
- `Components/Sections/ArchitecturePrinciplesSection.razor.css` — merged cap-* CSS in
- `Pages/Home.razor` — `<CapabilitiesSection />` removed
- `Shared/MainLayout.razor` — "Architecture" + "Skills" (2 nav items) → "Technical" (1 nav item)

**What changed:**
- `ArchitecturePrinciplesSection.razor` now renders two tab panels:
  - **🏗️ Architecture Principles** — 6 principle cards
  - **⚡ Skills** — 8 capability group cards
- Tab bar uses `role="tablist"` / `role="tab"` / `aria-selected` semantics.
- `CapabilitiesSection.razor` is no longer rendered (file kept, removed from `Home.razor`).
- Section title changed to **"Technical Profile"** to reflect combined content.
- All `cap-*` CSS copied into `ArchitecturePrinciplesSection.razor.css` so Blazor's scoped CSS isolation applies correctly.

**Result:** 2 full sections (Architecture + Skills, ~1,300px total) collapsed into 1 tabbed section (~600px), saving one full nav item.

---

## 3. Phase 2 — Progressive Disclosure Cards

### 3a. Case Studies — Expandable Teaser Cards

**Files:** `Components/Shared/CaseStudyCard.razor` + `.css`

**What changed:**

**Collapsed state (always visible):**
- Role badge + external links
- Project title
- Context paragraph
- First 5 tech tags + "+N more" hint
- `▼ View Details` button (full-width, muted border-top)

**Expanded state (animated reveal):**
- Architecture detail block (grey left border)
- Outcome block (green left border)
- Full tech tag set
- `▲ Collapse` button

**Implementation:**
- `private bool _open;` per card instance.
- `.cs-details` uses `grid-template-rows: 0fr → 1fr` animation.
- `.cs-tech-preview` hides with `display: none` when card is open; full `.cs-tech-row` shows inside the expanded panel.
- `is-open` on the article adds a subtle blue border glow (`rgba(59,130,246,0.35)`) so the user always knows which study is expanded.
- `aria-expanded` on the expand button reflects current state.

**Result:** Each case study goes from ~450px to ~120px collapsed. 3 cards = ~1,350px → ~360px saved.

---

### 3b. Architecture Principles Tab — Expandable Cards

**File:** `Components/Sections/ArchitecturePrinciplesSection.razor`

**What changed:**
- `@for` loop with per-card `var open = _openArch.Contains(idx)`.
- Each `.arch-card` is a clickable `div` with `role="button"` / `tabindex="0"` / `@onkeydown`.
- Chevron ▼ added to the right of the card header.
- `.arch-desc-wrap` uses `grid-template-rows: 0fr → 1fr` animation with `padding-top` transition.
- `HashSet<int> _openArch` tracks which cards are open.

**Collapsed state:** icon + title + chevron (compact row).  
**Expanded state:** icon + title + chevron (rotated) + description paragraph slides in.

---

### 3c. Skills Tab — Expandable Cards

**File:** `Components/Sections/ArchitecturePrinciplesSection.razor`

**What changed:**
- `@for` loop with per-card `var open = _openSkills.Contains(idx)`.
- `.cap-card-header` layout changed from `flex-direction: column` → `flex-direction: row` to accommodate the chevron on the right.
- `.cap-header-text` wrapper added for title + description column.
- `.cap-tags-wrap` uses `grid-template-rows: 0fr → 1fr` animation.
- `HashSet<int> _openSkills` tracks which cards are open.

**Collapsed state:** title + subtitle description + chevron (compact row).  
**Expanded state:** title + subtitle + tag cloud slides in.

---

## 4. Phase 3 — Grid Bug Fix & Interactivity

### 4a. Bug Fix — CSS Grid Stretch

**Root cause:**  
CSS Grid defaults to `align-items: stretch`, forcing all cards in the same grid row to match the height of the tallest card. When one card expanded, all its row-siblings stretched to fill that height — showing blank empty space (no content visible because their `arch-desc-inner` / `cap-tags-inner` was still collapsed).

**Fix:**
```css
.arch-grid { align-items: start; }
.cap-grid  { align-items: start; }
```

Each card now takes only its own natural height, completely independent of its siblings.

**Defensive fix — `min-height: 0`:**  
For the `grid-template-rows: 0fr` collapse trick to work correctly on all browsers, the grid child must have a minimum size of 0. Added explicitly:
```css
.arch-desc-inner { overflow: hidden; min-height: 0; }
.cap-tags-inner  { overflow: hidden; min-height: 0; }
```

---

### 4b. Architecture Tab → Accordion Mode

**What changed:**
- Replaced `HashSet<int> _openArch` with `int? _openArchIdx` (nullable int).
- `ToggleArch(i)` now uses: `_openArchIdx = _openArchIdx == i ? null : i;`

**Behaviour:**
- Clicking a closed card → opens it, closes any previously open card.
- Clicking the open card → collapses it (all closed).

**Why accordion for Architecture:**  
6 principle cards in a 3-col grid — accordion keeps focus on one idea at a time. Users are reading/comprehending, not comparing. Prevents multiple tall cards from creating visual chaos in the grid.

---

### 4c. Skills Tab → Expand All / Collapse All

**What changed:**
- `.cap-toolbar` added above the skills grid containing:
  - **Live counter** `"N / 8 expanded"` in monospace font (muted) — spatial awareness.
  - **"↓ Expand All" / "↑ Collapse All" toggle button** — flips state of all 8 groups at once.
- `bool AllSkillsExpanded` computed property (true when `_openSkills.Count == total`).
- `ToggleAllSkills()` method: clears the HashSet if all open, fills it if any closed.
- Skills kept as **multi-open** (not accordion) because skill comparison across groups is a valid use case.

---

### 4d. Tactile Active State

Added `transform: scale(0.98)` on `:active` for both `.arch-card` and `.cap-card`:
```css
.arch-card:active { transform: scale(0.98); box-shadow: none; }
.cap-card:active  { transform: scale(0.98); box-shadow: none; }
```
Provides a physical "press" feeling, reinforcing that cards are interactive.

---

## 5. Phase 4 — Writing Nav Item

**File:** `Shared/MainLayout.razor`

**What changed:**
- Added `("Writing", "writing")` to the `NavItems` array between "GitHub" and "Contact".
- Points to `id="writing"` on `MediumArticlesSection.razor` (already existed, was unreachable from nav).

**Final nav order:**
```
Home · Impact · Case Studies · Technical · Experience · GitHub · Writing · Contact
```

The Writing section (`MediumArticlesSection.razor`) was the only section with no nav link — now fully discoverable.

---

## 6. Files Changed Summary

| File | Change Type | Description |
|---|---|---|
| `Shared/MainLayout.razor` | Modified | Nav items restructured across phases; Writing added |
| `Pages/Home.razor` | Modified | `<CapabilitiesSection />` removed |
| `Components/Sections/ExperienceTimelineSection.razor` | Modified | Collapsible job entries with toggle button |
| `Components/Sections/ExperienceTimelineSection.razor.css` | Modified | Toggle button reset, chevron, grid-height animation |
| `Components/Sections/ArchitecturePrinciplesSection.razor` | Modified | Tabbed section + expandable cards (both tabs) + accordion + toolbar |
| `Components/Sections/ArchitecturePrinciplesSection.razor.css` | Modified | Tab bar, card expand animations, grid fix, toolbar, active states |
| `Components/Shared/CaseStudyCard.razor` | Modified | Teaser/details split, expand toggle button |
| `Components/Shared/CaseStudyCard.razor.css` | Modified | Tech preview, details animation, expand button styles |
| `Components/Sections/CapabilitiesSection.razor` | Unused | File kept but no longer rendered in `Home.razor` |

---

## 7. UX Principles Applied

| Principle | Where Applied |
|---|---|
| **Progressive Disclosure** (show minimum, reveal on demand) | Case Studies, Architecture cards, Skills cards, Experience timeline |
| **Information Architecture** (group related content) | Architecture + Skills merged into one tabbed "Technical Profile" |
| **Fitts's Law** (larger click targets) | Full-card clickable area on arch/skill cards |
| **Accordion Pattern** (single focus at a time) | Architecture Principles tab |
| **Spatial Awareness** (always know your position) | "N / 8 expanded" counter in Skills toolbar; active nav highlighting |
| **Affordance** (make interactivity obvious) | Chevron icons, cursor: pointer, hover border highlight, scale(0.98) press |
| **Accessibility First** | `aria-expanded`, `aria-hidden`, `role="button"`, `tabindex="0"`, `@onkeydown` Enter/Space, `focus-visible` rings throughout |

---

## 8. Responsive Behaviour

### Experience Timeline

| Breakpoint | Behaviour |
|---|---|
| All | Full-width accordion, collapses to header only |
| Mobile `<640px` | Card padding reduced, full width |
| Tablet `<768px` | Header stacks vertically on small widths |

### Technical Profile (Architecture + Skills)

| Breakpoint | Architecture Grid | Skills Grid |
|---|---|---|
| Desktop `≥1100px` | 3 columns | 4 columns |
| Tablet `768–1100px` | 2 columns | 2 columns |
| Mobile `<640px` | 1 column (full-width accordion) | 1 column (full-width accordion) |

### Case Studies

| Breakpoint | Behaviour |
|---|---|
| Desktop / Tablet | Full-width stacked cards, expand in place |
| Mobile `<640px` | Reduced padding, header stacks vertically |

---

## 9. Accessibility Checklist

- [x] All expand/collapse controls use `aria-expanded="true|false"`
- [x] Hidden panels use `aria-hidden="true"` when collapsed
- [x] All clickable divs have `role="button"`, `tabindex="0"`, and `@onkeydown` (Enter + Space)
- [x] All icon SVGs have `aria-hidden="true"` (decorative)
- [x] Tab bar uses `role="tablist"`, `role="tab"`, `aria-selected`
- [x] Tab panels use `role="tabpanel"` with `aria-label`
- [x] All interactive elements have `:focus-visible` outline rings
- [x] Expand/Collapse All button has descriptive `aria-label`
- [x] Experience toggle uses `<button>` (native keyboard support, no extra ARIA needed)
- [x] Case Study expand button uses `<button>` with `aria-expanded`

---

## 10. Further Improvement Ideas

These were identified during the design phase but not implemented — reserved for the next iteration:

| Idea | Impact | Effort | Notes |
|---|---|---|---|
| Merge **Impact** section into Hero | Removes 1 full scroll section | Medium | Impact's 4 metric cards fit naturally below the hero statement |
| **Vertical dot scrollspy** sidebar | Makes page depth feel navigable | Medium | Right-side fixed dots, one per section, active on scroll |
| Case Studies **"Show 2, Load More"** | Minor (only 3 items currently) | Low | Worth adding when more case studies are added |
| **Section collapse/summary mode** | Power-user feature | High | Each section gets a one-line collapsed preview mode |
| **Smooth scroll offset** for sticky nav | Prevents nav from covering section headings on jump | Low | Add `scroll-margin-top` to all `<section>` elements |
