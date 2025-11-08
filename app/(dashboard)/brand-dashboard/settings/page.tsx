// "use client";

// import { useState } from "react";
// // import { useRouter } from "next/navigation"
// import { apiClient } from "@/lib/apiClient";
// import { uploadToCloudinary } from "@/lib/fileUpload";

// export default function BrandSetupPage() {
//   //   const router = useRouter()

//   // Form state management
//   const [formData, setFormData] = useState({
//     business_name: "",
//     display_name: "",
//     short_bio: "",
//     mission: "",
//     designation: "",
//     logo: null,
//     business_type: "",
//     website: "",
//     timezone: "",
//     description: "",
//     instagramHandle: "",
//     tiktokHandle: "",
//     xHandle: "",
//     linkedinProfile: "",
//     whatsappBusiness: "",
//     emailNotifications: true,
//   });

//   const [fileName, setFileName] = useState("");

//   const timeZones = [
//     { value: "America/New_York", label: "Eastern (ET)" },
//     { value: "America/Chicago", label: "Central (CT)" },
//     { value: "America/Denver", label: "Mountain (MT)" },
//     { value: "America/Phoenix", label: "Arizona (no DST)" },
//     { value: "America/Los_Angeles", label: "Pacific (PT)" },
//     { value: "America/Anchorage", label: "Alaska (AKST/AKDT)" },
//     { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
//   ];

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleLogoUpload = async (event) => {
//     const file = event.target.files[0];
//     const res = await uploadToCloudinary(file);
//     setFileName(file.name);
//     setFormData((prev) => ({
//       ...prev,
//       logo: res.url,
//     }));
//   };

//   const payload = {
//     brand_profile: formData,
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await apiClient("user_service/update_user_profile/", {
//         method: "PATCH",
//         auth: true,
//         body: JSON.stringify(payload),
//       });

//       console.log("✅ User Info:", res);
//     } catch (error) {
//       console.error("❌ API Error:", error);
//     }
//     console.log("[Brand Setup] Submitted data:", formData);
//     alert("Brand profile setup completed! (Replace with API call)");
//   };

//   const handleCancel = () => {
//     console.log("[Brand Setup] Cancelled");
//     // router.back()
//   };

//   // Standardized Business Type list (client Item 12)
//   const businessTypes = [
//     "Beauty & Skincare Brands – makeup, skincare, haircare",
//     "Fashion & Apparel – clothing lines, modest fashion brands, boutique shops",
//     "Jewelry & Accessories – watches, handbags, eyewear",
//     "Health & Wellness – supplements, fitness programs, healthy living",
//     "Food & Beverage – restaurants, cafes, packaged foods, specialty drinks",
//     "Hospitality & Travel – hotels, resorts, Airbnb hosts, travel agencies",
//     "Events & Experiences – retreats, workshops, conferences",
//     "E-commerce Stores – online boutiques, curated shops, niche product sellers",
//     "Local Service Providers – gyms, salons, spas, personal trainers",
//     "Tech & Gadgets – phone accessories, smart devices, apps",
//     "Education & Coaching – online courses, coaches, masterminds",
//     "Parenting & Family Brands – baby products, toys, household goods",
//     "Home & Lifestyle – decor, furniture, kitchenware, cleaning products",
//     "Financial & Professional Services – investment apps, insurance, credit repair",
//     "Nonprofits & Causes – charities, community organizations, social impact campaigns",
//     "Other",
//   ];

//   return (
//     <div className="min-h-screen ">
//       {/* Header */}
//       <div className="mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-primary">
//               Brand Profile Setup
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Complete your Brand profile to connect with Micro-Influencers
//             </p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 md:p-8 p-2">
//           {/* Basic Profile Information */}
//           <div className="mb-8">
//             <div className="flex items-center gap-2 mb-6">
//               <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
//                 <span className="text-primary text-xs">📋</span>
//               </div>
//               <h2 className="text-lg font-semibold text-primary">
//                 Basic Profile Information
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Business Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Business Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter business name"
//                   value={formData.business_name}
//                   onChange={(e) =>
//                     handleInputChange("business_name", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               {/* bio */}
//               <div className="overflow-hidden">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Short Bio
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your business Bio"
//                   value={formData.short_bio}
//                   onChange={(e) =>
//                     handleInputChange("short_bio", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Display Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter Your Full Name"
//                   value={formData.display_name}
//                   onChange={(e) =>
//                     handleInputChange("display_name", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               {/* bio */}
//               <div className="overflow-hidden">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mission
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your Mission"
//                   value={formData.mission}
//                   onChange={(e) => handleInputChange("mission", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>
//               <div className="overflow-hidden">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Designation
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your Designation"
//                   value={formData.designation}
//                   onChange={(e) =>
//                     handleInputChange("designation", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               {/* Logo Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Logo
//                 </label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition-colors">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleLogoUpload}
//                     className="hidden"
//                     id="logo-upload"
//                   />
//                   <label htmlFor="logo-upload" className="cursor-pointer">
//                     <div className="text-gray-400 mb-2">📁</div>
//                     <span className="text-sm text-gray-600">
//                       Click to upload logo
//                     </span>
//                   </label>
//                   {formData.logo && (
//                     <div className="mt-2">
//                       <img
//                         src={formData.logo}
//                         alt="Logo Preview"
//                         className="h-20 w-20 object-contain rounded border border-gray-300"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Business Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Business Type
//                 </label>
//                 <select
//                   value={formData.business_type}
//                   onChange={(e) =>
//                     handleInputChange("business_type", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 >
//                   <option value="">Select business...</option>
//                   {businessTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Industry */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Industry
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your industry"
//                   value={formData.industry}
//                   onChange={(e) =>
//                     handleInputChange("industry", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               {/* Time Zone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Time Zone
//                 </label>
//                 <select
//                   value={formData.timezone}
//                   onChange={(e) =>
//                     handleInputChange("timezone", e.target.value)
//                   }
//                   className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
//                 >
//                   <option value="">Time Zone (US)</option>
//                   {timeZones.map((tz) => (
//                     <option key={tz.value} value={tz.value}>
//                       {tz.label}
//                     </option>
//                   ))}
//                   <option value="Others">Others</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Website
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your website"
//                   value={formData.website}
//                   onChange={(e) => handleInputChange("website", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Business Description */}
//             <div className="mt-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Business Profile Description
//               </label>
//               <textarea
//                 placeholder="Describe your brand briefly..."
//                 value={formData.description}
//                 onChange={(e) =>
//                   handleInputChange("description", e.target.value)
//                 }
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
//               />
//             </div>
//           </div>

//           {/* Social Media Accounts */}
//           <div className="mb-8">
//             <div className="flex items-center gap-2 mb-6">
//               <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
//                 <span className="text-purple-600 text-xs">📱</span>
//               </div>
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Social Media Accounts
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Instagram Handle
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="@yourbusiness"
//                   value={formData.instagramHandle}
//                   onChange={(e) =>
//                     handleInputChange("instagramHandle", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   TikTok
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="tiktok.com/yourpage"
//                   value={formData.tiktokHandle}
//                   onChange={(e) =>
//                     handleInputChange("tiktokHandle", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   X (Twitter)
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="@yourbusiness"
//                   value={formData.xHandle}
//                   onChange={(e) => handleInputChange("xHandle", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   LinkedIn Profile
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="linkedin.com/company/yourcompany"
//                   value={formData.linkedinProfile}
//                   onChange={(e) =>
//                     handleInputChange("linkedinProfile", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               <div className="">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   WhatsApp Business
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="WhatsApp Business number or link"
//                   value={formData.whatsappBusiness}
//                   onChange={(e) =>
//                     handleInputChange("whatsappBusiness", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div>

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   twiter Profile
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="@username"
//                   value={formData.twiterProfile}
//                   onChange={(e) =>
//                     handleInputChange("twiterProfile", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                 />
//               </div> */}
//             </div>
//           </div>

//           {/* Email Notifications */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Email Notifications
//             </h2>
//             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//               <div>
//                 <h3 className="font-medium text-gray-900">New Market Match</h3>
//                 <p className="text-sm text-gray-600">
//                   Get an email when your profile receives a market match
//                 </p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.emailNotifications}
//                   onChange={(e) =>
//                     handleInputChange("emailNotifications", e.target.checked)
//                   }
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//               </label>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//             <button
//               onClick={handleCancel}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-[var(--secondaryhover)] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors"
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/brand/profile/page.tsx or wherever you're using it
"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/fileUpload";
import { apiClient } from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/useAuthStore";

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

export default function BrandSetupPage() {
  const { user } = useAuthStore();
  const p = user?.brand_profile || {};
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
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

  // LOAD DATA FROM user.brand_profile ONCE
  useEffect(() => {
    if (!p || Object.keys(p).length === 0) return;

    setFormData({
      business_name: p.business_name || "",
      display_name: p.display_name || "",
      short_bio: p.short_bio || "",
      mission: p.mission || "",
      designation: p.designation || "",
      logo: p.logo || null,
      business_type: p.business_type || "",
      website: p.website || "",
      timezone: p.timezone || "",
      description: p.description || "",
      instagramHandle: p.instagram_handle || "",
      tiktokHandle: p.tiktok_handle || "",
      xHandle: p.x_handle || "",
      linkedinProfile: p.linkedin_profile || "",
      whatsappBusiness: p.whatsapp_business || "",
      emailNotifications: p.email_notifications ?? true,
    });
  }, [p]);

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, logo: url }));
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
      const res = await apiClient("user_service/update_user_profile/", {
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
    <div className="min-h-screen ">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Brand Profile Setup</h1>
          <p className="text-gray-600 mt-2">Complete your brand profile to connect with micro-influencers</p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">

            {/* Basic Info */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-2xl">Basic Profile Information</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div><Label>Business Name</Label><Input value={formData.business_name} onChange={e => handleInputChange("business_name", e.target.value)} /></div>
                <div><Label>Display Name</Label><Input value={formData.display_name} onChange={e => handleInputChange("display_name", e.target.value)} /></div>
                <div><Label>Short Bio</Label><Input value={formData.short_bio} onChange={e => handleInputChange("short_bio", e.target.value)} /></div>
                <div><Label>Mission</Label><Input value={formData.mission} onChange={e => handleInputChange("mission", e.target.value)} /></div>
                <div><Label>Designation</Label><Input value={formData.designation} onChange={e => handleInputChange("designation", e.target.value)} /></div>

                {/* Logo */}
                <div>
                  <Label>Logo</Label>
                  <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                  {formData.logo ? (
                    <div className="relative mt-3">
                      <Image src={formData.logo} alt="Logo" width={120} height={120} className="rounded-lg border" />
                      <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => handleInputChange("logo", null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-3 border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2">Upload logo</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label>Business Type</Label>
                  <Select value={formData.business_type} onValueChange={v => handleInputChange("business_type", v)}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent className="max-h-64">
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div><Label>Website</Label><Input value={formData.website} onChange={e => handleInputChange("website", e.target.value)} placeholder="https://yourbrand.com" /></div>
                <div>
                  <Label>Time Zone</Label>
                  <Select value={formData.timezone} onValueChange={v => handleInputChange("timezone", v)}>
                    <SelectTrigger><SelectValue placeholder="Select timezone" /></SelectTrigger>
                    <SelectContent>
                      {timeZones.map(tz => (
                        <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <Label>Business Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={e => handleInputChange("description", e.target.value)}
                  className="min-h-32 mt-2"
                  placeholder="Tell influencers about your brand..."
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="text-2xl">Social Media Accounts</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><Label>Instagram</Label><Input value={formData.instagramHandle} onChange={e => handleInputChange("instagramHandle", e.target.value)} placeholder="@yourbrand" /></div>
                <div><Label>TikTok</Label><Input value={formData.tiktokHandle} onChange={e => handleInputChange("tiktokHandle", e.target.value)} placeholder="@yourbrand" /></div>
                <div><Label>X (Twitter)</Label><Input value={formData.xHandle} onChange={e => handleInputChange("xHandle", e.target.value)} placeholder="@yourbrand" /></div>
                <div><Label>LinkedIn</Label><Input value={formData.linkedinProfile} onChange={e => handleInputChange("linkedinProfile", e.target.value)} placeholder="linkedin.com/company/yourbrand" /></div>
                <div><Label>WhatsApp Business</Label><Input value={formData.whatsappBusiness} onChange={e => handleInputChange("whatsappBusiness", e.target.value)} placeholder="+1234567890" /></div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mb-10 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Get emails for new market matches</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={e => handleInputChange("emailNotifications", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={saving} size="lg" className="px-10">
                {saving ? "Saving..." : "Update Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}