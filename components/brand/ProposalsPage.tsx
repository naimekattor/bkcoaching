"use client";

import Image from "next/image";
import { useState } from "react";

type Deliverable = {
  id: string;
  platform: string;
  type: string;
  quantity: number;
};

type ProposalForm = {
  businessName: string;
  bio: string;
  location: string;
  tagline: string;
  budget: string;
  timeline: string;
  startDate: string;
  endDate: string;
  proposalMessage: string;
  logoFile: File | null;
  campaignBrief: File | null;
  productPhotos: File | null;
  deliverables: Deliverable[];
};

const platformOptions = [
  { value: "socialPost", label: "Social Post" },
  { value: "repost", label: "Repost" },
  { value: "instagramStory", label: "Instagram Story" },
  { value: "instagramReel", label: "Instagram Reel" },
  { value: "tiktokVideo", label: "TikTok Video" },
  { value: "youtubeVideo", label: "YouTube Video" },
  { value: "youtubeShort", label: "YouTube Short" },
  { value: "blogPost", label: "Blog Post" },
  { value: "podcastMention", label: "Podcast Mention" },
  { value: "liveStream", label: "Live Stream" },
  { value: "userGeneratedContent", label: "UGC Creation" },
  { value: "whatsappStatus", label: "WhatsApp Status Post" },
];

const typeOptions = [
  { value: "socialPost", label: "Social Post" },
  { value: "repost", label: "Repost" },
  { value: "instagramStory", label: "Instagram Story" },
  { value: "instagramReel", label: "Instagram Reel" },
  { value: "tiktokVideo", label: "TikTok Video" },
  { value: "youtubeVideo", label: "YouTube Video" },
  { value: "youtubeShort", label: "YouTube Short" },
  { value: "blogPost", label: "Blog Post" },
  { value: "podcastMention", label: "Podcast Mention" },
  { value: "liveStream", label: "Live Stream" },
  { value: "userGeneratedContent", label: "UGC Creation" },
  { value: "whatsappStatus", label: "WhatsApp Status Post" },
];

export default function ProposalsPage() {
  // Form state for the initial proposal form
  const [formData, setFormData] = useState<ProposalForm>({
    businessName: "",
    bio: "",
    location: "",
    tagline: "",
    budget: "",
    startDate: "",
    endDate: "",
    timeline: "",
    proposalMessage: "",
    logoFile: null,
    campaignBrief: null,
    productPhotos: null,
    deliverables: [],
  });

  // Modal states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Generate unique ID
  const generateId = () =>
    Date.now().toString() + Math.random().toString(36).substr(2, 9);

  // Handle input changes for text fields
  const handleInputChange = (field: keyof ProposalForm, value: string) => {
    console.log(`[Proposal Form] Input changed for ${field}:`, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle deliverable changes
  const handleDeliverableChange = (
    id: string,
    field: keyof Deliverable,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.map((del) =>
        del.id === id ? { ...del, [field]: value } : del
      ),
    }));
  };

  // Add new deliverable
  const addDeliverable = () => {
    const newDel: Deliverable = {
      id: generateId(),
      platform: "Instagram",
      type: "Reel",
      quantity: 1,
    };
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, newDel],
    }));
  };

  // Remove deliverable
  const removeDeliverable = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((del) => del.id !== id),
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
      startDate: "",
      endDate: "",
      timeline: "",
      proposalMessage: "",
      logoFile: null,
      campaignBrief: null,
      productPhotos: null,
      deliverables: [],
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
          {/* <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              🔔
            </button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
              M
            </div>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="">
          <form onSubmit={handleSubmitForm} className="mx-auto">
            {/* Basic Information Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Location */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div> */}

                {/* Tagline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="Your business slogan"
                    value={formData.tagline}
                    onChange={(e) =>
                      handleInputChange("tagline", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Timeline */}
                <div className="px-3">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Project Timeline
                  </h4>

                  <div className="flex items-center space-x-4">
                    {/* Start Date */}
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* End Date */}
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal Message Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proposal Message
              </label>
              <textarea
                placeholder="Write proposal to micro-influencer"
                rows={6}
                value={formData.proposalMessage}
                onChange={(e) =>
                  handleInputChange("proposalMessage", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Campaign Deliverables Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Campaign Deliverables
                </h3>
                <button
                  type="button"
                  onClick={addDeliverable}
                  className="px-4 py-2 bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors font-semibold"
                >
                  Add Deliverable
                </button>
              </div>
              {formData.deliverables.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No deliverables added yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {formData.deliverables.map((del) => (
                    <div
                      key={del.id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-md"
                    >
                      <select
                        value={del.platform}
                        onChange={(e) =>
                          handleDeliverableChange(
                            del.id,
                            "platform",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {platformOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {/* <select
                        value={del.type}
                        onChange={(e) =>
                          handleDeliverableChange(
                            del.id,
                            "type",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {typeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select> */}
                      <input
                        type="number"
                        min="1"
                        value={del.quantity}
                        onChange={(e) =>
                          handleDeliverableChange(
                            del.id,
                            "quantity",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => removeDeliverable(del.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Attach Campaign Video Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attachment
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campaign Brief */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">📄</span>
                    <span className="text-sm font-medium text-primary">
                      Campaign brief
                    </span>
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "campaignBrief")}
                    className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-primary hover:file:bg-primary"
                  />
                  <span className="text-xs text-gray-500 block pl-6">
                    (PDF, doc)
                  </span>
                </div>

                {/* Product Photos */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">📷</span>
                    <span className="text-sm font-medium text-primary">
                      Product photos or Business kit
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, "productPhotos")}
                    className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-primary hover:file:bg-primary"
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
                className="px-6 py-2 bg-yellow-500 text-primary font-semibold rounded-md hover:bg-yellow-600 transition-colors"
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
                    Micro-influencer&apos;s Bio
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
                  <h4 className="font-medium text-gray-900 mb-4">
                    Project Timeline
                  </h4>

                  <div className="flex items-center space-x-4">
                    {/* Start Date Badge */}
                    <div className="flex flex-col items-center">
                      <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {formData.startDate || "Aug 15, 2025"}
                      </span>
                      <span className="text-gray-600 mt-1 text-xs">Start</span>
                    </div>

                    {/* Timeline Line */}
                    <div className="flex-1 h-1 bg-gray-300 relative">
                      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                    </div>

                    {/* End Date Badge */}
                    <div className="flex flex-col items-center">
                      <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {formData.endDate || "TBD"}
                      </span>
                      <span className="text-gray-600 mt-1 text-xs">End</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Message Form */}
              <div className="border-2 border-[#E5E7EB] rounded-xl p-3">
                <h4 className="font-medium text-gray-900 mb-4">
                  Message to Brands
                </h4>

                <div className="mb-4 border-2 border-[#E5E7EB] p-3 rounded-xl">
                  <p className="text-sm text-gray-700 mb-4">
                    Hi {formData.businessName || "Name"},
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
                    {formData.deliverables.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">
                        No deliverables selected
                      </p>
                    ) : (
                      formData.deliverables.map((del) => (
                        <div key={del.id} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">
                            {del.quantity} {del.type}(s) on {del.platform}
                          </span>
                        </div>
                      ))
                    )}
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
