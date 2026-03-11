/**
 * AlertBanner - Shared notification component
 * =============================================
 * Rationale: Provides consistent alert styling across all three products.
 * Used by Media Buyer for optimization alerts, Finance OS for close
 * deadline warnings, and Analytics Copilot for governance notices.
 *
 * Props:
 *   type: 'info' | 'success' | 'warning' | 'error'
 *   message: string - Alert content
 *   dismissible: boolean - Whether user can close the alert
 *   onDismiss: () => void - Callback when dismissed
 */
import React from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertBannerProps {
  type: AlertType;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const alertStyles: Record<AlertType, string> = {
  info: 'bg-blue-50 border-blue-400 text-blue-800',
  success: 'bg-emerald-50 border-emerald-400 text-emerald-800',
  warning: 'bg-amber-50 border-amber-400 text-amber-800',
  error: 'bg-red-50 border-red-400 text-red-800',
};

const icons: Record<AlertType, string> = {
  info: 'i',
  success: '\u2713',
  warning: '!',
  error: '\u2717',
};

export function AlertBanner({ type, message, dismissible = false, onDismiss }: AlertBannerProps) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border-l-4 px-4 py-3 ${alertStyles[type]}`} role="alert">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/60 text-sm font-bold">
        {icons[type]}
      </span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-auto text-current opacity-60 hover:opacity-100"
          aria-label="Dismiss alert"
        >
          \u2715
        </button>
      )}
    </div>
  );
}
