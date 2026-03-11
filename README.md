# AI SaaS Platform

Monorepo for three AI-powered SaaS products, built with GitHub Codespaces, Next.js, and Python.

## Products

| Product | Description | Frontend Port | API Port |
|---------|-------------|---------------|----------|
| **Finance OS** | Cash operations co-pilot for founder-led businesses. Runway dashboards, month-end close, forecasting. | 3000 | 8000 |
| **Analytics Copilot** | Governed text-to-SQL. Ask data questions in natural language, get trusted answers. | 3001 | 8001 |
| **Media Buyer** | AI ad automation. Manages budgets across Meta/Google with bid optimization. | 3002 | 8002 |

## Repository Structure

```
ai-saas-platform/
|-- .devcontainer/           # Codespaces configs (one per team role)
|   |-- frontend/            # Node 20, Storybook, Playwright
|   |-- backend-finance/     # Python 3.12, PostgreSQL, Redis
|   |-- backend-analytics/   # Python 3.12, PostgreSQL, Jupyter
|   |-- backend-ads/         # Python 3.12, Redis (job queue)
|-- .github/workflows/       # CI pipeline: lint > unit > integration > E2E > security
|-- apps/
|   |-- finance-os/          # Product 1 frontend (Next.js)
|   |-- analytics-copilot/   # Product 2 frontend (Next.js)
|   |-- media-buyer/         # Product 3 frontend (Next.js)
|-- packages/
|   |-- design-system/       # Shared UI: React + Tailwind + shadcn/ui + Storybook
|-- package.json             # Root workspace scripts
|-- pnpm-workspace.yaml      # Workspace package definitions
```

## Getting Started with Codespaces

1. Click **Code > Codespaces > New codespace** on this repo.
2. Select the devcontainer for your role (frontend, backend-finance, etc.).
3. The environment auto-installs all dependencies via `postCreateCommand`.
4. Run `pnpm dev:finance`, `pnpm dev:analytics`, or `pnpm dev:media` to start.

## CI/CD Pipeline

Every PR and push to `main` triggers:
- **Lint & Typecheck** - ESLint + TypeScript across all packages
- **Unit Tests** - Vitest, run per-app via matrix strategy
- **Integration Tests** - PostgreSQL + Redis service containers
- **E2E Tests** - Playwright with failure artifact uploads
- **Security Scan** - CodeQL for JavaScript and Python

## UI/UX Design & Feedback Workflow

### Design Tools
- **Stitch** (stitch.design): Used for rapid UI prototyping and layout design. All screens are designed in Stitch before implementation to ensure visual consistency and user-friendly layouts.
- **Storybook** (port 6006): Component documentation and visual testing. Run `pnpm dev:storybook`.

### Feedback & Validation
- **paywallexperiments.com**: Upload screenshots of pricing pages, onboarding flows, and paywalls to receive AI-powered conversion feedback based on 422+ real experiments. Used every sprint to validate UI decisions.
- **Hotjar/PostHog**: Session replays, heatmaps, and rage-click detection for production usage.
- **In-app surveys**: CSAT + NPS collected after key user actions.

### Feedback Loop (Every 2-Week Sprint)
1. Collect behavioral data (Hotjar/PostHog) + qualitative feedback (surveys).
2. Upload key UI screens to paywallexperiments.com for conversion analysis.
3. Identify top friction point per product.
4. Fix in the next sprint. Ship. Repeat.

## Instagram Marketing Plan

### Content Pillars
- **Build-in-public**: Behind-the-scenes Reels of development progress.
- **Product demos**: Screen recordings showing each product in action.
- **Education**: Tips relevant to each product's audience (finance, data, ads).
- **Social proof**: Early user testimonials and case studies.

### Weekly Cadence
- 2 Reels/week per product (6 total)
- 1 carousel/week per product (3 total)
- Daily Stories: polls, countdowns, behind-the-scenes

### Feedback Integration
- Instagram polls to vote on UI decisions (dark mode, layouts).
- Track which posts drive the most profile visits and link clicks.
- Double down on content formats that perform; drop what does not.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 19, Tailwind CSS, shadcn/ui |
| Backend | Python 3.12, FastAPI |
| Database | PostgreSQL 16 |
| Cache/Queue | Redis 7 |
| Testing | Vitest, Playwright, CodeQL |
| CI/CD | GitHub Actions |
| Dev Environment | GitHub Codespaces |
| Design | Stitch, Storybook |
| Feedback | paywallexperiments.com, Hotjar, PostHog |
| Package Manager | pnpm 9 (workspaces) |

## Scripts Reference

```bash
pnpm dev:finance      # Start Finance OS on port 3000
pnpm dev:analytics    # Start Analytics Copilot on port 3001
pnpm dev:media        # Start Media Buyer on port 3002
pnpm dev:storybook    # Start Storybook on port 6006
pnpm lint             # Lint all packages
pnpm typecheck        # Typecheck all packages
pnpm test:unit        # Run all unit tests
pnpm test:integration # Run integration tests
pnpm test:e2e         # Run Playwright E2E tests
pnpm build            # Build all packages
```

## License

Private. All rights reserved.
