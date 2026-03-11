/**
 * Media Buyer - Campaign Dashboard
 * Rationale: Campaign overview with spend tracking, ROAS, anomaly alerts.
 * Steps to production:
 * 1. Connect to Media Buyer API (port 8002) for live campaign data
 * 2. Add Meta/Google ad account OAuth integration
 * 3. Replace mock with real bid optimization results
 * 4. Add budget slider with drag-and-drop (dnd-kit)
 */
export default function MediaBuyer() {
  const campaigns = [
    { name: 'Summer Sale - Meta', status: 'Active', spend: '$4,280', budget: '$8,000', roas: '3.2x', cpa: '$12.40' },
    { name: 'Brand Awareness - Google', status: 'Active', spend: '$2,150', budget: '$5,000', roas: '2.8x', cpa: '$18.90' },
    { name: 'Retargeting - Meta', status: 'Paused', spend: '$890', budget: '$2,000', roas: '4.1x', cpa: '$8.20' },
    { name: 'New Launch - TikTok', status: 'Learning', spend: '$620', budget: '$3,000', roas: '1.4x', cpa: '$32.10' },
  ];

  const alerts = [
    { type: 'warning', message: 'New Launch campaign CPA is 2.6x above target' },
    { type: 'success', message: 'Retargeting ROAS improved 18% overnight' },
    { type: 'info', message: 'Budget reallocation: $500 moved from Brand to Summer Sale' },
  ];

  const kpis = [
    { label: 'Total Spend', value: '$7,940', trend: '12%', trendUp: false },
    { label: 'Avg ROAS', value: '2.9x', trend: '8%', trendUp: true },
    { label: 'Avg CPA', value: '$17.90', trend: '5%', trendUp: false },
    { label: 'Conversions', value: '443', trend: '22%', trendUp: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Media Buyer</h1>
            <p className="text-sm text-gray-500">AI ad automation - always on</p>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Connect Ad Account</button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="mt-1 text-3xl font-bold">{kpi.value}</p>
              <p className={kpi.trendUp ? 'mt-1 text-sm text-green-600' : 'mt-1 text-sm text-red-600'}>{kpi.trendUp ? '+' : '-'}{kpi.trend}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Campaign Table */}
          <div className="col-span-2 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Active Campaigns</h2>
            <table className="mt-4 w-full text-sm">
              <thead><tr className="border-b text-left text-gray-500"><th className="pb-2">Campaign</th><th>Status</th><th>Spend</th><th>Budget</th><th>ROAS</th><th>CPA</th></tr></thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 font-medium">{c.name}</td>
                    <td><span className={`rounded-full px-2 py-1 text-xs ${c.status === 'Active' ? 'bg-green-100 text-green-700' : c.status === 'Paused' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700'}`}>{c.status}</span></td>
                    <td>{c.spend}</td><td className="text-gray-500">{c.budget}</td><td className="font-semibold">{c.roas}</td><td>{c.cpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alerts */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">AI Alerts</h2>
            <div className="mt-4 space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className={`rounded-lg p-3 text-sm ${a.type === 'warning' ? 'bg-red-50 text-red-700' : a.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                  {a.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
