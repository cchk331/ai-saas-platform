// Finance OS Root Layout
// Rationale: Next.js App Router requires a root layout that wraps all pages.
// This sets HTML metadata, loads fonts, imports global styles, and provides
// the sidebar navigation shell shared across all Finance OS routes.
//
// Steps:
// 1. Import globals.css for Tailwind and theme variables
// 2. Configure Inter font via next/font for optimal loading
// 3. Set metadata (title, description) for SEO
// 4. Render sidebar navigation + main content area

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance OS - Cash Flow Intelligence",
  description: "AI-powered cash flow forecasting, bank integrations, and financial operations dashboard.",
};

const navItems = [
  { label: "Dashboard", href: "/", icon: "grid" },
  { label: "Cash Flow", href: "/cashflow", icon: "trending-up" },
  { label: "Accounts", href: "/accounts", icon: "credit-card" },
  { label: "Forecasts", href: "/forecasts", icon: "bar-chart" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Finance OS</h1>
              <p className="text-xs text-slate-500 mt-1">Cash Flow Intelligence</p>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
