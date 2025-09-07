"use client";
import { useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Bookmark,
  Copy,
  Star,
  MapPin,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  FileText,
  Video,
  ImageIcon,
} from "lucide-react";
import { mockBrands } from "@/lib/mocks/brands";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function BrandProfilePage() {
  const params = useParams<{ id: string }>();
  let brand = mockBrands.find((b) => b.id === params.id);

  // Fallback: support numeric IDs by mapping 1-based index to brands list
  if (!brand) {
    const asNumber = Number(params.id);
    if (
      !Number.isNaN(asNumber) &&
      asNumber >= 1 &&
      asNumber <= mockBrands.length
    ) {
      brand = mockBrands[asNumber - 1];
    }
  }

  if (!brand) {
    notFound();
  }

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/influencer-dashboard/brand"
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-gray-600">Back</span>
        </div>

        {/* Brand Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                {brand.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {brand.name}
                  </h1>
                  {brand.verified && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Verified
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{brand.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {brand.website}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {brand.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About the Company */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About the Company
              </h2>
              <p className="text-gray-600 mb-6">{brand.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mission</h3>
                  <p className="text-gray-600 text-sm">{brand.mission}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Business Type
                  </h3>
                  <p className="text-gray-600 text-sm">{brand.businessType}</p>
                </div>
              </div>
            </div>

            {/* Campaign Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Campaign
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {brand.campaigns.total}
                  </div>
                  <div className="text-sm text-gray-600">Total Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {brand.campaigns.creators}
                  </div>
                  <div className="text-sm text-gray-600">Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {brand.campaigns.avgRating}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    ${brand.campaigns.totalInvested / 1000}K
                  </div>
                  <div className="text-sm text-gray-600">Total Invested</div>
                </div>
              </div>
            </div>

            {/* Active Campaigns */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Active Campaigns
              </h2>
              <div className="space-y-4">
                {brand.activeCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {campaign.title}
                      </h3>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        {campaign.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {campaign.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Deadline: {campaign.deadline}</span>
                      <div className="flex items-center gap-4">
                        <span>{campaign.creatorsNeeded} Creators needed</span>
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs">
                            +2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews & Testimonials */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Reviews & Testimonials
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {brand.campaigns.avgRating}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(brand.campaigns.avgRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Based on {brand.reviews.length}+ reviews
                </span>
              </div>
              <div className="space-y-4">
                {brand.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-l-4 border-green-500 pl-4"
                  >
                    <p className="text-gray-700 mb-2">&quot;{review.comment}&quot;</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <span className="font-medium">{review.reviewer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    {brand.contactPerson.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {brand.contactPerson.title}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {brand.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {brand.phone}
                </div>
                <div className="flex gap-2">
                  {brand.socialLinks.linkedin && (
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  {brand.socialLinks.twitter && (
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Twitter className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  {brand.socialLinks.instagram && (
                    <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-pink-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Business Resources */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Business Resources
              </h2>
              <div className="space-y-3">
                {brand.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      {resource.type.includes("Video") ? (
                        <Video className="w-4 h-4 text-blue-600" />
                      ) : resource.type.includes("Media") ? (
                        <ImageIcon className="w-4 h-4 text-blue-600" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {resource.type}
                      </div>
                      <div className="text-xs text-gray-600">
                        {resource.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Profile */}
            <div className="bg-primary rounded p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">Share Profile</h2>
              <button
                onClick={handleCopyLink}
                className="w-full bg-[#E5E7EB]/50 cursor-pointer text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
