import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  DollarSign,
  Calendar,
  Image as ImageIcon,
  Video,
  Mic,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialogcampaign_description,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/apiClient";
import { uploadToCloudinary } from "@/lib/fileUpload";
import { toast } from "react-toastify";

const US_TIME_ZONES = [
  { value: "America/New_York", label: "Eastern (ET)" },
  { value: "America/Chicago", label: "Central (CT)" },
  { value: "America/Denver", label: "Mountain (MT)" },
  { value: "America/Phoenix", label: "Arizona (no DST)" },
  { value: "America/Los_Angeles", label: "Pacific (PT)" },
  { value: "America/Anchorage", label: "Alaska (AKST/AKDT)" },
  { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
];

const deliverableTypes = [
  { id: "instagram-post", label: "Instagram Post", icon: ImageIcon },
  { id: "instagram-story", label: "Instagram Story", icon: ImageIcon },
  { id: "instagram-reel", label: "Instagram Reel", icon: Video },
  { id: "tiktok-video", label: "TikTok Video", icon: Video },
  { id: "youtube-video", label: "YouTube Video", icon: Video },
  { id: "youtube-short", label: "YouTube Short", icon: Video },
  { id: "blog-post", label: "Blog Post", icon: FileText },
  { id: "podcast", label: "Podcast Mention", icon: Mic },
  { id: "twitter-thread", label: "Twitter Thread", icon: FileText },
  { id: "linkedin-post", label: "LinkedIn Post", icon: FileText },
  { id: "whatsapp-status", label: "WhatsApp Status", icon: FileText },
  { id: "email-campaign", label: "Email Campaign", icon: FileText },
  { id: "Repost Only", label: "Repost Only", icon: FileText },
];

const timelineOptions = [
  { value: "asap", label: "ASAP (Immediate)" },
  { value: "1-week", label: "Within 1 week" },
  { value: "2-weeks", label: "Within 2 weeks" },
  { value: "1-month", label: "Within 1 month" },
  { value: "flexible", label: "Flexible timing" },
];

export default function CreateCampaignModal({ isOpen, onClose, onSuccess }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    campaign_name: "",
    campaign_objective: "",
    campaign_poster: null,
    budget_range: 500,
    budget_type: "total",
    payment_preference: [],
    campaign_description: "",
    content_deliverables: [],
    campaign_timeline: "",
    target_audience: "",
    keywords: "",
    content_approval_required: true,
    auto_match_micro_influencers: false,
    campaign_status: "Active",
    platforms: {
      instagram: false,
      tiktok: false,
      youtube: false,
      facebook: false,
    },
    targetReach: "",
    endDate: "",
    creativeType: "Nano (1K-10K)",
    creatorsNeeded: "",
    keywords_and_hashtags: ["#lifestyle", "#fashion"],
    ageRange: [18, 45],
    location: "United States",
    timeZone: "America/New_York",
    gender: "",
    campaignGoals: {
      awareness: false,
      engagement: false,
      conversions: false,
      growth: false,
    },
    paymentMethod: "Fixed Fee",
    posterFile: null,
    posterPreview: null,
  });

  const [newHashtag, setNewHashtag] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Generic field updater for top-level fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Platforms toggling (nested)
  const handlePlatformChange = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: !prev.platforms[platform],
      },
    }));
  };

  // PaymentPreferences toggle (array)
  const togglePaymentPreference = (pref) => {
    setFormData((prev) => {
      const current = prev.payment_preference || [];
      return current.includes(pref)
        ? { ...prev, payment_preference: current.filter((p) => p !== pref) }
        : { ...prev, payment_preference: [...current, pref] };
    });
  };

  const handleDeliverableChange = (id, checked) => {
    if (id === "Repost Only" && checked) {
      setFormData((prev) => ({
        ...prev,
        content_deliverables: ["Repost Only"],
      }));
      return;
    }
    if (
      id !== "Repost Only" &&
      formData.content_deliverables.includes("Repost Only")
    ) {
      setFormData((prev) => ({
        ...prev,
        content_deliverables: checked
          ? [
              ...prev.content_deliverables.filter((d) => d !== "Repost Only"),
              id,
            ]
          : prev.content_deliverables.filter((d) => d !== id),
      }));
      return;
    }

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        content_deliverables: [...prev.content_deliverables, id],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        content_deliverables: prev.content_deliverables.filter((d) => d !== id),
      }));
    }
  };

  // Gender single-select (radio-style)
  const handleGenderChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: prev.gender === value ? "" : value,
    }));
  };

  // Goals toggle
  const handleGoalChange = (goal) => {
    setFormData((prev) => ({
      ...prev,
      campaignGoals: {
        ...prev.campaignGoals,
        [goal]: !prev.campaignGoals[goal],
      },
    }));
  };

  // Hashtags
  const addHashtag = () => {
    const tag = newHashtag.trim();
    if (!tag) return;
    if (!formData.keywords_and_hashtags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        keywords_and_hashtags: [...prev.keywords_and_hashtags, tag],
      }));
    }
    setNewHashtag("");
  };

  const removeHashtag = (tag) =>
    setFormData((prev) => ({
      ...prev,
      keywords_and_hashtags: prev.keywords_and_hashtags.filter(
        (h) => h !== tag
      ),
    }));

  // Poster upload validation
  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!validTypes.includes(file.type)) {
      setUploadError("Please upload a valid image (JPG, PNG, WebP, or GIF)");
      return false;
    }

    if (file.size > maxSize) {
      setUploadError("Image size must be less than 5MB");
      return false;
    }

    setUploadError("");
    return true;
  };

  // Handle poster upload
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await uploadToCloudinary(file);
    console.log(res);

    setFormData((prev) => ({
      ...prev,
      campaign_poster: res.url,
    }));

    if (!validateFile(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        posterFile: file,
        posterPreview: event.target.result,
        campaign_poster: res.url,
      }));
    };
    reader.onerror = () => {
      setUploadError("Failed to read file");
    };

    reader.readAsDataURL(file);
  };

  // Drag & drop (assets)
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData((prev) => ({
            ...prev,
            posterFile: file,
            posterPreview: event.target.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Remove poster
  const handleRemovePoster = () => {
    setFormData((prev) => ({
      ...prev,
      posterFile: null,
      posterPreview: null,
    }));
    setUploadError("");
  };

  const handleSaveDraft = async () => {
    const isValid =
      formData.campaign_name &&
      formData.campaign_objective &&
      formData.content_deliverables.length > 0 &&
      formData.campaign_timeline &&
      (formData.payment_preference || []).length > 0;

    if (!isValid) {
      alert(
        "Please fill required fields: name, campaign_objective, content_deliverables, campaign_timeline, payment method."
      );
      return;
    }

    try {
      const campaignData = {
        campaign_name: formData.campaign_name,
        campaign_objective: formData.campaign_objective,
        campaign_description: formData.campaign_description.substring(0, 50),
        budget_range: String(formData.budget_range),
        budget_type: formData.budget_type,
        payment_preference: formData.payment_preference.join(","),
        content_deliverables: formData.content_deliverables.join(","),
        campaign_timeline: formData.campaign_timeline,
        target_audience: formData.target_audience,
        keywords_and_hashtags: formData.keywords_and_hashtags.join(","),
        content_approval_required: formData.content_approval_required,
        auto_match_micro_influencers: formData.auto_match_micro_influencers,
        campaign_status: "draft",
        campaign_poster: formData.campaign_poster,
      };
      const res = await apiClient("campaign_service/create_campaign/", {
        auth: true,
        method: "POST",
        body: JSON.stringify(campaignData),
      });
      if (res) {
        toast("Saved campaign  successfully");
        onSuccess(newCampaign);
        onClose();
        console.log(res);
      } else if (res?.status === "failure" && res?.error) {
        // Loop through the error object (e.g., target_audience, budget_range, etc.)
        Object.keys(res.error).forEach((field) => {
          const messages = res.error[field];

          // Ensure messages is an array before mapping
          if (Array.isArray(messages)) {
            messages.forEach((msg) => {
              // Optional: Make the field name readable (e.g., "target_audience" -> "Target Audience")
              const readableField = field.replace(/_/g, " ").toUpperCase();

              // Show the toast
              toast(`${readableField}: ${msg}`);
              console.log(`${readableField}: ${msg}`);
            });
          }
        });
      } else {
        // Fallback for unknown errors
        toast("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast("There is an error!");
      console.log(error);
    }

    console.log("Creating campaign:", formData);
    setShowAuthModal(true);
  };

  const handleCreateCampaign = async (e) => {
    console.log(e.target.value);

    const isValid =
      formData.campaign_name &&
      formData.campaign_objective &&
      formData.content_deliverables.length > 0 &&
      formData.campaign_timeline &&
      (formData.payment_preference || []).length > 0;

    if (!isValid) {
      toast(
        "Please fill required fields: name, campaign_objective, content_deliverables, campaign_timeline, payment method."
      );
      return;
    }

    try {
      const campaignData = {
        campaign_name: formData.campaign_name,
        campaign_objective: formData.campaign_objective,
        campaign_description: formData.campaign_description.substring(0, 50),
        budget_range: formData.budget_range,
        budget_type: formData.budget_type,
        payment_preference: formData.payment_preference.join(","),
        content_deliverables: formData.content_deliverables.join(","),
        campaign_timeline: formData.campaign_timeline,
        target_audience: formData.target_audience.substring(0, 50),
        keywords_and_hashtags: formData.keywords_and_hashtags.join(","),
        content_approval_required: formData.content_approval_required,
        auto_match_micro_influencers: formData.auto_match_micro_influencers,
        campaign_status: "active",
        campaign_poster: formData.campaign_poster,
      };
      const res = await apiClient("campaign_service/create_campaign/", {
        auth: true,
        method: "POST",
        body: JSON.stringify(campaignData),
      });
      if (res) {
        toast("Campaign created successfully");
        onClose();
        console.log(res);
      }
    } catch (error) {
      toast("There is an error!");
      console.log(error);
    }

    console.log("Creating campaign:", formData);
    setShowAuthModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl text-primary font-semibold">
              Create New Campaign
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Set up your influencer marketing campaign
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Campaign Basics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Campaign Basics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="campaign_name">Campaign Name *</Label>
                  <Input
                    id="campaign_name"
                    value={formData.campaign_name}
                    onChange={(e) =>
                      handleInputChange("campaign_name", e.target.value)
                    }
                    placeholder="Summer Collection Launch"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Campaign objective *</Label>
                  <Select
                    value={formData.campaign_objective}
                    onValueChange={(value) =>
                      handleInputChange("campaign_objective", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign_objective" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="sales">Sales & Conversions</SelectItem>
                      <SelectItem value="traffic">Website Traffic</SelectItem>
                      <SelectItem value="app">App Downloads</SelectItem>
                      <SelectItem value="launch">Product Launch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="campaign_description" className="mb-2">
                  Campaign description
                </Label>
                <Textarea
                  id="campaign_description"
                  value={formData.campaign_description}
                  maxLength={250}
                  onChange={(e) =>
                    handleInputChange("campaign_description", e.target.value)
                  }
                  placeholder="Describe your campaign goals, target audience, key messages, and any specific requirements..."
                  rows={4}
                />
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-xs ${
                      formData.campaign_description.length >= 500
                        ? "text-red-500 font-semibold" // Red if limit reached
                        : "text-gray-400" // Grey otherwise
                    }`}
                  >
                    {formData.campaign_description.length}/500 characters
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="campaignposter" className="mb-2">
                  Campaign Poster
                </Label>
                {!formData.posterPreview ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your poster or click to browse
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="poster-input"
                    />
                    <label htmlFor="poster-input">
                      <Button
                        type="button"
                        variant="outline"
                        asChild
                        className="cursor-pointer"
                      >
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={formData.posterPreview}
                      alt="Poster preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={handleRemovePoster}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {uploadError && (
                  <p className="text-sm text-red-500 mt-2">{uploadError}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="total-budget"
                      checked={formData.budget_type === "total"}
                      onCheckedChange={() =>
                        handleInputChange("budget_type", "total")
                      }
                    />
                    <Label htmlFor="total-budget">Total Campaign Budget</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="monthly-budget"
                      checked={formData.budget_type === "monthly"}
                      onCheckedChange={() =>
                        handleInputChange("budget_type", "monthly")
                      }
                    />
                    <Label htmlFor="monthly-budget">Monthly Budget</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weekly-budget"
                      checked={formData.budget_type === "weekly"}
                      onCheckedChange={() =>
                        handleInputChange("budget_type", "weekly")
                      }
                    />
                    <Label htmlFor="weekly-budget">Weekly Budget</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Budget Amount: ${formData.budget_range}</Label>
                    <Badge variant="secondary">
                      {formData.budget_type === "total"
                        ? "Total"
                        : formData.budget_type === "monthly"
                        ? "Monthly"
                        : "Weekly"}
                    </Badge>
                  </div>

                  <Slider
                    value={[formData.budget_range]}
                    onValueChange={(value) =>
                      handleInputChange("budget_range", value[0])
                    }
                    max={1000}
                    min={10}
                    step={1}
                    className="w-full"
                  />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$10</span>
                    <span>$10,000+</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Preferences *</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select how you plan to compensate micro-influencers for this
                campaign
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    formData.payment_preference.includes("gifted")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => togglePaymentPreference("gifted")}
                >
                  <Checkbox
                    checked={formData.payment_preference.includes("gifted")}
                    id="gifted"
                  />
                  <Label htmlFor="gifted">Gifted Products</Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    formData.payment_preference.includes("paid")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => togglePaymentPreference("paid")}
                >
                  <Checkbox
                    checked={formData.payment_preference.includes("paid")}
                    id="paid"
                  />
                  <Label htmlFor="paid">Paid Collaborations</Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    formData.payment_preference.includes("affiliate")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => togglePaymentPreference("affiliate")}
                >
                  <Checkbox
                    checked={formData.payment_preference.includes("affiliate")}
                    id="affiliate"
                  />
                  <Label htmlFor="affiliate">Affiliate Marketing</Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    formData.payment_preference.includes("ambassador")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => togglePaymentPreference("ambassador")}
                >
                  <Checkbox
                    checked={formData.payment_preference.includes("ambassador")}
                    id="ambassador"
                  />
                  <Label htmlFor="ambassador">Brand Ambassador</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card>
            <CardHeader>
              <CardTitle>Content Deliverables *</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select the type of content you want micro-influencers to produce
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deliverableTypes.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={d.id}
                      checked={formData.content_deliverables.includes(d.id)}
                      onCheckedChange={(checked) =>
                        handleDeliverableChange(d.id, checked)
                      }
                    />
                    <d.icon className="w-4 h-4 text-muted-foreground" />
                    <Label
                      htmlFor={d.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {d.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Campaign timeline *
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.campaign_timeline}
                  onValueChange={(value) =>
                    handleInputChange("campaign_timeline", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Campaign Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Content Approval Required</Label>
                    <p className="text-xs text-muted-foreground">
                      Review content before publishing
                    </p>
                  </div>
                  <Switch
                    checked={formData.content_approval_required}
                    onCheckedChange={(checked) =>
                      handleInputChange("content_approval_required", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-match micro-influencers</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically find matching micro-influencers
                    </p>
                  </div>
                  <Switch
                    checked={formData.auto_match_micro_influencers}
                    onCheckedChange={(c) =>
                      handleInputChange("auto_match_micro_influencers", c)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Target Audience & Keywords */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.target_audience}
                  onChange={(e) =>
                    handleInputChange("target_audience", e.target.value)
                  }
                  placeholder="Young professionals, age 25-35, interested in sustainable fashion..."
                  rows={4}
                  maxLength={50}
                />
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-xs ${
                      formData.target_audience.length >= 50
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.target_audience.length}/50 characters
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keywords & Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <Textarea
                  value={formData.keywords}
                  onChange={(e) =>
                    handleInputChange("keywords", e.target.value)
                  }
                  placeholder="#sustainablefashion #ecoFriendly #consciousliving"
                  rows={3}
                /> */}

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.keywords_and_hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white text-sm rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeHashtag(tag)}
                          className="ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={newHashtag}
                      onChange={(e) => setNewHashtag(e.target.value)}
                      placeholder="Add hashtag..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addHashtag();
                        }
                      }}
                    />
                    <Button onClick={addHashtag}>Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex md:flex-row flex-col items-center justify-center p-6 border-t bg-gray-50 rounded-b-lg">
          {/* <button
            onClick={handleSaveDraft}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Save as Draft
          </button> */}

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                handleSaveDraft();
              }}
            >
              Save & Continue
            </Button>

            <Button
              onClick={handleCreateCampaign}
              className="bg-secondary hover:bg-secondaryhover text-primary"
            >
              {formData.auto_match_micro_influencers
                ? "Create Campaign & Find micro-influencers"
                : "Create Campaign"}
            </Button>
          </div>
        </div>
      </div>

      {/* Sign-up / Auth prompt if user is not logged in */}
      {/* <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign up required</DialogTitle>
            <Dialogcampaign_description>
              Please sign up or log in to continue creating your campaign.
            </Dialogcampaign_description>
          </DialogHeader>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                router.push("/auth/login?returnTo=/brand-onboarding?step=5")
              }
            >
              Log in
            </Button>
            <Button
              onClick={() =>
                router.push(
                  "/auth/signup?role=brand&returnTo=/brand-onboarding?step=5"
                )
              }
            >
              Sign up
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
