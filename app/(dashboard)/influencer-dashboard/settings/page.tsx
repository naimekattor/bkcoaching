"use client";

import { useState } from "react";
import { Upload, X, Search } from "lucide-react";
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
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const contentNiches = [
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

export default function ProfilePage() {
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [nicheSearch, setNicheSearch] = useState("");
  const [paymentModels, setPaymentModels] = useState({
    gifted: false,
    paid: false,
    affiliate: false,
    ambassador: false,
  });
  const [timeZone, setTimeZone] = useState("Time Zone");
  const [formData, setFormData] = useState({
    socialLinks: {
      instagram: "",
      tiktok: "",
      youtube: "",
      twitter: "",
      linkedin: "",
      whatsapp: "",
    },
  });
  type SocialPlatform = keyof typeof formData.socialLinks;
  const removeNiche = (niche: string) => {
    setSelectedNiches((prev) => prev.filter((n) => n !== niche));
  };

  const addNiche = (niche: string) => {
    if (!selectedNiches.includes(niche)) {
      setSelectedNiches((prev) => [...prev, niche]);
    }
    setNicheSearch("");
  };

  const timeZones = [
    { value: "America/New_York", label: "Eastern (ET)" },
    { value: "America/Chicago", label: "Central (CT)" },
    { value: "America/Denver", label: "Mountain (MT)" },
    { value: "America/Phoenix", label: "Arizona (no DST)" },
    { value: "America/Los_Angeles", label: "Pacific (PT)" },
    { value: "America/Anchorage", label: "Alaska (AKST/AKDT)" },
    { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
  ];

  const filteredNiches = contentNiches.filter(
    (niche) =>
      niche.toLowerCase().includes(nicheSearch.toLowerCase()) &&
      !selectedNiches.includes(niche)
  );

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Micro-Influencer Profile Setup
            </h1>
            <p className="text-gray-600 mt-1">
              Fill out your information to start connecting with Brands.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <Input placeholder="Enter your full name" />
                </div>

                <div>
                  <label className="block text-sm mb-2">Bio / About Me</label>
                  <Textarea
                    placeholder="Tell us about yourself"
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Time Zone</label>
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
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
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Gender</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="no-preference">
                          No Preference
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Birth Year</label>
                    <Input placeholder="1995" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      Languages Spoken
                    </label>
                    <Input placeholder="English, Spanish, French" />
                  </div>
                </div> */}
              </div>

              <div>
                <label className="block text-sm mb-2">Profile Picture</label>
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
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Social Media Accounts
            </h2>

            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {(Object.keys(formData.socialLinks) as SocialPlatform[]).map(
                  (platform) => (
                    <div className="space-y-2" key={platform}>
                      <Label htmlFor={platform}>{platform}</Label>
                      <Input
                        id={platform}
                        value={formData.socialLinks[platform]}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            socialLinks: {
                              ...prev.socialLinks,
                              [platform]: e.target.value,
                            },
                          }))
                        }
                        placeholder={
                          platform === "whatsapp"
                            ? "+1 555-123-4567"
                            : "@yourusername or profile URL"
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </div>

          {/* Content Niches */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Content Niches
            </h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={nicheSearch}
                onChange={(e) => setNicheSearch(e.target.value)}
                className="pl-10"
              />
              {nicheSearch && filteredNiches.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
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
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {niche}
                  <button onClick={() => removeNiche(niche)}>
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Rates & Payment */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Rates & Payment
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm">Instagram Post Rate</label>
                  <Input placeholder="$500" />
                </div>
                <div>
                  <label className="block text-sm">Instagram Story Rate</label>
                  <Input placeholder="$200" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm">
                    Minimum Rate Per Project
                  </label>
                  <Input placeholder="$100" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Models (separate) */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Payment Models
            </h2>
            <div className="space-y-3">
              {[
                { id: "gifted", label: "Gifted Products" },
                { id: "paid", label: "Paid Collaborations" },
                { id: "affiliate", label: "Affiliate Marketing" },
                { id: "ambassador", label: "Brand Ambassadorship" },
              ].map((model) => (
                <div key={model.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={model.id}
                    checked={
                      paymentModels[model.id as keyof typeof paymentModels]
                    }
                    onCheckedChange={(checked) =>
                      setPaymentModels((prev) => ({
                        ...prev,
                        [model.id]: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor={model.id} className="text-sm text-gray-700">
                    {model.label}
                  </label>
                </div>
              ))}
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
