// "use client";

// import { useRef, useState } from "react";
// import { Upload, X, DollarSign, Percent, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuCheckboxItem,
// } from "@/components/ui/dropdown-menu";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { uploadToCloudinary } from "@/lib/fileUpload";
// import { apiClient } from "@/lib/apiClient";
// import { toast } from "react-toastify";
// import { useAuthStore } from "@/stores/useAuthStore";

// const contentNiches = [
//   "Beauty & Skincare Brands – makeup, skincare, haircare",
//   "Fashion & Apparel – clothing lines, modest fashion brands, boutique shops",
//   "Jewelry & Accessories – watches, handbags, eyewear",
//   "Health & Wellness – supplements, fitness programs, healthy living",
//   "Food & Beverage – restaurants, cafes, packaged foods, specialty drinks",
//   "Hospitality & Travel – hotels, resorts, Airbnb hosts, travel agencies",
//   "Events & Experiences – retreats, workshops, conferences",
//   "E-commerce Stores – online boutiques, curated shops, niche product sellers",
//   "Local Service Providers – gyms, salons, spas, personal trainers",
//   "Tech & Gadgets – phone accessories, smart devices, apps",
//   "Education & Coaching – online courses, coaches, masterminds",
//   "Parenting & Family Brands – baby products, toys, household goods",
//   "Home & Lifestyle – decor, furniture, kitchenware, cleaning products",
//   "Financial & Professional Services – investment apps, insurance, credit repair",
//   "Nonprofits & Causes – charities, community organizations, social impact campaigns",
//   "Other",
// ];

// const rateRanges = [
//   { value: "free", label: "Free" },
//   { value: "0-100", label: "$0 – $100" },
//   { value: "101-499", label: "$101 – $499" },
//   { value: "500+", label: "$500+" },
//   { value: "custom", label: "Custom amount" },
// ];

// const contentFormats = [
//   { id: "socialPost", label: "Social Post" },
//   { id: "repost", label: "Repost" },
//   { id: "instagramStory", label: "Instagram Story" },
//   { id: "instagramReel", label: "Instagram Reel" },
//   { id: "tiktokVideo", label: "TikTok Video" },
//   { id: "youtubeVideo", label: "YouTube Video" },
//   { id: "youtubeShort", label: "YouTube Short" },
//   { id: "blogPost", label: "Blog Post" },
//   { id: "podcastMention", label: "Podcast Mention" },
//   { id: "liveStream", label: "Live Stream" },
//   { id: "userGeneratedContent", label: "UGC Creation" },
//   { id: "whatsappStatus", label: "WhatsApp Status Post" },
// ];

// export default function ProfilePage() {
//   const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
//   const [selectedContentFormats, setSelectedContentFormats] = useState<
//     string[]
//   >([]);
//   const [paymentModels, setPaymentModels] = useState({
//     gifted: false,
//     paid: false,
//     affiliate: false,
//     ambassador: false,
//   });
//   const [paymentPercentages, setPaymentPercentages] = useState({
//     affiliate: "",
//   });
//   const [rates, setRates] = useState<
//     Record<string, { type: string; custom: string }>
//   >(
//     Object.fromEntries(
//       contentFormats.map((c) => [c.id, { type: "", custom: "" }])
//     )
//   );
//   const [formData, setFormData] = useState({
//     fullName: "",
//     bio: "",
//     socialLinks: {
//       instagram: "",
//       tiktok: "",
//       youtube: "",
//       twitter: "",
//       linkedin: "",
//       whatsapp: "",
//     },
//     timeZone: "",
//     gender: "",
//   });

//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   type SocialPlatform = keyof typeof formData.socialLinks;

//   const removeNiche = (niche: string) => {
//     setSelectedNiches((prev) => prev.filter((n) => n !== niche));
//   };

//   const handleNicheChange = (niche: string, checked: boolean) => {
//     if (checked) {
//       setSelectedNiches((prev) => [...prev, niche]);
//     } else {
//       setSelectedNiches((prev) => prev.filter((n) => n !== niche));
//     }
//   };

//   const handleContentFormatChange = (value: string, checked: boolean) => {
//     if (checked) {
//       setSelectedContentFormats((prev) => [...prev, value]);
//     } else {
//       setSelectedContentFormats((prev) =>
//         prev.filter((item) => item !== value)
//       );
//     }
//   };

//   const timeZones = [
//     { value: "America/New_York", label: "Eastern (ET)" },
//     { value: "America/Chicago", label: "Central (CT)" },
//     { value: "America/Denver", label: "Mountain (MT)" },
//     { value: "America/Phoenix", label: "Arizona (no DST)" },
//     { value: "America/Los_Angeles", label: "Pacific (PT)" },
//     { value: "America/Anchorage", label: "Alaska (AKST/AKDT)" },
//     { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
//     { value: "Others", label: "Others" },
//   ];

//   const handleRateChange = (format: string, value: string) => {
//     setRates((prev) => ({
//       ...prev,
//       [format]: { ...prev[format], type: value },
//     }));
//   };

//   const handleCustomRateChange = (format: string, value: string) => {
//     setRates((prev) => ({
//       ...prev,
//       [format]: { ...prev[format], custom: value },
//     }));
//   };

//   const getSelectedNichesText = () => {
//     if (selectedNiches.length === 0) {
//       return "Select your niches";
//     }
//     if (selectedNiches.length === 1) {
//       return selectedNiches[0];
//     }
//     return `${selectedNiches.length} niches selected`;
//   };

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const res = await uploadToCloudinary(file);
//       const imageUrl = res.url;
//       setProfileImage(imageUrl);
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
//     }
//   };

//   const handleRemoveImage = () => {
//     setProfileImage(null);
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleTriggerFileSelect = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = async () => {
//     let profilePictureUrl = "https://default-placeholder-url.com";
//     if (profileImage) {
//       profilePictureUrl = profileImage;
//       // profilePictureUrl = URL.createObjectURL(profileImage);
//     }

//     // Map content format IDs to payload field names
//     const formatMap: Record<string, string> = {
//       socialPost: "social_post",
//       repost: "repost",
//       instagramStory: "instagram_story",
//       instagramReel: "instagram_reel",
//       tiktokVideo: "tiktok_video",
//       youtubeVideo: "youtube_video",
//       youtubeShort: "youtube_short",
//       blogPost: "blog_post",
//       podcastMention: "podcast_mention",
//       liveStream: "live_stream",
//       userGeneratedContent: "ugc_creation",
//       whatsappStatus: "whatsapp_status_post",
//     };

//     // Build rate ranges only for selected formats
//     const rateRangesPayload: Record<string, string> = {};
//     selectedContentFormats.forEach((formatId) => {
//       const rate = rates[formatId];
//       const value = rate.type === "custom" ? rate.custom : rate.type;
//       const fieldName = `rate_range_for_${formatMap[formatId] || formatId}`;
//       rateRangesPayload[fieldName] = value || "";
//     });

//     // Build payload
//     const payload = {
//       influencer_profile: {
//         display_name: formData.fullName || "",
//         profile_picture: profilePictureUrl,
//         short_bio: formData.bio || "",
//         instagram_handle: formData.socialLinks.instagram || "",
//         tiktok_handle: formData.socialLinks.tiktok || "",
//         youtube_handle: formData.socialLinks.youtube || "",
//         twitter_handle: formData.socialLinks.twitter || "",
//         linkedin_handle: formData.socialLinks.linkedin || "",
//         whatsapp_handle: formData.socialLinks.whatsapp || "",
//         content_niches: selectedNiches.join(", ") || "",
//         content_formats: selectedContentFormats.join(",") || "",
//         payment_preferences:
//           Object.keys(paymentModels)
//             .filter((key) => paymentModels[key as keyof typeof paymentModels])
//             .join(", ") || "",
//         ...rateRangesPayload,
//         rate_range_for_affiliate_marketing_percent: paymentModels.affiliate
//           ? paymentPercentages.affiliate
//           : "",
//       },
//     };

//     console.log("Payload:", JSON.stringify(payload, null, 2)); // For demo

//     try {
//       const response = await apiClient("user_service/update_user_profile/", {
//         method: "PATCH",
//         auth: true,
//         body: JSON.stringify(payload),
//       });
//       if (response.code == "200") {
//         toast("Profile updated successfully!");
//       }
//     } catch (error) {
//       toast("there was an error!");
//       console.error("Error submitting payload:", error);
//     }
//   };

//   const { user, logout } = useAuthStore();
//     console.log("useeer Data:",user);

//   return (
//     <div className="min-h-screen ">
//       <div className="mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-primary">
//               Micro-Influencer Profile
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Update your information to keep connecting with Brands.
//             </p>
//           </div>
//         </div>

//         {/* Basic Information */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Basic Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <Label className="mb-1">Full Name</Label>
//                   <Input
//                     value={formData.fullName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, fullName: e.target.value })
//                     }
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//                 <div>
//                   <Label className="mb-1">Bio / About Me</Label>
//                   <Textarea
//                     value={formData.bio}
//                     onChange={(e) =>
//                       setFormData({ ...formData, bio: e.target.value })
//                     }
//                     placeholder="Tell us about yourself"
//                     className="min-h-[100px] resize-none"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Time Zone */}
//                   <div className="flex flex-col">
//                     <Label className="mb-1">Time Zone</Label>
//                     <Select
//                       onValueChange={(value) =>
//                         setFormData((prev) => ({ ...prev, timeZone: value }))
//                       }
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Time Zone (US)" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {timeZones.map((tz) => (
//                           <SelectItem key={tz.value} value={tz.value}>
//                             {tz.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Gender */}
//                   <div className="flex flex-col">
//                     <Label className="mb-1">Gender</Label>
//                     <Select
//                       onValueChange={(value) =>
//                         setFormData((prev) => ({ ...prev, gender: value }))
//                       }
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select Gender" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                         <SelectItem value="no-preference">
//                           No Preference
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <Label>Profile Picture</Label>
//                 {/* Hidden file input */}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   className="hidden"
//                   accept="image/png, image/jpeg, image/gif"
//                 />

//                 {imagePreview ? (
//                   // Preview of the selected image
//                   <div className="relative w-full h-48 mt-2">
//                     <Image
//                       src={imagePreview}
//                       alt="Profile preview"
//                       layout="fill"
//                       objectFit="cover"
//                       className="rounded-lg"
//                     />
//                     <Button
//                       variant="destructive"
//                       size="icon"
//                       className="absolute top-2 right-2 h-7 w-7 rounded-full"
//                       onClick={handleRemoveImage}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ) : (
//                   // Default upload placeholder
//                   <div
//                     className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-2 cursor-pointer hover:bg-gray-50"
//                     onClick={handleTriggerFileSelect}
//                   >
//                     <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                     <p className="text-sm text-gray-600">
//                       Click to upload a profile picture
//                     </p>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       className="mt-2 bg-transparent"
//                     >
//                       Choose File
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Social Media Accounts */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Social Media Accounts</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid md:grid-cols-2 gap-4">
//               {(Object.keys(formData.socialLinks) as SocialPlatform[]).map(
//                 (platform) => (
//                   <div key={platform} className="space-y-2">
//                     <Label htmlFor={platform} className="capitalize">
//                       {platform}
//                     </Label>
//                     <Input
//                       id={platform}
//                       value={formData.socialLinks[platform]}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           socialLinks: {
//                             ...prev.socialLinks,
//                             [platform]: e.target.value,
//                           },
//                         }))
//                       }
//                       placeholder={
//                         platform === "whatsapp"
//                           ? "+1 555-123-4567"
//                           : "@yourusername or profile URL"
//                       }
//                     />
//                   </div>
//                 )
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* --- SECTION REPLACED: Content Niches using DropdownMenu --- */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Content Niches</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="w-full justify-between">
//                   <span>{getSelectedNichesText()}</span>
//                   <ChevronDown className="h-4 w-4 opacity-50" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
//                 {contentNiches.map((niche) => (
//                   <DropdownMenuCheckboxItem
//                     key={niche}
//                     checked={selectedNiches.includes(niche)}
//                     onCheckedChange={(checked) =>
//                       handleNicheChange(niche, checked as boolean)
//                     }
//                   >
//                     {niche}
//                   </DropdownMenuCheckboxItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <div className="flex flex-wrap gap-2 mt-4">
//               {selectedNiches.map((niche) => (
//                 <span
//                   key={niche}
//                   className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
//                 >
//                   {niche}
//                   <button onClick={() => removeNiche(niche)}>
//                     <X className="w-3.5 h-3.5 text-gray-500 hover:text-gray-800" />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Content Formats */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Content Formats</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {contentFormats.map((format) => (
//                 <div
//                   key={format.id}
//                   className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
//                 >
//                   <Checkbox
//                     id={format.id}
//                     checked={selectedContentFormats.includes(format.id)}
//                     onCheckedChange={(checked) =>
//                       handleContentFormatChange(format.id, checked as boolean)
//                     }
//                   />
//                   <Label
//                     htmlFor={format.id}
//                     className="text-sm font-normal cursor-pointer"
//                   >
//                     {format.label}
//                   </Label>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Payment Models */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Payment Models</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {["gifted", "paid", "affiliate", "ambassador"].map((model) => (
//                 <div key={model} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={model}
//                     checked={paymentModels[model as keyof typeof paymentModels]}
//                     onCheckedChange={(checked) =>
//                       setPaymentModels((prev) => ({
//                         ...prev,
//                         [model]: checked as boolean,
//                       }))
//                     }
//                   />
//                   <label htmlFor={model} className="text-sm text-gray-700">
//                     {model === "gifted"
//                       ? "Gifted Products"
//                       : model === "paid"
//                       ? "Paid Collaborations"
//                       : model === "affiliate"
//                       ? "Affiliate Marketing"
//                       : "Brand Ambassadorship"}
//                   </label>
//                   {model === "affiliate" && paymentModels.affiliate && (
//                     <div className="flex items-center ml-4 gap-2">
//                       <Percent className="w-4 h-4 text-gray-500" />
//                       <Input
//                         type="number"
//                         min={0}
//                         max={100}
//                         placeholder="%"
//                         value={paymentPercentages.affiliate}
//                         onChange={(e) =>
//                           setPaymentPercentages({ affiliate: e.target.value })
//                         }
//                         className="w-20"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Rates & Payment (Conditional) */}
//         {paymentModels.paid && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <DollarSign className="w-5 h-5" />
//                 Your Rate Ranges
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid md:grid-cols-2 gap-6">
//                 {selectedContentFormats.map((formatId) => {
//                   const formatInfo = contentFormats.find(
//                     (f) => f.id === formatId
//                   );
//                   if (!formatInfo) return null;

//                   return (
//                     <div key={formatId} className="space-y-2">
//                       <Label>{formatInfo.label}</Label>
//                       <Select
//                         value={rates[formatId]?.type || ""}
//                         onValueChange={(value) =>
//                           handleRateChange(formatId, value)
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select rate range" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {rateRanges.map((range) => (
//                             <SelectItem key={range.value} value={range.value}>
//                               {range.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       {rates[formatId]?.type === "custom" && (
//                         <Input
//                           type="number"
//                           placeholder="Enter custom rate"
//                           value={rates[formatId].custom}
//                           onChange={(e) =>
//                             handleCustomRateChange(formatId, e.target.value)
//                           }
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Update Button */}
//         <div className="flex justify-end pt-4">
//           <Button
//             onClick={handleSubmit}
//             className="bg-yellow-500 hover:bg-[var(--secondaryhover)] text-white px-8 py-2"
//           >
//             Update Profile
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/influencer/profile/page.tsx
// app/influencer/profile/page.tsx
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
import { useAuthStore } from "@/stores/useAuthStore";

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
  const p = user?.influencer_profile || {};
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
      contentFormats.map(f => {
        const value = p[fieldMap[f.id]] || "";
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
      setImagePreview(url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center text-primary">Micro-Influencer Profile</h1>
        <p className="text-center text-gray-600">Update your info to attract more brand deals</p>

        {/* Basic Info */}
        <Card>
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div><Label>Full Name</Label><Input value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="Your name" /></div>
              <div><Label>Bio</Label><Textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="min-h-32" placeholder="Tell brands about you" /></div>
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
                <Label className="capitalize">{platform}</Label>
                <Input
                  value={value}
                  onChange={e => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, [platform]: e.target.value }
                  })}
                  placeholder={platform === "whatsapp" ? "+1234567890" : "@username"}
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
                  <p className="font-semibold">
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
                          placeholder="e.g. 850"
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