/**
 * Analytics Copilot - Chat Interface
 * Rationale: Chat-based NL-to-SQL with governance badges and SQL transparency.
 */
export default function AnalyticsCopilot() {
  const mockConversation = [
    { role: 'user', content: 'Show me MRR by region for the last 6 months' },
    {
      role: 'assistant',
      content: 'Here are MRR results by region (Oct 2025 - Mar 2026):',
      sql: "SELECT region, DATE_TRUNC('month', created_at) AS month, SUM(amount) AS mrr FROM subscriptions WHERE created_at >= '2025-10-01' GROUP BY region, month ORDER BY month;",
      results: [
        { region: 'North America', month: 'Mar 2026', mrr: '$124,500' },
        { region: 'Europe', month: 'Mar 2026', mrr: '$67,200' },
        { region: 'Asia Pacific', month: 'Mar 2026', mrr: '$34,800' },
      ],
      governance: ['subscriptions (read)', 'PII columns excluded'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold">Analytics Copilot</h1>
        <p className="text-sm text-gray-500">Ask your data anything - governed SQL, zero hallucinations</p>
      </header>
      <main className="mx-auto max-w-4xl p-6 space-y-6">
        {mockConversation.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'flex justify-end' : ''}>
            <div className={msg.role === 'user' ? 'rounded-xl bg-blue-600 px-4 py-3 text-white max-w-md' : 'rounded-xl border bg-white p-6 shadow-sm'}>
              <p>{msg.content}</p>
              {msg.sql && (
                <details className="mt-3"><summary className="cursor-pointer text-sm text-blue-600">Show SQL</summary>
                  <pre className="mt-2 rounded bg-gray-900 p-3 text-xs text-green-400 overflow-x-auto">{msg.sql}</pre>
                </details>
              )}
              {msg.results && (
                <table className="mt-4 w-full text-sm">
                  <thead><tr className="border-b text-left text-gray-500"><th className="pb-2">Region</th><th>Month</th><th>MRR</th></tr></thead>
                  <tbody>{msg.results.map((r, j) => (<tr key={j} className="border-b"><td className="py-2">{r.region}</td><td>{r.month}</td><td className="font-semibold">{r.mrr}</td></tr>))}</tbody>
                </table>
              )}
              {msg.governance && (<div className="mt-3 flex gap-2">{msg.governance.map((g, k) => (<span key={k} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">{g}</span>))}</div>)}
            </div>
          </div>
        ))}
        <div className="mt-8 flex gap-3">
          <input type="text" placeholder="Ask a question about your data..." className="flex-1 rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm text-white hover:bg-blue-700">Ask</button>
        </div>
      </main>
    </div>
  );
}
