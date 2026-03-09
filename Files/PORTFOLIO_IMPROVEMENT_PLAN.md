# Blazor Portfolio Improvement Plan
Author: Shoaib Shahriar  
Target: Professional Senior / Solution Architect Portfolio  
Tech: Blazor WebAssembly / Blazor SPA

---

# Objective

Transform the current Blazor portfolio website into a **professional senior/architect-level personal brand site** with a **dark engineering theme**.

The portfolio should communicate:

- Senior backend expertise
- Solution architecture thinking
- Real-world delivery impact
- Technical leadership
- Clean professional UI

The goal is to make recruiters, CTOs, and engineering managers immediately feel:

> "This engineer has built and led real production systems."

---

# Current Strengths

The project already has several good foundations:

- Dark theme direction
- Blazor SPA architecture
- Structured project cards
- Skills grouped logically
- GitHub integration
- SEO metadata
- Responsive layout

These provide a good base for further improvement.

---

# Major Issues Identified

## 1. Portfolio feels generic

Many projects appear like **template enterprise projects** instead of real production systems.

Senior portfolios should highlight:

- real systems
- real responsibilities
- measurable outcomes

---

## 2. Skill percentages reduce credibility

Example:
C# & .NET — 95%
Cloud — 88%


Senior engineers rarely rate themselves with percentages.

This feels junior or template-based.

---

## 3. Placeholder demo links

Example:
demo.example.com


Dead links reduce credibility.

If a demo does not exist, remove the demo button.

---

## 4. Fake contact form

The contact form currently displays a success message but does not send anything.

This creates trust issues.

Options:

- use mailto link
- integrate Formspree
- connect to API endpoint
- link LinkedIn

---

## 5. Project filtering logic is fragile

Current code uses exact matching:
projects.Where(p => p.Technologies.Contains(selectedFilter))


This causes problems such as:
.NET filter may not match ".NET 8"
Azure filter may not match "Azure Functions"


Filtering should use **categories instead of technology names**.

---

## 6. Inconsistent design system

CSS contains styles for:

- navigation
- theme toggle
- header

But these elements are not fully implemented in the UI.

This suggests leftover or unused styling.

---

## 7. Too many portfolio clichés

Examples:

- skill percentage bars
- generic project cards
- GitHub stats as a primary section
- exaggerated claims like "50+ projects delivered"

Senior portfolios focus on **impact and architecture** instead.

---

# Strategic Direction

Move the portfolio from:
developer portfolio


to:
technical leadership showcase


Focus on:

- architecture
- engineering decisions
- system design
- delivery impact

---

# Recommended Portfolio Structure

## Page Layout
Hero Section
Selected Impact
Case Studies
Architecture Principles
Technical Capabilities
Experience Timeline
GitHub / Open Source
Contact


---

# 1. Hero Section Improvements

Current hero is acceptable but should be stronger.

### Suggested structure

Left side:
Name
Professional Title
Positioning Statement
Credibility Chips
Call-to-action buttons


Example:
Shoaib Shahriar
Lead Software Engineer | Backend Architect

I design scalable backend systems, distributed microservices,
and high-performance APIs using .NET and Azure.


### Credibility chips

Example:
8+ Years Experience
30+ Microservices Ecosystems
WSIS Award 2021 Project
Enterprise Platform Delivery


### CTA buttons
View Case Studies
Download Resume
Contact Me


Right side visual:

- architecture diagram
- code editor style card
- terminal style block

---

# 2. Replace Generic Projects With Real Case Studies

Instead of 5+ generic cards, show **3 flagship case studies**.

Recommended examples:

### Case Study 1

UK eCommerce Platform

Role:
Lead Software Engineer

Responsibilities:

- system analysis
- architecture design
- API development
- team leadership
- release coordination

Architecture:

- microservices
- CQRS
- NServiceBus
- Azure DevOps
- SQL Server

Outcome:

- high scalability
- improved delivery pipeline
- production reliability

---

### Case Study 2

CBVMP (National E-Governance System)

Role:
Backend Engineer

Context:

- biometric verification monitoring platform
- government scale infrastructure

Achievement:

WSIS Award 2021

Technologies:

- .NET
- Oracle
- enterprise reporting

---

### Case Study 3

Advanced REST API Architecture Lab

Portfolio project showing:

- rate limiting
- distributed caching
- retry policies
- async processing
- resilience patterns

---

# 3. Add Architecture Principles Section

This section creates strong **architect vibe**.

Example:

### Engineering Principles

**Design for change**

Systems should evolve easily.

**Explicit service boundaries**

Clear contracts between services.

**CQRS where complexity requires it**

Separate reads and writes for scalability.

**Observability by design**

Logging, metrics, tracing.

**Automation over manual operations**

CI/CD pipelines and automated testing.

---

# 4. Replace Skill Percentages

Instead of:
C# — 95%
Azure — 88%


Use **capability groups**.

Example:

## Core Backend Development

- C#
- ASP.NET Core
- Web APIs
- Entity Framework Core

## Architecture Patterns

- Clean Architecture
- CQRS
- Event-driven systems
- Microservices

## Cloud & DevOps

- Azure
- CI/CD pipelines
- Docker
- Azure DevOps

## Quality Engineering

- TDD
- Integration testing
- automated pipelines

---

# 5. Leadership & Impact Section

Important for senior engineers.

Example content:
Led backend engineering initiatives for enterprise platforms.

Conducted architecture discussions and technical planning.

Guided engineers through code reviews and design improvements.

Collaborated with product and business stakeholders.

Maintained high engineering standards through testing and automation.


---

# 6. Improve Dark Theme Design

Current theme is good but needs refinement.

Recommended palette:
Background: #0f172a
Surface: #1e293b
Accent Primary: #3b82f6
Accent Secondary: #22c55e
Text: #e2e8f0
Muted Text: #94a3b8


Design style inspiration:

- GitHub dark theme
- VS Code dark
- Vercel UI
- Linear

Avoid overly bright neon colors.

---

# 7. Navigation Improvements

Add sticky navigation.

Example sections:
Home
Case Studies
Architecture
Skills
Experience
GitHub
Contact


Navigation should scroll smoothly to sections.

---

# 8. Improve Filtering Logic

Update project model.

Example:

```csharp
public class Project
{
    public string Title { get; set; } = "";
    public List<string> Technologies { get; set; } = new();
    public List<string> Categories { get; set; } = new();
}
Example categories:
DotNet
Microservices
Cloud
Blazor
Architecture
PublicSector

Filtering logic:
private List<Project> FilteredProjects =>
    selectedFilter == "All"
        ? projects
        : projects.Where(p => p.Categories.Contains(selectedFilter)).ToList();

9. Replace Fake Contact Form

Options:

Option 1

Simple email button: mailto:shoaibshahriar29@gmail.com

Option 2

LinkedIn contact

Option 3

Formspree integration

10. Remove Placeholder Links

Remove any links such as:

demo.example.com

If demo does not exist, show:

View Code
View Architecture
11. Blazor Lifecycle Improvements

Avoid relying solely on:

DOMContentLoaded

For JS initialization, use:

OnAfterRenderAsync(firstRender)

Then call JS interop.

12. Clean Unused CSS

Remove unused classes related to:

unused headers

unused theme toggles

legacy layout rules

Keep stylesheet minimal and intentional.

13. Accessibility Improvements

Add:

aria-label for icons

semantic landmarks

keyboard navigation support

visible focus states

reduced motion support

14. SEO Improvements

Verify:

og:image exists
meta description present
canonical URL
structured metadata

Add:

Download Resume
LinkedIn
GitHub
15. Content Improvements

Emphasize:

architecture
delivery impact
leadership
system design

Reduce:

buzzwords
self ratings
generic claims
Final Target Impression

Current site impression:

good developer portfolio

Target impression:

experienced lead engineer
who designs and delivers real systems
Highest Priority Tasks

Replace generic projects with real case studies

Remove fake demo and contact behavior

Replace skill percentages

Add architecture principles section

Improve hero section

Implement proper navigation

Improve filtering logic

Clean unused CSS

refine dark theme design

add leadership and impact section

End Goal

A portfolio that communicates:

Senior Backend Engineer
System Designer
Technical Leader
Architecture Thinker

rather than simply:

Software Developer