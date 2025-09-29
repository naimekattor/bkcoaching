import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  DollarSign,
  Calendar,
  Image,
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
  DialogDescription,
} from "@/components/ui/dialog";

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
  { id: "instagram-post", label: "Instagram Post", icon: Image },
  { id: "instagram-story", label: "Instagram Story", icon: Image },
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

export default function CreateCampaignModal({ isOpen, onClose }) {
  const router = useRouter();

  // NOTE: This state shape matches your original CampaignStep (plus extra fields),
  // so both components can use the same model without inconsistency.
  const [formData, setFormData] = useState({
    // core (CampaignStep-style)
    campaignName: "",
    objective: "",
    budget: [1000], // slider expects an array value like in your original component
    budgetType: "total", // total | monthly | weekly
    paymentPreferences: [], // array of 'gifted', 'paid', 'affiliate', 'ambassador'
    description: "",
    deliverables: [], // array of deliverable ids
    timeline: "",
    targetAudience: "",
    keywords: "",
    approvalRequired: true,
    autoMatch: false,

    // extra fields from your modal
    campaignStatus: "Active",
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
    hashtags: ["#lifestyle", "#fashion"],
    ageRange: [18, 45],
    location: "United States",
    timeZone: "America/New_York",
    gender: "", // single value: 'female'|'male'|'No_Preference'
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
  const [showAuthModal, setShowAuthModal] = useState(false);

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
      const current = prev.paymentPreferences || [];
      return current.includes(pref)
        ? { ...prev, paymentPreferences: current.filter((p) => p !== pref) }
        : { ...prev, paymentPreferences: [...current, pref] };
    });
  };

  const handleDeliverableChange = (id, checked) => {
    // If "Repost Only" must behave exclusively, we can enforce that:
    if (id === "Repost Only" && checked) {
      // selecting Repost Only clears other deliverables
      setFormData((prev) => ({ ...prev, deliverables: ["Repost Only"] }));
      return;
    }
    if (id !== "Repost Only" && formData.deliverables.includes("Repost Only")) {
      // if any other is chosen, remove Repost Only first
      setFormData((prev) => ({
        ...prev,
        deliverables: checked
          ? [...prev.deliverables.filter((d) => d !== "Repost Only"), id]
          : prev.deliverables.filter((d) => d !== id),
      }));
      return;
    }

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        deliverables: [...prev.deliverables, id],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        deliverables: prev.deliverables.filter((d) => d !== id),
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
    if (!formData.hashtags.includes(tag)) {
      setFormData((prev) => ({ ...prev, hashtags: [...prev.hashtags, tag] }));
    }
    setNewHashtag("");
  };
  const removeHashtag = (tag) =>
    setFormData((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((h) => h !== tag),
    }));

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
    // TODO: wire up file upload logic
    console.log("Dropped files:", e.dataTransfer.files);
  };

  const handleSaveDraft = () => {
    localStorage.setItem("draftCampaign", JSON.stringify(formData));
    alert("Campaign saved as draft!");
  };

  const handleCreateCampaign = () => {
    // Basic validation similar to CampaignStep
    const isValid =
      formData.campaignName &&
      formData.objective &&
      formData.deliverables.length > 0 &&
      formData.timeline &&
      (formData.paymentPreferences || []).length > 0;

    if (!isValid) {
      // show a quick message (replace with toast in your app)
      alert(
        "Please fill required fields: name, objective, deliverables, timeline, payment method."
      );
      return;
    }

    // persist / API call
    console.log("Creating campaign:", formData);
    // optionally save draft or send to backend here
    // then require signup if needed:
    setShowAuthModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Create New Campaign</h2>
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
                  <Label htmlFor="campaignName">Campaign Name *</Label>
                  <Input
                    id="campaignName"
                    value={formData.campaignName}
                    onChange={(e) =>
                      handleInputChange("campaignName", e.target.value)
                    }
                    placeholder="Summer Collection Launch"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Campaign Objective *</Label>
                  <Select
                    value={formData.objective}
                    onValueChange={(value) =>
                      handleInputChange("objective", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select objective" />
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
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe your campaign goals, target audience, key messages, and any specific requirements..."
                  rows={4}
                />
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
                      checked={formData.budgetType === "total"}
                      onCheckedChange={() =>
                        handleInputChange("budgetType", "total")
                      }
                    />
                    <Label htmlFor="total-budget">Total Campaign Budget</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="monthly-budget"
                      checked={formData.budgetType === "monthly"}
                      onCheckedChange={() =>
                        handleInputChange("budgetType", "monthly")
                      }
                    />
                    <Label htmlFor="monthly-budget">Monthly Budget</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weekly-budget"
                      checked={formData.budgetType === "weekly"}
                      onCheckedChange={() =>
                        handleInputChange("budgetType", "weekly")
                      }
                    />
                    <Label htmlFor="weekly-budget">Weekly Budget</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Budget Amount: ${formData.budget[0]}</Label>
                    <Badge variant="secondary">
                      {formData.budgetType === "total"
                        ? "Total"
                        : formData.budgetType === "monthly"
                        ? "Monthly"
                        : "Weekly"}
                    </Badge>
                  </div>

                  <Slider
                    value={formData.budget}
                    onValueChange={(value) =>
                      handleInputChange("budget", value)
                    }
                    max={10000}
                    min={100}
                    step={100}
                    className="w-full"
                  />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$100</span>
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
                    formData.paymentPreferences.includes("gifted")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => togglePaymentPreference("gifted")}
                >
                  <Checkbox
                    checked={formData.paymentPreferences.includes("gifted")}
                    id="gifted"
                  />
                  <Label htmlFor="gifted">Gifted Products</Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    formData.paymentPreferences.includes("paid")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => togglePaymentPreference("paid")}
                >
                  <Checkbox
                    checked={formData.paymentPreferences.includes("paid")}
                    id="paid"
                  />
                  <Label htmlFor="paid">Paid Collaborations</Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    formData.paymentPreferences.includes("affiliate")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => togglePaymentPreference("affiliate")}
                >
                  <Checkbox
                    checked={formData.paymentPreferences.includes("affiliate")}
                    id="affiliate"
                  />
                  <Label htmlFor="affiliate">Affiliate Marketing</Label>
                </div>

                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    formData.paymentPreferences.includes("ambassador")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => togglePaymentPreference("ambassador")}
                >
                  <Checkbox
                    checked={formData.paymentPreferences.includes("ambassador")}
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
                      checked={formData.deliverables.includes(d.id)}
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
                  value={formData.timeline}
                  onValueChange={(value) =>
                    handleInputChange("timeline", value)
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
                    checked={formData.approvalRequired}
                    onCheckedChange={(checked) =>
                      handleInputChange("approvalRequired", checked)
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
                    checked={formData.autoMatch}
                    onCheckedChange={(c) => handleInputChange("autoMatch", c)}
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
                  value={formData.targetAudience}
                  onChange={(e) =>
                    handleInputChange("targetAudience", e.target.value)
                  }
                  placeholder="Young professionals, age 25-35, interested in sustainable fashion..."
                  rows={4}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keywords & Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.keywords}
                  onChange={(e) =>
                    handleInputChange("keywords", e.target.value)
                  }
                  placeholder="#sustainablefashion #ecoFriendly #consciousliving"
                  rows={3}
                />

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.hashtags.map((tag, i) => (
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

          {/* Audience Filters */}
          <div>
            {/* <h3 className="text-lg font-medium text-gray-900 mb-4">
              Audience Filters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>
                  Age Range: {formData.ageRange[0]} - {formData.ageRange[1]}
                </Label>
                <div className="px-3">
                  <input
                    type="range"
                    min="13"
                    max="65"
                    value={formData.ageRange[1]}
                    onChange={(e) =>
                      handleInputChange("ageRange", [
                        formData.ageRange[0],
                        parseInt(e.target.value, 10),
                      ])
                    }
                    className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              <div>
                <Label>Time Zone</Label>
                <select
                  value={
                    US_TIME_ZONES.some((tz) => tz.value === formData.timeZone)
                      ? formData.timeZone
                      : "Other"
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    handleInputChange("timeZone", val === "Other" ? "" : val);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {US_TIME_ZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  US time zones only. Choose “Other” if outside the US.
                </p>
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="United States"
                />
              </div>
            </div> */}

            {/* Gender (single choice) */}
            {/* <div className="mb-4">
              <Label className="block mb-2">Gender</Label>
              <div className="flex gap-6">
                {["female", "male", "No_Preference"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={opt}
                      checked={formData.gender === opt}
                      onChange={() => handleGenderChange(opt)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm text-gray-700">
                      {opt === "No_Preference"
                        ? "No Preference"
                        : opt[0].toUpperCase() + opt.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div> */}
          </div>

          {/* Campaign Goals */}
          {/* <div>
            <Label className="block mb-3">Campaign Goals</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(formData.campaignGoals).map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.campaignGoals[g]}
                    onChange={() => handleGoalChange(g)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-gray-700">
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div> */}

          {/* Payment Method */}
          {/* <div>
            <Label>Payment Method</Label>
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                handleInputChange("paymentMethod", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Fixed Fee">Fixed Fee</option>
              <option value="Paid Collaboration">Paid Collaboration</option>
              <option value="Affiliate Marketing">Affiliate Marketing</option>
              <option value="Brand Ambassador">Brand Ambassador</option>
            </select>
          </div> */}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={handleSaveDraft}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Save as Draft
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                // example: open signup/login if required
                setShowAuthModal(true);
              }}
            >
              Save & Continue
            </Button>

            <Button
              onClick={handleCreateCampaign}
              className="bg-primary text-white"
            >
              {formData.autoMatch
                ? "Create Campaign & Find micro-influencers"
                : "Create Campaign"}
            </Button>
          </div>
        </div>
      </div>

      {/* Sign-up / Auth prompt if user is not logged in */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign up required</DialogTitle>
            <DialogDescription>
              Please sign up or log in to continue creating your campaign.
            </DialogDescription>
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
      </Dialog>
    </div>
  );
}
