/**
 * Finance OS - Dashboard Page
 * ===========================
 * Rationale: This is the main landing page for Product 1.
 * It displays cash runway, bank balance, burn rate, and
 * a month-end close checklist. Uses KPICard from the shared
 * design system and mock data for demo purposes.
 *
 * Steps to make this production-ready:
 * 1. Replace mock data with React Query hooks to Finance API (port 8000)
 * 2. Add Recharts line chart for runway visualization
 * 3. Connect bank account via Plaid integration
 * 4. Add real-time WebSocket updates for balance changes
 */

export default function FinanceDashboard() {
  // Mock data - will be replaced with API calls
  const kpis = [
    { label: 'Cash Balance', value: '$284,500', trend: '12.3%', trendUp: true },
    { label: 'Monthly Burn', value: '$42,100', trend: '5.1%', trendUp: false },
    { label: 'Runway', value: '6.8 months', trend: '0.4 mo', trendUp: true },
    { label: 'Revenue (MRR)', value: '$18,200', trend: '23.5%', trendUp: true },
  ];

  const closeChecklist = [
    { task: 'Reconcile bank statements', done: true },
    { task: 'Review accounts payable', done: true },
    { task: 'Verify revenue recognition', done: false },
    { task: 'Submit tax estimates', done: false },
    { task: 'Generate P&L report', done: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Finance OS</h1>
            <p className="text-sm text-gray-500">Cash operations dashboard</p>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            Connect Bank
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="mt-1 text-3xl font-bold">{kpi.value}</p>
              <p className={kpi.trendUp ? 'mt-1 text-sm text-green-600' : 'mt-1 text-sm text-red-600'}>
                {kpi.trendUp ? '+' : '-'}{kpi.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Chart placeholder + Checklist */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Cash Runway Forecast</h2>
            <div className="mt-4 flex h-64 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
              Recharts line chart will render here
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Month-End Close</h2>
            <p className="text-sm text-gray-500">2 of 5 complete</p>
            <ul className="mt-4 space-y-3">
              {closeChecklist.map((item) => (
                <li key={item.task} className="flex items-center gap-3">
                  <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-xs ${item.done ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-300'}`}>
                    {item.done ? 'Y' : ''}
                  </span>
                  <span className={item.done ? 'text-gray-400 line-through' : 'text-gray-700'}>
                    {item.task}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
