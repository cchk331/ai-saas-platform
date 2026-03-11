import React from 'react';
import { cn } from '../lib/utils';

export interface KPICardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, trend, trendUp, className }) => (
  <div className={cn('rounded-xl border border-gray-200 bg-white p-6 shadow-sm', className)}>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
    {trend && (
      <p className={cn('mt-1 text-sm', trendUp ? 'text-green-600' : 'text-red-600')}>
        {trendUp ? '+' : ''}{trend}
      </p>
    )}
  </div>
);
