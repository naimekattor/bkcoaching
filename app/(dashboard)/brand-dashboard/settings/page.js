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
    location: "",
    description: "",
    instagramHandle: "",
    tiktokHandle: "",
    xHandle: "",
    linkedinProfile: "",
    whatsappBusiness: "",
    emailNotifications: true,
  });

  // Handle input changes with console logging
  const handleInputChange = (field, value) => {
    console.log(`[Brand Setup] ${field} changed:`, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    console.log("[Brand Setup] Logo uploaded:", file);
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("[Brand Setup] Form submitted with data:", formData);
    // TODO: Replace with actual API call when backend is ready
    // Example: await submitBrandProfile(formData);
    alert(
      "Brand profile setup completed! (This will be replaced with API call)"
    );
  };

  const handleCancel = () => {
    console.log("[Brand Setup] Form cancelled");
    // router.back()
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className=" mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Brands Profile Setup
            </h1>
            <p className="text-gray-600 mt-1">
              Complete your Brands profile to connect with Micro-Influencers
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600">🔔</span>
            </div>
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">M</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Basic Profile Information */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-600 text-xs">📋</span>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select business...</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="retail">Retail</option>
                  <option value="fashion">Fashion</option>
                  <option value="beauty">Beauty</option>
                  <option value="fitness">Fitness</option>
                  <option value="food">Food & Beverage</option>
                  <option value="travel">Travel</option>
                  <option value="tech">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="beauty">Beauty & Cosmetics</option>
                  <option value="health">Health & Wellness</option>
                  <option value="technology">Technology</option>
                  <option value="food">Food & Beverage</option>
                  <option value="travel">Travel & Tourism</option>
                  <option value="fitness">Fitness & Sports</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="automotive">Automotive</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Business location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Business Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Profile Description
              </label>
              <textarea
                placeholder="We are a bakery in New York offering fresh cakes and bread. We collaborate with food influencers."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-pink-500">📷</span>
                  </div>
                  <input
                    type="text"
                    placeholder="@yourbusiness"
                    value={formData.instagramHandle}
                    onChange={(e) =>
                      handleInputChange("instagramHandle", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* TikTok */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TikTok
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-black">🎵</span>
                  </div>
                  <input
                    type="text"
                    placeholder="tiktok.com/yourpage"
                    value={formData.tiktokHandle}
                    onChange={(e) =>
                      handleInputChange("tiktokHandle", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* X Handle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  X Handle
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-black">❌</span>
                  </div>
                  <input
                    type="text"
                    placeholder="@yourbusiness"
                    value={formData.xHandle}
                    onChange={(e) =>
                      handleInputChange("xHandle", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-blue-600">💼</span>
                  </div>
                  <input
                    type="text"
                    placeholder="linkedin.com/company/yourcompany"
                    value={formData.linkedinProfile}
                    onChange={(e) =>
                      handleInputChange("linkedinProfile", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* WhatsApp Business */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Business
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-green-500">💬</span>
                  </div>
                  <input
                    type="text"
                    placeholder="WhatsApp Business account"
                    value={formData.whatsappBusiness}
                    onChange={(e) =>
                      handleInputChange("whatsappBusiness", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
                <span className="text-orange-600 text-xs">⚠️</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Email Notifications
              </h2>
            </div>

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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
