// Playwright E2E Test Configuration
// Rationale: End-to-end tests validate that all three products render correctly,
// navigation works, and key user flows complete without errors. This ensures
// "all features work" as required.
//
// Steps:
// 1. Configure three projects (one per product) with unique base URLs
// 2. Set up webServer to start all three Next.js dev servers
// 3. Enable screenshot-on-failure for visual debugging
// 4. Run tests in Chromium for consistent cross-platform results

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }]],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "finance-os",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3000" },
    },
    {
      name: "analytics-copilot",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3001" },
    },
    {
      name: "media-buyer",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3002" },
    },
  ],
});
