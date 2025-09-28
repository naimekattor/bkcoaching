"use client";

import { useState } from "react";
import { Search, MoreHorizontal, DollarSign, CircleCheck } from "lucide-react";
import { mockCampaigns } from "@/lib/mocks/campaigns";
import { StatCard } from "@/components/cards/stat-card";
import { Megaphone } from "lucide-react";
import Image from "next/image";

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [platformFilter, setPlatformFilter] = useState("All Platforms");
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

  return (
    <div className="p-8">
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
          // subtitle="Unique Creators in your network"
          icon={<DollarSign className="w-8 h-8 text-purple-600" />}
        />
        {/* <div className="bg-white rounded-lg border border-gray-200 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-white mb-1">
              Launch New Campaign
            </p>
            <p className="text-sm text-white/90 mb-4">
              Start a new collaboration project today
            </p>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors w-full">
              Launch Campaign
            </button>
          </div>
          <Rocket className="absolute top-4 right-4 w-8 h-8 text-white/20" />
        </div> */}
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
        {mockCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="relative">
              <Image
                width={500}
                height={192}
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === "Active"
                      ? "bg-secondary text-primary"
                      : campaign.status === "Completed"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-primary"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {campaign.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {campaign.description}
              </p>

              <div className="flex items-center gap-2 mb-4">
                {campaign.platforms.includes("instagram") && (
                  <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                    <span className="text-xs">📷</span>
                  </div>
                )}
                {campaign.platforms.includes("tiktok") && (
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-xs text-white">🎵</span>
                  </div>
                )}
                {campaign.platforms.includes("youtube") && (
                  <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-xs">📺</span>
                  </div>
                )}
                <div className="flex -space-x-2 ml-2">
                  {Array.from({ length: campaign.collaborators }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"
                      ></div>
                    )
                  )}
                  {campaign.collaborators > 0 && (
                    <span className="text-xs text-gray-500 ml-2">
                      +{campaign.collaborators}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-medium">Budget</span>
                  <p className="font-semibold text-gray-900">
                    ${campaign.budget.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Target Reach</span>
                  <p className="font-semibold text-gray-900">
                    {campaign.targetReach}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {campaign.endDate}
                </span>
                <button className="text-secondary hover:text-yellow-600 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 border border-gray-300 rounded-lg text-primary font-semibold hover:bg-yellow-600 bg-secondary transition-colors">
          Load More Campaigns
        </button>
      </div>
    </div>
  );
}
