// Design System - Shared UI Components
// ======================================
// Rationale: Single source of truth for all UI components across
// Finance OS, Analytics Copilot, and Media Buyer. Ensures visual
// consistency, reduces duplication, and enables Storybook documentation.
//
// Components are built with:
//   - React 19 for UI rendering
//   - Tailwind CSS for utility-first styling
//   - class-variance-authority (CVA) for variant management
//   - clsx + tailwind-merge for className composition

export { Button } from './components/Button';
export { Card } from './components/Card';
export { KPICard } from './components/KPICard';
export { Badge } from './components/Badge';
export { Sidebar } from './components/Sidebar';
export { cn } from './lib/utils';
export { StatusBadge } from './StatusBadge';
