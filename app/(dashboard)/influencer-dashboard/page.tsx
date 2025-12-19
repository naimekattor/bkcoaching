"use client";
import { apiClient } from "@/lib/apiClient";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaPlus } from 'react-icons/fa';
import { TbMessageCircleFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { X, Calendar, Paperclip, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

// --- Interfaces ---
interface Attachment {
  id: number;
  link: string;
}

interface Campaign {
  id: number;
  owner_id: number;
  hired_influencer_id: number;
  start_date: string;
  end_date: string;
  proposal_message: string;
  campaign_deliverables: string | null;
  attachments: Attachment[] | null;
  // We add this optional field to handle the UI state after acceptance
  is_accepted_by_influencer?: boolean;
  budget: number;
}

interface InfluencerProfileInfo {
  profile_picture?: string | null;
  display_name?: string;
  content_niches?: string;
}

interface RoomData {
  room_id: string;
  other_user_id: string;
  other_user_avatar?: string | null;
  name?: string | null;
  last_message?: string | null;
  timestamp: string;
  brand_logo?: string | null;
  unread_count?: number;
  is_online?: boolean;
  profile_picture?: string;
}
const getSafeImageSrc = (src?: string) => {
  if (
    !src ||
    src === "profile_picture" ||
    src === "null" ||
    src === "undefined"
  ) {
    return "/images/person.jpg";
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("/")) {
    return src;
  }

  return `/${src}`;
};

export default function Page() {
  const [influencerProfile, setInfluencerProfile] =
    useState<InfluencerProfileInfo | null>(null);
  const [roomData, setRoomData] = useState<RoomData[]>([]);

  // --- Campaign States ---
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  console.log(user);

  // const store = useAuthStore.getState();

  // 1. Fetch User Info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient("user_service/get_user_info/", {
          method: "GET",
          auth: true,
        });
        // store.setUser(res.data);
        setUser(res.data);
      } catch (error) {
        console.error("❌ API Error:", error);
      }
    };
    fetchUser();
  }, []);

  // 2. Fetch Rooms (Messages)
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const res = await apiClient("chat_service/get_my_rooms/", {
          method: "GET",
          auth: true,
        });
        setRoomData(res.data);
      } catch (error) {
        console.error("❌ API Error:", error);
      }
    };
    fetchAllRooms();
  }, []);

  // 3. Fetch Campaigns (Proposals)
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await apiClient(
          "campaign_service/get_my_previous_where_i_was_hired/",
          {
            method: "GET",
            auth: true,
          }
        );
        if (res.data) {
          setCampaigns(res.data);
        }
      } catch (error) {
        console.error("❌ Campaign Fetch Error:", error);
      } finally {
        setLoadingCampaigns(false);
      }
    };
    fetchCampaigns();
  }, []);

  // --- Helper Functions ---
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const formatDateRange = (start: string, end: string) => {
    const s = new Date(start).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    const e = new Date(end).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${s} - ${e}`;
  };

  // --- Action Handler (Accept Offer) ---
  const handleCampaignAction = async (
    campaignId: number,
    action: "accept" | "reject"
  ) => {
    if (action === "accept") {
      try {
        // 1. Call API
        const res = await apiClient(
          `campaign_service/accept_offer/${campaignId}/`,
          {
            method: "PATCH",
            auth: true,
          }
        );

        // 2. Handle Success
        if (res?.code === 200 || res?.status === "success") {
          // 3. Update Local State: Mark this campaign as Accepted (do not remove it)
          setCampaigns((prevCampaigns) =>
            prevCampaigns.map((camp) =>
              camp.id === campaignId ? { ...camp, is_accepted: true } : camp
            )
          );

          toast(res.data?.message || "Successfully Accepted the offer! 🎉");
          setSelectedCampaign(null); // Close modal
        } else {
          toast("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Accept Error:", error);
        toast("Failed to accept the offer. Please try again.");
      }
    } else {
      // Logic for Reject (Placeholder)
      const confirmReject = confirm(
        "Are you sure you want to reject this campaign?"
      );
      if (confirmReject) {
        toast("Offer rejected locally.");
        // Ideally call a reject API here
        setCampaigns((prev) => prev.filter((c) => c.id !== campaignId));
        setSelectedCampaign(null);
      }
    }
  };

  console.log(campaigns);

  const acceptedCampaign=campaigns.filter((campaign)=>campaign.is_accepted_by_influencer==true);
  

  const totalEarnings = acceptedCampaign.reduce((acc, curr) => acc + curr.budget, 0);
  const profileSrc: string =
    typeof user?.influencer_profile?.profile_picture === "string" &&
    user.influencer_profile.profile_picture !== ""
      ? user.influencer_profile.profile_picture
      : "/images/person.jpg";

  const profileName: string =
    typeof user?.influencer_profile?.display_name === "string" &&
    user.influencer_profile.display_name !== ""
      ? user.influencer_profile.display_name
      : "User Avatar";

  return (
    <div className="relative">
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 sm:p-6 transition-shadow hover:shadow-lg">
  
  {/* --- Top Row: Greeting + Action --- */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    
    {/* Greeting + Profile */}
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Image
          src={profileSrc}
          width={64}
          height={64}
          alt={profileName}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Welcome back, {String(user?.influencer_profile?.display_name) || "User"}! 👋
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Ready to grow your influence today?
        </p>
      </div>
    </div>

    {/* Action Button */}
    <div className="flex gap-2">
      <Link
        href="/influencer-dashboard/settings"
        className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-medium rounded-lg bg-secondary  text-primary transition"
      >
        <FaEdit /> Edit Profile
      </Link>
    </div>
  </div>

  {/* --- Stats Cards --- */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    {[
      {
        value: campaigns.length,
        label: "Total Campaigns",
        icon: "📊",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
      },
      {
        value: `$${totalEarnings}`,
        label: "Earnings",
        icon: "💰",
        bgColor: "bg-green-100",
        textColor: "text-green-700",
      },
      {
        value: "0",
        label: "New Messages",
        icon: "✉️",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
      },
    ].map((item, index) => (
      <div
        key={index}
        className={`rounded-xl p-5 flex flex-col items-center justify-center gap-2 ${item.bgColor}`}
      >
        <div className={`text-3xl font-bold ${item.textColor}`}>{item.value}</div>
        <div className={`text-sm font-medium ${item.textColor} flex items-center gap-1`}>
          <span>{item.icon}</span> {item.label}
        </div>
      </div>
    ))}
  </div>
</div>


        <div className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {/* --- My Campaigns Section --- */}
            <div className=" border-[#E5E7EB] shadow border-[1px] rounded p-6 h-[420px] flex flex-col">
              <div className="flex items-center space-x-2 mb-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">
                  My Campaigns{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({campaigns.length})
                  </span>
                </h2>
              </div>

              {/* Scrollable List */}
              <div className="space-y-4 overflow-y-auto flex-grow pr-2 custom-scrollbar">
                {loadingCampaigns ? (
                  <div className="text-center py-10 text-gray-500">
                    Loading campaigns...
                  </div>
                ) : campaigns.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No campaigns found.
                  </div>
                ) : (
                  campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      onClick={() => setSelectedCampaign(campaign)}
                      className={`flex justify-between items-center p-4 border rounded-xl cursor-pointer transition-colors group ${
                        campaign.is_accepted_by_influencer
                          ? "bg-green-50 border-green-200"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                          Campaign #{campaign.id}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {campaign.proposal_message ||
                            "No description provided"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDateRange(
                            campaign.start_date,
                            campaign.end_date
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        {campaign.is_accepted_by_influencer ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-200 rounded-full px-3 py-1">
                            <CheckCircle className="w-3 h-3" />
                            Accepted
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-primary bg-secondary rounded px-4 py-2">
                            View Offer
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="border-[#E5E7EB] shadow border-[1px] rounded p-6 ">
              <div className="flex items-center space-x-2 mb-4">
                <TbMessageCircleFilled className="text-secondary text-[24px]" />
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              </div>
              <div className="space-y-4">
                {roomData.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No messages found
                  </div>
                ) : (
                  roomData.slice(0, 2).map((room, index) => {
                    const profile_picture=getSafeImageSrc(room.profile_picture ||
                          room.brand_logo ||
                          "/images/person.jpg")
                          const name=room.name || "Avatar"
                          const otherUserId=room?.other_user_id;
                          

                          return (
                            <Link href={`/influencer-dashboard/messages?id=${otherUserId}`}>
                            <div
                      key={room.room_id || index}
                      className="flex items-start space-x-4 py-4 border-b border-gray-100 last:border-0"
                    >
                      <Image
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                        src={profile_picture}
                        alt={name}
                      />
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-gray-900 truncate">
                            {room.name || room.other_user_id || "Unknown User"}
                          </span>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                            {formatTime(room.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {room.last_message || "No messages yet"}
                        </p>
                      </div>
                    </div>
                    </Link>
                          )
                    }
                  )
                )}
              </div>
            </div>

            {/* Media Kit */}
            {/* <div className="border-[#E5E7EB] shadow border-[1px] rounded p-6 flex flex-col items-center text-center h-[420px]">
              <div className="flex items-center space-x-2 mb-4 self-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7v4a2 2 0 002 2h4a2 2 0 002-2V7m-4 10h4m-4 0v-4m0 4h.01M12 14v4m0 0h.01M12 14h.01M12 14v.01"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Media Kit</h2>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center p-4 border-2 border-dashed bg-[#f9fafb] rounded-xl w-full mb-4">
                <Image
                  width={48}
                  height={48}
                  src="https://placehold.co/60x80/e5e7eb/6b7280?text=PDF"
                  alt="PDF icon"
                  className="w-12 h-16 mb-2"
                />
                <p className="text-gray-500 text-sm">Your media kit preview</p>
              </div>
              <div className="w-full space-y-2">
                <button className="w-full bg-secondary text-gray-800 font-semibold py-3 rounded shadow hover:bg-[var(--secondaryhover)] transition-colors">
                  View Media Kit
                </button>
                <button className="w-full bg-[#f3f4f6] text-gray-800 font-semibold py-3 rounded shadow transition-colors">
                  Edit Media Kit
                </button>
              </div>
            </div> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            

            {/* Earnings */}
            {/* <div className="border-[#E5E7EB] shadow border-[1px] rounded p-6 flex flex-col items-center text-center lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4 self-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3v2a3 3 0 006 0v-2c0-1.657-1.343-3-3-3zM7 13h10"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Earnings</h2>
              </div>
              <div className="bg-green-100 rounded-xl p-4 w-full flex flex-col items-center justify-center space-y-2 mb-4">
                <span className="text-sm text-gray-600">Total Earnings</span>
                <span className="text-3xl font-bold text-green-600">
                  {`$${totalEarnings}`}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  +15% this month
                </span>
              </div>
              <div className="w-full space-y-2">
                <button className="w-full bg-secondary text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:bg-[var(--secondaryhover)] transition-colors">
                  Withdraw
                </button>
                <button className="w-full bg-secondary text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:bg-[var(--secondaryhover)] transition-colors">
                  Payment Methods
                </button>
              </div>
            </div> */}
          </div>

          {/* Content Niche */}
          <div className="w-full">
            <div className="border-[#E5E7EB] shadow border-[1px] mt-4 rounded p-6 ">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-secondary"><FaPlus/></span>
                <h2 className="text-xl font-bold text-gray-900">
                  Content Niche
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {influencerProfile?.content_niches ? (
                  influencerProfile.content_niches.split(",").map((tag) => (
                    <span
                      key={tag.trim()}
                      className="bg-secondary text-primary rounded-full px-4 py-2 text-sm font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-center text-gray-500">
                    No Niches Added
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Campaign Detail Modal --- */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Campaign Details
                </h3>
                <p className="text-sm text-gray-500">
                  ID: #{selectedCampaign.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Date Section */}
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      Campaign Timeline
                    </p>
                    <p className="text-sm text-primary mt-1">
                      {formatDateRange(
                        selectedCampaign.start_date,
                        selectedCampaign.end_date
                      )}
                    </p>
                  </div>
                </div>
                <div className="font-semibold text-primary text-lg">
                  <h4>Budget is:{selectedCampaign.budget}$</h4>
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-lg mb-2">
                    Content Deliverables
                  </h4>
                  {selectedCampaign.campaign_deliverables &&
                    (() => {
                      try {
                        const deliverablesArray =
                          typeof selectedCampaign.campaign_deliverables ===
                          "string"
                            ? JSON.parse(selectedCampaign.campaign_deliverables)
                            : selectedCampaign.campaign_deliverables;

                        // 2. Render the array
                        if (Array.isArray(deliverablesArray)) {
                          return (
                            <div className="flex flex-wrap gap-2">
                              {deliverablesArray.map(
                                (item: string, index: number) => (
                                  <span
                                    key={index}
                                    className="bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-medium border border-blue-100 capitalize"
                                  >
                                    {/* 3. Format "socialPost" to "Social Post" using Regex */}
                                    {item.replace(/([A-Z])/g, " $1").trim()}
                                  </span>
                                )
                              )}
                            </div>
                          );
                        }
                        return null;
                      } catch (e) {
                        console.error("Error parsing deliverables", e);
                        return (
                          <p className="text-sm text-gray-500">
                            No deliverables specified
                          </p>
                        );
                      }
                    })()}
                </div>

                {/* Proposal Section */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Proposal Message
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedCampaign.proposal_message}
                  </div>
                </div>

                {/* Attachments Section */}
                {selectedCampaign.attachments &&
                  selectedCampaign.attachments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Paperclip className="w-4 h-4" /> Attachments
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedCampaign.attachments.map((att) => (
                          <Link
                            href={att.link}
                            key={att.id}
                            target="_blank"
                            className="group relative block overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-colors"
                          >
                            <div className="aspect-video bg-gray-100 relative">
                              {/* Simple check for image extension for preview, otherwise generic icon */}
                              {/\.(jpg|jpeg|png|gif|webp)$/i.test(att.link) ? (
                                <Image
                                  src={att.link}
                                  alt="Attachment"
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                  <Paperclip className="w-8 h-8" />
                                </div>
                              )}
                            </div>
                            <div className="p-2 bg-white text-xs text-center text-gray-600 truncate px-2">
                              View Attachment {att.id}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Modal Footer (Action Buttons) */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex gap-3">
              {/* Only show actions if not already accepted (or handle UI state) */}
              {selectedCampaign.is_accepted_by_influencer ? (
                <div className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-xl font-bold">
                  <CheckCircle className="w-5 h-5" />
                  Offer Accepted
                </div>
              ) : (
                <>
                  {/* <button
                    onClick={() =>
                      handleCampaignAction(selectedCampaign.id, "reject")
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-700 bg-white hover:bg-red-50 rounded-xl font-semibold transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button> */}
                  <button
                    onClick={() =>
                      handleCampaignAction(selectedCampaign.id, "accept")
                    }
                    className="flex-1 flex items-center cursor-pointer justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Accept Campaign
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
