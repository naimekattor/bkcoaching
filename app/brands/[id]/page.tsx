
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

        // ---- Normalise API → Brand ----
        const raw =
          (res?.data?.data as BrandResponse | undefined)?.brand_profile ?? {};
          console.log(res);
          

        const platforms: string[] = Array.isArray(raw.platforms)
          ? raw.platforms
          : [];

        const normalised: Brand = {
          id: String(raw.id ?? id),
          name: raw.business_name || "Unnamed Brand",
          // Fallback handled in UI, but safe empty string here
          description: raw.short_bio || "", 
          logo: raw.logo || undefined,
          verified: raw.is_verified ?? false,
          location: raw.timezone || "",
          website: raw.website || "", // Ensure empty string if null
          email: raw.email || "",
          phone: raw.phone || "",
          socialLinks: {
            instagram: raw?.instagram_handle,
            tiktok: raw?.tiktok_handle,
            youtube: raw?.youtube_handle,
            linkedin: raw?.linkedin_profile,
            twitter: raw?.x_handle,
          },
          mission: raw.mission || "",
          businessType: raw.business_type?.split(' – ')[0] || "",
          contactPerson: {
            name: raw.business_name || "",
            title: raw.contact_person_title || "",
          },
          campaigns: {
            total: raw.campaigns_total ?? 0,
            creators: raw.campaigns_creators ?? 0,
            avgRating: raw.campaigns_avg_rating ?? 0,
            totalInvested: raw.campaigns_total_invested ?? 0,
          },
          activeCampaigns: raw.active_campaigns ?? [],
          reviews: raw.reviews ?? [],
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

  // --- Helper for Professional Fallback Text ---
  const renderFallbackText = (text: string | undefined, fallback: string) => {
    if (text && text.trim().length > 0) {
      return <span className="text-gray-600">{text}</span>;
    }
    return <span className="text-gray-400  text-sm">{fallback}</span>;
  };

  // -------------------------------------------------
  // 4. Render the full profile
  // -------------------------------------------------
  return (
    <div className="min-h-screen container mx-auto mt-6">
      <div className="">
        {/* Header */}
        

        {/* Brand Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
  <div className="flex flex-col gap-6">

    {/* Brand Header */}
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">

      {/* Logo */}
      <div className="shrink-0">
        {brand.logo ? (
          <Image
            src={brand.logo}
            alt={brand.name}
            width={64}
            height={64}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-lg flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
            {brand.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Brand Info */}
      <div className="flex-1 min-w-0">

        {/* Name + Verified */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
            {brand.name}
          </h1>

          {brand.verified && (
            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Verified
            </span>
          )}
        </div>

        {/* Description */}
        <div className="mb-3 text-sm sm:text-base text-gray-600">
          {renderFallbackText(
            brand.description,
            "This brand has not provided a short bio yet."
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 text-sm text-gray-500">

          {/* Website */}
          <div className="flex items-center gap-1.5 break-all">
            <Globe className="w-4 h-4 text-gray-400 shrink-0" />
            {brand.website ? (
              <a
                href={
                  brand.website.startsWith("http")
                    ? brand.website
                    : `https://${brand.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary underline decoration-dotted"
              >
                {brand.website
                  .replace(/^https?:\/\/(www\.)?/, "")
                  .replace(/\/$/, "")}
              </a>
            ) : (
              <span className="italic text-gray-400">
                Website not provided
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            {brand.location ? (
              <span className="break-words">{brand.location}</span>
            ) : (
              <span className="italic text-gray-400">Not specified</span>
            )}
          </div>

        </div>
      </div>
    </div>
  </div>
</div>


        <div className="">
          {/* LEFT COLUMN */}
          
            
            {/* About Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                About the Company
              </h2>
              
              <div className="mb-8">
                {renderFallbackText(brand.description, "No detailed company description is currently available.")}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mission Fallback */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-gray-400" /> Mission
                  </h3>
                  <div className="text-sm">
                    {renderFallbackText(brand.mission, "Mission statement not specified.")}
                  </div>
                </div>

                {/* Industry Fallback */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> Industry
                  </h3>
                  <div className="text-sm">
                    {renderFallbackText(brand.businessType, "Industry not listed.")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          

       
      </div>
    </div>
  );
}
