"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HelpCircle, Search, Star } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { SkeletonCard } from "@/components/SkeletoCard";
import { industriesNiches } from "@/constants/niches";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZE = 10;

interface Influencer {
  id: string;
  name: string;
  profileImage: string;
  followers: string;
  socialLinks: string[];
  niche: string;
  timeZone: string;
}

interface InfluencerProfile {
  display_name?: string;
  profile_picture?: string | null;
  followers_count?: number;
  content_niches?: string[];
  timezone?: string;
  instagram_handle?: string;
  tiktok_handle?: string;
  youtube_handle?: string;
  insta_follower?: number;
  facebook_follower?: number;
  tiktok_follower?: number;
  linkedin_follower?: number;
  youtube_follower?: number;
  blog_follower?: number;
}

interface InfluencerUser {
  first_name?: string;
  last_name?: string;
}

interface InfluencerRecord {
  id: string | number;
  influencer_profile?: InfluencerProfile | null;
  user?: InfluencerUser | null;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: InfluencerRecord[];
}

const DEFAULT_AVATAR = "/images/person.jpg";
const sanitizeImageSrc = (src?: string | null) => {
  if (!src) return DEFAULT_AVATAR;
  const value = src.trim();
  if (value.startsWith("/")) return value;
  if (/^https?:\/\//i.test(value)) return value;
  return DEFAULT_AVATAR;
};

// --- Helper to calculate total followers ---
const calculateFollowers = (inf: InfluencerProfile | undefined | null) => {
  if (!inf) return 0;
  
  const total = 
    Number(inf.insta_follower || 0) +
    Number(inf.facebook_follower || 0) +
    Number(inf.tiktok_follower || 0) +
    Number(inf.linkedin_follower || 0) +
    Number(inf.youtube_follower || 0) +
    Number(inf.blog_follower || 0);
    
  return total;
};

function MicroInfluencersPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
 
  // URL page sync
  const urlPage = Number(searchParams.get("page") ?? "1");
  const currentPage = urlPage >= 1 ? urlPage : 1;
  const filter_by_self=searchParams.get("review")=== "true";
  console.log(filter_by_self);
  

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  // UI state
  const [tempSearch, setTempSearch] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const [filters, setFilters] = useState({
    contentNiches: "",
    budgetRange: "",
    platforms: "",
    timeZone: "",
    followers: "",
    gender: "",
  });
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const timeZones = [
  {
    value: "America/New_York",
    label: "Eastern Standard Time – EST (UTC−5) / Eastern Daylight Time – EDT (UTC−4)",
  },
  {
    value: "America/Chicago",
    label: "Central Standard Time – CST (UTC−6) / Central Daylight Time – CDT (UTC−5)",
  },
  {
    value: "America/Denver",
    label: "Mountain Standard Time – MST (UTC−7) / Mountain Daylight Time – MDT (UTC−6)",
  },
  {
    value: "America/Phoenix",
    label: "Mountain Standard Time – MST (UTC−7) – no DST",
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Standard Time – PST (UTC−8) / Pacific Daylight Time – PDT (UTC−7)",
  },
  {
    value: "America/Anchorage",
    label: "Alaska Standard Time – AKST (UTC−9) / Alaska Daylight Time – AKDT (UTC−8)",
  },
  {
    value: "Pacific/Honolulu",
    label: "Hawaii Standard Time – HST (UTC−10)",
  },
];


  // Check if any filters are active (using actual searchTerm)
  const hasActiveFilters =
    searchTerm ||
    Object.values(filters).some((f) => f && f !== "");

  // 3. Handle Manual Search Trigger
  const handleSearchTrigger = () => {
    isSwitchingToReview.current = false;
    setSearchTerm(tempSearch);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("review");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchTrigger();
    }
  };

    const isSwitchingToReview = useRef(false);


  const handleReviewMatches = () => {
        isSwitchingToReview.current = true;

    // Clear other filters visually
    setTempSearch("");
    setSearchTerm("");
    setFilters({
        contentNiches: "",
        budgetRange: "",
        platforms: "",
        timeZone: "",
        followers: "",
        gender: "",
    });

    // Set URL param ?review=true
    const params = new URLSearchParams(searchParams.toString());
    params.set("review", "true");
    // params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Fetch influencers based on current page or filters
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);

        let res;

        // CASE 1: Review Matches (filter_by_self is present)
        if (filter_by_self) {
          isSwitchingToReview.current = false;
            console.log("Fetching Review Matches...");
            
            const filterPayload = {
                filter_by_self: true, 
                
            };

            res = await apiClient("user_service/filter_influencers/", {
                method: "POST",
                auth:true,
                body: JSON.stringify(filterPayload),
            });
            const list: InfluencerRecord[] = Array.isArray(res.data)
            ? res.data
            : [];

          const normalized: Influencer[] = list.map((item) => {
            const inf = item.influencer_profile ?? {};
            const user = item.user ?? {};

            const platforms: string[] = [];
            if (inf.instagram_handle) platforms.push("instagram");
            if (inf.tiktok_handle) platforms.push("tiktok");
            if (inf.youtube_handle) platforms.push("youtube");

            const total = calculateFollowers(item.influencer_profile);

            return {
              id: String(item.id),
              name:
                inf.display_name ||
                `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                "Unknown",
              profileImage: sanitizeImageSrc(inf.profile_picture),
              // totalFollowers=inf.insta_follower + inf.facebook_follower + inf.facebook_follower + inf.tiktok_follower + inf?.linkedin_follower + inf?.youtube_follower + inf?.blog_follower ??0,
              followers: total > 0 ? `${(total / 1000).toFixed(1)}K` : "N/A",
              socialLinks: platforms,
              niche: inf.content_niches?.[0] || "Unknown",
              timeZone: inf.timezone || "Unknown",
            };
          });

          setInfluencers(normalized);
          setTotalCount(normalized.length);
          setHasNextPage(false);
            
        }

        // If filters are active, use filter endpoint
        else if (hasActiveFilters) {
          isSwitchingToReview.current = false;
          const filterPayload = {
            search: searchTerm.trim(),
            "Platforms": filters.platforms,
            "Budget Range": filters.budgetRange,
            "Time Zone": filters.timeZone,
            "Gender": filters.gender,
            "Audience Reach": filters.followers,
            "content niches": filters.contentNiches,
          };

          res = await apiClient("user_service/filter_influencers/", {
            method: "POST",
            auth:true,
            body: JSON.stringify(filterPayload),
          });

          // Filter endpoint returns array directly
          const list: InfluencerRecord[] = Array.isArray(res.data)
            ? res.data
            : [];

          const normalized: Influencer[] = list.map((item) => {
            const inf = item.influencer_profile ?? {};
            const user = item.user ?? {};

            const platforms: string[] = [];
            if (inf.instagram_handle) platforms.push("instagram");
            if (inf.tiktok_handle) platforms.push("tiktok");
            if (inf.youtube_handle) platforms.push("youtube");

            const total = calculateFollowers(item.influencer_profile);

            return {
              id: String(item.id),
              name:
                inf.display_name ||
                `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                "Unknown",
              profileImage: sanitizeImageSrc(inf.profile_picture),
              followers: total > 0 ? `${(total / 1000).toFixed(1)}K` : "N/A",
              socialLinks: platforms,
              niche: inf.content_niches?.[0] || "Unknown",
              timeZone: inf.timezone || "Unknown",
            };
          });

          setInfluencers(normalized);
          setTotalCount(normalized.length);
          setHasNextPage(false);
        } else {
          if (isSwitchingToReview.current) {
            return; 
          }
          // No filters - use pagination endpoint
          const queryParams = new URLSearchParams();
          queryParams.set("page", String(currentPage));

          res = await apiClient(
            `user_service/get_all_influencers/?${queryParams.toString()}`,
            {
              method: "GET",
            }
          );

          const apiData: ApiResponse = res.data;
          const list = apiData.results || [];

          const normalized: Influencer[] = list.map((item) => {
            const inf = item.influencer_profile ?? {};
            const user = item.user ?? {};

            const platforms: string[] = [];
            if (inf.instagram_handle) platforms.push("instagram");
            if (inf.tiktok_handle) platforms.push("tiktok");
            if (inf.youtube_handle) platforms.push("youtube");

            const total = calculateFollowers(item.influencer_profile);

            return {
              id: String(item.id),
              name:
                inf.display_name ||
                `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                "Unknown",
              profileImage: sanitizeImageSrc(inf.profile_picture),
              followers: total > 0 ? `${(total / 1000).toFixed(1)}K` : "N/A",
              socialLinks: platforms,
              niche: inf.content_niches?.[0] || "Unknown",
              timeZone: inf.timezone || "Unknown",
            };
          });

          setInfluencers(normalized);
          setTotalCount(apiData.count);
          setHasNextPage(apiData.next !== null);
        }
      } catch (err) {
        console.error("Failed to fetch influencers", err);
        setInfluencers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, [currentPage, searchTerm, filters, hasActiveFilters,filter_by_self]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const clearFilters = () => {
    setTempSearch("");
    setSearchTerm("");
    setFilters({
      contentNiches: "",
      budgetRange: "",
      platforms: "",
      timeZone: "",
      followers: "",
      gender: "",
    });
    const params = new URLSearchParams(searchParams.toString());
    params.delete("review");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

 const handleFilterChange = (key: string, value: string) => {
    const newValue = value === "all" ? "" : value;
    setFilters(prev => ({ ...prev, [key]: newValue }));
    setPage(1);
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Discover Micro-Influencers
          </h1>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-lg">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={tempSearch} // Use temp state
                onChange={(e) => setTempSearch(e.target.value)} // Only updates input, not API
                onKeyDown={handleKeyDown} // Trigger search on Enter
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
              />
            </div>
            <button
              onClick={handleSearchTrigger} 
              className="px-6 md:px-8 py-3 bg-secondary text-white rounded-xl hover:bg-[var(--secondaryhover)] transition-colors font-medium flex items-center gap-2 justify-center shadow-sm"
            >
              <Search className="w-4 h-4" />
              Search
            </button>

            {/* NEW: Review Matches Button */}
            <button
              onClick={handleReviewMatches}
              className={`px-6 md:px-8 py-3 cursor-pointer rounded-xl transition-colors font-medium flex items-center gap-2 justify-center shadow-sm border ${
                filter_by_self 
                  ? " text-secondary border-secondary" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Star className={`w-4 h-4 ${filter_by_self ? "fill-secondary" : ""}`} />
              Review Matches
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <button
    onClick={clearFilters}
    className="
      w-full py-1 cursor-pointer
      bg-white border border-gray-200 rounded-lg
      px-4 text-base 
      hover:border-gray-300 hover:bg-gray-50
      focus:ring-2 focus:ring-secondary/20
      transition-all
    "
  >
    All
  </button>
            {/* Content Niches */}
            <Select 
              value={filters.contentNiches || "all"} 
              onValueChange={(val) => handleFilterChange("contentNiches", val)}
            >
              <SelectTrigger className="w-full h-12 bg-white border-gray-200 rounded-lg px-4 text-base focus:ring-2 focus:ring-secondary/20 transition-all hover:border-gray-300">
                <SelectValue placeholder="Content Niches" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="all">All Content Niches</SelectItem>
                {industriesNiches.map((niche) => (
                  <SelectItem key={niche} value={niche} className="cursor-pointer">
                    {niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Budget */}
            <Select 
              value={filters.budgetRange || "all"} 
              onValueChange={(val) => handleFilterChange("budgetRange", val)}
            >
              <SelectTrigger className="w-full h-12 bg-white border-gray-200 rounded-lg px-4 text-base focus:ring-2 focus:ring-secondary/20 transition-all hover:border-gray-300">
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budget Ranges</SelectItem>
                <SelectItem value="0-100">$0 – $100</SelectItem>
                <SelectItem value="100-499">$101 – $499</SelectItem>
                <SelectItem value="500+">$500+</SelectItem>
              </SelectContent>
            </Select>

            {/* Platforms */}
            <Select 
              value={filters.platforms || "all"} 
              onValueChange={(val) => handleFilterChange("platforms", val)}
            >
              <SelectTrigger className="w-full h-12 bg-white border-gray-200 rounded-lg px-4 text-base focus:ring-2 focus:ring-secondary/20 transition-all hover:border-gray-300">
                <SelectValue placeholder="Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="youtube">Facebook</SelectItem>
                <SelectItem value="youtube">LinkedIn</SelectItem>
                <SelectItem value="youtube">Blog</SelectItem>
              </SelectContent>
            </Select>

            {/* Time Zone */}
            {/* <select
              value={filters.timeZone}
              onChange={(e) => {
                setFilters({ ...filters, timeZone: e.target.value });
                setPage(1);
              }}
              className="px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
            >
              <option value="">All Time Zones</option>
              {timeZones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
              <option value="Others">Others</option>
            </select> */}

            {/* Followers */}
            <div className="relative">
                <Select 
                  value={filters.followers || "all"} 
                  onValueChange={(val) => handleFilterChange("followers", val)}
                >
                  <SelectTrigger className="w-full h-12 bg-white border-gray-200 rounded-lg px-4 text-base focus:ring-2 focus:ring-secondary/20 transition-all hover:border-gray-300">
                    <SelectValue placeholder="Audience Reach" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Audience Sizes</SelectItem>
                    <SelectItem value="0-1000">0 – 1K</SelectItem>
                    <SelectItem value="1001-5000">1K – 5K</SelectItem>
                    <SelectItem value="5001-10000">5K – 10K</SelectItem>
                    <SelectItem value="10001-50000">10K – 50K</SelectItem>
                    <SelectItem value="50000+">50K+</SelectItem>
                  </SelectContent>
                </Select>
                {/* Micro-interaction Helper Icon */}
                <div className="absolute -top-2 -right-2 z-10 pointer-events-none">
                   {/* Optional: Add a small badge or icon if filter is active */}
                </div>
            </div>

            {/* Gender */}
            <Select 
              value={filters.gender || "all"} 
              onValueChange={(val) => handleFilterChange("gender", val)}
            >
              <SelectTrigger className="w-full h-12 bg-white border-gray-200 rounded-lg px-4 text-base focus:ring-2 focus:ring-secondary/20 transition-all hover:border-gray-300">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Gender</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">No preference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* 5. Results Area (Conditional Rendering based on Loading) */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Featured Micro-influencers
            </h2>
            {!loading && (
              <p className="text-sm text-gray-600">
                Showing {influencers.length} of {totalCount}
              </p>
            )}
          </div>

          {loading ? (
            // Show Skeleton Grid when loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : influencers.length === 0 ? (
            // Show No Results
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No influencers found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            // Show Real Results
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {influencers.map((creator) => (
                <div
                  key={creator.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <Image
                      width={80}
                      height={80}
                      src={creator.profileImage}
                      alt={creator.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
                    />
                  </div>

                  {/* Name & Followers */}
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4"
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
                      {creator.followers}
                    </p>
                  </div>

                  {/* Social Icons (Condensed for brevity) */}
                  <div className="flex justify-center gap-2 mb-4">
                    {creator.socialLinks.includes("instagram") && (
                      <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                      </div>
                    )}
                    {creator.socialLinks.includes("tiktok") && (
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" /></svg>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/brand-dashboard/microinfluencerspage/${creator.id}`}
                      className="flex-1"
                    >
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        View Profile
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        router.push(`/brand-dashboard/messages?id=${creator.id}`)
                      }
                      className="flex-1 px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-[var(--secondaryhover)] transition-colors text-sm font-medium"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination - Only show when no filters */}
        {totalPages > 1 && !hasActiveFilters && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              ←
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setPage(page)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="px-2">...</span>
                <button
                  onClick={() => setPage(totalPages)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MicroInfluencersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <MicroInfluencersPageContent />
    </Suspense>
  );
}