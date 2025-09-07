"use client";

import Image from "next/image";
import { useState } from "react";

type ProposalForm = {
  businessName: string;
  bio: string;
  location: string;
  tagline: string;
  budget: string;
  timeline: string;
  proposalMessage: string;
  logoFile: File | null;
  campaignBrief: File | null;
  productPhotos: File | null;
};

export default function ProposalsPage() {
  // Form state for the initial proposal form
  const [formData, setFormData] = useState<ProposalForm>({
    businessName: "",
    bio: "",
    location: "",
    tagline: "",
    budget: "",
    timeline: "",
    proposalMessage: "",
    logoFile: null,
    campaignBrief: null,
    productPhotos: null,
  });

  // Modal states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle input changes for text fields
  const handleInputChange = (field: keyof ProposalForm, value: string) => {
    console.log(`[Proposal Form] Input changed for ${field}:`, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProposalForm
  ) => {
    const file = e.target.files?.[0] ?? null;
    handleFileUpload(field, file);
  };

  // Handle file uploads
  const handleFileUpload = (field: keyof ProposalForm, file: File | null) => {
    console.log(`[Proposal Form] File uploaded for ${field}:`, file?.name);
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  // Handle form submission (show review modal)
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      "[Proposal Form] Form submitted, showing review modal:",
      formData
    );
    setShowReviewModal(true);
  };

  // Handle sending proposal (show success modal)
  const handleSendProposal = () => {
    console.log("[Proposal Form] Proposal sent successfully:", formData);
    setShowReviewModal(false);
    setShowSuccessModal(true);
  };

  // Handle saving as draft
  const handleSaveAsDraft = () => {
    console.log("[Proposal Form] Saved as draft:", formData);
    setShowReviewModal(false);
  };

  // Close success modal and reset form
  const handleCloseSuccess = () => {
    console.log("[Proposal Form] Success modal closed, resetting form");
    setShowSuccessModal(false);
    setFormData({
      businessName: "",
      bio: "",
      location: "",
      tagline: "",
      budget: "",
      timeline: "",
      proposalMessage: "",
      logoFile: null,
      campaignBrief: null,
      productPhotos: null,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Micro-Influencers Hiring Proposal
            </h1>
            <p className="text-gray-600 mt-1">
              Fill out your information to start connecting with
              Micro-Influencer
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              🔔
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              M
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <form onSubmit={handleSubmitForm} className="mx-auto">
            {/* Basic Information Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  👤
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business name
                  </label>
                  <textarea
                    placeholder="Enter business full name"
                    rows={2}
                    value={formData.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload logo here
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-1 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "logoFile")}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">📁</div>
                      <span className="text-sm text-gray-600">
                        Click to upload logo
                      </span>
                    </label>
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio / About Business
                  </label>
                  <textarea
                    placeholder="Tell us about Business..."
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
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

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget
                  </label>
                  <input
                    type="text"
                    placeholder="$200 - $250"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="Start from August 15, 2025"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Proposal Message Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proposal Message
              </label>
              <textarea
                placeholder="Write proposal to Creator"
                rows={6}
                value={formData.proposalMessage}
                onChange={(e) =>
                  handleInputChange("proposalMessage", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Attach Campaign Video Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attach Campaign video
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campaign Brief */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">📄</span>
                    <span className="text-sm font-medium text-gray-700">
                      Campaign brief
                    </span>
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "campaignBrief")}
                    className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <span className="text-xs text-gray-500 block pl-6">
                    (PDF, doc)
                  </span>
                </div>

                {/* Product Photos */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">📷</span>
                    <span className="text-sm font-medium text-gray-700">
                      Product photos or Business kit
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "productPhotos")}
                    className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Decline
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold">Review Proposal</h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side - Creator Info */}
              <div className="border-2 border-[#E5E7EB] rounded-xl">
                <div className="flex items-center gap-3 mb-4 px-3">
                  <Image
                    width={60}
                    height={60}
                    src="/maya-fashionista-profile.jpg"
                    alt="Maya Fashionista"
                    className="w-15 h-15 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Maya Fashionista
                    </h3>
                    <p className="text-sm text-gray-600">
                      Where Trendsetting Meets Authentic Influence
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <span>📍 New York, NY</span>
                      <span>🌐 fashionista.com</span>
                      <span>📍 Remote</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 border-b-2 border-[#E5E7EB] pb-3 px-3">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Creator Bio
                  </h4>
                  <p className="text-sm text-gray-600">
                    Maya Fashionista is a lifestyle Creator fusing fashion with
                    wellness, inspiring 50k+ women through chic looks, beauty
                    tips, and self-care content.
                  </p>
                </div>

                <div className="mb-4 px-3">
                  <h4 className="font-medium text-gray-900 mb-2">Campaign</h4>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <h5 className="font-medium text-sm">
                      Style Meets Selfcare
                    </h5>
                    <p className="text-xs text-gray-600">
                      Showcase of daily self-care and fashionable outfits.
                    </p>
                  </div>
                </div>

                <div className="mb-4 px-3">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Proposal Rate
                  </h4>
                  <p className="text-sm">
                    💰 Budget: {formData.budget || "$200 - $250"} per post
                  </p>
                </div>

                <div className="px-3">
                  <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                  <p className="text-sm">
                    📅 Timeline:{" "}
                    {formData.timeline || "Start from August 15, 2025"}
                  </p>
                </div>
              </div>

              {/* Right Side - Message Form */}
              <div className="border-2 border-[#E5E7EB] rounded-xl p-3">
                <h4 className="font-medium text-gray-900 mb-4">
                  Message to Brands
                </h4>

                <div className="mb-4 border-2 border-[#E5E7EB] p-3 rounded-xl">
                  <p className="text-sm text-gray-700 mb-4">
                    Hi {formData.businessName || "TechFlow Team"},
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    {formData.proposalMessage ||
                      "I came across your Style Meets SelfCare campaign and would love the opportunity to collaborate. My content typically reaches 50k+ followers with an average engagement rate of 5%. I'm confident this campaign can bring strong visibility to your Business. I'm flexible with timelines and happy to align with your Business guidelines. Looking forward to possibly working together!"}
                  </p>
                </div>

                <div className="mb-4 border-2 border-[#E5E7EB] rounded-xl p-3">
                  <h5 className="font-medium text-gray-900 mb-2">
                    Campaign Deliverables
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">1 Instagram Reel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">2 Story Slides</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm">1 Feed Post</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-2">
                    Attach Files
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#F2F4F5] rounded-lg p-1">
                      <span>📄</span>
                      <span>
                        {formData.campaignBrief?.name ||
                          "Campaign brief (PDF, doc)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#F2F4F5] rounded-lg p-1">
                      <span>📷</span>
                      <span>
                        {formData.productPhotos?.name ||
                          "Product photos or Business kit"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSendProposal}
                    className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Send Proposal
                  </button>
                  <button
                    onClick={handleSaveAsDraft}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✓</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sent Successfully
              </h3>
              <p className="text-gray-600 mb-6">
                Your proposal has been sent to Maya Fashionista
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCloseSuccess}
                  className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={handleCloseSuccess}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}