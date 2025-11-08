"use client";
import { BusinessBio } from "./BusinessBio";
import { CampaignsSection } from "./CampaignsSection";
import { DashboardHeader } from "./DashboardHeader";
import { RecentCollaborations } from "./RecentCollaborations";
import { AnalyticsCards } from "./AnalyticsCards";
import { BusinessAssets } from "./BusinessAssets";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useAuthStore } from "@/stores/useAuthStore";

export default function BDashboard() {
  const [brandProfile, setBrandProfile] = useState();
  const [allCampaigns, setAllCampaigns] = useState([]);

  const store = useAuthStore.getState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient("user_service/get_user_info/", {
          method: "GET",
          auth: true,
        });

        store.setUser(res.data);
        setBrandProfile(res?.data?.brand_profile);

        console.log("✅ User Info:", res,res?.data?.brand_profile);
      } catch (error) {
        console.error("❌ API Error:", error);
      }
    };

    const fetchAllCampaigns = async () => {
      try {
        const res = await apiClient("campaign_service/get_my_all_campaigns/", {
          method: "GET",
          auth: true,
        });

        console.log("Raw API Response:", res.data);

        const campaignsArray = Array.isArray(res.data)
          ? [...res.data].reverse()
          : [];

        // Transform API response to match component expectations
        const transformedCampaigns = campaignsArray.map((campaign) => ({
          // Basic info
          id: campaign.id,
          title: campaign.campaign_name || "Untitled Campaign",
          description: campaign.campaign_description || "",

          // Budget & Timeline
          budget: campaign.budget_range ? `$${campaign.budget_range}` : "$0",
          budgetType: campaign.budget_type || "total",
          targetReach: "200K", // Not in API response, using default
          timeLeft: campaign.campaign_timeline || "N/A",
          progress: 0, // Not in API response, using default

          // Platforms - MISSING from API (you need to add this field to API or mock it)
          platforms: [], // Empty because API doesn't have platform field

          // Assigned creators - MISSING from API (will show empty)
          assignedCreators: [],

          // Campaign details
          objective: campaign.campaign_objective || "",
          timeline: campaign.campaign_timeline || "",

          // Parse comma-separated strings to arrays
          deliverables: campaign.content_deliverables
            ? campaign.content_deliverables.split(",").map((d) => d.trim())
            : [],

          paymentPreferences: campaign.payment_preference
            ? campaign.payment_preference.split(",").map((p) => p.trim())
            : [],

          keywords: campaign.keywords_and_hashtags
            ? campaign.keywords_and_hashtags.split(",").map((k) => k.trim())
            : [],

          targetAudience: campaign.target_audience || "",

          // Flags
          approvalRequired: campaign.content_approval_required || false,
          autoMatch: campaign.auto_match_micro_influencers || false,

          // Raw data for reference
          campaignOwner: campaign.campaign_owner,
          campaignStatus: campaign.status,
        }));

        console.log("Transformed Campaigns:", transformedCampaigns);
        setAllCampaigns(transformedCampaigns);
      } catch (error) {
        console.error("❌ API Error:", error);
        setAllCampaigns([]);
      }
    };

    fetchAllCampaigns();

    fetchUser();
  }, []);
  return (
    <div className="">
      <div className="flex-1">
        <DashboardHeader />
        <div className="mt-6 space-y-6">
          <AnalyticsCards allCampaigns={allCampaigns} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <BusinessBio />
              <CampaignsSection allCampaigns={allCampaigns} />
            </div>
            <div className="space-y-6">
              <RecentCollaborations />
              <BusinessAssets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
