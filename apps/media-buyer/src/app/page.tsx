/**
 * Media Buyer - Campaign Dashboard
 * Rationale: Campaign overview with spend tracking, ROAS, anomaly alerts.
 * Includes platform badges, budget progress bars, and optimization triggers.
 *
 * Steps to production:
 * 1. Connect to Media Buyer API (port 8002) for live campaign data
 * 2. Add Meta/Google ad account OAuth integration
 * 3. Replace mock with real bid optimization results
 * 4. Add budget slider with drag-and-drop (dnd-kit)
 */
export default function MediaBuyer() {
  const campaigns = [
    { name: 'Summer Sale - Meta', platform: 'Meta', status: 'Active', spend: '$4,280', budget: '$8,000', roas: '3.2x', cpa: '$12.40' },
    { name: 'Brand Awareness - Google', platform: 'Google', status: 'Active', spend: '$2,150', budget: '$5,000', roas: '2.8x', cpa: '$18.90' },
    { name: 'Retargeting - Meta', platform: 'Meta', status: 'Paused', spend: '$890', budget: '$2,000', roas: '4.1x', cpa: '$8.20' },
    { name: 'New Launch - TikTok', platform: 'TikTok', status: 'Learning', spend: '$620', budget: '$3,000', roas: '1.4x', cpa: '$32.10' },
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

  const platformColors: Record<string, string> = {
    Meta: 'bg-blue-100 text-blue-800',
    Google: 'bg-green-100 text-green-800',
    TikTok: 'bg-pink-100 text-pink-800',
  };

  const statusColors: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700',
    Paused: 'bg-gray-100 text-gray-600',
    Learning: 'bg-amber-100 text-amber-700',
  };

  const alertStyles: Record<string, string> = {
    warning: 'border-l-4 border-amber-400 bg-amber-50 text-amber-800',
    success: 'border-l-4 border-emerald-400 bg-emerald-50 text-emerald-800',
    info: 'border-l-4 border-blue-400 bg-blue-50 text-blue-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Buyer</h1>
            <p className="text-sm text-gray-500">AI ad automation - always on</p>
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            Connect Ad Account
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">{kpi.label}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{kpi.value}</p>
              <span className={`text-xs font-medium ${kpi.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                {kpi.trendUp ? '+' : '-'}{kpi.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className="mt-6 space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className={`rounded-lg p-3 text-sm ${alertStyles[alert.type]}`}>
              {alert.message}
            </div>
          ))}
        </div>

        {/* Campaign Table */}
        <div className="mt-6 rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Campaigns</h2>
            <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700">
              Optimize All
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="px-6 py-3">Campaign</th>
                <th className="px-6 py-3">Platform</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Spend / Budget</th>
                <th className="px-6 py-3">ROAS</th>
                <th className="px-6 py-3">CPA</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${platformColors[c.platform]}`}>
                      {c.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{c.spend} / {c.budget}</td>
                  <td className="px-6 py-4 font-semibold">{c.roas}</td>
                  <td className="px-6 py-4 text-gray-600">{c.cpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
