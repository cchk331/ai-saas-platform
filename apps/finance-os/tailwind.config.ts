// Finance OS Tailwind Configuration
// Rationale: Extends the shared tailwind-config package so that Finance OS
// inherits all brand tokens while allowing product-specific customizations.
//
// Steps:
// 1. Import shared config from @repo/tailwind-config
// 2. Override content paths to include this app's source files
// 3. Add any finance-specific color overrides if needed

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Config = {
  ...sharedConfig,
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/design-system/src/**/*.{ts,tsx}",
  ],
};

export default config;
