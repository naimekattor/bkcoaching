"use client";

import { useRef, useState } from "react";
// --- UPDATED IMPORTS ---
import { Upload, X, DollarSign, Percent, ChevronDown } from "lucide-react";
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
// --- NEW IMPORTS for Dropdown Menu ---
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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

const rateRanges = [
  { value: "free", label: "Free" },
  { value: "0-100", label: "$0 – $100" },
  { value: "101-499", label: "$101 – $499" },
  { value: "500+", label: "$500+" },
  { value: "custom", label: "Custom amount" },
];

const contentFormats = [
  { id: "socialPost", label: "Social Post" },
  { id: "repost", label: "Repost" },
  { id: "instagramStory", label: "Instagram Story" },
  { id: "instagramReel", label: "Instagram Reel" },
  { id: "tiktokVideo", label: "TikTok Video" },
  { id: "youtubeVideo", label: "YouTube Video" },
  { id: "youtubeShort", label: "YouTube Short" },
  { id: "blogPost", label: "Blog Post" },
  { id: "podcastMention", label: "Podcast Mention" },
  { id: "liveStream", label: "Live Stream" },
  { id: "userGeneratedContent", label: "UGC Creation" },
  { id: "whatsappStatus", label: "WhatsApp Status Post" },
];

export default function ProfilePage() {
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [selectedContentFormats, setSelectedContentFormats] = useState<
    string[]
  >([]);
  const [paymentModels, setPaymentModels] = useState({
    gifted: false,
    paid: false,
    affiliate: false,
    ambassador: false,
  });
  const [paymentPercentages, setPaymentPercentages] = useState({
    affiliate: "",
  });
  const [rates, setRates] = useState<
    Record<string, { type: string; custom: string }>
  >(
    Object.fromEntries(
      contentFormats.map((c) => [c.id, { type: "", custom: "" }])
    )
  );
  const [timeZone, setTimeZone] = useState("Time Zone");
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    socialLinks: {
      instagram: "",
      tiktok: "",
      youtube: "",
      twitter: "",
      linkedin: "",
      whatsapp: "",
    },
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  type SocialPlatform = keyof typeof formData.socialLinks;

  const removeNiche = (niche: string) => {
    setSelectedNiches((prev) => prev.filter((n) => n !== niche));
  };

  // --- UPDATED HANDLER for DropdownMenuCheckboxItem ---
  const handleNicheChange = (niche: string, checked: boolean) => {
    if (checked) {
      setSelectedNiches((prev) => [...prev, niche]);
    } else {
      setSelectedNiches((prev) => prev.filter((n) => n !== niche));
    }
  };

  const handleContentFormatChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedContentFormats((prev) => [...prev, value]);
    } else {
      setSelectedContentFormats((prev) =>
        prev.filter((item) => item !== value)
      );
    }
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

  const handleRateChange = (format: string, value: string) => {
    setRates((prev) => ({
      ...prev,
      [format]: { ...prev[format], type: value },
    }));
  };

  const handleCustomRateChange = (format: string, value: string) => {
    setRates((prev) => ({
      ...prev,
      [format]: { ...prev[format], custom: value },
    }));
  };

  const getSelectedNichesText = () => {
    if (selectedNiches.length === 0) {
      return "Select your niches";
    }
    if (selectedNiches.length === 1) {
      return selectedNiches[0];
    }
    return `${selectedNiches.length} niches selected`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      // Generate a temporary URL for the image preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      // Reset the file input so the user can select the same file again
      fileInputRef.current.value = "";
    }
  };

  // This function will be triggered by the button click
  const handleTriggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Micro-Influencer Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Update your information to keep connecting with Brands.
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="mb-1">Full Name</Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label className="mb-1">Bio / About Me</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself"
                    className="min-h-[100px] resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1">Time Zone</Label>
                    <Select value={timeZone} onValueChange={setTimeZone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Time Zone (US) " />
                      </SelectTrigger>
                      <SelectContent>
                        {timeZones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1">Gender</Label>
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
              </div>

              <div>
                <Label>Profile Picture</Label>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/gif"
                />

                {imagePreview ? (
                  // Preview of the selected image
                  <div className="relative w-full h-48 mt-2">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  // Default upload placeholder
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-2 cursor-pointer hover:bg-gray-50"
                    onClick={handleTriggerFileSelect}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload a profile picture
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {(Object.keys(formData.socialLinks) as SocialPlatform[]).map(
                (platform) => (
                  <div key={platform} className="space-y-2">
                    <Label htmlFor={platform} className="capitalize">
                      {platform}
                    </Label>
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
        </Card>

        {/* --- SECTION REPLACED: Content Niches using DropdownMenu --- */}
        <Card>
          <CardHeader>
            <CardTitle>Content Niches</CardTitle>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>{getSelectedNichesText()}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
                {contentNiches.map((niche) => (
                  <DropdownMenuCheckboxItem
                    key={niche}
                    checked={selectedNiches.includes(niche)}
                    onCheckedChange={(checked) =>
                      handleNicheChange(niche, checked as boolean)
                    }
                  >
                    {niche}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedNiches.map((niche) => (
                <span
                  key={niche}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
                >
                  {niche}
                  <button onClick={() => removeNiche(niche)}>
                    <X className="w-3.5 h-3.5 text-gray-500 hover:text-gray-800" />
                  </button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Formats */}
        <Card>
          <CardHeader>
            <CardTitle>Content Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contentFormats.map((format) => (
                <div
                  key={format.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={format.id}
                    checked={selectedContentFormats.includes(format.id)}
                    onCheckedChange={(checked) =>
                      handleContentFormatChange(format.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={format.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {format.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Models */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["gifted", "paid", "affiliate", "ambassador"].map((model) => (
                <div key={model} className="flex items-center space-x-2">
                  <Checkbox
                    id={model}
                    checked={paymentModels[model as keyof typeof paymentModels]}
                    onCheckedChange={(checked) =>
                      setPaymentModels((prev) => ({
                        ...prev,
                        [model]: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor={model} className="text-sm text-gray-700">
                    {model === "gifted"
                      ? "Gifted Products"
                      : model === "paid"
                      ? "Paid Collaborations"
                      : model === "affiliate"
                      ? "Affiliate Marketing"
                      : "Brand Ambassadorship"}
                  </label>
                  {model === "affiliate" && paymentModels.affiliate && (
                    <div className="flex items-center ml-4 gap-2">
                      <Percent className="w-4 h-4 text-gray-500" />
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="%"
                        value={paymentPercentages.affiliate}
                        onChange={(e) =>
                          setPaymentPercentages({ affiliate: e.target.value })
                        }
                        className="w-20"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rates & Payment (Conditional) */}
        {paymentModels.paid && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Your Rate Ranges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {selectedContentFormats.map((formatId) => {
                  const formatInfo = contentFormats.find(
                    (f) => f.id === formatId
                  );
                  if (!formatInfo) return null;

                  return (
                    <div key={formatId} className="space-y-2">
                      <Label>{formatInfo.label}</Label>
                      <Select
                        value={rates[formatId]?.type || ""}
                        onValueChange={(value) =>
                          handleRateChange(formatId, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rate range" />
                        </SelectTrigger>
                        <SelectContent>
                          {rateRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {rates[formatId]?.type === "custom" && (
                        <Input
                          type="number"
                          placeholder="Enter custom rate"
                          value={rates[formatId].custom}
                          onChange={(e) =>
                            handleCustomRateChange(formatId, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Update Button */}
        <div className="flex justify-end pt-4">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-2">
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
