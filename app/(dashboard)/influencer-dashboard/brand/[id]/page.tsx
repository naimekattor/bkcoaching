
"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
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
import { notFound, useParams } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import type { Brand } from "@/types/brand";
interface OtherUserData{
  hires_data:number;
  campaigns:number;
}
interface BrandProfileResponse {
  id?: string | number;
  business_name?: string;
  short_bio?: string;
  logo?: string;
  is_verified?: boolean;
  timezone?: string;
  website?: string;
  email?: string;
  phone?: string;
  instagram_handle?: string;
  tiktok_handle?: string;
  linkedin_profile?: string;
  x_handle?: string;
  mission?: string;
  business_type?: string;
  contact_person_title?: string;
  designation?: string;
  campaigns_total?: number;
  campaigns_creators?: number;
  campaigns_avg_rating?: number;
  campaigns_total_invested?: number;
  active_campaigns?: unknown[];
  reviews?: unknown[];
  resources?: unknown[];
  platforms?: string[];
  youtube_handle?: string;
}

interface BrandResponse {
  brand_profile?: BrandProfileResponse;
}

export default function BrandProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const[userOtherData,setUserOtherData]=useState<OtherUserData>({ hires_data: 0, campaigns: 0 });

  // -------------------------------------------------
  // 1. FETCH brand by id
  // -------------------------------------------------
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        setLoading(true);
        const res = await apiClient(`user_service/get_a_brand/${id}/`, {
          method: "GET",
        });
        setUserOtherData(res?.data?.res);
        console.log(userOtherData);
        

        // ---- Normalise API → Brand ----
        const raw =
          (res.data.data as BrandResponse | undefined)?.brand_profile ?? {};

        const platforms: string[] = Array.isArray(raw.platforms)
          ? raw.platforms
          : [];

        const normalised: Brand = {
          id: String(raw.id ?? id),
          name: raw.business_name ?? "Unnamed Brand",
          description: raw.short_bio ?? "",
          logo: raw.logo ?? undefined,
          verified: raw.is_verified ?? false,
          location: raw.timezone ?? "",
          website: raw.website ?? "user.com",
          email: raw.email ?? "",
          phone: raw.phone ?? "",
          socialLinks: {
            instagram: raw?.instagram_handle,
            tiktok: raw?.tiktok_handle,
            youtube: raw?.youtube_handle,
            linkedin: raw?.linkedin_profile,
            twitter: raw?.x_handle,
          },
          mission: raw.mission ?? "",
          businessType: raw.business_type?.split( ' – ' )[0] ?? "",
          contactPerson: {
            name: raw.business_name ?? "",
            title: raw.contact_person_title ?? "",
          },
          // ---- Campaign stats (fallback to 0) ----
          // campaigns: {
          //   total: userOtherData?.campaigns_total ?? 0,
          //   creators: userOtherData?.campaigns_creators ?? 0,
          //   avgRating: userOtherData?.campaigns_avg_rating ?? 0,
          //   totalInvested: userOtherData?.campaigns_total_invested ?? 0,
          // },
          // ---- Active campaigns (you may store them in a separate endpoint) ----
          activeCampaigns: raw.active_campaigns ?? [],
          // ---- Reviews (fallback to empty) ----
          reviews: raw.reviews ?? [],
          // ---- Resources (fallback to empty) ----
          resources: raw.resources ?? [],
        };

        setBrand(normalised);
      } catch (err: unknown) {
        console.error("Brand fetch error:", err);
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

    if (id) fetchBrand();
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

  if (!brand) {
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
            href="/influencer-dashboard/brand"
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-gray-600">Back</span>
        </div>

        {/* Brand Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-center gap-4">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  {brand.name.charAt(0)}
                </div>
              )}
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
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {brand.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {brand.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {/* {brand.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {brand.location}
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href={`/influencer-dashboard/messages?id=${id}`}>
              <button className="bg-yellow-500 cursor-pointer hover:bg-[var(--secondaryhover)] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
              </Link>
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
                About the Company
              </h2>
              <p className="text-gray-600 mb-6">{brand.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mission</h3>
                  <p className="text-gray-600 text-sm">{brand.mission || "Not added"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Business Type
                  </h3>
                  <p className="text-gray-600 text-sm">{brand.businessType || "Not added"}</p>
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
                  <div className="text-2xl font-bold text-primary mb-1">
                    {userOtherData?.campaigns ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Total Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {userOtherData?.hires_data ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">micro-influencers</div>
                </div>
                {/* <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {brand.campaigns?.avgRating ?? 0}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div> */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    ${((brand.campaigns?.totalInvested ?? 0) / 1000).toFixed(0)}
                    K
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
              {brand.activeCampaigns?.length ? (
                <div className="space-y-4">
                  {brand.activeCampaigns.map((c) => (
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
                  {brand.campaigns?.avgRating ?? 0}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(brand.campaigns?.avgRating ?? 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Based on {brand.reviews?.length ?? 0}+ reviews
                </span>
              </div>

              {brand.reviews?.length ? (
                <div className="space-y-4">
                  {brand.reviews.map((r) => (
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
                    {brand.contactPerson?.name ?? ""}
                  </div>
                  <div className="text-sm text-gray-600">
                    {brand.contactPerson?.title}
                  </div>
                </div>
                {brand.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {brand.email}
                  </div>
                )}
                {/* {brand.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {brand.phone}
                  </div>
                )} */}
                <div className="flex gap-2">
                  {brand.socialLinks?.linkedin && (
                    <a
                      href={brand.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary rounded flex items-center justify-center"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {brand.socialLinks?.twitter && (
                    <a
                      href={brand.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-primary rounded flex items-center justify-center"
                    >
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {brand.socialLinks?.instagram && (
                    <a
                      href={brand.socialLinks.instagram}
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
            {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Business Resources
              </h2>
              {brand.resources?.length ? (
                <div className="space-y-3">
                  {brand.resources.map((res, idx) => (
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
            </div> */}

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
