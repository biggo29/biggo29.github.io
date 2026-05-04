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

# Regenerate OG social preview image (after editing og-settings.json)
powershell -ExecutionPolicy Bypass -File .\generate-og-image.ps1
```

There are no automated tests in this project.

## Architecture

This is a **Blazor WebAssembly** portfolio site deployed to GitHub Pages via GitHub Actions.

### Key Structure

- **`Pages/Home.razor`** — Single routable page (`@page "/"`); composes all section components in order
- **`Components/Sections/`** — One standalone Razor component per portfolio section. Active sections (in render order): `HeroSection`, `MetricsMarqueeSection`, `SelectedImpactSection`, `CaseStudiesSection`, `ArchitecturePrinciplesSection`, `ExperienceTimelineSection`, `RecommendationsSection`, `GithubSection`, `CertificatesSection`, `MediumArticlesSection`, `ContactSection`. `CapabilitiesSection` exists but is not currently rendered.
- **`Components/Shared/`** — Reusable UI primitives (buttons, cards, badges)
- **`Shared/MainLayout.razor`** — App shell: nav header, section layout, footer, back-to-top button. Calls all JS initializers on first render.
- **`Shared/AppIcons.cs`** — SVG icon registry. Use `AppIcons.Get("name")` for dynamic lookup or `AppIcons.IconName` as a static `MarkupString`. All icons size via `font-size` on the parent.
- **`Data/PortfolioData.cs`** — All static portfolio content (impact items, case studies, principles, experience). Primary place to update content.
- **`Models/`** — DTOs matching `PortfolioData.cs` shapes (`ImpactItem`, `CaseStudy`, etc.)
- **`Services/MediumService.cs`** — Fetches Medium articles via RSS2JSON API, configured via `appsettings.json` (`MediumSettings`)
- **`wwwroot/css/variables.css`** — CSS custom properties for the theme system
- **`wwwroot/js/site.js`** — Theme toggle, carousel, scroll animations, mobile nav, and all progressive enhancement hooks; all driven by vanilla JS

### CSS Architecture

Each Razor component has a paired **scoped stylesheet** (`ComponentName.razor.css`). These are compiled into CSS isolation — selectors are automatically scoped to that component's DOM. Global styles live in `wwwroot/css/app.css` and `wwwroot/css/enhancements.css`. Theme tokens are in `variables.css`.

### JS Interop

`MainLayout.razor` calls a sequence of named `window.*` functions from `site.js` after first render (via `IJSRuntime`). All enhancements are **progressive** — they fail gracefully if the element isn't present. The theme is initialized by an inline script in `index.html` before Blazor loads to prevent FOUC; `initializeTheme()` in `site.js` just reads back the already-set attribute so Blazor can sync its state.

### Navigation & Routing

Single-page app with hash-based section navigation. Hash IDs: `#home`, `#impact`, `#case-studies`, `#architecture`, `#experience`, `#recommendations`, `#github`, `#certificates`, `#writing`, `#contact`. `App.razor` sets up the Blazor client-side router with a fallback 404 page; the CI pipeline generates `404.html` for GitHub Pages SPA fallback.

### Theme System

Dark/light mode uses a `data-theme` attribute on `<html>`, persisted to `localStorage`. All colors are CSS variables in `variables.css`. Theme defaults to dark.

### OG Image

`og-settings.json` controls the social preview image (`wwwroot/images/og-social-preview.png`). Edit it and run `generate-og-image.ps1` to regenerate.

### Local Development

Copy `wwwroot/appsettings.json` to `wwwroot/appsettings.Development.json` (gitignored) and add your `MEDIUM_API_KEY` there for local article fetching.

### CI/CD

`.github/workflows/deploy.yml` builds on push to `main` or `feature/portfolio-redesign-theme`, injects all Medium settings from GitHub Secrets/Variables via `jq`, and deploys to GitHub Pages. The `appsettings.Development.json` file is gitignored.
