"use client";

import { useEffect, useState } from "react";
import { Search, MoreHorizontal, X, Instagram, Facebook } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import CreateCampaignModal from "../../../../components/brand/CreateCampaignModal";
import { FaTiktok } from "react-icons/fa";
import { apiClient } from "@/lib/apiClient";

const mockCampaigns = [
  {
    id: 1,
    title: "Summer Skincare Launch",
    description:
      "Promoting our new vitamin C serum with micro-influencers in beauty niche",
    image:
      "https://quickframe.com/wp-content/uploads/2024/08/QF-Blog-12-Influencer-Marketing-Statistics-You-Need-To-Know_1920x1080.jpg",
    status: "Active",
    budget: "$5,000",
    targetReach: "200K",
    timeLeft: "Ends in 5 days",
    progress: 75,
    platforms: ["tiktok", "instagram"],
    assignedCreators: [
      {
        id: 1,
        name: "@beautybymma",
        followers: "450K followers",
        avatar:
          "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1758083672~exp=1758087272~hmac=14c26c763573e15ba83a5f5c48813a88ada64d28f9985c589874ef81d6c231df&w=1480",
      },
      {
        id: 2,
        name: "@glowgoddess",
        followers: "320K followers",
        avatar:
          "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?t=st=1758083742~exp=1758087342~hmac=8a6e6f780f73d8cecf394c9846cba03befab95ac7b0691e4c508289aa5bf261e&w=1060",
      },
    ],
  },
  {
    id: 2,
    title: "Tech Gadget Unboxing",
    description:
      "Unboxing videos for our new wireless earbuds with tech reviewers",
    image:
      "https://img.freepik.com/free-photo/young-man-filming-podcast-episode-camera-studio-live-broadcasting-online-discussion-create-social-media-content-male-influencer-vlogging-show-with-livestream-equipment_482257-47438.jpg?t=st=1758083862~exp=1758087462~hmac=7e9c6c3b03bd876c1997a2f76e1a4e5875e70025a54f3274388d4cacf0738918&w=1060",
    status: "Active",
    budget: "$8,000",
    targetReach: "200K",
    timeLeft: "Ends in 5 days",
    progress: 60,
    platforms: ["youtube", "instagram"],
    assignedCreators: [
      {
        id: 3,
        name: "@techreviewpro",
        followers: "1.2M followers",
        avatar:
          "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1758083672~exp=1758087272~hmac=14c26c763573e15ba83a5f5c48813a88ada64d28f9985c589874ef81d6c231df&w=1480",
      },
      {
        id: 4,
        name: "@gadgetguru",
        followers: "890K followers",
        avatar:
          "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?t=st=1758083742~exp=1758087342~hmac=8a6e6f780f73d8cecf394c9846cba03befab95ac7b0691e4c508289aa5bf261e&w=1060",
      },
    ],
  },
  {
    id: 3,
    title: "Fitness Challenge",
    description: "30-day fitness challenge with health and wellness Creators",
    image:
      "https://img.freepik.com/free-vector/influencer-recording-new-video_23-2148526236.jpg?t=st=1758083924~exp=1758087524~hmac=59e5d1adca0117a098d11a46e4cd352268b10592eccb3da5243c48cf2c80e688&w=1060",
    status: "Completed",
    budget: "$5,000",
    targetReach: "200K",
    timeLeft: "Completed 2 weeks ago",
    progress: 100,
    platforms: ["instagram", "tiktok"],
    assignedCreators: [
      {
        id: 5,
        name: "@fitnessqueen",
        followers: "650K followers",
        avatar:
          "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1758083672~exp=1758087272~hmac=14c26c763573e15ba83a5f5c48813a88ada64d28f9985c589874ef81d6c231df&w=1480",
      },
      {
        id: 6,
        name: "@workoutking",
        followers: "420K followers",
        avatar:
          "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?t=st=1758083742~exp=1758087342~hmac=8a6e6f780f73d8cecf394c9846cba03befab95ac7b0691e4c508289aa5bf261e&w=1060",
      },
    ],
  },
];

const stats = [
  {
    title: "Total Campaigns",
    value: "24",
    subtitle: "Currently active and completed",
    icon: "📊",
    color: "bg-white",
  },
  {
    title: "Active Campaigns",
    value: "8",
    subtitle: "Campaigns running this month",
    icon: "▶️",
    color: "bg-green-50",
  },
  {
    title: "Creators Hired",
    value: "1,500",
    subtitle: "Unique creators in your network",
    icon: "👥",
    color: "bg-purple-50",
  },
  {
    title: "Launch New Campaign",
    value: "",
    subtitle: "Start a new campaign project today",
    icon: "🚀",
    color: "bg-orange-50",
    isAction: true,
  },
];

export default function CampaignDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [allCampaigns, setAllCampaigns] = useState([]);

  // const filteredCampaigns = mockCampaigns.filter((campaign) => {
  //   const matchesSearch = campaign.title
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());

  //   const matchesStatus =
  //     statusFilter === "all" || campaign.status.toLowerCase() === statusFilter;

  //   const matchesPlatform =
  //     platformFilter === "all" ||
  //     campaign.platforms.includes(platformFilter.toLowerCase());

  //   return matchesSearch && matchesStatus && matchesPlatform;
  // });

  const openCampaignModal = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const closeCampaignModal = () => {
    setSelectedCampaign(null);
  };

  useEffect(() => {
    const fetchAllCampaigns = async () => {
      try {
        const res = await apiClient("campaign_service/get_my_all_campaigns/", {
          method: "GET",
          auth: true,
        });

        console.log("Raw API Response:", res.data);

        const campaignsArray = Array.isArray(res.data) ? res.data : [];

        // Transform API response to match component expectations
        const transformedCampaigns = campaignsArray.map((campaign) => ({
          // Basic info
          id: campaign.id,
          title: campaign.campaign_name || "Untitled Campaign",
          description: campaign.campaign_description || "",
          image: campaign.campaign_poster || "/images/placeholder-image.png",
          status: campaign.campaign_status || "Active",

          // Budget & Timeline
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
            ? campaign.content_deliverables.split(",").map((d) => d.trim())
            : [],

          paymentPreferences: campaign.payment_preference
            ? campaign.payment_preference.split(",").map((p) => p.trim())
            : [],

          keywords: campaign.keywords_and_hashtags
            ? campaign.keywords_and_hashtags.split(",").map((k) => k.trim())
            : [],

          targetAudience: campaign.target_audience || "",

          approvalRequired: campaign.content_approval_required || false,
          autoMatch: campaign.auto_match_micro_influencers || false,

          campaignOwner: campaign.campaign_owner,
        }));

        console.log("Transformed Campaigns:", transformedCampaigns);
        setAllCampaigns(transformedCampaigns);
      } catch (error) {
        console.error("❌ API Error:", error);
        setAllCampaigns([]);
      }
    };

    fetchAllCampaigns();
  }, []);
  console.log(allCampaigns);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Campaign Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Create, manage and collaborate with campaigns
            </p>
          </div>
        </div>
      </header>

      <div className="">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} border-0 rounded-lg shadow-sm `}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    {stat.value && (
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {allCampaigns.length}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
                {stat.isAction && (
                  <button
                    className="w-full mt-4 bg-secondary hover:bg-[var(--secondaryhover)] text-primary px-4 py-2 rounded-md font-medium transition-colors"
                    onClick={() => setShowModal(true)}
                  >
                    Launch Campaign
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <CreateCampaignModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Platform Filter */}
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allCampaigns.length > 0 &&
            allCampaigns.map((campaign) => (
              <div
                key={campaign?.id}
                className="bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-lg  border border-gray-200 transform transition-transform duration-300 hover:scale-102"
                onClick={() => openCampaignModal(campaign)}
              >
                <div className="relative">
                  <Image
                    width={600}
                    height={192}
                    src={campaign?.image || "/placeholder.svg"}
                    alt={campaign?.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                      campaign?.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {campaign?.status}
                  </span>
                  <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-md transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4 ">
                  <h3 className="font-semibold text-lg mb-2">
                    {campaign?.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {campaign?.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    {campaign?.platforms.map((platform) => (
                      <div
                        key={platform}
                        className="w-6 h-6 text-primary rounded flex items-center justify-center"
                      >
                        <span className="text-xs">
                          {platform === "tiktok" ? (
                            <FaTiktok />
                          ) : platform === "instagram" ? (
                            <Instagram />
                          ) : (
                            <Facebook />
                          )}
                        </span>
                      </div>
                    ))}
                    <div className="flex -space-x-2 ml-2">
                      {campaign?.assignedCreators
                        .slice(0, 3)
                        .map((creator, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gray-300"
                          >
                            <Image
                              width={600}
                              height={600}
                              src={creator.avatar || "/placeholder.svg"}
                              alt={creator.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      {campaign?.assignedCreators.length > 3 && (
                        <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs">
                            +{campaign?.assignedCreators.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Budget</span>
                      <p className="font-semibold">{campaign?.budget}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Target Reach</span>
                      <p className="font-semibold">{campaign?.targetReach}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {campaign?.timeLeft}
                    </span>
                    <button className="text-secondary hover:text-yellow-600 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* Load More Button */}
        <div className="text-center">
          <button className="px-8 py-2 border border-gray-300 rounded-md bg-secondary text-primary font-semibold hover:bg-[var(--secondaryhover)] transition-colors">
            Load More Campaigns
          </button>
        </div>
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[100vh] overflow-y-auto">
            <div className="relative">
              <Image
                width={600}
                height={192}
                src={selectedCampaign.image || "/placeholder.svg"}
                alt={selectedCampaign.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-md transition-colors"
                onClick={closeCampaignModal}
              >
                <X className="h-4 w-4" />
              </button>
              <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {selectedCampaign.status}
              </span>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">
                    {selectedCampaign.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {selectedCampaign.description}
                  </p>
                </div>
                <div>
                  <button className=" bg-secondary text-primary px-8 py-2 font-semibold rounded cursor-pointer">
                    Pay Now{" "}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Campaign progress</span>
                  <span className="text-sm font-semibold">
                    {selectedCampaign.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${selectedCampaign.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Assigned Creators</h3>
                  <button className="text-secondary hover:text-primary text-sm font-medium">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedCampaign.assignedCreators.map((creator) => (
                    <div
                      key={creator.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                          <Image
                            height={600}
                            width={600}
                            src={creator.avatar || "/placeholder.svg"}
                            alt={creator.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{creator.name}</p>
                          <p className="text-xs text-gray-500">
                            {creator.followers}
                          </p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-secondary hover:bg-[var(--secondaryhover)] text-white text-sm rounded-md font-medium transition-colors">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
