export function CampaignsSection() {
  const campaigns = [
    {
      name: "Summer Glow Collection",
      creators: "3 Creators onboarded",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      name: "Winter Skincare Launch",
      creators: "Ready to publish",
      status: "Preview",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-800">Campaigns</h3>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 text-sm px-4 py-2 rounded-lg transition-colors font-medium">
          + Create new
        </button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h4 className="font-medium text-slate-800">{campaign.name}</h4>
              <p className="text-sm text-slate-600">{campaign.creators}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${campaign.statusColor}`}>
              {campaign.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
