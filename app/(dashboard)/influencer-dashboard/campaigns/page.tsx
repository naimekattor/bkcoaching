"use client";

import { useEffect, useState } from "react";
import { Search, DollarSign, CircleCheck, X } from "lucide-react";
import { StatCard } from "@/components/cards/stat-card";
import { Megaphone } from "lucide-react";
import Image from "next/image";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

interface Campaign {
  id: number;
  campaign_name: string;
  campaign_description: string;
  campaign_objective: string;
  budget_range: string;
  budget_type: string;
  campaign_timeline: string;
  content_deliverables: string;
  payment_preference: string;
  content_approval_required: boolean;
  auto_match_micro_influencers: boolean;
  target_audience: string;
  keywords_and_hashtags: string;
  campaign_status: string;
  campaign_owner: number;
  campaign_poster: string | null;
  timestamp: string;
}

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [platformFilter, setPlatformFilter] = useState("All Platforms");
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const router = useRouter();

  const ITEMS_PER_PAGE = 9;

  const [invitations] = useState([
    {
      title: "Summer Skincare Launch",
      brand: "BeautyBrand Co.",
      price: "$1,200",
    },
    { title: "Tech Gadget Review", brand: "TechFlow Inc.", price: "$800" },
  ]);

  const [activeCampaigns] = useState([
    {
      title: "Fitness Equipment Promo",
      brand: "FitLife Brand",
      status: "In Progress",
      progress: 75,
      deadline: "3 days",
      price: "$950",
      color: "bg-primary",
      badge: "bg-yellow-100 text-primary",
    },
    {
      title: "Fashion Week Collection",
      brand: "StyleHub",
      status: "Review",
      progress: 90,
      deadline: "1 day",
      price: "$1,500",
      color: "bg-secondary",
      badge: "bg-orange-100 text-primary",
    },
  ]);

  useEffect(() => {
    const fetchAllCampaigns = async () => {
      try {
        setLoading(true);
        const res = await apiClient(
          `campaign_service/get_all_camaign_of_all_users/?page=${currentPage}`,
          {
            auth: true,
            method: "GET",
          }
        );

        if (res.status === "success" && res.data.results) {
          console.log("Campaigns fetched:", res.data.results);
          setAllCampaigns(res.data.results);
          setTotalCount(res.data.count);
          setNextUrl(res.data.next);
          setPreviousUrl(res.data.previous);
        }
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCampaigns();
  }, [currentPage]);

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  const handleConnectWithOwner = () => {
    if (selectedCampaign) {
      // Redirect to messages with campaign owner
      router.push(`/influencer-dashboard/messages?id=${selectedCampaign.campaign_owner}&campaign=${selectedCampaign.id}`);
    }
  };

  // Filter campaigns based on search and filters
  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.campaign_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.campaign_description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      campaign.campaign_status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Campaign Management
        </h1>
        <p className="text-gray-600">
          Create, manage and collaborate with campaigns
        </p>
        <h2 className="text-primary font-bold text-[20px] mt-4">Analytics</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Campaigns"
          value="24"
          subtitle="Currently active and completed"
          icon={<Megaphone className="w-8 h-8 text-primary" />}
        />
        <StatCard
          title="Completed"
          value="47"
          subtitle="Campaigns running this month"
          icon={<CircleCheck className="w-8 h-8 text-primary" />}
        />
        <StatCard
          title="Total Earnings"
          value="1,500"
          icon={<DollarSign className="w-8 h-8 text-purple-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Campaign Invitations */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Campaign Invitations</h2>
          <div className="space-y-4">
            {invitations.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded-lg p-4"
              >
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="text-secondary font-semibold">{item.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-1 bg-secondary text-white rounded-lg hover:bg-secondary">
                    Accept
                  </button>
                  <button className="px-4 py-1 border rounded-lg hover:bg-gray-100">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Active Campaigns */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">My Active Campaigns</h2>
          <div className="space-y-4">
            {activeCampaigns.map((item, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${item.badge}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Deadline: {item.deadline}</p>
                  <p className="text-secondary font-semibold">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Draft</option>
              <option>Published</option>
            </select>

            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>All Platforms</option>
              <option>Instagram</option>
              <option>TikTok</option>
              <option>YouTube</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-600">
            Loading campaigns...
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-600">
            No campaigns found
          </div>
        ) : (
          filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <Image
                  width={500}
                  height={192}
                  src={campaign.campaign_poster || "/placeholder.svg"}
                  alt={campaign.campaign_name || "Campaign"}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-xs font-semibold capitalize">
                  {campaign.campaign_status}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {campaign.campaign_name || "Untitled Campaign"}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {campaign.campaign_description || "No description"}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  {campaign.content_deliverables?.includes("instagram") && (
                    <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                      <span className="text-xs">📷</span>
                    </div>
                  )}
                  {campaign.content_deliverables?.includes("tiktok") && (
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                      <span className="text-xs text-white">🎵</span>
                    </div>
                  )}
                  {campaign.content_deliverables?.includes("youtube") && (
                    <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-xs">📺</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <div>
                    <span className="font-medium">Budget</span>
                    <p className="font-semibold text-gray-900">
                      {campaign.budget_range}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Timeline</span>
                    <p className="font-semibold text-gray-900">
                      {campaign.campaign_timeline}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {campaign.campaign_objective}
                  </span>
                  <button
                    onClick={() => handleViewDetails(campaign)}
                    className="text-secondary hover:text-yellow-600 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {/* <div className="text-center mb-8">
        <button className="px-6 py-3 border border-gray-300 rounded-lg text-primary font-semibold hover:bg-[var(--secondaryhover)] bg-secondary transition-colors">
          Load More Campaigns
        </button>
      </div> */}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-8">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={!previousUrl}
          className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          ← First
        </button>

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={!previousUrl}
          className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Previous
        </button>

        <span className="px-4 py-2 text-sm font-medium text-gray-700">
          Page <span className="font-bold">{currentPage}</span> of{" "}
          <span className="font-bold">{Math.ceil(totalCount / ITEMS_PER_PAGE)}</span>
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={!nextUrl}
          className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next
        </button>

        <button
          onClick={() => setCurrentPage(Math.ceil(totalCount / ITEMS_PER_PAGE))}
          disabled={!nextUrl}
          className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Last →
        </button>
      </div>

      {/* Campaign Details Modal */}
      {isModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Campaign Details</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Campaign Image */}
              {selectedCampaign.campaign_poster && (
                <Image
                  width={500}
                  height={300}
                  src={selectedCampaign.campaign_poster}
                  alt={selectedCampaign.campaign_name}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              {/* Campaign Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedCampaign.campaign_name}
              </h3>

              {/* Campaign Status */}
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full capitalize">
                  {selectedCampaign.campaign_status}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h4>
                <p className="text-gray-600">{selectedCampaign.campaign_description}</p>
              </div>

              {/* Campaign Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    Objective
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {selectedCampaign.campaign_objective}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    Budget
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {selectedCampaign.budget_range}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    Timeline
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {selectedCampaign.campaign_timeline}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    Budget Type
                  </h4>
                  <p className="text-gray-900 font-medium">
                    {selectedCampaign.budget_type}
                  </p>
                </div>
              </div>

              {/* Content Deliverables */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Content Deliverables
                </h4>
                <p className="text-gray-600">
                  {selectedCampaign.content_deliverables}
                </p>
              </div>

              {/* Payment Preference */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Preference
                </h4>
                <p className="text-gray-600">{selectedCampaign.payment_preference}</p>
              </div>

              {/* Target Audience */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Target Audience
                </h4>
                <p className="text-gray-600">{selectedCampaign.target_audience}</p>
              </div>

              {/* Keywords and Hashtags */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Keywords & Hashtags
                </h4>
                <p className="text-gray-600">{selectedCampaign.keywords_and_hashtags}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    Content Approval Required
                  </h4>
                  <p className="text-gray-900">
                    {selectedCampaign.content_approval_required ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    Auto-match Micro Influencers
                  </h4>
                  <p className="text-gray-900">
                    {selectedCampaign.auto_match_micro_influencers ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3 justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={handleConnectWithOwner}
                className="px-6 py-2 bg-secondary text-primary rounded-lg font-medium hover:bg-[var(--secondaryhover)]"
              >
                Connect with Owner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}