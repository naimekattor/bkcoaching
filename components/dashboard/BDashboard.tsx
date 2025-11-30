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

// --- 1. Define Interface for Transformed Campaigns (Used in CampaignsSection) ---
export interface DashboardCampaign {
  id: number;
  title: string;
  description: string;
  budget: string;
  budgetType: string;
  targetReach: string;
  timeLeft: string;
  progress: number;
  platforms: string[];
  assignedCreators: any[];
  objective: string;
  timeline: string;
  deliverables: string[];
  paymentPreferences: string[];
  keywords: string[];
  targetAudience: string;
  approvalRequired: boolean;
  autoMatch: boolean;
  campaignOwner: number;
  campaignStatus: string;
}

// --- 2. Define Interface for Previous Hirings (Used in RecentCollaborations) ---
export interface HiringCampaign {
  id: number;
  hired_influencer_id: number | null;
  rating: number;
  // Add other fields from API if needed
}

export default function BDashboard() {
  const [brandProfile, setBrandProfile] = useState<any>(null); // Use specific type if available, otherwise any
  
  // ✅ Fix: Add generic type <DashboardCampaign[]>
  const [allCampaigns, setAllCampaigns] = useState<DashboardCampaign[]>([]); 
  
  // ✅ Fix: Add generic type <HiringCampaign[]>
  const [previousHirings, setPreviousHirings] = useState<HiringCampaign[]>([]); 

  const store = useAuthStore.getState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch User Info
        const userRes = await apiClient("user_service/get_user_info/", {
          method: "GET",
          auth: true,
        });
        store.setUser(userRes.data);
        setBrandProfile(userRes?.data?.brand_profile);

        // 2. Fetch All Campaigns
        const campaignsRes = await apiClient("campaign_service/get_my_all_campaigns/", {
          method: "GET",
          auth: true,
        });

        const campaignsArray = Array.isArray(campaignsRes.data)
          ? [...campaignsRes.data].reverse()
          : [];

        // Transform API response
        const transformedCampaigns: DashboardCampaign[] = campaignsArray.map((campaign: any) => ({
          id: campaign.id,
          title: campaign.campaign_name || "Untitled Campaign",
          description: campaign.campaign_description || "",
          budget: campaign.budget_range ? `$${campaign.budget_range}` : "$0",
          budgetType: campaign.budget_type || "total",
          targetReach: "200K", 
          timeLeft: campaign.campaign_timeline || "N/A",
          progress: 0, 
          platforms: [], 
          assignedCreators: [],
          objective: campaign.campaign_objective || "",
          timeline: campaign.campaign_timeline || "",
          deliverables: campaign.content_deliverables
            ? campaign.content_deliverables.split(",").map((d: string) => d.trim())
            : [],
          paymentPreferences: campaign.payment_preference
            ? campaign.payment_preference.split(",").map((p: string) => p.trim())
            : [],
          keywords: campaign.keywords_and_hashtags
            ? campaign.keywords_and_hashtags.split(",").map((k: string) => k.trim())
            : [],
          targetAudience: campaign.target_audience || "",
          approvalRequired: campaign.content_approval_required || false,
          autoMatch: campaign.auto_match_micro_influencers || false,
          campaignOwner: campaign.campaign_owner,
          campaignStatus: campaign.status,
        }));

        setAllCampaigns(transformedCampaigns);

        // 3. Fetch Previous Hirings
        const hiringsRes = await apiClient("campaign_service/get_my_previous_hirings/", {
            method: "GET",
            auth: true,
        });
        
        if (hiringsRes.data && Array.isArray(hiringsRes.data)) {
            setPreviousHirings(hiringsRes.data);
        }

      } catch (error) {
        console.error("❌ API Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="flex-1">
        <DashboardHeader />
        <div className="mt-6 space-y-6">
          <AnalyticsCards allCampaigns={allCampaigns} previousHirings={previousHirings} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <BusinessBio />
              <CampaignsSection allCampaigns={allCampaigns} />
            </div>
            <div className="space-y-6">
              <RecentCollaborations rawCampaigns={previousHirings} />
              <BusinessAssets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}