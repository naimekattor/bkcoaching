export function AnalyticsCards() {
  const analyticsData = [
    { value: "24", label: "Total Campaigns", color: "#BC8D03" },
    { value: "89", label: "micro-influencers", color: "#BC8D03" },
    { value: "4.8", label: "Avg Rating", color: "#BC8D03" },
    { value: "$250K", label: "Total Invested", color: "#BC8D03" },
  ];

  return (
    <div>
      <h3 className="text-2xl font-semibold text-slate-800 mb-4">Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((item, index) => (
          <div key={index} className="bg-slate-200 rounded-lg p-6 text-center">
            <div
              className="text-3xl font-bold mb-2"
              style={{ color: item.color }} // 👈 apply hex color here
            >
              {item.value}
            </div>
            <div className="text-slate-600 text-sm font-medium">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
