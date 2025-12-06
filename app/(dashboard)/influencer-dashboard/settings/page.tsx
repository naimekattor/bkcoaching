
"use client";

import { useRef, useState } from "react";
import { Upload, X, DollarSign, Percent, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/fileUpload";
import { apiClient } from "@/lib/apiClient";
import { toast } from "react-toastify";

type StoredInfluencerProfile = {
  content_niches?: string | null;
  content_formats?: string | null;
  payment_preferences?: string | null;
  rate_range_for_affiliate_marketing_percent?: string | null;
  [key: string]: string | null | undefined;
};
import { useAuthStore } from "@/stores/useAuthStore";


const placeholders: Record<string, string> = {
  instagram: "https://www.instagram.com/username",
  tiktok: "https://www.tiktok.com/@username",
  twitter: "https://twitter.com/username",
  youtube: "Full channel URL (e.g., youtube.com/@YourChannel)",
  linkedin: "Full profile or page URL (e.g., linkedin.com/in/yourname",
  whatsapp: "WhatsApp link (e.g., wa.me/15551234567)",
};
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

const contentFormats = [
  { id: "socialPost", label: "Whatsapp Group Post" },
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

const rateRanges = [
  { value: "free", label: "Free" },
  { value: "0-100", label: "$0 – $100" },
  { value: "101-499", label: "$101 – $499" },
  { value: "500+", label: "$500+" },
  { value: "custom", label: "Custom amount" },
];

const fieldMap: Record<string, string> = {
  socialPost: "rate_range_for_social_post",
  repost: "rate_range_for_repost",
  instagramStory: "rate_range_for_instagram_story",
  instagramReel: "rate_range_for_instagram_reel",
  tiktokVideo: "rate_range_for_tiktok_video",
  youtubeVideo: "rate_range_for_youtube_video",
  youtubeShort: "rate_range_for_youtube_short",
  blogPost: "rate_range_for_blog_post",
  podcastMention: "rate_range_for_podcast_mention",
  liveStream: "rate_range_for_live_stream",
  userGeneratedContent: "rate_range_for_ugc_creation",
  whatsappStatus: "rate_range_for_whatsapp_status_post",
};

export default function ProfilePage() {
  const { user } = useAuthStore();
  const p: StoredInfluencerProfile =
    (user?.influencer_profile as StoredInfluencerProfile | undefined) ?? {};
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse from user object
  const initialNiches = p.content_niches ? p.content_niches.split(",").map((s: string) => s.trim()) : [];
  const initialFormats = p.content_formats ? p.content_formats.split(",").map((s: string) => s.trim()) : [];
  const paymentPrefs = p.payment_preferences
  ? p.payment_preferences.split(",").map((s: string) => s.trim().toLowerCase())
  : [];

  const [selectedNiches, setSelectedNiches] = useState<string[]>(initialNiches);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(initialFormats);

  const [paymentModels, setPaymentModels] = useState({
  gifted: paymentPrefs.includes("gifted"),
  paid: paymentPrefs.includes("paid"),
  affiliate: paymentPrefs.includes("affiliate"),
  ambassador: paymentPrefs.includes("ambassador"),
});


  const [affiliatePercent, setAffiliatePercent] = useState(p.rate_range_for_affiliate_marketing_percent || "");

  // Rates: CORRECTLY loaded from backend fields
  const [rates, setRates] = useState<Record<string, { type: string; custom: string }>>(
    Object.fromEntries(
      contentFormats.map((f) => {
        const rawValue = p[fieldMap[f.id]];
        const value = typeof rawValue === "string" ? rawValue : "";
        const isCustom = value && !["free", "0-100", "101-499", "500+"].includes(value);
        return [f.id, { type: isCustom ? "custom" : value, custom: isCustom ? value : "" }];
      })
    )
  );

  const [formData, setFormData] = useState({
    fullName: p.display_name || "",
    bio: p.short_bio || "",
    socialLinks: {
      instagram: p.instagram_handle || "",
      tiktok: p.tiktok_handle || "",
      youtube: p.youtube_handle || "",
      twitter: p.twitter_handle || "",
      linkedin: p.linkedin_handle || "",
      whatsapp: p.whatsapp_handle || "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(p.profile_picture || null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);

    const ratePayload: Record<string, string> = {};
    selectedFormats.forEach(id => {
      const r = rates[id];
      ratePayload[fieldMap[id]] = r.type === "custom" ? r.custom : r.type;
    });

    const payload = {
      influencer_profile: {
        display_name: formData.fullName || null,
        profile_picture: imagePreview || null,
        short_bio: formData.bio || null,
        instagram_handle: formData.socialLinks.instagram || null,
        tiktok_handle: formData.socialLinks.tiktok || null,
        youtube_handle: formData.socialLinks.youtube || null,
        twitter_handle: formData.socialLinks.twitter || null,
        linkedin_handle: formData.socialLinks.linkedin || null,
        whatsapp_handle: formData.socialLinks.whatsapp || null,
        content_niches: selectedNiches.length ? selectedNiches.join(", ") : null,
        content_formats: selectedFormats.length ? selectedFormats.join(", ") : null,
        payment_preferences: Object.entries(paymentModels)
          .filter(([_, v]) => v)
          .map(([k]) =>
            k === "gifted" ? "Gifted Products" :
            k === "paid" ? "Paid Collaborations" :
            k === "affiliate" ? "Affiliate Marketing" :
            "Brand Ambassadorship"
          )
          .join(", ") || null,
        ...ratePayload,
        rate_range_for_affiliate_marketing_percent: paymentModels.affiliate ? affiliatePercent : null,
      },
    };

    try {
      const res = await apiClient("user_service/update_user_profile/", {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(payload),
      });
      if (res.code ==200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadToCloudinary(file);
      if (!url) {
        toast.error("Upload failed");
        return;
      }
      setImagePreview(url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-center text-primary">Micro-Influencer Profile</h1>
        <p className="text-center text-gray-600">Update your info to attract more brand deals</p>

        {/* Basic Info */}
        <Card>
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div><Label className="mb-2">Full Name</Label><Input value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="Your name" /></div>
              <div><Label className="mb-2">Bio</Label><Textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="min-h-32" placeholder="Tell brands about you" /></div>
            </div>
            <div>
              <Label>Profile Picture</Label>
              <input type="file" ref={fileInputRef} onChange={handleImage} className="hidden" accept="image/*" />
              {imagePreview ? (
                <div className="relative mt-4 rounded-lg overflow-hidden">
                  <Image src={imagePreview} alt="Profile" width={128} height={128} className="object-cover w-32 h-32" />
                  <Button variant="destructive" size="icon" className="absolute top-4 right-4" onClick={() => setImagePreview(null)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="mt-4 border-2 border-dashed rounded-xl p-16 text-center cursor-pointer hover:bg-gray-50 transition" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">Click to upload photo</p>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader><CardTitle>Social Media Handles</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            {Object.entries(formData.socialLinks).map(([platform, value]) => (
              <div key={platform}>
                <Label className="capitalize mb-2">{platform}</Label>
                <Input
                  value={value}
                  onChange={e => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, [platform]: e.target.value }
                  })}
                  placeholder={placeholders[platform] || "Enter full link "}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Content Niches */}
        <Card>
          <CardHeader><CardTitle>Content Niches</CardTitle></CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedNiches.length ? `${selectedNiches.length} selected` : "Select your niches"} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full max-h-64 overflow-y-auto">
                {contentNiches.map(niche => (
                  <DropdownMenuCheckboxItem
                    key={niche}
                    checked={selectedNiches.includes(niche)}
                    onCheckedChange={checked => {
                      if (checked) setSelectedNiches([...selectedNiches, niche]);
                      else setSelectedNiches(selectedNiches.filter(n => n !== niche));
                    }}
                  >
                    {niche}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedNiches.map(n => (
                <span key={n} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-sm font-medium">
                  {n}
                  <button onClick={() => setSelectedNiches(selectedNiches.filter(x => x !== n))}>
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Formats */}
        <Card>
          <CardHeader><CardTitle>Content Formats You Create</CardTitle></CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {contentFormats.map(format => (
                <div key={format.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition">
                  <Checkbox
                    checked={selectedFormats.includes(format.id)}
                    onCheckedChange={checked => {
                      if (checked) setSelectedFormats([...selectedFormats, format.id]);
                      else setSelectedFormats(selectedFormats.filter(id => id !== format.id));
                    }}
                  />
                  <Label className="cursor-pointer font-medium">{format.label}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex w-full md:flex-row flex-col gap-8">
           {/* Payment Models */}
       <Card className="flex-1">
          <CardHeader><CardTitle>Payment Models You Accept</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            {(["gifted", "paid", "affiliate", "ambassador"] as const).map(model => (
              <div key={model} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={paymentModels[model]}
                    onCheckedChange={checked => setPaymentModels({ ...paymentModels, [model]: !!checked })}
                  />
                  <p className="cursor-pointer font-medium">
                    {model === "gifted" ? "Gifted Products" :
                     model === "paid" ? "Paid Collaborations" :
                     model === "affiliate" ? "Affiliate Marketing" :
                     "Brand Ambassadorship"}
                  </p>
                </div>
                {model === "affiliate" && paymentModels.affiliate && (
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-gray-500" />
                    <Input value={affiliatePercent} onChange={e => setAffiliatePercent(e.target.value)} className="w-24" placeholder="10" />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Rate Ranges */}
        {paymentModels.paid && selectedFormats.length > 0 && (
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Your Rate Ranges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {selectedFormats.map(id => {
                  const label = contentFormats.find(f => f.id === id)?.label || "";
                  return (
                    <div key={id} className="space-y-3 p-5 border rounded-xl bg-gray-50">
                      <Label className="text-base font-semibold">{label}</Label>
                      <Select
                        value={rates[id]?.type || ""}
                        onValueChange={v => setRates({ ...rates, [id]: { type: v, custom: rates[id]?.custom || "" } })}
                      >
                        <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                        <SelectContent>
                          {rateRanges.map(r => (
                            <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {rates[id]?.type === "custom" && (
                        <Input
                          type="number"
                          placeholder="e.g. $100 "
                          value={rates[id].custom}
                          onChange={e => setRates({ ...rates, [id]: { ...rates[id], custom: e.target.value } })}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
        </div>

       

        

        {/* Submit */}
        <div className="flex justify-end gap-4 pt-10 pb-10">
          <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving} size="lg" className="px-12">
            {saving ? "Saving..." : "Update Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}