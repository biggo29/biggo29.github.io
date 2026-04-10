# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies and build
dotnet restore
dotnet build

# Run locally (HTTP: localhost:5135, HTTPS: localhost:7022)
dotnet run

# Publish for production
dotnet publish biggo29.github.io.csproj --configuration Release --output ./publish
```

There are no automated tests in this project.

## Architecture

This is a **Blazor WebAssembly** portfolio site deployed to GitHub Pages via GitHub Actions.

### Key Structure

- **`Pages/Home.razor`** — Single routable page (`@page "/"`); composes all section components in order
- **`Components/Sections/`** — One standalone Razor component per portfolio section (Hero, Impact, CaseStudies, Architecture, Experience, GitHub, Writing/Medium, Contact)
- **`Components/Shared/`** — Reusable UI primitives (buttons, cards, badges)
- **`Shared/MainLayout.razor`** — App shell: nav header, section layout, footer, back-to-top button
- **`Data/PortfolioData.cs`** — All static portfolio content (impact items, case studies, principles, experience). This is the primary place to update content.
- **`Models/`** — DTOs matching `PortfolioData.cs` shapes (`ImpactItem`, `CaseStudy`, etc.)
- **`Services/MediumService.cs`** — Fetches Medium articles via RSS2JSON API, configured via `appsettings.json` (`MediumSettings`)
- **`wwwroot/css/variables.css`** — CSS custom properties for the theme system
- **`wwwroot/js/site.js`** — Theme toggle, carousel, scroll animations, mobile nav; all driven by vanilla JS

### Navigation & Routing

The site is a single-page app with hash-based section navigation (`#home`, `#impact`, `#case-studies`, `#architecture`, `#experience`, `#github`, `#writing`, `#contact`). There is no server-side routing. `App.razor` sets up the Blazor client-side router with a fallback 404 page; the CI pipeline generates `404.html` for GitHub Pages SPA fallback.

### Theme System

Dark/light mode uses a `data-theme` attribute on the `<html>` element, persisted to `localStorage`. Theme initialization is in `site.js` (runs before render to prevent FOUC). All colors are CSS variables defined in `variables.css`.

### CI/CD

`.github/workflows/deploy.yml` builds on push to `main` or `feature/portfolio-redesign-theme`, injects the Medium API key from GitHub secrets via `jq`, and publishes to the `gh-pages` branch. The `appsettings.Development.json` file is gitignored — use it for local API key overrides.
