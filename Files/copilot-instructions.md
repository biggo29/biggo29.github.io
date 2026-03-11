# GitHub Copilot Implementation Instructions
Project: Blazor Single Page Portfolio  
Owner: Shoaib Shahriar  
Goal: Refactor the existing portfolio into a professional **senior / solution architect / technical leadership** portfolio with a **dark engineering theme**.

---

# Mission

Refactor the current Blazor SPA portfolio so that it feels like the personal site of a:

- Lead Software Engineer
- Senior Backend Engineer
- Solution Architect
- Technical Leader

The final portfolio should communicate:

- real production experience
- system design thinking
- engineering leadership
- architecture mindset
- professional frontend quality

The UI should feel inspired by:

- GitHub dark theme
- VS Code dark
- Linear
- Vercel

Avoid flashy or gamer-like neon effects.

---

# General Implementation Rules

## 1. Preserve technology stack

- Keep the project in Blazor
- Keep it as a single page application
- Reuse existing project structure where practical
- Improve, refactor, and modularize instead of rewriting blindly

## 2. Create reusable components

Refactor the homepage into reusable Blazor components.

Create components for:

- `HeroSection.razor`
- `SelectedImpactSection.razor`
- `CaseStudiesSection.razor`
- `ArchitecturePrinciplesSection.razor`
- `CapabilitiesSection.razor`
- `ExperienceTimelineSection.razor`
- `GithubSection.razor`
- `ContactSection.razor`
- `SectionTitle.razor`
- `PrimaryButton.razor`
- `SecondaryButton.razor`
- `TagBadge.razor`
- `MetricChip.razor`
- `CaseStudyCard.razor`

If a shared components folder does not exist, create one.

Suggested folders:

```text
Components/
  Shared/
  Sections/
Models/
Data/
Services/
wwwroot/css/
wwwroot/js/


Page Structure Requirements

The homepage should follow this order:

1. Hero
2. Selected Impact
3. Case Studies
4. Architecture Principles
5. Technical Capabilities
6. Experience Timeline
7. GitHub / Open Source
8. Contact

Use anchor navigation for these sections.

Each section must have:

a section id

strong spacing

clean alignment

readable typography

subtle entrance animation only if tasteful

Visual Design Instructions
Theme

Use a dark engineering theme.

Recommended palette:

--bg: #0b1220;
--surface: #111827;
--surface-2: #1f2937;
--border: #334155;
--text: #e5e7eb;
--muted: #94a3b8;
--primary: #3b82f6;
--primary-soft: rgba(59, 130, 246, 0.12);
--secondary: #22c55e;
--danger: #ef4444;
--shadow: rgba(0, 0, 0, 0.35);
Typography

Use a professional UI font stack for body text and optionally a monospace font for badges, chips, labels, or code-style elements.

Suggested:

Body: Inter, Segoe UI, system-ui, sans-serif

Mono accents: Consolas, JetBrains Mono, monospace

Style Guidelines

clean cards

soft borders

subtle shadows

no excessive glow

no overuse of gradients

clear spacing

desktop-first polish with responsive behavior

Avoid:

giant rounded cartoon buttons

excessive animations

skill progress bars

noisy backgrounds

fake terminal gimmicks everywhere

Navigation Instructions

Implement a professional sticky top navigation.

Requirements

sticky/fixed top navbar

transparent or blurred dark background

active section highlight on scroll

smooth scroll to section

mobile responsive menu

Suggested nav items:

Home

Impact

Case Studies

Architecture

Skills

Experience

GitHub

Contact

If current CSS contains old/unused nav code, refactor or replace it cleanly.

Hero Section Instructions

Create HeroSection.razor.

Purpose

The hero should immediately communicate:

identity

level

specialization

credibility

Required content

Display:

Name: Shoaib Shahriar

Title: Lead Software Engineer | Backend Architect

Strong positioning statement

3–4 credibility chips

2–3 CTA buttons

Suggested positioning statement

Use a professional variation of this:

I design scalable backend systems, distributed microservices, and enterprise APIs using .NET, Azure, and modern architecture practices.

Suggested credibility chips

8+ Years Experience

Enterprise Backend Systems

Microservices & CQRS

Technical Leadership

CTA buttons

View Case Studies

Download Resume

Contact Me

Hero visual

On the right side, instead of a generic portrait-heavy layout, build a professional engineering visual such as:

architecture-style info panel

code-editor inspired summary card

system metrics / stack panel

Example content:

.NET / ASP.NET Core

Microservices

Azure DevOps

SQL Server

CQRS

Clean Architecture

Do not make it look gimmicky.

Selected Impact Section Instructions

Create SelectedImpactSection.razor.

Purpose

Provide quick proof of seniority and impact.

Content style

Use 3–4 compact cards or metric blocks.

Examples:

Led backend engineering for enterprise commerce systems

Worked across scalable multi-service architectures

Contributed to award-winning government platform

Delivered production-grade APIs and platform improvements

Each card should contain:

short title

1–2 sentence description

optionally an icon

Avoid fake vanity metrics unless backed by real portfolio content.

Case Studies Section Instructions

Create CaseStudiesSection.razor.

This is the most important section.

Replace generic project cards with real flagship case studies.

Minimum number of case studies

At least 3.

Suggested case studies
1. UK eCommerce Platform

Use the user’s real enterprise experience.

Content should highlight:

role as lead/senior engineer

scalable commerce ecosystem

microservices

CQRS

SQL Server

Azure DevOps

code quality / testing / delivery

2. CBVMP / National E-Governance Platform

Highlight:

enterprise/public sector system

backend engineering

scale and reliability

award relevance

3. Advanced REST API / Architecture Project

Use as an architecture showcase project.

Highlight:

API resilience

distributed patterns

modern .NET practices

caching / retry / async workflows

Card/content format

Each case study card must include:

Title

Role

Context

Responsibilities

Architecture / Tech Stack

Outcome / Impact

Links (only if real)

Important rules

Do not use fake demo URLs

If a live demo does not exist, show only valid links

Prefer “View Code”, “View Details”, or “Architecture Summary”

Keep descriptions outcome-oriented

Architecture Principles Section Instructions

Create ArchitecturePrinciplesSection.razor.

Purpose

Give strong architect vibe.

Required content

Display 4–6 architecture principles in cards or a grid.

Suggested principles:

Design for change

Explicit service boundaries

CQRS where complexity justifies it

Observability by design

Automation over manual operations

Maintainability over short-term shortcuts

Each principle should have:

title

1–2 sentence explanation

This section should feel thoughtful and mature.

Capabilities Section Instructions

Create CapabilitiesSection.razor.

Replace current skill percentages

Do not use:

progress bars

self-rated percentages

circular skill meters

Use grouped capability categories

Suggested categories:

Core Backend Development

C#

ASP.NET Core

REST APIs

Entity Framework / EF Core

SQL Server

Architecture & Patterns

Clean Architecture

CQRS

Event-driven systems

Microservices

Domain-focused design

Cloud & Delivery

Azure

Azure DevOps

CI/CD

Docker

release workflow

Quality Engineering

TDD

integration testing

unit testing

maintainable code

code reviews

Leadership & Collaboration

technical planning

mentoring

code review

stakeholder communication

delivery coordination

UI format

Use:

grouped cards

tag badges

concise descriptions

Experience Timeline Section Instructions

Create ExperienceTimelineSection.razor.

Purpose

Show career growth and leadership progression.

Suggested format

Timeline or stacked cards for roles:

Lead Software Engineer — EchoLogyx Ltd.

Senior Software Engineer — EchoLogyx Ltd.

Programmer — Synesis IT

.NET Developer — RMG Networks

For each role include:

company

duration

short impact summary

major technologies used

Make the timeline elegant and readable.

GitHub Section Instructions

Create GithubSection.razor.

Rules

GitHub can support credibility, but should not dominate the page

keep it visually compact

if existing GitHub stats are used, ensure they fit the dark theme and do not overwhelm the section

Suggested content:

short intro

GitHub profile link

selected repositories

optional stats as secondary content

Prefer selected repositories over decorative stat images.

Contact Section Instructions

Create ContactSection.razor.

Important

Do not keep a fake contact form.

If the form does not really send data, replace it.

Preferred options

Choose one of the following:

Option A

Simple contact CTA with:

email link

LinkedIn

GitHub

Option B

A real integrated form if implementation is valid

If using a form:

validate fields properly

connect to a real backend or service

show real success/error states

Content tone

Professional and direct.

Example:

Open to senior backend, platform engineering, and architecture-focused opportunities.

Data Modeling Instructions

Create or refactor models for structured content.

Suggested models:

public class CaseStudy
{
    public string Title { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Context { get; set; } = string.Empty;
    public string Responsibilities { get; set; } = string.Empty;
    public string Architecture { get; set; } = string.Empty;
    public string Outcome { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
    public List<string> Categories { get; set; } = new();
    public string? RepositoryUrl { get; set; }
    public string? LiveUrl { get; set; }
    public string? DetailsUrl { get; set; }
}
public class CapabilityGroup
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<string> Items { get; set; } = new();
}
public class ExperienceItem
{
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
}

Create a small static data source or service for these.

Suggested:

Data/PortfolioData.cs

or

Services/PortfolioContentService.cs
Filtering Instructions

If project/case study filtering remains in the UI, refactor it.

Do not filter by raw technology strings only

Avoid fragile logic like:

projects.Where(p => p.Technologies.Contains(selectedFilter))
Use category-based filtering

Example categories:

DotNet

Microservices

Cloud

Architecture

PublicSector

Blazor

APIs

Use normalized matching.

Blazor Implementation Rules
Component architecture

keep components small and readable

move repeated UI into shared components

avoid giant monolithic pages

Lifecycle

If JS initialization is needed, prefer:

OnAfterRenderAsync(bool firstRender)

Do not rely only on DOMContentLoaded for Blazor-rendered UI.

Code quality

use clear naming

keep parameter APIs clean

avoid unnecessary state

keep markup semantic

CSS Refactor Instructions

Refactor the CSS into cleaner sections.

Suggested CSS structure:

wwwroot/css/
  app.css
  variables.css
  layout.css
  components.css
  sections.css
  utilities.css

If too much restructuring is unnecessary, at least separate concerns logically.

Required CSS goals

remove dead styles

remove unused theme toggle styles if toggle is not implemented

make cards consistent

unify spacing scale

unify border radius

unify shadows

ensure readable contrast

Recommended design tokens

Create reusable spacing, radius, and container rules.

Example:

:root {
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --container: 1200px;
  --section-space: 96px;
}
Accessibility Instructions

Implement proper accessibility.

Requirements

semantic sectioning (section, nav, header, main, footer)

proper heading hierarchy

aria-label for icon-only links

keyboard focus states

adequate color contrast

reduced motion consideration

SEO Instructions

Improve metadata and social sharing.

Requirements

page title reflects senior backend / architect branding

valid meta description

valid Open Graph image

canonical URL

favicon check

social preview readiness

Suggested title direction:

Shoaib Shahriar | Lead Software Engineer | .NET Backend Architect

Suggested description direction:

Lead Software Engineer specializing in .NET, ASP.NET Core, microservices, Azure, and scalable backend architecture.
Content Tone Instructions

All content should sound:

professional

confident

evidence-based

mature

concise

Avoid:

buzzword stuffing

exaggerated claims

junior-style self-scoring

fake metrics

generic filler text

Preferred content style:

what was built

what problem was solved

what responsibility was owned

what architecture was used

what outcome was achieved

Cleanup Tasks

Perform these cleanup tasks during refactor:

remove placeholder demo links

remove fake form behavior

remove skill percentage UI

remove unused CSS

remove any dead JS

remove sections that add noise but not credibility

verify all links

verify responsive layout

verify dark theme consistency

ensure mobile nav works properly

Definition of Done

The refactor is complete when:

the homepage is componentized

the design feels senior and polished

the dark theme is consistent

generic project cards are replaced with real case studies

skill percentages are gone

fake demo/contact behavior is gone

architecture and leadership sections are visible

the layout is responsive

the code is clean and maintainable

Final UX Goal

A recruiter or hiring manager should land on the site and immediately think:

This is a serious backend engineer and technical leader with real architecture experience.

Not:

This is a generic portfolio template.

Optional Nice-to-Have Enhancements

If time permits, implement these after the core refactor:

scrollspy active nav state

subtle reveal-on-scroll animation

downloadable resume button

selected certifications section

writing/articles section

“currently open to opportunities” badge

architecture diagram illustration in hero

polished footer with quick links

Priority Order for Copilot

Implement in this order:

componentize homepage

rebuild hero

add selected impact

replace projects with case studies

add architecture principles

replace skills with capabilities

add experience timeline

refactor contact section

improve nav

clean CSS / JS / unused code