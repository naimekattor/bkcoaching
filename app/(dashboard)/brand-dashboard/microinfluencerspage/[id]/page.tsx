"use client";

import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { MicroInfluencer } from "@/types/micro-influencer";

interface ActiveCampaignRecord {
  id?: string | number;
  title?: string;
  status?: string;
  description?: string;
  deadline?: string;
  creators_needed?: number;
}

interface ReviewRecord {
  id?: string | number;
  comment?: string;
  reviewer?: string;
}

interface ResourceRecord {
  type?: string;
  title?: string;
  url?: string;
}

interface InfluencerProfileResponse {
  id?: string | number;
  instagram_handle?: string;
  tiktok_handle?: string;
  youtube_handle?: string;
  linkedin_handle?: string;
  twitter_handle?: string;
  display_name?: string;
  short_bio?: string;
  profile_picture?: string | null;
  is_verified?: boolean;
  timezone?: string;
  website?: string;
  email?: string;
  phone?: string;
  platforms?: string[];
  mission?: string;
  niche?: string;
  category?: string;
  role?: string;
  title?: string;
  campaigns_total?: number;
  campaigns_creators?: number;
  engagement_rate?: number;
  campaigns_avg_rating?: number;
  campaigns_total_invested?: number;
  active_campaigns?: ActiveCampaignRecord[];
  reviews?: ReviewRecord[];
  resources?: ResourceRecord[];
  content_niches?: string;
  // Audience counts
  insta_follower?: number;
  facebook_follower?: number;
  tiktok_follower?: number;
  youtube_follower?: number;
  linkedin_follower?: number;
  twitter_follower?: number;
  podcast_follower?: number;
  blog_follower?: number;
  whatsapp_follower?: number;
  // Pricing fields
  rate_range_for_instagram_story?: string;
  rate_range_for_instagram_reel?: string;
  rate_range_for_facebook_post?: string | null;
  rate_range_for_tiktok_video?: string;
  rate_range_for_youtube_video?: string;
  rate_range_for_youtube_short?: string;
  rate_range_for_podcast_mention?: string;
  rate_range_for_blog_post?: string;
  rate_range_for_social_post?: string;
  rate_range_for_ugc_creation?: string;
  rate_range_for_live_stream?: string;
  rate_range_for_repost?: string;
  rate_range_for_whatsapp_status_post?: string;
  rate_range_for_affiliate_marketing_percent?: string;

  // Payment preferences
  payment_preferences?: string;
  response_time?: string;
}

interface ApiResponse {
  influencer_profile?: InfluencerProfileResponse;
}

export default function BrandProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [influencer, SetInfluencer] = useState<MicroInfluencer | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // -------------------------------------------------
  // 1. FETCH influencerby id
  // -------------------------------------------------
  useEffect(() => {
    const fetchInfluencer = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const res = await apiClient(`user_service/get_a_influencer/${id}/`, {
          method: "GET",
        });
        console.log(res);

        const profile = (res.data as ApiResponse | undefined)
          ?.influencer_profile;

        if (!profile) {
          throw new Error("Influencer profile not found");
        }

        // Helper: safe string (handles null, undefined, "null")
        const str = (value: unknown, fallback = "—"): string => {
          if (value == null) return fallback;
          if (typeof value === "string") {
            const trimmed = value.trim();
            return trimmed && trimmed !== "null" ? trimmed : fallback;
          }
          return String(value);
        };

        // Helper: safe number
        const num = (value: unknown, fallback = 0): number =>
          typeof value === "number" ? value : fallback;

        const totalAudience =
          num(profile.insta_follower) +
          num(profile.facebook_follower) +
          num(profile.tiktok_follower) +
          num(profile.youtube_follower) +
          num(profile.linkedin_follower) +
          num(profile.twitter_follower) +
          num(profile.podcast_follower) +
          num(profile.blog_follower) +
          num(profile.whatsapp_follower);

        // Map ONLY influencer_profile → MicroInfluencer
        const normalised: MicroInfluencer = {
          id: String(profile.id ?? id),
          userId: res?.data?.user?.id ? String(res?.data?.user?.id) : undefined,
          name: str(profile.display_name, res?.data?.user?.first_name),
          description: str(profile.short_bio, ""),
          logo:
            profile.profile_picture && profile.profile_picture !== "null"
              ? profile.profile_picture
              : undefined,
          verified: !!profile.is_verified,
          location: str(profile.timezone),
          website: str(profile.website, "user.com"),
          email: str(profile.email, "user@domain.com"),
          phone: str(profile.phone),

          socialLinks: {
            instagram: profile?.instagram_handle,
            tiktok: profile?.tiktok_handle,
            youtube: profile?.youtube_handle,
            linkedin: profile?.linkedin_handle,
            twitter: profile?.twitter_handle,
          },

          mission: str(profile.mission),
          businessType: str(profile.niche || profile.category, "—"), // fallback to niche or category

          contactPerson: {
            name: str(profile.display_name),
            title: str(profile.role || profile.title, "Influencer"),
          },

          campaigns: {
            total: num(profile.campaigns_total),
            creators: num(
              profile.campaigns_creators || profile.engagement_rate
            ), // adjust if needed
            avgRating: num(profile.campaigns_avg_rating),
            totalInvested: num(profile.campaigns_total_invested),
          },

          activeCampaigns: Array.isArray(profile.active_campaigns)
            ? profile.active_campaigns.map((c) => ({
                id: String(c.id ?? ""),
                title: str(c.title),
                status: str(c.status, "Active"),
                description: str(c.description),
                deadline: str(c.deadline),
                creatorsNeeded: num(c.creators_needed),
              }))
            : [],

          reviews: Array.isArray(profile.reviews)
            ? profile.reviews.map((r) => ({
                id: String(r.id ?? ""),
                comment: str(r.comment),
                reviewer: str(r.reviewer),
              }))
            : [],

          resources: Array.isArray(profile.resources)
            ? profile.resources.map((r) => ({
                type: str(r.type, "Document"),
                title: str(r.title),
                url: str(r.url),
              }))
            : [],

          content_niches: (() => {
            const raw = profile.content_niches;
            if (!raw || raw === "null") return undefined;

            // Split by comma, trim whitespace, filter empty strings
            const tags = raw
              .split(",")
              .map((s: string) => s.trim())
              .filter((s: string) => s.length > 0);

            return tags.length > 0 ? tags : undefined;
          })(),
          totalAudience,
          audienceBreakdown: {
            instagram: num(profile.insta_follower),
            facebook: num(profile.facebook_follower),
            tiktok: num(profile.tiktok_follower),
            youtube: num(profile.youtube_follower),
            linkedin: num(profile.linkedin_follower),
            twitter: num(profile.twitter_follower),
            podcast: num(profile.podcast_follower),
            blog: num(profile.blog_follower),
            whatsapp: num(profile.whatsapp_follower),
          },

          pricing: {
            instagramStory: str(profile.rate_range_for_instagram_story, ""),
            instagramReel: str(profile.rate_range_for_instagram_reel, ""),
            facebookPost: str(profile.rate_range_for_facebook_post, ""),
            tiktokVideo: str(profile.rate_range_for_tiktok_video, ""),
            youtubeVideo: str(profile.rate_range_for_youtube_video, ""),
            youtubeShort: str(profile.rate_range_for_youtube_short, ""),
            podcastMention: str(profile.rate_range_for_podcast_mention, ""),
            blogPost: str(profile.rate_range_for_blog_post, ""),
            socialPost: str(profile.rate_range_for_social_post, ""),
            ugcCreation: str(profile.rate_range_for_ugc_creation, ""),
            liveStream: str(profile.rate_range_for_live_stream, ""),
            repost: str(profile.rate_range_for_repost, ""),
            whatsappStatus: str(
              profile.rate_range_for_whatsapp_status_post,
              ""
            ),
            affiliateMarketing: str(
              profile.rate_range_for_affiliate_marketing_percent,
              ""
            ),
          },

          paymentPreferences: profile.payment_preferences
            ? profile.payment_preferences.split(",").map((p) => p.trim())
            : [],

          response_time: str(profile.response_time, ""),
        };

        SetInfluencer(normalised);
      } catch (err: unknown) {
        console.error("Influencer fetch error:", err);
        const status =
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          typeof (err as { response?: { status?: number } }).response ===
            "object" &&
          (err as { response?: { status?: number } }).response !== null
            ? (err as { response?: { status?: number } }).response?.status
            : undefined;
        if (status === 404) {
          notFound();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencer();
  }, [id]);

  // -------------------------------------------------
  // 2. Copy-link handler
  // -------------------------------------------------
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // -------------------------------------------------
  // 3. Loading / Not-found UI
  // -------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2
          className="h-12 w-12 animate-spin text-primary"
          strokeWidth={2.5}
        />
      </div>
    );
  }

  if (!influencer) {
    notFound();
  }

  // -------------------------------------------------
  // 4. Render the full profile
  // -------------------------------------------------
  return (
    <div className="min-h-screen ">
      <div className="">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/brand-dashboard/microinfluencerspage/"
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-gray-600">Back</span>
        </div>

        {/* influencerHeader Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              {influencer.logo ? (
                <div className="relative flex-shrink-0">
                  <Image
                    src={influencer.logo}
                    alt={influencer.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-xl object-cover ring-2 ring-gray-100"
                  />
                  {influencer.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-[#0d2f4f] to-[#1a4d7a] rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-md flex-shrink-0">
                  {influencer.name.charAt(0)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {influencer.name}
                  </h1>
                  {influencer.verified && (
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-200">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {influencer.description}
                </p>

                {/* Audience Reach Badge - Using your brand colors */}
                {influencer.totalAudience && influencer.totalAudience > 0 ? (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0d2f4f]/10 to-[#0d2f4f]/5 px-4 py-2 rounded-lg border border-[#0d2f4f]/20">
                    <div className="w-8 h-8 bg-[#0d2f4f]/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#0d2f4f]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-600">
                        Total Audience Reach
                      </div>
                      <div className="text-lg font-bold text-[#0d2f4f]">
                        {influencer.totalAudience >= 1000000
                          ? `${(influencer.totalAudience / 1000000).toFixed(
                              1
                            )}M`
                          : influencer.totalAudience >= 1000
                          ? `${(influencer.totalAudience / 1000).toFixed(1)}K`
                          : influencer.totalAudience.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffc006]/20 to-[#ffc006]/10 px-4 py-2 rounded-lg border border-[#ffc006]/30">
                    <div className="w-8 h-8 bg-[#ffc006]/30 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#ffc006]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-[#0d2f4f]/70">
                        Rising Star
                      </div>
                      <div className="text-sm font-bold text-[#0d2f4f]">
                        New Talent
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="bg-yellow-500 hover:bg-[var(--secondaryhover)] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                onClick={() =>
                  router.push(
                    `/brand-dashboard/messages?id=${influencer?.userId}`
                  )
                }
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
              {/* <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Save
              </button> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About
              </h2>
              <p className="text-gray-600 mb-6">{influencer.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mission</h3>
                  <p className="text-gray-600 text-sm">{influencer.mission}</p>
                </div> */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Influencer Type
                  </h3>
                  {influencer.content_niches &&
                  influencer.content_niches.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {influencer.content_niches.map((niche, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {niche}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No niches available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Campaign Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Collaboration Performance
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {influencer.campaigns?.total ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Campaigns</div>
                </div>
                {/* <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {influencer.campaigns?.creators ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                </div> */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {influencer.campaigns?.avgRating ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    $
                    {(
                      (influencer.campaigns?.totalInvested ?? 0) / 1000
                    ).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Earnings</div>
                </div>
              </div>
            </div>

            {/* Active Campaigns */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Active Campaigns
              </h2>
              {influencer.activeCampaigns?.length ? (
                <div className="space-y-4">
                  {influencer.activeCampaigns.map((c) => (
                    <div
                      key={c.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{c.title}</h3>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {c.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Deadline: {c.deadline}</span>
                        <div className="flex items-center gap-4">
                          <span>
                            {c.creatorsNeeded} micro-influencers needed
                          </span>
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
              ) : (
                <p className="text-gray-500">
                  No active campaigns at the moment.
                </p>
              )}
            </div>

            
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            

            {/* Resources */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Campaign Info
              </h2>
              {influencer.resources?.length ? (
                <div className="space-y-3">
                  {influencer.resources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        {res.type.includes("Video") ? (
                          <Video className="w-4 h-4 text-white" />
                        ) : res.type.includes("Media") ? (
                          <ImageIcon className="w-4 h-4 text-white" />
                        ) : (
                          <FileText className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">
                          {res.type}
                        </div>
                        <div className="text-xs text-gray-600">{res.title}</div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No resources available.</p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Content Niches
              </h2>
              {influencer.content_niches &&
              influencer.content_niches.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {influencer.content_niches.map((niche, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {niche}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No niches available.</p>
              )}
            </div>
            {/* Total Audience */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Total Audience Reach
              </h2>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {influencer.totalAudience?.toLocaleString() || "0"}
                </div>
                <div className="text-sm text-gray-600">Total Followers</div>
              </div>

              {influencer.audienceBreakdown && (
                <div className="space-y-3">
                  {Object.entries(influencer.audienceBreakdown)
                    .filter(([_, count]) => count && count > 0)
                    .sort(([, a], [, b]) => (b || 0) - (a || 0))
                    .map(([platform, count]) => (
                      <div
                        key={platform}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {platform === "instagram" && (
                            <Instagram className="w-4 h-4 text-pink-600" />
                          )}
                          {platform === "facebook" && (
                            <span className="w-4 h-4 text-blue-600">📘</span>
                          )}
                          {platform === "tiktok" && (
                            <span className="w-4 h-4">🎵</span>
                          )}
                          {platform === "youtube" && (
                            <span className="w-4 h-4 text-red-600">▶️</span>
                          )}
                          {platform === "linkedin" && (
                            <Linkedin className="w-4 h-4 text-blue-700" />
                          )}
                          {platform === "twitter" && (
                            <Twitter className="w-4 h-4 text-blue-400" />
                          )}
                          {platform === "podcast" && (
                            <span className="w-4 h-4">🎙️</span>
                          )}
                          {platform === "blog" && (
                            <FileText className="w-4 h-4 text-gray-600" />
                          )}
                          {platform === "whatsapp" && (
                            <Phone className="w-4 h-4 text-green-600" />
                          )}
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {platform}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {count?.toLocaleString()}
                        </span>
                      </div>
                    ))}
                </div>
              )}

              {(!influencer.totalAudience ||
                influencer.totalAudience === 0) && (
                <p className="text-gray-500 text-center text-sm">
                  No audience data available
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pricing & Rates
              </h2>

              {influencer.pricing &&
              Object.values(influencer.pricing).some((rate) => rate) ? (
                <div className="space-y-3">
                  {influencer.pricing.instagramStory && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Instagram Story
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.instagramStory}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.instagramReel && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Instagram Reel
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.instagramReel}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.socialPost && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Social Post
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.socialPost}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.facebookPost && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Facebook Post
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.facebookPost}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.tiktokVideo && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        TikTok Video
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.tiktokVideo}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.youtubeVideo && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        YouTube Video
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.youtubeVideo}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.youtubeShort && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        YouTube Short
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.youtubeShort}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.podcastMention && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Podcast Mention
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.podcastMention}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.blogPost && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Blog Post</span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.blogPost}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.ugcCreation && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        UGC Creation
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.ugcCreation}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.liveStream && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Live Stream
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.liveStream}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.repost && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Repost
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.repost}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.whatsappStatus && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        WhatsApp Status
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${influencer.pricing.whatsappStatus}
                      </span>
                    </div>
                  )}
                  {influencer.pricing.affiliateMarketing && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">
                        Affiliate Marketing
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {influencer.pricing.affiliateMarketing}%
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 italic">Pricing not specified</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Contact for custom quote
                  </p>
                </div>
              )}

              {influencer.paymentPreferences &&
                influencer.paymentPreferences.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Payment Options
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {influencer.paymentPreferences.map((pref, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full capitalize"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Average Response Time
              </h2>

              {influencer.response_time ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {influencer.response_time}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">hours</span>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 italic">
                    Response time not specified
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Contact influencer for details
                  </p>
                </div>
              )}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
