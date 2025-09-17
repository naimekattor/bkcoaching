import { useState } from "react";
import { X, Upload, Calendar } from "lucide-react";

export default function CreateCampaignModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    campaignTitle: "",
    campaignStatus: "Active",
    campaignDescription: "",
    platforms: {
      instagram: false,
      tiktok: false,
      youtube: false,
      facebook: false,
    },
    budget: "",
    targetReach: "",
    endDate: "",
    creativeType: "Nano (1K-10K)",
    creatorsNeeded: "",
    hashtags: ["#lifestyle", "#fashion"],
    ageRange: [18, 45],
    location: "United States",
    gender: {
      all: true,
      female: false,
      male: false,
    },
    campaignGoals: {
      awareness: false,
      engagement: false,
      conversions: false,
      growth: false,
    },
    paymentMethod: "Fixed Fee",
  });

  const [newHashtag, setNewHashtag] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlatformChange = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: !prev.platforms[platform],
      },
    }));
  };

  const handleGenderChange = (gender) => {
    if (gender === "all") {
      setFormData((prev) => ({
        ...prev,
        gender: {
          all: true,
          female: false,
          male: false,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        gender: {
          ...prev.gender,
          all: false,
          [gender]: !prev.gender[gender],
        },
      }));
    }
  };

  const handleGoalChange = (goal) => {
    setFormData((prev) => ({
      ...prev,
      campaignGoals: {
        ...prev.campaignGoals,
        [goal]: !prev.campaignGoals[goal],
      },
    }));
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !formData.hashtags.includes(newHashtag.trim())) {
      setFormData((prev) => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag.trim()],
      }));
      setNewHashtag("");
    }
  };

  const removeHashtag = (hashtag) => {
    setFormData((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((h) => h !== hashtag),
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
    console.log("Files dropped:", e.dataTransfer.files);
  };

  const handleSaveDraft = () => {
    console.log("Saving as draft:", formData);
    alert("Campaign saved as draft!");
  };

  const handleCreateCampaign = () => {
    console.log("Creating campaign:", formData);
    alert("Campaign created successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Campaign
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Set up your influencer marketing campaign
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Campaign Title and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                placeholder="Enter campaign title"
                value={formData.campaignTitle}
                onChange={(e) =>
                  handleInputChange("campaignTitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Status
              </label>
              <select
                value={formData.campaignStatus}
                onChange={(e) =>
                  handleInputChange("campaignStatus", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Paused">Paused</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Campaign Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Description
            </label>
            <textarea
              placeholder="Describe your campaign goals and requirements..."
              value={formData.campaignDescription}
              onChange={(e) =>
                handleInputChange("campaignDescription", e.target.value)
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Platforms
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.platforms.instagram}
                  onChange={() => handlePlatformChange("instagram")}
                  className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="text-pink-500">📷</span>
                <span className="text-sm text-gray-700">Instagram</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.platforms.tiktok}
                  onChange={() => handlePlatformChange("tiktok")}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                />
                <span className="text-gray-900">🎵</span>
                <span className="text-sm text-gray-700">TikTok</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.platforms.youtube}
                  onChange={() => handlePlatformChange("youtube")}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-red-500">📹</span>
                <span className="text-sm text-gray-700">YouTube</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.platforms.facebook}
                  onChange={() => handlePlatformChange("facebook")}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-blue-500">📘</span>
                <span className="text-sm text-gray-700">Facebook</span>
              </label>
            </div>
          </div>

          {/* Budget, Target Reach, End Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget ($)
              </label>
              <input
                type="number"
                placeholder="5000"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Reach
              </label>
              <input
                type="number"
                placeholder="100000"
                value={formData.targetReach}
                onChange={(e) =>
                  handleInputChange("targetReach", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Creative Type and Number of Creators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Creative Type
              </label>
              <select
                value={formData.creativeType}
                onChange={(e) =>
                  handleInputChange("creativeType", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Nano (1K-10K)">Nano (1K-10K)</option>
                <option value="Micro (10K-100K)">Micro (10K-100K)</option>
                <option value="Macro (100K-1M)">Macro (100K-1M)</option>
                <option value="Mega (1M+)">Mega (1M+)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Creators Needed
              </label>
              <input
                type="number"
                placeholder="5"
                value={formData.creatorsNeeded}
                onChange={(e) =>
                  handleInputChange("creatorsNeeded", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Brand Assets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Brand Assets
            </label>
            <div
              className={`border-2 border-dashed ${
                dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
              } rounded-lg p-8 text-center transition-colors`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">
                Drop files here or{" "}
                <button className="text-blue-600 underline hover:text-blue-700">
                  browse
                </button>
              </p>
              <p className="text-xs text-gray-400">
                Support: JPG, PNG, PDF, ZIP (Max 10MB)
              </p>
            </div>
          </div>

          {/* Hashtags & Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Hashtags & Keywords
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {hashtag}
                  <button
                    onClick={() => removeHashtag(hashtag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add hashtag..."
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addHashtag();
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addHashtag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Audience Filters */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Audience Filters
            </h3>

            {/* Age Range and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range: 18 - 45
                </label>
                <div className="px-3">
                  <input
                    type="range"
                    min="13"
                    max="65"
                    value={formData.ageRange[1]}
                    onChange={(e) =>
                      handleInputChange("ageRange", [
                        formData.ageRange[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gender
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender.all}
                    onChange={() => handleGenderChange("all")}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">All</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.gender.female}
                    onChange={() => handleGenderChange("female")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Female</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.gender.male}
                    onChange={() => handleGenderChange("male")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Male</span>
                </label>
              </div>
            </div>
          </div>

          {/* Campaign Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Campaign Goals
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.campaignGoals.awareness}
                  onChange={() => handleGoalChange("awareness")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Awareness</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.campaignGoals.engagement}
                  onChange={() => handleGoalChange("engagement")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Engagement</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.campaignGoals.conversions}
                  onChange={() => handleGoalChange("conversions")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Conversions</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.campaignGoals.growth}
                  onChange={() => handleGoalChange("growth")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Growth</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                handleInputChange("paymentMethod", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Fixed Fee">Fixed Fee</option>
              <option value="Performance Based">Performance Based</option>
              <option value="Product Exchange">Product Exchange</option>
              <option value="Revenue Share">Revenue Share</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={handleSaveDraft}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Save as Draft
          </button>
          <button
            onClick={handleCreateCampaign}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
