
export function AnalyticsCards({ allCampaigns,previousHirings}) {
  const numOfInfluencers=previousHirings.length;
  const totalInvested=previousHirings.reduce((acc,hiring)=>acc+hiring.budget,0);
  const analyticsData = [
    { value: allCampaigns.length, label: "Total Campaigns", color: "#BC8D03" },
    { value: numOfInfluencers, label: "micro-influencers", color: "#BC8D03" },
    // { value: "4.8", label: "Avg Rating", color: "#BC8D03" },
    { 
  value: `$${Number(totalInvested).toLocaleString()}`, 
  label: "Total Invested", 
  color: "#BC8D03" 
},
  ];


  return (
    <div>
      <h3 className="text-2xl font-semibold text-slate-800 mb-4">Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((item, index) => (
          <div key={index} className="bg-slate-200 rounded-lg p-6 text-center">
            <div
              className="text-3xl text-secondary font-bold mb-2"
              
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
