# AI SaaS Platform - Makefile
# Rationale: Provides a unified command interface for all development,
# testing, and deployment operations. Eliminates the need to remember
# complex multi-step commands across the monorepo.
#
# Usage: make <target>

.PHONY: help install dev lint format test e2e docker-up docker-down clean

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# --- Setup ---
install: ## Install all dependencies (Node + Python)
	pnpm install
	cd apps/finance-os/api && pip install -r requirements.txt
	cd apps/analytics-copilot/api && pip install -r requirements.txt
	cd apps/media-buyer/api && pip install -r requirements.txt

# --- Development ---
dev: ## Start all frontends in development mode
	pnpm --filter @repo/finance-os dev &
	pnpm --filter @repo/analytics-copilot dev &
	pnpm --filter @repo/media-buyer dev &

dev-finance: ## Start Finance OS frontend only
	pnpm --filter @repo/finance-os dev

dev-analytics: ## Start Analytics Copilot frontend only
	pnpm --filter @repo/analytics-copilot dev

dev-media: ## Start Media Buyer frontend only
	pnpm --filter @repo/media-buyer dev

api-finance: ## Start Finance OS API
	cd apps/finance-os/api && uvicorn main:app --reload --port 8000

api-analytics: ## Start Analytics Copilot API
	cd apps/analytics-copilot/api && uvicorn main:app --reload --port 8001

api-media: ## Start Media Buyer API
	cd apps/media-buyer/api && uvicorn main:app --reload --port 8002

# --- Code Quality ---
lint: ## Run ESLint across all packages
	pnpm eslint . --ext .ts,.tsx --max-warnings 0

format: ## Run Prettier to format all files
	pnpm prettier --write "**/*.{ts,tsx,json,css,md}"

format-check: ## Check formatting without writing
	pnpm prettier --check "**/*.{ts,tsx,json,css,md}"

typecheck: ## Run TypeScript type checking
	pnpm --filter @repo/finance-os tsc --noEmit
	pnpm --filter @repo/analytics-copilot tsc --noEmit
	pnpm --filter @repo/media-buyer tsc --noEmit

# --- Testing ---
test: ## Run all unit tests
	pnpm test
	cd apps/finance-os/api && pytest -v
	cd apps/analytics-copilot/api && pytest -v
	cd apps/media-buyer/api && pytest -v

e2e: ## Run Playwright end-to-end tests
	cd e2e && npx playwright test

e2e-ui: ## Run Playwright tests with UI
	cd e2e && npx playwright test --ui

# --- Docker ---
docker-up: ## Start all services via Docker Compose
	docker compose up -d

docker-down: ## Stop all Docker services
	docker compose down

docker-reset: ## Stop services and remove volumes
	docker compose down -v

docker-logs: ## Tail logs from all services
	docker compose logs -f

# --- CI ---
ci: lint format-check typecheck test ## Run full CI pipeline locally

# --- Cleanup ---
clean: ## Remove build artifacts and caches
	rm -rf node_modules .next dist coverage
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
