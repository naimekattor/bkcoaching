import { useState } from "react";
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
  Target,
  DollarSign,
  Calendar,
  Image,
  Video,
  Mic,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBrandOnBoarding } from "@/contexts/BrandOnboardingContext";

interface CampaignStepProps {
  onNext: () => void;
  onBack: () => void;
}

const CampaignStep = ({ onBack }: CampaignStepProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const { onboardingData, setOnboardingData } = useBrandOnBoarding();

  const objectives = [
    {
      value: "awareness",
      label: "Brand Awareness",
      description: "Increase visibility and reach",
    },
    {
      value: "engagement",
      label: "Engagement",
      description: "Drive likes, comments, and shares",
    },
    {
      value: "sales",
      label: "Sales & Conversions",
      description: "Generate leads and sales",
    },
    {
      value: "traffic",
      label: "Website Traffic",
      description: "Drive visitors to your site",
    },
    {
      value: "app",
      label: "App Downloads",
      description: "Promote mobile app adoption",
    },
    {
      value: "launch",
      label: "Product Launch",
      description: "Introduce new products/services",
    },
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
    {
      id: "Repost Only",
      label: "Repost Only",
      icon: FileText,
    },
  ];

  const timelineOptions = [
    { value: "asap", label: "ASAP (Immediate )" },
    { value: "1-week", label: "Within 1 week" },
    { value: "2-weeks", label: "Within 2 weeks" },
    { value: "1-month", label: "Within 1 month" },
    { value: "flexible", label: "Flexible timing" },
  ];

  const handleDeliverableChange = (id: string, checked: boolean) => {
    if (checked) {
      setOnboardingData((prev) => ({
        ...prev,
        deliverables: [...prev.deliverables, id],
      }));
    } else {
      setOnboardingData((prev) => ({
        ...prev,
        deliverables: prev.deliverables.filter((d) => d !== id),
      }));
    }
  };

  const isValid =
    onboardingData.campaignName &&
    onboardingData.objective &&
    onboardingData.deliverables.length > 0 &&
    onboardingData.timeline &&
    onboardingData.paymentPreferences.length > 0 &&
    onboardingData.description.length >0 ;

  const handleCreateCampaign = () => {
    if (!isValid) return;

    // Save draft campaign to localStorage (optional, so they don’t lose data)
    localStorage.setItem("draftCampaign", JSON.stringify(onboardingData));
    setShowAuthModal(true);

    // Redirect to signup with "returnTo" param
    // router.push(`/auth/signup?role=brand&returnTo=/brand-onboarding?step=6`);
    return;
  };

  return (
    <>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl text-primary font-bold">
            Create your first campaign
          </h1>
          <p className="text-muted-foreground">
            Let&apos;s set up a campaign to find the perfect micro-influencer
            for your brand
          </p>
        </div>

        <div className="grid gap-8">
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
                    value={onboardingData.campaignName}
                    onChange={(e) =>
                      setOnboardingData((prev) => ({
                        ...prev,
                        campaignName: e.target.value,
                      }))
                    }
                    placeholder="Summer Collection Launch"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Campaign Objective *</Label>
                  <Select
                    value={onboardingData.objective}
                    onValueChange={(value) =>
                      setOnboardingData((prev) => ({
                        ...prev,
                        objective: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select objective" />
                    </SelectTrigger>
                    <SelectContent>
                      {objectives.map((obj) => (
                        <SelectItem key={obj.value} value={obj.value}>
                          <div>
                            <div className="font-medium">{obj.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {obj.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description *</Label>
                <Textarea
                  id="description"
                  value={onboardingData.description}
                  onChange={(e) =>
                    setOnboardingData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe your campaign goals, target audience, key messages, and any specific requirements..."
                  rows={4}
                  maxLength={250}
                />
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-xs ${
                      onboardingData.description.length >= 500
                        ? "text-red-500 font-semibold" // Red if limit reached
                        : "text-gray-400" // Grey otherwise
                    }`}
                  >
                    {onboardingData.description.length}/250 characters
                  </span>
                </div>
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
                      checked={onboardingData.budgetType === "total"}
                      onCheckedChange={() =>
                        setOnboardingData((prev) => ({
                          ...prev,
                          budgetType: "total",
                        }))
                      }
                    />
                    <Label htmlFor="total-budget">Total Campaign Budget</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="monthly-budget"
                      checked={onboardingData.budgetType === "monthly"}
                      onCheckedChange={() =>
                        setOnboardingData((prev) => ({
                          ...prev,
                          budgetType: "monthly",
                        }))
                      }
                    />
                    <Label htmlFor="monthly-budget">Monthly Budget</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weekly-budget"
                      checked={onboardingData.budgetType === "weekly"}
                      onCheckedChange={() =>
                        setOnboardingData((prev) => ({
                          ...prev,
                          budgetType: "weekly",
                        }))
                      }
                    />
                    <Label htmlFor="weekly-budget">Weekly Budget</Label>
                  </div>

                  {/* <div className="flex items-center space-x-2">
                    <Checkbox
                      id="per-micro-influencers"
                      checked={onboardingData.budgetType === "per-micro-influencers"}
                      onCheckedChange={() =>
                        setOnboardingData((prev) => ({
                          ...prev,
                          budgetType: "per-micro-influencers",
                        }))
                      }
                    />
                    <Label htmlFor="per-micro-influencers">
                      Per micro-influencers Budget
                    </Label>
                  </div> */}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Budget Amount: ${onboardingData.budget[0]}</Label>
                    <Badge variant="secondary">
                      {onboardingData.budgetType === "total"
                        ? "Total"
                        : onboardingData.budgetType === "monthly"
                        ? "Monthly"
                        : onboardingData.budgetType === "weekly"
                        ? "Weekly"
                        : ""}
                    </Badge>
                  </div>
                  <Slider
                    value={onboardingData.budget}
                    onValueChange={(value) =>
                      setOnboardingData((prev) => ({ ...prev, budget: value }))
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
                {/* Gifted Products */}
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    onboardingData.paymentPreferences?.includes("gifted")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() =>
                    setOnboardingData((prev) => {
                      const current = prev.paymentPreferences || [];
                      return current.includes("gifted")
                        ? {
                            ...prev,
                            paymentPreferences: current.filter(
                              (p) => p !== "gifted"
                            ),
                          }
                        : {
                            ...prev,
                            paymentPreferences: [...current, "gifted"],
                          };
                    })
                  }
                >
                  <Checkbox
                    checked={onboardingData.paymentPreferences?.includes(
                      "gifted"
                    )}
                    id="gifted"
                  />
                  <Label htmlFor="gifted">Gifted Products</Label>
                </div>

                {/* Paid Collaborations */}
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    onboardingData.paymentPreferences?.includes("paid")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() =>
                    setOnboardingData((prev) => {
                      const current = prev.paymentPreferences || [];
                      return current.includes("paid")
                        ? {
                            ...prev,
                            paymentPreferences: current.filter(
                              (p) => p !== "paid"
                            ),
                          }
                        : { ...prev, paymentPreferences: [...current, "paid"] };
                    })
                  }
                >
                  <Checkbox
                    checked={onboardingData.paymentPreferences?.includes(
                      "paid"
                    )}
                    id="paid"
                  />
                  <Label htmlFor="paid">Paid Collaborations</Label>
                </div>

                {/* Affiliate Marketing */}
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    onboardingData.paymentPreferences?.includes("affiliate")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() =>
                    setOnboardingData((prev) => {
                      const current = prev.paymentPreferences || [];
                      return current.includes("affiliate")
                        ? {
                            ...prev,
                            paymentPreferences: current.filter(
                              (p) => p !== "affiliate"
                            ),
                          }
                        : {
                            ...prev,
                            paymentPreferences: [...current, "affiliate"],
                          };
                    })
                  }
                >
                  <Checkbox
                    checked={onboardingData.paymentPreferences?.includes(
                      "affiliate"
                    )}
                    id="affiliate"
                  />
                  <Label htmlFor="affiliate">Affiliate Marketing</Label>
                </div>

                {/* Brand Ambassador */}
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                    onboardingData.paymentPreferences?.includes("ambassador")
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() =>
                    setOnboardingData((prev) => {
                      const current = prev.paymentPreferences || [];
                      return current.includes("ambassador")
                        ? {
                            ...prev,
                            paymentPreferences: current.filter(
                              (p) => p !== "ambassador"
                            ),
                          }
                        : {
                            ...prev,
                            paymentPreferences: [...current, "ambassador"],
                          };
                    })
                  }
                >
                  <Checkbox
                    checked={onboardingData.paymentPreferences?.includes(
                      "ambassador"
                    )}
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
                {deliverableTypes.map((deliverable) => (
                  <div
                    key={deliverable.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={deliverable.id}
                      checked={onboardingData.deliverables.includes(
                        deliverable.id
                      )}
                      onCheckedChange={(checked) =>
                        handleDeliverableChange(
                          deliverable.id,
                          checked as boolean
                        )
                      }
                    />
                    <deliverable.icon className="w-4 h-4 text-muted-foreground" />
                    <Label
                      htmlFor={deliverable.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {deliverable.label}
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
                  value={onboardingData.timeline}
                  onValueChange={(value) =>
                    setOnboardingData((prev) => ({ ...prev, timeline: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
                    checked={onboardingData.approvalRequired}
                    onCheckedChange={(checked) =>
                      setOnboardingData((prev) => ({
                        ...prev,
                        approvalRequired: checked,
                      }))
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
                    checked={onboardingData.autoMatch}
                    onCheckedChange={(checked) =>
                      setOnboardingData((prev) => ({
                        ...prev,
                        autoMatch: checked,
                      }))
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
                  value={onboardingData.targetAudience}
                  onChange={(e) =>
                    setOnboardingData((prev) => ({
                      ...prev,
                      targetAudienceCampaign: e.target.value,
                    }))
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
                  value={onboardingData.keywords}
                  onChange={(e) =>
                    setOnboardingData((prev) => ({
                      ...prev,
                      keywords: e.target.value,
                    }))
                  }
                  placeholder="#sustainablefashion #ecoFriendly #consciousliving"
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateCampaign}
            disabled={!isValid}
          >
            {onboardingData.autoMatch
              ? "Create Campaign & Find micro-influencers"
              : "Create Campaign"}
          </Button>
        </div>
      </div>
      {/* Auth Required Modal */}
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
                router.push("/auth/login?returnTo=/brand-onboarding?step=4")
              }
            >
              Log in
            </Button>
            <Button
              onClick={() =>
                router.push(
                  "/auth/signup?role=brand&returnTo=/brand-onboarding?step=4"
                )
              }
            >
              Sign up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CampaignStep;
