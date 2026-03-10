# Portfolio Improvement Plan — Execution Checklist

**Author**: Shoaib Shahriar  
**Project**: biggo29.github.io (Blazor WebAssembly Portfolio)  
**Goal**: Transform from a generic developer portfolio into a **senior engineer / solution architect** showcase  
**Sources**: Analyzed from `PORTFOLIO_IMPROVEMENT_PLAN.md` and `copilot-instructions.md`

---

## How To Use This Checklist

- Execute **one phase at a time**, top to bottom
- After completing each task, mark it `[x]`
- Each phase builds on the previous — do not skip phases
- Run `dotnet build` after each phase to verify

---

## Phase 1 — Foundation: Models, Data Layer & Project Structure

> **Why first?** Every section depends on well-defined models and a clean folder structure.  
> This phase creates the skeleton that all UI components will consume.

- [x] **1.1** Create folder structure: `Components/Shared/`, `Components/Sections/`, `Data/`, `Services/`
- [x] **1.2** Create `Models/CaseStudy.cs` — Title, Role, Context, Responsibilities, Architecture, Outcome, Technologies, Categories, RepositoryUrl, LiveUrl
- [x] **1.3** Create `Models/CapabilityGroup.cs` — Title, Description, Items list
- [x] **1.4** Create `Models/ExperienceItem.cs` — Role, Company, Client, Duration, Summary, Accomplishments, Technologies + `EducationItem`
- [x] **1.5** Create `Models/ArchitecturePrinciple.cs` — Icon, Title, Description
- [x] **1.6** Create `Models/ImpactItem.cs` — Icon, Title, Description, Metric
- [x] **1.7** Refactor existing `Models/Project.cs` — Add `Categories` list property for category-based filtering
- [x] **1.8** Create `Data/PortfolioData.cs` — Static data source with all case studies, capabilities, experience items, architecture principles, and impact items populated from resume
- [x] **1.9** Update `_Imports.razor` — Add `@using biggo29.github.io.Data`, cleaned up commented lines
- [x] **1.10** Verify build passes

---

## Phase 2 — Design System: CSS Variables, Tokens & Theme

> **Why second?** Every component needs consistent design tokens.  
> Setting these up before building components prevents rework.

- [x] **2.1** Create `wwwroot/css/variables.css` — 16 tokens: colors, typography (`--font-body`, `--font-mono`), spacing (`--section-space`, `--container`), radius (`--radius-sm/md/lg`)
- [x] **2.2** Import `variables.css` in `index.html` before `app.css`; added Inter Google Fonts preconnect link
- [x] **2.3** Audited `app.css` — identified dead blocks: `.page:not(.dark-mode)`, `.page:not(.dark-mode) .header`, `.theme-toggle`
- [x] **2.4** Removed dead rules: `.page:not(.dark-mode)` override, `.page:not(.dark-mode) .header`, `.theme-toggle` and `.theme-toggle:hover`
- [x] **2.5** Replaced `:root` block in `app.css` — legacy variable names now alias to design tokens (e.g. `--bg-primary: var(--bg)`)
- [x] **2.6** Dark theme consistency confirmed — light mode override removed, single dark palette throughout
- [x] **2.7** Updated `html, body` and `body` font-family to `var(--font-body)`; loading screen inline colors updated to new tokens
- [x] **2.8** Verify build passes

---

## Phase 3 — Shared Components

> **Why third?** Small reusable components that will be used inside every section.  
> Build these before the sections that consume them.

- [x] **3.1** Create `Components/Shared/SectionTitle.razor` — `Title` (required), `Subtitle` (optional); isolated CSS with design tokens
- [x] **3.2** Create `Components/Shared/PrimaryButton.razor` — `Text`, `Href`, `Target`, `Icon`, `AriaLabel`, `OnClick`; supports both `<a>` and `<button>` rendering
- [x] **3.3** Create `Components/Shared/SecondaryButton.razor` — same parameter API as PrimaryButton; outlined/ghost style
- [x] **3.4** Create `Components/Shared/TagBadge.razor` — `Text` (required); mono font, primary-soft background
- [x] **3.5** Create `Components/Shared/MetricChip.razor` — `Text` (required), `Icon` (optional); surface border, hover primary effect
- [x] **3.6** Isolated `.razor.css` files for all 5 components — all styles consume `variables.css` design tokens
- [x] **3.7** Updated `_Imports.razor` — added `@using biggo29.github.io.Components.Shared`; deferred `Components.Sections` to Phase 5
- [x] **3.8** Verify build passes

---

## Phase 4 — Navigation

> **Why fourth?** Navigation is the structural backbone of the SPA.  
> Must be in place before building sections so anchor links work.

- [x] **4.1** Rewrote `Shared/MainLayout.razor` — sticky `<header>`, `<nav>`, brand (`SS` monogram), nav links from tuple array, `<main>` wrapper; removed old `<div class="page">`
- [x] **4.2** Active section highlight via `initializeNavHighlight` JS — IntersectionObserver toggles `.active` class on `.nav-link` elements; first section pre-activated on load
- [x] **4.3** Refactored `wwwroot/js/site.js` — removed `DOMContentLoaded` and skill-bar animation; exported `initializeNavHighlight`, `initializeSectionObserver`, `scrollToSection`, `toggleBodyScroll`; all called from Blazor `OnAfterRenderAsync(firstRender)`
- [x] **4.4** Updated nav CSS in `app.css` — `.nav-brand`, `.nav-link`, `.nav-link.active`, `.nav-toggle`, `.nav-toggle-bar`, hamburger X-animation, mobile `.is-open` dropdown; `main { padding-top: 64px }`
- [x] **4.5** Verify build passes

---

## Phase 5 — Hero Section

> **Why fifth?** First impression. Sets the tone for the entire site.

- [x] **5.1** Created `Components/Sections/HeroSection.razor` — two-column grid: text left, stack panel right; uses `MetricChip`, `PrimaryButton`, `SecondaryButton`, `TagBadge` from Phase 3
- [x] **5.2** Positioning statement: _"I design scalable backend systems, distributed microservices, and enterprise APIs using .NET, Azure, and modern architecture practices."_
- [x] **5.3** Credibility chips: `⚡ 8+ Years Experience`, `🔗 30+ Microservices`, `🏆 WSIS Award 2021`, `👥 Technical Leadership`
- [x] **5.4** CTA buttons: `View Case Studies` (→ #case-studies), `Contact Me` (→ #contact), `Resume ↓` (→ files/ShoaibShahriar-Resume.pdf)
- [x] **5.5** `HeroSection.razor.css` — fully token-driven isolated CSS; stack panel with macOS window chrome; `clamp()` responsive font sizes; two-column collapses to single at 1100px; added `section[id] { scroll-margin-top: 64px }` to `app.css`
- [x] **5.6** Verify build passes

---

## Phase 6 — Selected Impact Section

> **Why sixth?** Quick proof of seniority, immediately below hero.

- [x] **6.1** Created `Components/Sections/SelectedImpactSection.razor` — `id="impact"`, uses `SectionTitle`, loops `PortfolioData.ImpactItems`
- [x] **6.2** Content sourced from `PortfolioData.ImpactItems` (set up in Phase 1): Enterprise Backend Engineering (15K+ users), Microservices Architecture (30+ services), WSIS Award 2021 (100M+ SIM holders), AI-Assisted Engineering (20% faster deployments)
- [x] **6.3** `SelectedImpactSection.razor.css` — 4-col → 2-col → 1-col responsive grid; metric badge uses `--secondary` green; hover border + subtle lift; `--surface` background for section rhythm
- [x] **6.4** Verify build passes

---

## Phase 7 — Case Studies Section (Most Critical)

> **Why seventh?** This replaces the generic project cards and is the **single most important section** for conveying senior-level credibility.

- [ ] **7.1** Create `Components/Sections/CaseStudiesSection.razor`
- [ ] **7.2** Create `Components/Shared/CaseStudyCard.razor` — Reusable card component consuming `CaseStudy` model
- [ ] **7.3** Populate 3 flagship case studies in `PortfolioData`:
  - **Case Study 1: UK eCommerce Platform (eSpares.co.uk)**
    - Role: Lead Software Engineer
    - Context: High-traffic UK eCommerce, Connect Distribution / Kingfisher PLC
    - Architecture: 30+ microservices, CQRS, NServiceBus, Clean Architecture, Azure DevOps
    - Outcome: 99.9% uptime, 20% faster deployments, £1M+ monthly sales, 15K+ daily users
    - Link: https://www.espares.co.uk/
  - **Case Study 2: CBVMP — National Biometric Verification Platform**
    - Role: Backend Engineer / Programmer
    - Context: BTRC, all telecom operators in Bangladesh
    - Architecture: Java, Servlet, Oracle, ELK Stack
    - Outcome: WSIS Award 2021, 100M+ SIM holders, 500 TPS, longest zero-downtime
    - Link: WSIS Prizes page
  - **Case Study 3: e-TIN Solutions — National Board of Revenue**
    - Role: Backend Engineer
    - Context: Tax compliance and e-TIN registration for NBR
    - Architecture: ASP.NET Core, SQL Server, RESTful APIs
    - Outcome: Integrated with multiple government stakeholders, increased tax compliance
    - Link: https://secure.incometax.gov.bd/
- [ ] **7.4** Category-based filtering (optional): All, .NET, Microservices, Public Sector
- [ ] **7.5** Card format: Title, Role badge, Context, Tech tags, Outcome, valid links only (no fake demo URLs)
- [ ] **7.6** CSS: Professional cards with hover effects, dark theme, clear hierarchy
- [ ] **7.7** Verify build passes

---

## Phase 8 — Architecture Principles Section

> **Why eighth?** Creates strong architect identity. Differentiator from mid-level portfolios.

- [ ] **8.1** Create `Components/Sections/ArchitecturePrinciplesSection.razor`
- [ ] **8.2** Display 5–6 principles in cards/grid from `PortfolioData`:
  - 🏗️ **Design for Change** — Systems should evolve easily with minimal friction
  - 📦 **Explicit Service Boundaries** — Clear contracts and ownership between services
  - ⚡ **CQRS Where Complexity Justifies It** — Separate read/write models for scalability
  - 📊 **Observability by Design** — Logging, metrics, and tracing from day one
  - 🔄 **Automation Over Manual Operations** — CI/CD pipelines and automated testing
  - 🔧 **Maintainability Over Shortcuts** — Long-term code health over quick fixes
- [ ] **8.3** Each card: icon, title, 1–2 sentence explanation
- [ ] **8.4** CSS: Clean grid, subtle borders, thoughtful spacing
- [ ] **8.5** Verify build passes

---

## Phase 9 — Capabilities Section (Replace Skill Bars)

> **Why ninth?** Replaces the credibility-hurting skill percentage bars with professional grouped capabilities.

- [ ] **9.1** Create `Components/Sections/CapabilitiesSection.razor`
- [ ] **9.2** Remove all skill percentage bars and `Skill` model usage
- [ ] **9.3** Display grouped capability categories from `PortfolioData` using `CapabilityGroup` model:
  - **Core Backend Development**: C#, ASP.NET Core, RESTful APIs, EF Core, LINQ, SQL Server
  - **Architecture & Patterns**: Clean Architecture, CQRS, Event-Driven, Microservices, DDD, Async Programming
  - **API & Security**: Swagger/OpenAPI, JWT, OAuth2, RBAC, Secure API Design
  - **Cloud & Delivery**: Azure DevOps, CI/CD Pipelines, Docker, Observability, Monitoring
  - **Quality Engineering**: TDD, XUnit, MSpec, Moq, Code Reviews, 99%+ Coverage
  - **AI-Assisted Development**: GitHub Copilot, ChatGPT, Claude, Gemini, Prompt Engineering
  - **Leadership & Collaboration**: Technical Planning, Mentoring, Stakeholder Communication, Agile/Scrum
- [ ] **9.4** UI format: grouped cards with `TagBadge` components for each item
- [ ] **9.5** CSS: Card grid, clean layout, no progress bars or percentages
- [ ] **9.6** Verify build passes

---

## Phase 10 — Experience Timeline Section

> **Why tenth?** Shows career growth and leadership progression.

- [ ] **10.1** Create `Components/Sections/ExperienceTimelineSection.razor`
- [ ] **10.2** Timeline or stacked cards for 4 roles from `PortfolioData`:
  - **Lead Software Engineer** — EchoLogyx Ltd. (Aug 2024 – Sep 2025)
    - Led 8–10 engineers, backend services for eSpares.co.uk, AI-assisted workflows
  - **Senior Software Engineer** — EchoLogyx Ltd. (Nov 2020 – Jul 2024)
    - 30+ microservices, CQRS, 99% test coverage, SQL Server optimization
  - **Programmer** — Synesis IT PLC (Dec 2017 – Nov 2020)
    - WSIS Award CBVMP, e-TIN for NBR, ELK Stack monitoring
  - **.NET Developer** — RMG Networks (Jan 2017 – Dec 2017)
    - Desktop applications, digital signage, C#, WCF, WPF
- [ ] **10.3** Each entry: Role, Company, Duration, Impact summary, Tech tags
- [ ] **10.4** Add Education at bottom:
  - M.Sc. CSE — Jahangirnagar University (2018–2019)
  - B.Sc. CS — AIUB (2013–2016)
- [ ] **10.5** CSS: Elegant timeline with vertical line or stacked cards, responsive
- [ ] **10.6** Verify build passes

---

## Phase 11 — GitHub Section (Compact)

> **Why eleventh?** Supporting credibility, not a primary section.

- [ ] **11.1** Create `Components/Sections/GithubSection.razor`
- [ ] **11.2** Keep it compact — short intro + GitHub profile link
- [ ] **11.3** Optionally show 2–3 selected/pinned repositories instead of stat images
- [ ] **11.4** If keeping stat images, ensure they fit the dark theme (use `tokyonight` or matching theme)
- [ ] **11.5** Remove GitHub Streak image if it adds clutter
- [ ] **11.6** CSS: Compact layout, secondary visual weight
- [ ] **11.7** Verify build passes

---

## Phase 12 — Contact Section (Fix Fake Form)

> **Why twelfth?** The current form fakes sending — a trust issue that must be fixed.

- [ ] **12.1** Create `Components/Sections/ContactSection.razor`
- [ ] **12.2** Remove the fake contact form that shows success without sending
- [ ] **12.3** Replace with professional contact CTA:
  - 📧 Email: `mailto:shoaibshahriar29@gmail.com`
  - 💼 LinkedIn: `https://linkedin.com/in/biggo29`
  - 🐙 GitHub: `https://github.com/biggo29`
  - 📝 Medium: `https://medium.com/@biggo29`
- [ ] **12.4** Add professional tagline: _"Open to senior backend, platform engineering, and architecture-focused opportunities."_
- [ ] **12.5** Optionally add a Download Resume button
- [ ] **12.6** CSS: Clean layout, clear links, no fake interactivity
- [ ] **12.7** Verify build passes

---

## Phase 13 — Page Assembly: Wire Everything Into Home.razor

> **Why thirteenth?** All components are built — now assemble the page.

- [ ] **13.1** Refactor `Pages/Home.razor` — Replace all inline sections with component references:
  ```razor
  <HeroSection />
  <SelectedImpactSection />
  <CaseStudiesSection />
  <ArchitecturePrinciplesSection />
  <CapabilitiesSection />
  <ExperienceTimelineSection />
  <GithubSection />
  <ContactSection />
  ```
- [ ] **13.2** Remove all old inline `@code {}` data (projects list, skills list, filter logic, contact form)
- [ ] **13.3** Remove old `ContactForm` class and `Skill` model references
- [ ] **13.4** Remove old project modal code
- [ ] **13.5** Ensure each section has proper `id` for anchor navigation
- [ ] **13.6** Verify build passes

---

## Phase 14 — JavaScript & Blazor Lifecycle Fixes

> **Why fourteenth?** JS interop must work correctly with Blazor's rendering lifecycle.

- [ ] **14.1** Refactor `site.js`:
  - Remove `DOMContentLoaded` listener
  - Export functions: `initializeObservers`, `initializeNavHighlight`, `scrollToSection`
- [ ] **14.2** Call JS initialization from `OnAfterRenderAsync(firstRender)` in `MainLayout.razor` or `Home.razor`
- [ ] **14.3** Add Intersection Observer for section entrance animations (subtle fade-in only)
- [ ] **14.4** Add scroll-based active nav highlight
- [ ] **14.5** Remove skill bar animation JS (skill bars are being removed)
- [ ] **14.6** Verify build passes

---

## Phase 15 — Accessibility

> **Why fifteenth?** Professional sites must be accessible. Quick wins with high impact.

- [ ] **15.1** Add semantic landmarks: `<nav>`, `<main>`, `<footer>`, `<section>`, `<header>`
- [ ] **15.2** Verify heading hierarchy: single `<h1>` (name), then `<h2>` per section, `<h3>` for subsections
- [ ] **15.3** Add `aria-label` to all icon-only links (GitHub, LinkedIn, Email icons)
- [ ] **15.4** Add keyboard-visible `:focus-visible` styles
- [ ] **15.5** Add `@media (prefers-reduced-motion: reduce)` to disable animations
- [ ] **15.6** Ensure color contrast meets WCAG AA (especially muted text on dark bg)
- [ ] **15.7** Verify build passes

---

## Phase 16 — SEO & Metadata Final Pass

> **Why sixteenth?** Polish metadata after all content is finalized.

- [ ] **16.1** Verify `index.html` title reflects: "Lead Software Engineer | Backend APIs | .NET"
- [ ] **16.2** Verify `meta description` is accurate and under 160 characters
- [ ] **16.3** Verify `og:image` exists at `wwwroot/images/og-image.png` (create if missing)
- [ ] **16.4** Add canonical URL: `<link rel="canonical" href="https://biggo29.github.io/" />`
- [ ] **16.5** Verify favicon exists at `wwwroot/favicon.png`
- [ ] **16.6** Verify Twitter Card and Open Graph metadata are complete
- [ ] **16.7** Verify build passes

---

## Phase 17 — Cleanup & Final Polish

> **Why last?** Remove all scaffolding, unused files, and verify everything works end-to-end.

- [ ] **17.1** Remove `UPDATE_SUMMARY.md` (temporary file)
- [ ] **17.2** Remove unused SVG project images if replaced by case study design (`project-healthcare.svg`, `project-analytics.svg`, `project-api-gateway.svg`)
- [ ] **17.3** Clean up old `Models/Project.cs` if fully replaced by `CaseStudy.cs`
- [ ] **17.4** Remove unused `Skill` class from models
- [ ] **17.5** Remove `Shared/MainLayout.razor.css` if styles moved to main CSS
- [ ] **17.6** Remove dead CSS rules from `app.css`
- [ ] **17.7** Final build verification: `dotnet build --configuration Release`
- [ ] **17.8** Test locally: `dotnet run` — verify all sections, navigation, links, responsiveness
- [ ] **17.9** Test mobile responsiveness (Chrome DevTools)
- [ ] **17.10** Push to GitHub, verify GitHub Actions deploys successfully
- [ ] **17.11** Verify live site at `https://biggo29.github.io/`

---

## Summary: Phase Execution Order

| Phase | Section | Priority | Estimated Tasks |
|-------|---------|----------|-----------------|
| 1 | Foundation: Models & Data | 🔴 Critical | 10 |
| 2 | Design System: CSS & Theme | 🔴 Critical | 8 |
| 3 | Shared Components | 🔴 Critical | 7 |
| 4 | Navigation | 🟡 High | 5 |
| 5 | Hero Section | 🟡 High | 6 |
| 6 | Selected Impact Section | 🟡 High | 4 |
| 7 | Case Studies Section | 🔴 Critical | 7 |
| 8 | Architecture Principles | 🟡 High | 5 |
| 9 | Capabilities (Replace Skill Bars) | 🔴 Critical | 6 |
| 10 | Experience Timeline | 🟡 High | 6 |
| 11 | GitHub Section | 🟢 Medium | 7 |
| 12 | Contact Section (Fix Fake Form) | 🔴 Critical | 7 |
| 13 | Page Assembly | 🔴 Critical | 6 |
| 14 | JS & Lifecycle Fixes | 🟡 High | 6 |
| 15 | Accessibility | 🟢 Medium | 7 |
| 16 | SEO & Metadata | 🟢 Medium | 7 |
| 17 | Cleanup & Polish | 🟡 High | 11 |
| | **TOTAL** | | **108 tasks** |

---

## Current Status

**Phase 1**: ✅ Complete — commit `2003a48`
**Phase 2**: ✅ Complete — commit `f513ea3`
**Phase 3**: ✅ Complete — commit `25c85f8`
**Phase 4**: ✅ Complete — commit `ce934ff`
**Phase 5**: ✅ Complete — commit `e09db7f`
**Phase 6**: ✅ Complete — commit `a85ca6c`
**Phase 7**: ⬜ Not Started  
**Phase 8**: ⬜ Not Started  
**Phase 9**: ⬜ Not Started  
**Phase 10**: ⬜ Not Started  
**Phase 11**: ⬜ Not Started  
**Phase 12**: ⬜ Not Started  
**Phase 13**: ⬜ Not Started  
**Phase 14**: ⬜ Not Started  
**Phase 15**: ⬜ Not Started  
**Phase 16**: ⬜ Not Started  
**Phase 17**: ⬜ Not Started  

**Overall Progress**: 0 / 108 tasks completed

---

> **Ready to start? Say "Execute Phase 1" and I will implement it.**
