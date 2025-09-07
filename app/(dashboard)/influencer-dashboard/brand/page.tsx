"use client";

import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { mockCreators } from "@/lib/mocks/creators";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { MdInsertEmoticon } from "react-icons/md";
import Image from "next/image";

export default function MicroinfluencersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [businessType, setBusinessType] = useState("Business Type");
  const [location, setLocation] = useState("Location");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/brand-dashboard"
          className="text-gray-400 hover:text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Find Brands You Love
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Business Type</option>
            <option>Fashion</option>
            <option>Beauty</option>
            <option>Fitness</option>
            <option>Tech</option>
            <option>Food</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Location</option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
          </select>

          <div className="flex gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Apply Filters
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Featured Creators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Featured Creators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCreators.map((creator) => (
            <div
              key={creator.id}
              className="bg-white rounded-lg border border-gray-200 p-6 text-center"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Image
                  width={64}
                  height={64}
                  src={creator.image || "/placeholder.svg"}
                  alt={creator.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <h3 className="font-semibold text-[17px] text-[#242524] mb-1">
                {creator.name}
              </h3>
              <p className="text-sm text-[#363635] mb-2">
                Category: {creator.category}
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                {creator.platforms.includes("instagram") && (
                  <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                    <span className="text-xs">
                      <FaInstagram />
                    </span>
                  </div>
                )}
                {creator.platforms.includes("tiktok") && (
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-xs text-white">
                      <MdInsertEmoticon />
                    </span>
                  </div>
                )}
                {creator.platforms.includes("youtube") && (
                  <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-xs">📺</span>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-3 mb-4">
                <Link
                  href={`/influencer-dashboard/brand/${creator.id}`}
                  className=" border-1 border-secondary  text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  View Profile
                </Link>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
