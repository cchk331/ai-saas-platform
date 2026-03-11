// Analytics Copilot Root Layout
// Rationale: Provides the chat-oriented shell for the Text-to-SQL product.
// Features a clean, minimal layout optimized for query input and results display.
//
// Steps:
// 1. Import shared globals.css with Tailwind directives
// 2. Set product-specific metadata for SEO
// 3. Render a top header bar with product branding
// 4. Main content area fills remaining viewport height

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Analytics Copilot - Text-to-SQL",
  description: "Ask questions in plain English and get instant SQL-powered analytics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-slate-950">
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">Analytics Copilot</h1>
              <p className="text-xs text-slate-500">Text-to-SQL Intelligence</p>
            </div>
            <nav className="flex gap-4 text-sm">
              <a href="/" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Chat</a>
              <a href="/history" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">History</a>
              <a href="/schemas" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Schemas</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
