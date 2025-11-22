"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import { apiClient } from "@/lib/apiClient";
import type { Brand } from "@/types/brand";

const PAGE_SIZE = 20;

export default function MicroinfluencersPage() {
  // ────── UI state ──────
  const [searchQuery, setSearchQuery] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [loading, setLoading] = useState(true);

  // ────── Data ──────
  const [allBrands, setAllBrands] = useState<Brand[]>([]);

  // ────── Constants ──────
  const timeZones = [
    { value: "America/New_York", label: "Eastern (ET)" },
    { value: "America/Chicago", label: "Central (CT)" },
    { value: "America/Denver", label: "Mountain (MT)" },
    { value: "America/Phoenix", label: "Arizona (no DST)" },
    { value: "America/Los_Angeles", label: "Pacific (PT)" },
    { value: "America/Anchorage", label: "Alaska (AKST/AKDT)" },
    { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
  ];

  const businessTypes = [
    "Beauty & Skincare Brands – makeup, skincare, haircare",
    "Fashion & Apparel – clothing lines, modest fashion brands, boutique shops",
    "Jewelry & Accessories – watches, handbags, eyewear",
    "Health & Wellness – supplements, fitness programs, healthy living",
    "Food & Beverage – restaurants, cafes, packaged foods, specialty drinks",
    "Hospitality & Travel – hotels, resorts, Airbnb hosts, travel agencies",
    "Events & Experiences – retreats, workshops, conferences",
    "E-commerce Stores – online boutiques, curated shops, niche product sellers",
    "Local Service Providers – gyms, salons, spas, personal trainers",
    "Tech & Gadgets – phone accessories, smart devices, apps",
    "Education & Coaching – online courses, coaches, masterminds",
    "Parenting & Family Brands – baby products, toys, household goods",
    "Home & Lifestyle – decor, furniture, kitchenware, cleaning products",
    "Financial & Professional Services – investment apps, insurance, credit repair",
    "Nonprofits & Causes – charities, community organizations, social impact campaigns",
    "Other",
  ];

  // ────── Fetch + Normalise ──────
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const res = await apiClient("user_service/get_all_brands/", {
          method: "GET",
        });

        const normalised: Brand[] = (res.data ?? []).map((raw: any) => {
          const bp = raw.brand_profile ?? {};
          const platforms: string[] = Array.isArray(bp.platforms)
            ? bp.platforms
            : [];

          return {
            id: String(raw.id ?? ""),
            name: bp.business_name ?? "Unnamed Brand",
            description: bp.short_bio ?? "",
            logo: bp.logo ?? undefined,
            businessType: bp.business_type ?? undefined,
            website: bp.website ?? undefined,
            socialLinks: {
              instagram: platforms.includes("instagram") ? "#" : undefined,
              tiktok: platforms.includes("tiktok") ? "#" : undefined,
              youtube: platforms.includes("youtube") ? "#" : undefined,
            },
          };
        });

        setAllBrands(normalised);
      } catch (err) {
        console.error("Failed to load brands", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // ────── Filtering & Search (memoised) ──────
  const filteredBrands = useMemo(() => {
    let list = [...allBrands];

    // 1. Search (name)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((b) => b.name.toLowerCase().includes(q));
    }

    // 2. Business type
    if (businessType) {
      list = list.filter((b) => b.businessType === businessType);
    }

    // 3. Time-zone
    if (timeZone) {
      list = list.filter((b) => {
        // In the current payload time-zone lives in brand_profile.timezone
        // We'll store it on the Brand object when we have it – for now skip.
        return true;
      });
    }

    return list;
  }, [allBrands, searchQuery, businessType, timeZone]);

  // ────── Handlers ──────
  const applyFilters = () => {
    // No-op – filtering is already memoised
  };

  const clearFilters = () => {
    setSearchQuery("");
    setBusinessType("");
    setTimeZone("");
  };

  // ────── Render ──────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Find Brands You Love
        </h1>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        {/* Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={applyFilters}
            className="bg-secondary hover:bg-[var(--secondaryhover)] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Business Type</option>
            {businessTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
          >
            <option value="">Time Zone (US)</option>
            {timeZones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
            <option value="Others">Others</option>
          </select>

          <div className="flex gap-3">
            <button
              onClick={applyFilters}
              className="bg-yellow-500 hover:bg-[var(--secondaryhover)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Featured brands
        </h2>

        {filteredBrands.length === 0 ? (
          <p className="text-center text-gray-500">
            No brands match the current filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-lg border border-gray-200 p-6 text-center"
              >
                {/* Logo */}
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full bg-gray-100">
                  {brand.logo ? (
                    <Image
                      width={64}
                      height={64}
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full" />
                  )}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-[17px] text-[#242524] mb-1">
                  {brand.name}
                </h3>

                {/* Category */}
                <p className="text-sm text-[#363635] mb-2">
                  Category: {brand.businessType ?? "—"}
                </p>

                {/* Platform icons */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {brand.socialLinks?.instagram && (
                    <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                      <FaInstagram className="text-xs text-pink-600" />
                    </div>
                  )}
                  {brand.socialLinks?.tiktok && (
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                      <MdInsertEmoticon className="text-xs text-white" />
                    </div>
                  )}
                  {brand.socialLinks?.youtube && (
                    <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-xs">TV</span>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-center items-center  gap-3">
                  <Link
                    href={`/influencer-dashboard/brand/${brand.id}`}
                    className="border border-secondary text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link href={`/influencer-dashboard/messages?id=${brand.id}`} className="bg-secondary hover:bg-[var(--secondaryhover)] text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Message
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
