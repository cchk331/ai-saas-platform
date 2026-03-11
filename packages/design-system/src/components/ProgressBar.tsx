/**
 * ProgressBar - Budget/progress visualization component
 * =====================================================
 * Rationale: Reusable progress bar for budget pacing (Media Buyer),
 * close checklist completion (Finance OS), and query confidence
 * (Analytics Copilot). Color shifts from green to amber to red
 * based on threshold values.
 *
 * Props:
 *   value: number - Current value (0-100)
 *   max: number - Maximum value (default 100)
 *   label: string - Display label
 *   showPercentage: boolean - Show percentage text
 *   color: 'auto' | 'blue' | 'green' | 'amber' | 'red'
 */
import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'auto' | 'blue' | 'green' | 'amber' | 'red';
}

function getAutoColor(pct: number): string {
  if (pct < 50) return 'bg-emerald-500';
  if (pct < 80) return 'bg-amber-500';
  return 'bg-red-500';
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'auto',
}: ProgressBarProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  const barColor = color === 'auto' ? getAutoColor(pct) : colorMap[color];

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-medium">{pct}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
