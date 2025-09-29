"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Search, HelpCircle } from "lucide-react";
// Mock data for creators - easily replaceable with API calls
const mockCreators = [
  {
    id: 1,
    name: "Maya Fashionista",
    followers: "520K",
    profileImage:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    socialLinks: ["instagram", "tiktok"],
  },
  {
    id: 2,
    name: "Maya Fashionista",
    followers: "520K",
    profileImage:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    socialLinks: ["instagram", "tiktok"],
  },
  {
    id: 3,
    name: "Maya Fashionista",
    followers: "520K",
    profileImage:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    socialLinks: ["instagram", "tiktok"],
  },
  {
    id: 4,
    name: "Maya Fashionista",
    followers: "520K",
    profileImage:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    socialLinks: ["instagram", "tiktok"],
  },
  {
    id: 5,
    name: "Maya Fashionista",
    followers: "520K",
    profileImage:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    socialLinks: ["instagram", "tiktok"],
  },
  {
    id: 6,
    name: "Maya Fashionista",
    followers: "520K",
    profileImage:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    socialLinks: ["instagram", "tiktok"],
  },
  {
    id: 7,
    name: "Maya Fashionista",
    followers: "520K",
    profileImage:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    socialLinks: ["instagram", "tiktok"],
  },
  {
    id: 8,
    name: "Maya Fashionista",
    followers: "520K",
    profileImage:
      "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    socialLinks: ["instagram", "tiktok"],
  },
];

export default function MicroInfluencersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    contentNiches: "",
    budgetRange: "",
    platforms: "",
    timeZone: "",
    followers: "",
    gender: "",
  });
  const [filteredCreators, setFilteredCreators] = useState(mockCreators);
  const [isSearching, setIsSearching] = useState(false);

  const timeZones = [
    { value: "America/New_York", label: "Eastern (ET)" },
    { value: "America/Chicago", label: "Central (CT)" },
    { value: "America/Denver", label: "Mountain (MT)" },
    { value: "America/Phoenix", label: "Arizona (no DST)" },
    { value: "America/Los_Angeles", label: "Pacific (PT)" },
    { value: "America/Anchorage", label: "Alaska (AKST/AKDT)" },
    { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
  ];

  // Filter creators based on search term and filters
  useEffect(() => {
    let filtered = mockCreators;

    // Search by name
    if (searchTerm.trim()) {
      filtered = filtered.filter((creator) =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.contentNiches) {
      filtered = filtered.filter(
        (creator) => creator.niche === filters.contentNiches
      );
    }

    if (filters.platforms) {
      filtered = filtered.filter((creator) =>
        creator.socialLinks.includes(filters.platforms)
      );
    }

    if (filters.timeZone) {
      filtered = filtered.filter(
        (creator) => creator.timeZone === filters.timeZone
      );
    }

    if (filters.followers) {
      filtered = filtered.filter((creator) => {
        const count = creator.followerCount;
        switch (filters.followers) {
          case "1k-10k":
            return count >= 1000 && count <= 10000;
          case "10k-100k":
            return count >= 10000 && count <= 100000;
          case "100k-1m":
            return count >= 100000 && count <= 1000000;
          case "1m+":
            return count >= 1000000;
          default:
            return true;
        }
      });
    }

    if (filters.gender) {
      filtered = filtered.filter(
        (creator) => creator.gender === filters.gender
      );
    }

    setFilteredCreators(filtered);
  }, [searchTerm, filters]);

  // Console log all input changes for debugging
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log("[v0] Search term:", value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    console.log("[v0] Filter changed:", filterType, "=", value);
    console.log("[v0] All filters:", newFilters);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    console.log("[v0] Search triggered with:", {
      searchTerm,
      filters,
    });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Here you would make API call to backend
    // Example: const results = await searchInfluencers({ searchTerm, ...filters })
    // setFilteredCreators(results);

    setIsSearching(false);
  };

  const handleViewProfile = (creatorId) => {
    console.log("[v0] View profile clicked for creator:", creatorId);
    // In a real Next.js app, you would use:
    // router.push(`/brand-dashboard/influencers/${creatorId}`);
    alert(`Navigating to profile for creator ID: ${creatorId}`);
  };

  const handleMessage = (creatorId) => {
    console.log("[v0] Message clicked for creator:", creatorId);
    // Open messaging interface
    alert(`Opening message interface for creator ID: ${creatorId}`);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setFilters({
      contentNiches: "",
      budgetRange: "",
      platforms: "",
      timeZone: "",
      followers: "",
      gender: "",
    });
  };
  const hasActiveFilters =
    Object.values(filters).some((filter) => filter !== "") || searchTerm !== "";
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white px-8 py-6 ">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Discover Micro-Influencers
            </h1>

            {/* <div className="flex items-center gap-4">
              <div className="bg-[#EEF1F5] rounded-full p-2">
                <IoIosNotificationsOutline size={25} />
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                M
              </div>
            </div> */}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-8">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            {/* Search Bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name or keyword..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <select
                value={filters.contentNiches}
                onChange={(e) =>
                  handleFilterChange("contentNiches", e.target.value)
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              >
                <option value="">Content Niches</option>
                <option value="Beauty & Skincare Brands – makeup, skincare, haircare">
                  Beauty & Skincare Brands – makeup, skincare, haircare
                </option>
                <option
                  value="Fashion & Apparel – clothing lines, modest fashion brands,
                  boutique shops"
                >
                  Fashion & Apparel – clothing lines, modest fashion brands,
                  boutique shops
                </option>
                <option value="Jewelry & Accessories – watches, handbags, eyewear">
                  Jewelry & Accessories – watches, handbags, eyewear
                </option>
                <option
                  value="Health & Wellness – supplements, fitness programs, healthy
                  living"
                >
                  Health & Wellness – supplements, fitness programs, healthy
                  living
                </option>
                <option
                  value="Food & Beverage – restaurants, cafes, packaged foods,
                  specialty drinks"
                >
                  Food & Beverage – restaurants, cafes, packaged foods,
                  specialty drinks
                </option>
                <option value="Hospitality & Travel – hotels, resorts, Airbnb hosts, travel agencies">
                  Hospitality & Travel – hotels, resorts, Airbnb hosts, travel
                  agencies
                </option>
                <option value="Events & Experiences – retreats, workshops, conferences">
                  Events & Experiences – retreats, workshops, conferences
                </option>
                <option value="E-commerce Stores – online boutiques, curated shops, niche product sellers">
                  E-commerce Stores – online boutiques, curated shops, niche
                  product sellers
                </option>
                <option value="Local Service Providers – gyms, salons, spas, personal trainers">
                  Local Service Providers – gyms, salons, spas, personal
                  trainers
                </option>
                <option value="Tech & Gadgets – phone accessories, smart devices, apps">
                  Tech & Gadgets – phone accessories, smart devices, apps
                </option>
                <option value="Education & Coaching – online courses, coaches, masterminds">
                  Education & Coaching – online courses, coaches, masterminds
                </option>
                <option value="Parenting & Family Brands – baby products, toys, household goods">
                  Parenting & Family Brands – baby products, toys, household
                  goods
                </option>
                <option value="Home & Lifestyle – decor, furniture, kitchenware, cleaning products">
                  Home & Lifestyle – decor, furniture, kitchenware, cleaning
                  products
                </option>
                <option value="Financial & Professional Services – investment apps, insurance, credit repair">
                  Financial & Professional Services – investment apps,
                  insurance, credit repair
                </option>
                <option value="Education & Coaching – online courses, coaches, mastermindsNonprofits & Causes – charities, community organizations, social impact campaigns">
                  Nonprofits & Causes – charities, community organizations,
                  social impact campaigns
                </option>
                <option value="others">Others</option>
              </select>

              <select
                value={filters.budgetRange}
                onChange={(e) =>
                  handleFilterChange("budgetRange", e.target.value)
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              >
                <option value="">Budget Range</option>
                <option
                  value="Free
"
                >
                  Free
                </option>
                <option value="0–100">$0–$100</option>
                <option value="100-499">$101–$499</option>
                <option value="500+">$500+</option>
              </select>

              <select
                value={filters.platforms}
                onChange={(e) =>
                  handleFilterChange("platforms", e.target.value)
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              >
                <option value="">Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter</option>
              </select>

              <select
                value={filters.timeZone}
                onChange={(e) => handleFilterChange("timeZone", e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              >
                <option value="">Time Zone (US)</option>
                {timeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
                <option value="Others">Others</option>
              </select>

              <div className="relative">
                <select
                  value={filters.followers}
                  onChange={(e) =>
                    handleFilterChange("followers", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
               focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none pr-10"
                >
                  <option value="">Total Audience Reach</option>
                  <option value="0-100">0 – 100</option>
                  <option value="101-500">101 – 500</option>
                  <option value="501-1000">501 – 1,000</option>
                  <option value="1001-5000">1,001 – 5,000</option>
                  <option value="5001-10000">5,001 – 10,000</option>
                  <option value="10001-25000">10,001 – 25,000</option>
                  <option value="25001-50000">25,001 – 50,000</option>
                  <option value="50001-100000">50,001 – 100,000</option>
                  <option value="100001-250000">100,001 – 250,000</option>
                  <option value="250001+">250,001+</option>
                </select>

                {/* Tooltip icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer" />
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white text-xs rounded-md p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    This number refers to your total followers across Instagram.
                  </div>
                </div>
              </div>

              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">No preference</option>
              </select>
            </div>
          </div>

          {/* Featured Creators */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Featured Micro-influencers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-[#D1D5DB] hover:shadow-xl hover:scale-102 transition-transform duration-300 ease-in-out    "
                >
                  {/* Profile Image */}
                  <div className="flex justify-center mb-4">
                    <Image
                      width={80}
                      height={80}
                      src={creator.profileImage || "/placeholder.svg"}
                      alt={creator.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>

                  {/* Creator Info */}
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {creator.name}
                    </h3>
                    <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
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
                      {creator.followers} Followers
                    </p>
                  </div>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-3 mb-4">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                      </svg>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewProfile(creator.id)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleMessage(creator.id)}
                      className="flex-1 xl:px-4 px-2 xl:py-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredCreators.length === 0 && hasActiveFilters && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No creators found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
