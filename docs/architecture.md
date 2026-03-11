# Architecture Overview

## System Design

The AI SaaS Platform uses a **monorepo** architecture with three independent products sharing common infrastructure.

```
                    +-------------------+
                    |   GitHub Actions  |
                    |   CI/CD Pipeline  |
                    +--------+----------+
                             |
              +--------------+--------------+
              |              |              |
     +--------v---+  +------v------+  +---v---------+
     | Finance OS |  | Analytics   |  | Media Buyer |
     | Port 3000  |  | Copilot     |  | Port 3002   |
     | Next.js    |  | Port 3001   |  | Next.js     |
     +--------+---+  | Next.js     |  +---+---------+
              |      +------+------+      |
              |             |             |
     +--------v---+  +------v------+  +---v---------+
     | FastAPI    |  | FastAPI     |  | FastAPI     |
     | Port 8000  |  | Port 8001   |  | Port 8002   |
     +--------+---+  +------+------+  +---+---------+
              |             |             |
              +-----------+-+-------------+
                          |
                 +--------v--------+
                 | PostgreSQL 16   |
                 | Redis 7         |
                 +-----------------+
```

## Key Decisions

### 1. Monorepo over Polyrepo
**Rationale**: Shared design system, unified CI, atomic cross-product changes. pnpm workspaces handle dependency management.

### 2. FastAPI over Express
**Rationale**: Python ecosystem for AI/ML, built-in OpenAPI docs, Pydantic for request validation, async support.

### 3. Next.js 14 with App Router
**Rationale**: Server components for performance, file-based routing, built-in API routes for BFF pattern.

### 4. GitHub Codespaces
**Rationale**: Zero-config onboarding, consistent dev environments, role-based devcontainers (frontend, backend-finance, backend-analytics, backend-ads).

### 5. Shared Design System
**Rationale**: Consistent UI across products, reduces duplication. Components: Button, Card, KPICard, Badge, StatusBadge, Sidebar.

## Data Flow

1. User interacts with Next.js frontend
2. Frontend calls FastAPI backend via REST
3. Backend processes request (AI inference, SQL generation, bid optimization)
4. Results cached in Redis, persisted in PostgreSQL
5. Response returned to frontend for rendering

## Testing Strategy

| Level | Tool | Scope |
|-------|------|-------|
| Unit | pytest | FastAPI endpoints per product |
| Integration | pytest + service containers | Database + Redis interactions |
| E2E | Playwright | Full user flows across products |
| Security | CodeQL | JavaScript + Python vulnerability scanning |
| Lint | ESLint + Prettier | Code style enforcement |
