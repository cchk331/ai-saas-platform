# Contributing to AI SaaS Platform

Thank you for contributing. This guide covers the development workflow,
coding standards, and review process.

## Prerequisites

- Node.js >= 20 (managed via devcontainer)
- Python >= 3.11
- pnpm >= 8
- Docker + Docker Compose

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/cchk331/ai-saas-platform.git
cd ai-saas-platform

# 2. Install dependencies
make install

# 3. Copy environment files
cp apps/finance-os/api/.env.example apps/finance-os/api/.env
cp apps/analytics-copilot/api/.env.example apps/analytics-copilot/api/.env
cp apps/media-buyer/api/.env.example apps/media-buyer/api/.env

# 4. Start infrastructure
make docker-up

# 5. Start development servers
make dev
```

## Branch Naming

- `feat/<product>/<description>` - New features
- `fix/<product>/<description>` - Bug fixes
- `chore/<description>` - Maintenance tasks
- `docs/<description>` - Documentation

Examples: `feat/finance-os/plaid-integration`, `fix/media-buyer/roas-calc`

## Commit Messages

Follow Conventional Commits:

```
feat(finance-os): add Plaid bank account linking
fix(analytics-copilot): correct SQL injection in query parser
chore: update dependencies to latest versions
docs: add API endpoint documentation
```

## Code Quality Checklist

Before submitting a PR, run:

```bash
make ci   # lint + format-check + typecheck + test
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make changes with clear, atomic commits
3. Run `make ci` to verify all checks pass
4. Open a PR using the template
5. Request review from at least one team member
6. Address all review comments
7. Squash and merge once approved

## Architecture Decisions

Each product follows the same structure:

```
apps/<product>/
  src/app/        # Next.js App Router pages
  api/            # FastAPI backend
  package.json    # Frontend dependencies
  tsconfig.json   # Extends shared base
  tailwind.config.ts  # Extends shared config
```

Shared code lives in `packages/`:
- `design-system` - Reusable UI components
- `tailwind-config` - Shared design tokens
- `tsconfig` - Shared TypeScript config

## Feedback Tools

- **paywallexperiments.com** - Upload UI screenshots for paywall/pricing A/B test feedback
- **Stitch** (stitch.design) - Design asset generation (when available)
