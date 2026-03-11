import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() - className composition utility
 * Rationale: Combines clsx (conditional classes) with tailwind-merge
 * (resolves Tailwind conflicts like 'p-2 p-4' -> 'p-4').
 * Used across all three products for consistent class handling.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
