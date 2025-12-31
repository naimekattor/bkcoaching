"use client";

import { useRef, useState, useEffect } from "react";
import { Paperclip, X, Globe, Mail, Building2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/fileUpload";
import { apiClient } from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/useAuthStore";

type BrandProfile = Partial<{
  business_name: string | null;
  display_name: string | null;
  short_bio: string | null;
  mission: string | null;
  designation: string | null;
  logo: string | null;
  business_type: string | null;
  website: string | null;
  timezone: string | null;
  description: string | null;
  instagram_handle: string | null;
  tiktok_handle: string | null;
  x_handle: string | null;
  linkedin_profile: string | null;
  whatsapp_business: string | null;
  email_notifications: boolean;
}>;

type FormDataState = {
  business_name: string;
  display_name: string;
  short_bio: string;
  mission: string;
  designation: string;
  logo: string | null;
  business_type: string;
  website: string;
  timezone: string;
  description: string;
  instagramHandle: string;
  tiktokHandle: string;
  xHandle: string;
  linkedinProfile: string;
  whatsappBusiness: string;
  emailNotifications: boolean;
};

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

export default function BrandSetupPage() {
  const { user } = useAuthStore();
  const profile = (user?.brand_profile as BrandProfile | undefined) ?? {};
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormDataState>({
    business_name: "",
    display_name: "",
    short_bio: "",
    mission: "",
    designation: "",
    logo: null as string | null,
    business_type: "",
    website: "",
    timezone: "",
    description: "",
    instagramHandle: "",
    tiktokHandle: "",
    xHandle: "",
    linkedinProfile: "",
    whatsappBusiness: "",
    emailNotifications: true,
  });

  const [saving, setSaving] = useState(false);

  // Load data from user.brand_profile
  useEffect(() => {
    if (!profile || Object.keys(profile).length === 0) return;

    setFormData({
      business_name: profile.business_name || "",
      display_name: profile.display_name || "",
      short_bio: profile.short_bio || "",
      mission: profile.mission || "",
      designation: profile.designation || "",
      logo: profile.logo || null,
      business_type: profile.business_type || "",
      website: profile.website || "",
      timezone: profile.timezone || "",
      description: profile.description || "",
      instagramHandle: profile.instagram_handle || "",
      tiktokHandle: profile.tiktok_handle || "",
      xHandle: profile.x_handle || "",
      linkedinProfile: profile.linkedin_profile || "",
      whatsappBusiness: profile.whatsapp_business || "",
      emailNotifications: profile.email_notifications ?? true,
    });
  }, [profile]);

  const handleInputChange = <K extends keyof FormDataState>(
    field: K,
    value: FormDataState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadToCloudinary(file);
      if (!url) {
        toast.error("Upload failed");
        return;
      }
      setFormData((prev) => ({ ...prev, logo: url }));
      toast.success("Logo uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleSubmit = async () => {
    setSaving(true);

    const payload = {
      brand_profile: {
        business_name: formData.business_name || null,
        display_name: formData.display_name || null,
        short_bio: formData.short_bio || null,
        mission: formData.mission || null,
        designation: formData.designation || null,
        logo: formData.logo || null,
        business_type: formData.business_type || null,
        website: formData.website || null,
        timezone: formData.timezone || null,
        description: formData.description || null,
        instagram_handle: formData.instagramHandle || null,
        tiktok_handle: formData.tiktokHandle || null,
        x_handle: formData.xHandle || null,
        linkedin_profile: formData.linkedinProfile || null,
        whatsapp_business: formData.whatsappBusiness || null,
        email_notifications: formData.emailNotifications,
      },
    };

    try {
      await apiClient("user_service/update_user_profile/", {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(payload),
      });
      toast.success("Brand profile updated!");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen  py-10">
      <div className="">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            Brand Profile Setup
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Complete your brand profile to connect with micro-influencers
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className=" space-y-12">

            {/* Basic Profile Information */}
            <section className="space-y-6">
              {/* <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Basic Profile Information
                </h2>
              </div> */}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business_name" className="text-base font-medium">
                    Business Name
                  </Label>
                  <Input
                    id="business_name"
                    value={formData.business_name}
                    onChange={(e) => handleInputChange("business_name", e.target.value)}
                    placeholder="Enter business name"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_name" className="text-base font-medium">
                    Display Name
                  </Label>
                  <Input
                    id="display_name"
                    value={formData.display_name}
                    onChange={(e) => handleInputChange("display_name", e.target.value)}
                    placeholder="Enter Your Full Name"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short_bio" className="text-base font-medium">
                    Short Bio
                  </Label>
                  <Input
                    id="short_bio"
                    value={formData.short_bio}
                    onChange={(e) => handleInputChange("short_bio", e.target.value)}
                    placeholder="Your business Bio"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mission" className="text-base font-medium">
                    Mission
                  </Label>
                  <Input
                    id="mission"
                    value={formData.mission}
                    onChange={(e) => handleInputChange("mission", e.target.value)}
                    placeholder="Your Mission"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation" className="text-base font-medium">
                    Designation
                  </Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    placeholder="Your Designation"
                    className="h-11"
                  />
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Logo</Label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  {formData.logo ? (
                    <div className="relative group">
                      <Image
                        src={formData.logo}
                        alt="Logo Preview"
                        width={100}
                        height={100}
                        className="rounded-lg border border-gray-200 object-contain bg-white p-1"
                      />
                      <Button
                        
                        size="icon"
                        className="absolute bg-red-400 -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleInputChange("logo", null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm font-medium text-gray-700">Click to upload logo</p>
                      <p className="text-xs text-gray-500">PNG, JPG</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_type" className="text-base font-medium">
                    Business Type
                  </Label>
                  <Select value={formData.business_type} onValueChange={(v) => handleInputChange("business_type", v)}>
                    <SelectTrigger id="business_type" className="h-11">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-base font-medium">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-base font-medium">
                    Time Zone
                  </Label>
                  <Select value={formData.timezone} onValueChange={(v) => handleInputChange("timezone", v)}>
                    <SelectTrigger id="timezone" className="h-11">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeZones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Business Profile Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your brand briefly..."
                  className="min-h-32 resize-none"
                />
              </div>
            </section>

            {/* Social Media */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Social Media Accounts
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    value={formData.instagramHandle}
                    onChange={(e) => handleInputChange("instagramHandle", e.target.value)}
                    placeholder="http://instagram.com/username"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <Input
                    id="tiktok"
                    value={formData.tiktokHandle}
                    onChange={(e) => handleInputChange("tiktokHandle", e.target.value)}
                    placeholder="http://tiktok.com/username"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="x">X (Twitter)</Label>
                  <Input
                    id="x"
                    value={formData.xHandle}
                    onChange={(e) => handleInputChange("xHandle", e.target.value)}
                    placeholder="http://twitter.com/username"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedinProfile}
                    onChange={(e) => handleInputChange("linkedinProfile", e.target.value)}
                    placeholder="http://linkedin.com/in/username"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="whatsapp">WhatsApp Business</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsappBusiness}
                    onChange={(e) => handleInputChange("whatsappBusiness", e.target.value)}
                    placeholder="https://wa.me/6221551321"
                    className="h-11"
                  />
                </div>
              </div>
            </section>

            {/* Email Notifications */}
            <section className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get an email when your profile receives a market match
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={(e) => handleInputChange("emailNotifications", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                className="px-8"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={saving}
                size="lg"
                className="px-10 bg-primary hover:bg-primary/90"
              >
                {saving ? "Saving..." : "Update Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}