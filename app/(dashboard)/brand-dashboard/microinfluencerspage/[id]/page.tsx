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
}

interface ApiResponse {
  influencer_profile?: InfluencerProfileResponse;
}

export default function BrandProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [influencer, SetInfluencer] = useState<MicroInfluencer | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const router=useRouter();

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

        const profile = (res.data as ApiResponse | undefined)?.influencer_profile;

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

        

        // Map ONLY influencer_profile → MicroInfluencer
        const normalised: MicroInfluencer = {
          id: String(profile.id ?? id),
          name: str(profile.display_name, "Unnamed Influencer"),
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
            instagram: profile?.instagram_handle ,
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
        <Loader2 className="h-12 w-12 animate-spin text-primary" strokeWidth={2.5} />
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
            <div className="flex items-center gap-4">
              {influencer.logo ? (
                <Image
                  src={influencer.logo}
                  alt={influencer.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  {influencer.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {influencer.name}
                  </h1>
                  {influencer.verified && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Verified
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{influencer.description}</p>
                {/* <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {influencer.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <a
                        href={influencer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {influencer.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {influencer.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {influencer.location}
                    </div>
                  )}
                </div> */}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-yellow-500 hover:bg-[var(--secondaryhover)] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
              onClick={()=>router.push(`/brand-dashboard/messages?id=${id}`)}>
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
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    $
                    {(
                      (influencer.campaigns?.totalInvested ?? 0) / 1000
                    ).toFixed(0)}
                    K
                  </div>
                  <div className="text-sm text-gray-600">
                    Previous Engagements
                  </div>
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

            {/* Reviews */}
            {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Reviews & Testimonials
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {influencer.campaigns?.avgRating ?? 0}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(influencer.campaigns?.avgRating ?? 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Based on {influencer.reviews?.length ?? 0}+ reviews
                </span>
              </div>

              {influencer.reviews?.length ? (
                <div className="space-y-4">
                  {influencer.reviews.map((r) => (
                    <div
                      key={r.id}
                      className="border-l-4 border-green-500 pl-4"
                    >
                      <p className="text-gray-700 mb-2">
                        &quot;{r.comment}&quot;
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span className="font-medium">{r.reviewer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div> */}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    {influencer.contactPerson?.name ?? "—"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {influencer.contactPerson?.title ?? "—"}
                  </div>
                </div>
               
                <div className="flex gap-2">
                  {influencer.socialLinks?.linkedin && (
                    <a
                      href={influencer.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary rounded flex items-center justify-center"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {influencer.socialLinks?.twitter && (
                    <a
                      href={influencer.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary rounded flex items-center justify-center"
                    >
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {influencer.socialLinks?.instagram && (
                    <a
                      href={influencer.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary rounded flex items-center justify-center"
                    >
                      <Instagram className="w-4 h-4 text-white" />
                    </a>
                  )}
                </div>
              </div>
            </div>

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
            <div className="bg-white rounded-lg border border-gray-200 p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">
    Average Response Time
  </h2>
  
  {influencer.response_time ? (
    <div className="flex items-center">
      <span className="text-2xl font-bold text-gray-900">
        {influencer.response_time}
      </span>
      <span className="ml-2 text-sm text-gray-500">
        hours
      </span>
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

            {/* Share */}
            {/* <div className="bg-primary rounded p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">Share Profile</h2>
              <button
                onClick={handleCopyLink}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
