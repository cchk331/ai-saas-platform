// Smoke Tests for All Three Products
// Rationale: Validates that each product's homepage loads, renders key UI
// elements, and responds to basic interactions. This is the first line of
// defense to ensure "all features work" across the platform.
//
// Steps:
// 1. Test Finance OS: dashboard loads, KPI cards render, nav works
// 2. Test Analytics Copilot: chat interface loads, input accepts text
// 3. Test Media Buyer: campaign table loads, status badges render

import { test, expect } from "@playwright/test";

test.describe("Finance OS", () => {
  test("dashboard loads with KPI cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h2")).toContainText(["Finance Dashboard"]);
    await expect(page.locator("text=Total Balance")).toBeVisible();
    await expect(page.locator("text=Monthly Revenue")).toBeVisible();
    await expect(page.locator("text=Cash Runway")).toBeVisible();
  });

  test("sidebar navigation is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Dashboard")).toBeVisible();
    await expect(page.locator("text=Cash Flow")).toBeVisible();
    await expect(page.locator("text=Accounts")).toBeVisible();
  });
});

test.describe("Analytics Copilot", () => {
  test("chat interface loads with input", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Analytics Copilot")).toBeVisible();
    const input = page.locator("input[type=text], textarea").first();
    await expect(input).toBeVisible();
  });

  test("can type a query", async ({ page }) => {
    await page.goto("/");
    const input = page.locator("input[type=text], textarea").first();
    await input.fill("What was total revenue last month?");
    await expect(input).toHaveValue("What was total revenue last month?");
  });
});

test.describe("Media Buyer", () => {
  test("campaign dashboard loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Campaign Dashboard")).toBeVisible();
  });

  test("campaign table shows data", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Summer Sale")).toBeVisible();
    await expect(page.locator("text=Brand Awareness")).toBeVisible();
  });

  test("alert cards are visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Alerts")).toBeVisible();
  });
});
