"use client";

import { useState } from "react";
import { ArrowLeft, Upload, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const contentNiches = [
  "Spring Chic",
  "Glow & Go",
  "Heels & Hues",
  "Coquette Edit",
  "Purpose of Style",
  "Fashion Hauls",
  "Get Ready",
  "Wardrobe Style",
  "Beauty Tips",
  "Lifestyle",
  "Travel",
  "Food",
  "Fitness",
  "Tech",
  "Home Decor",
  "Skincare",
  "Makeup",
];

export default function ProfilePage() {
  const [selectedNiches, setSelectedNiches] = useState([
    "Spring Chic",
    "Glow & Go",
    "Heels & Hues",
    "Coquette Edit",
    "Purpose of Style",
    "Fashion Hauls",
    "Get Ready",
    "Wardrobe Style",
  ]);
  const [nicheSearch, setNicheSearch] = useState("");
  const [paymentModels, setPaymentModels] = useState({
    affiliate: false,
    gifted: false,
  });

  const removeNiche = (niche: string) => {
    setSelectedNiches((prev) => prev.filter((n) => n !== niche));
  };

  const addNiche = (niche: string) => {
    if (!selectedNiches.includes(niche)) {
      setSelectedNiches((prev) => [...prev, niche]);
    }
    setNicheSearch("");
  };

  const filteredNiches = contentNiches.filter(
    (niche) =>
      niche.toLowerCase().includes(nicheSearch.toLowerCase()) &&
      !selectedNiches.includes(niche)
  );

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-4 h-4" onClick={() => router.back()} />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Fill out your information to start connecting with Businesses.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">👤</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input placeholder="Enter your full name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio / About Me
                  </label>
                  <Textarea
                    placeholder="Tell us about yourself"
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <Input placeholder="City, Country" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Year
                    </label>
                    <Input placeholder="1995" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Languages Spoken
                    </label>
                    <Input placeholder="English, Spanish, French" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Upload your profile picture
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Accounts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📱</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Social Media Accounts
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-pink-500">📷</span> Instagram Handle
                  </label>
                  <Input placeholder="@username" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-red-500">🎥</span> YouTube Channel
                  </label>
                  <Input placeholder="Channel URL" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-blue-500">🐦</span> Twitter / X
                  </label>
                  <Input placeholder="@username" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-black">🎵</span> TikTok Handle
                  </label>
                  <Input placeholder="@username" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-green-500">💬</span> WhatsApp Business
                  </label>
                  <Input placeholder="+1 (555) 123-4567" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-blue-600">🌐</span> Website / Blog
                  </label>
                  <Input placeholder="https://yourwebsite.com" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Niches */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">🏷️</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Content Niches
              </h2>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={nicheSearch}
                onChange={(e) => setNicheSearch(e.target.value)}
                className="pl-10"
              />
              {nicheSearch && filteredNiches.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredNiches.map((niche) => (
                    <button
                      key={niche}
                      onClick={() => addNiche(niche)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedNiches.map((niche) => (
                <span
                  key={niche}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {niche}
                  <button
                    onClick={() => removeNiche(niche)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Rates & Payment */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">💰</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Rates & Payment
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Post Rate
                  </label>
                  <Input placeholder="$500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Models
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="affiliate"
                        checked={paymentModels.affiliate}
                        onCheckedChange={(checked) =>
                          setPaymentModels((prev) => ({
                            ...prev,
                            affiliate: checked as boolean,
                          }))
                        }
                      />
                      <label
                        htmlFor="affiliate"
                        className="text-sm text-gray-700"
                      >
                        Affiliate Commission
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="gifted"
                        checked={paymentModels.gifted}
                        onCheckedChange={(checked) =>
                          setPaymentModels((prev) => ({
                            ...prev,
                            gifted: checked as boolean,
                          }))
                        }
                      />
                      <label htmlFor="gifted" className="text-sm text-gray-700">
                        Gifted Products
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Story Rate
                  </label>
                  <Input placeholder="$200" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rate Per Project
                  </label>
                  <Input placeholder="$100" />
                </div>
              </div>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-end">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-2">
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
