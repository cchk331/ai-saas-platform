/**
 * StatusBadge - Shared Design System Component
 * =============================================
 * Rationale: Provides consistent status indicators across all three
 * products. Supports variant-based styling for different states:
 * active, paused, learning, healthy, warning, error.
 *
 * Usage:
 *   <StatusBadge variant="active">Active</StatusBadge>
 *   <StatusBadge variant="warning">At Risk</StatusBadge>
 */
import React from 'react';

type BadgeVariant = 'active' | 'paused' | 'learning' | 'healthy' | 'warning' | 'error' | 'info';

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  healthy: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-gray-100 text-gray-600',
  learning: 'bg-amber-100 text-amber-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
