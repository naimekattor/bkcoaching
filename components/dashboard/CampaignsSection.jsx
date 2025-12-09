import Link from "next/link";

export function CampaignsSection({ allCampaigns }) {
  

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-800">Campaigns</h3>
        <Link
          href={"/brand-dashboard/campaigns"}
          className="bg-secondary hover:bg-[var(--secondaryhover)] text-slate-800 text-sm px-4 py-2 rounded-lg transition-colors font-medium"
        >
          + Create new
        </Link>
      </div>
      {
        allCampaigns.length === 0 ? (
          <p className="text-sm text-slate-600">No campaigns available.</p>
        ):(
          <div className="space-y-4">
        {allCampaigns.slice(0, 2).map((campaign, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
          >
            <div>
              <h4 className="font-medium text-slate-800">{campaign?.title}</h4>
              {/* <p className="text-sm text-slate-600">
                {campaign?.creators || 0} Creators onboarded
              </p> */}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${campaign?.statusColor}`}
            >
              {campaign?.campaignStatus || "Active"}
            </span>
          </div>
        ))}
      </div>
        )
      }
      
    </div>
  );
}
