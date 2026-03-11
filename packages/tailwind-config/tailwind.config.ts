// Shared Tailwind CSS Configuration
// Rationale: Centralizes design tokens (colors, spacing, fonts) so all
// three products maintain visual consistency across the platform.
//
// Steps:
// 1. Define brand color palette with semantic naming
// 2. Extend default theme with custom spacing and border radius
// 3. Configure dark mode via class strategy for user preference
// 4. Export config for each app's tailwind.config.ts to extend

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/design-system/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a5f",
        },
        success: { 500: "#22c55e", 600: "#16a34a" },
        warning: { 500: "#f59e0b", 600: "#d97706" },
        danger: { 500: "#ef4444", 600: "#dc2626" },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#0f172a",
          muted: "#f8fafc",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
