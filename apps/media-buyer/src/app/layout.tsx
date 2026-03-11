// Media Buyer Root Layout
// Rationale: Provides the campaign management shell with sidebar navigation
// for ad platform integrations (Meta, Google, TikTok).
//
// Steps:
// 1. Import globals.css for Tailwind styles
// 2. Set Media Buyer metadata for SEO
// 3. Render sidebar with campaign management navigation
// 4. Main content area for campaign views and optimization

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media Buyer - Ad Automation",
  description: "AI-powered cross-platform ad campaign management and optimization.",
};

const navItems = [
  { label: "Campaigns", href: "/" },
  { label: "Optimization", href: "/optimize" },
  { label: "Creatives", href: "/creatives" },
  { label: "Audiences", href: "/audiences" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex">
          <aside className="w-60 min-h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Media Buyer</h1>
              <p className="text-xs text-slate-500 mt-1">Ad Automation Platform</p>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
