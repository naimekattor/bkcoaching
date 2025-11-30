"use client";

import { useEffect, useState } from "react";
import {
  Search,
  MoreHorizontal,
  X,
  Pause,
  Play,
  Trash,
  Instagram,
  ChartArea,
  Users,
  Rocket,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import CreateCampaignModal from "../../../../components/brand/CreateCampaignModal";
import {
  FaBook,
  FaLinkedin,
  FaPodcast,
  FaQuestionCircle,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";
import { apiClient } from "@/lib/apiClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiSpeakerphone } from "react-icons/hi";
import { motion } from 'framer-motion';

/* -------------------------------------------------
   Types
------------------------------------------------- */
interface PlatformConfig {
  match: string;
  icon: React.ReactNode;
  className: string;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "active" | "paused" | "completed";
  budget: string;
  budgetType: string;
  targetReach: string;
  timeLeft: string;
  progress: number;
  platforms: string[];
  assignedCreators: Creator[];
  objective: string;
  timeline: string;
  deliverables: string[];
  paymentPreferences: string[];
  keywords: string[];
  targetAudience: string;
  approvalRequired: boolean;
  autoMatch: boolean;
  campaignOwner: string;
}

interface Creator {
  id: string;
  name: string;
  avatar?: string;
  followers?: string;
}

type CampaignApiResponse = {
  id: string;
  campaign_name?: string;
  campaign_description?: string;
  campaign_poster?: string;
  campaign_status?: string;
  budget_range?: string;
  budget_type?: string;
  campaign_timeline?: string;
  campaign_objective?: string;
  content_deliverables?: string;
  payment_preference?: string;
  keywords_and_hashtags?: string;
  target_audience?: string;
  content_approval_required?: boolean;
  auto_match_micro_influencers?: boolean;
  campaign_owner: string;
};

interface HiringCampaign{
  id:string;
}

/* -------------------------------------------------
   Platform icons
------------------------------------------------- */
const PLATFORM_CONFIG: PlatformConfig[] = [
  {
    match: "instagram",
    icon: <Instagram className="w-4 h-4" />,
    className: "text-[#E4405F]",
  },
  {
    match: "tiktok",
    icon: <FaTiktok className="w-4 h-4" />,
    className: "text-black",
  },
  {
    match: "facebook",
    icon: <FaFacebook className="w-4 h-4" />,
    className: "text-[#1877F2]",
  },
  {
    match: "youtube",
    icon: <FaYoutube className="w-4 h-4" />,
    className: "text-[#FF0000]",
  },
  {
    match: "linkedin",
    icon: <FaLinkedin className="w-4 h-4" />,
    className: "text-[#0A66C2]",
  },
  {
    match: "whatsapp",
    icon: <FaWhatsapp className="w-4 h-4" />,
    className: "text-[#25D366]",
  },
  {
    match: "blog",
    icon: <FaBook className="w-4 h-4" />,
    className: "text-gray-700",
  },
  {
    match: "podcast",
    icon: <FaPodcast className="w-4 h-4" />,
    className: "text-purple-600",
  },
];

const getPlatformConfig = (deliverable: string) => {
  return (
    PLATFORM_CONFIG.find((c) =>
      deliverable.toLowerCase().includes(c.match)
    ) ?? {
      icon: <FaQuestionCircle className="w-4 h-4" />,
      className: "text-gray-400",
    }
  );
};

/* -------------------------------------------------
   Component
------------------------------------------------- */
export default function CampaignDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [previousHirings,setPreviousHirings]=useState<HiringCampaign[]>([]);

  /* ---------- Stats (no type errors) ---------- */
  const stats = [
    {
      title: "Total Campaigns",
      value: allCampaigns.length,
      subtitle: "Currently active and completed",
      icon: <HiSpeakerphone className="w-8 h-8 text-primary" />,
      color: "bg-white",
    },
    {
      title: "Active Campaigns",
      value: allCampaigns.filter((c) => c.status === "active").length,
      subtitle: "Campaigns running this month",
      icon: <Play className="w-8 h-8 text-primary" />,
      color: "bg-green-50",
    },
    {
      title: "Influencers Hired",
      value: previousHirings.length,
      subtitle: "Unique influencers in your network",
      icon: <Users className="w-8 h-8 text-primary" />,
      color: "bg-purple-50",
    },
    {
      title: "Launch New Campaign",
      value: "",
      subtitle: "Start a new campaign project today",
      icon: <Rocket className="w-8 h-8 text-primary" />,
      color: "bg-orange-50",
      isAction: true,
    },
  ];

  /* ---------- Filters ---------- */
  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || campaign.status.toLowerCase() === statusFilter;

    const matchesPlatform =
      platformFilter === "all" ||
      campaign.platforms.some((p) => p.toLowerCase() === platformFilter);

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const openCampaignModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };
  const closeCampaignModal = () => setSelectedCampaign(null);

  /* ---------- Fetch campaigns ---------- */
  useEffect(() => {
    const fetchAllCampaigns = async () => {
      try {
        const res = await apiClient("campaign_service/get_my_all_campaigns/", {
          method: "GET",
          auth: true,
        });

        const campaignsArray = Array.isArray(res.data)
          ? [...res.data].reverse()
          : [];

        const transformed: Campaign[] = campaignsArray.map((c: CampaignApiResponse) => ({
          id: c.id,
          title: c.campaign_name || "Untitled Campaign",
          description: c.campaign_description || "",
          image: c.campaign_poster || "/images/placeholder-image.png",
          status: (c.campaign_status || "active") as
            | "active"
            | "paused"
            | "completed",

          budget: c.budget_range ? `$${c.budget_range}` : "$0",
          budgetType: c.budget_type || "total",
          targetReach: "200K",
          timeLeft: c.campaign_timeline || "N/A",
          progress: 0,

          platforms: [], 
          assignedCreators: [],

          objective: c.campaign_objective || "",
          timeline: c.campaign_timeline || "",

          deliverables: c.content_deliverables
            ? c.content_deliverables.split(",").map((d: string) => d.trim())
            : [],

          paymentPreferences: c.payment_preference
            ? c.payment_preference.split(",").map((p: string) => p.trim())
            : [],

          keywords: c.keywords_and_hashtags
            ? c.keywords_and_hashtags.split(",").map((k: string) => k.trim())
            : [],

          targetAudience: c.target_audience || "",
          approvalRequired: !!c.content_approval_required,
          autoMatch: !!c.auto_match_micro_influencers,
          campaignOwner: c.campaign_owner,
        }));

        setAllCampaigns(transformed);
      } catch (error) {
        console.error("API Error:", error);
        setAllCampaigns([]);
      }
    };

    fetchAllCampaigns();
  }, []);


  useEffect(()=>
  {
    const fetchPreviousHirings=async()=>{
      try {
        const hiringsRes = await apiClient("campaign_service/get_my_previous_hirings/", {
            method: "GET",
            auth: true,
        });
        
        if (hiringsRes.data && Array.isArray(hiringsRes.data)) {
            setPreviousHirings(hiringsRes.data);
        }
      } catch (error) {
        
      }
    }

    fetchPreviousHirings();

  },[])

  /* ---------- Pause / Resume ---------- */
  const handlePauseResume = async (event: Event, campaign: Campaign) => {
    event.preventDefault();
    event.stopPropagation();

    const isActive = campaign.status.toLowerCase() === "active";
    const newStatus = isActive ? "paused" : "active";

    try {
      await apiClient(`campaign_service/update_a_campaign/${campaign.id}/`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({ campaign_status: newStatus }),
      });

      setAllCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaign.id
            ? { ...c, status: newStatus as "active" | "paused" }
            : c
        )
      );
    } catch (err) {
      console.error("Pause/Resume failed", err);
    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = async (event: Event, campaign: Campaign) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await apiClient(`campaign_service/delete_a_campaign/${campaign.id}/`, {
        method: "DELETE",
        auth: true,
      });

      setAllCampaigns((prev) => prev.filter((c) => c.id !== campaign.id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleCampaignCreated = (newCampaign: Campaign) => {
  setAllCampaigns((prev) => [newCampaign, ...prev]); 
  setShowModal(false);
};

  /* -------------------------------------------------
     Render
  ------------------------------------------------- */
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-gray-200 px-6 py-4">
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${stat.color} border-0 rounded-lg shadow-sm`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    {stat.value !== undefined && (
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
                {stat.isAction && (
  <motion.button
    whileHover={{
      y: -2,               // lift upward (rocket motion)
      scale: 1.01,         // slightly enlarge
      transition: { type: "spring", stiffness: 400, damping: 10 },
    }}
    className="w-full mt-4 bg-secondary cursor-pointer hover:bg-[var(--secondaryhover)] text-primary px-4 py-2 rounded-md font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
    onClick={() => setShowModal(true)}
  >
    🚀 Launch Campaign
  </motion.button>
)}
              </div>
            </div>
          ))}
        </div>

        <CreateCampaignModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleCampaignCreated}
        />

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

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
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-lg border border-gray-200 transform transition-transform duration-300 hover:scale-102"
            >
              <div className="relative">
                <Image
                  width={600}
                  height={192}
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <span
                  className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-md transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onSelect={(event) => handlePauseResume(event, campaign)}
                    >
                      {campaign.status.toLowerCase() === "active" ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Resume
                        </>
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onSelect={(event) => handleDelete(event, campaign)}
                    >
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {campaign.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  {campaign.deliverables.map((item, idx) => {
                    const { icon, className } = getPlatformConfig(item);
                    return (
                      <div
                        key={idx}
                        className={`w-4 h-4 rounded flex items-center justify-center ${className}`}
                      >
                        {icon}
                      </div>
                    );
                  })}

                  {/* Assigned creators avatars */}
                  <div className="flex -space-x-2 ml-2">
                    {campaign.assignedCreators
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
                    {campaign.assignedCreators.length > 3 && (
                      <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs">
                          +{campaign.assignedCreators.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm mb-4">
                  <div>
                    <span className="text-gray-500">Budget</span>
                    <p className="font-semibold">{campaign.budget}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Target Reach</span>
                    <p className="font-semibold">{campaign.targetReach}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {campaign.timeLeft}
                  </span>
                  <button
                    className="text-secondary hover:text-yellow-600 text-sm font-medium"
                    onClick={() => openCampaignModal(campaign)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center">
          <button className="px-8 py-2 border border-gray-300 rounded-md bg-secondary text-primary font-semibold hover:bg-[var(--secondaryhover)] transition-colors">
            Load More Campaigns
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[100vh] overflow-y-auto">
            <div className="relative">
              <Image
                width={600}
                height={192}
                src={selectedCampaign.image}
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
                  <button className="bg-secondary text-primary px-8 py-2 font-semibold rounded cursor-pointer">
                    Pay Now
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
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Assigned Influencers</h3>
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
                            width={600}
                            height={600}
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
