"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation"

export default function BrandSetupPage() {
  //   const router = useRouter()

  // Form state management
  const [formData, setFormData] = useState({
    businessName: "",
    tagline: "",
    logo: null,
    businessType: "",
    industry: "",
    timeZone: "",
    description: "",
    instagramHandle: "",
    tiktokHandle: "",
    xHandle: "",
    linkedinProfile: "",
    whatsappBusiness: "",
    emailNotifications: true,
  });

  const timeZones = [
    { value: "America/New_York", label: "Eastern (ET)" },
    { value: "America/Chicago", label: "Central (CT)" },
    { value: "America/Denver", label: "Mountain (MT)" },
    { value: "America/Phoenix", label: "Arizona (no DST)" },
    { value: "America/Los_Angeles", label: "Pacific (PT)" },
    { value: "America/Anchorage", label: "Alaska (AKST/AKDT)" },
    { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  const handleSubmit = () => {
    console.log("[Brand Setup] Submitted data:", formData);
    alert("Brand profile setup completed! (Replace with API call)");
  };

  const handleCancel = () => {
    console.log("[Brand Setup] Cancelled");
    // router.back()
  };

  // Standardized Business Type list (client Item 12)
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

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Brand Profile Setup
            </h1>
            <p className="text-gray-600 mt-1">
              Complete your Brand profile to connect with Micro-Influencers
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Basic Profile Information */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                <span className="text-primary text-xs">📋</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Basic Profile Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  placeholder="Enter business name"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  placeholder="Your business slogan"
                  value={formData.tagline}
                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="text-gray-400 mb-2">📁</div>
                    <span className="text-sm text-gray-600">
                      Click to upload logo
                    </span>
                  </label>
                  {formData.logo && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {formData.logo.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) =>
                    handleInputChange("businessType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select business...</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  placeholder="Enter your industry"
                  value={formData.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Time Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone
                </label>
                <select
                  value={formData.timeZone}
                  onChange={(e) =>
                    handleInputChange("timeZone", e.target.value)
                  }
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
            </div>

            {/* Business Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Profile Description
              </label>
              <textarea
                placeholder="Describe your brand briefly..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Social Media Accounts */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                <span className="text-purple-600 text-xs">📱</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Social Media Accounts
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Instagram Handle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  placeholder="@yourbusiness"
                  value={formData.instagramHandle}
                  onChange={(e) =>
                    handleInputChange("instagramHandle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* TikTok Handle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TikTok
                </label>
                <input
                  type="text"
                  placeholder="tiktok.com/yourpage"
                  value={formData.tiktokHandle}
                  onChange={(e) =>
                    handleInputChange("tiktokHandle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* X Handle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  X (Twitter)
                </label>
                <input
                  type="text"
                  placeholder="@yourbusiness"
                  value={formData.xHandle}
                  onChange={(e) => handleInputChange("xHandle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  placeholder="linkedin.com/company/yourcompany"
                  value={formData.linkedinProfile}
                  onChange={(e) =>
                    handleInputChange("linkedinProfile", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* WhatsApp Business */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Business
                </label>
                <input
                  type="text"
                  placeholder="WhatsApp Business number or link"
                  value={formData.whatsappBusiness}
                  onChange={(e) =>
                    handleInputChange("whatsappBusiness", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* twiter Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  twiter Profile
                </label>
                <input
                  type="text"
                  placeholder="@username"
                  value={formData.twiterProfile}
                  onChange={(e) =>
                    handleInputChange("twiterProfile", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Email Notifications
            </h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">New Market Match</h3>
                <p className="text-sm text-gray-600">
                  Get an email when your profile receives a market match
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) =>
                    handleInputChange("emailNotifications", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
