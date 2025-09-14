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

interface CampaignStepProps {
  onNext: () => void;
  onBack: () => void;
}

const CampaignStep = ({ onNext, onBack }: CampaignStepProps) => {
  const [formData, setFormData] = useState({
    campaignName: "",
    objective: "",
    budget: [1000],
    budgetType: "total",
    description: "",
    deliverables: [] as string[],
    timeline: "",
    targetAudience: "",
    keywords: "",
    approvalRequired: true,
    autoMatch: false,
  });

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
  ];

  const timelineOptions = [
    { value: "asap", label: "ASAP (Rush order)" },
    { value: "1-week", label: "Within 1 week" },
    { value: "2-weeks", label: "Within 2 weeks" },
    { value: "1-month", label: "Within 1 month" },
    { value: "flexible", label: "Flexible timing" },
  ];

  const handleDeliverableChange = (id: string, checked: boolean) => {
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

  const isValid =
    formData.campaignName &&
    formData.objective &&
    formData.deliverables.length > 0 &&
    formData.timeline;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Create your first campaign</h1>
        <p className="text-muted-foreground">
          Let&apos;s set up a campaign to find the perfect creators for your
          brand
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
                  value={formData.campaignName}
                  onChange={(e) =>
                    setFormData((prev) => ({
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
                  value={formData.objective}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, objective: value }))
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
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
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
              <div className="flex items-center gap-4">
                <Label>Budget Type:</Label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="total-budget"
                      checked={formData.budgetType === "total"}
                      onCheckedChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          budgetType: "total",
                        }))
                      }
                    />
                    <Label htmlFor="total-budget">Total Campaign Budget</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="per-creator"
                      checked={formData.budgetType === "per-creator"}
                      onCheckedChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          budgetType: "per-creator",
                        }))
                      }
                    />
                    <Label htmlFor="per-creator">Budget Per Creator</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Budget Amount: ${formData.budget[0]}</Label>
                  <Badge variant="secondary">
                    {formData.budgetType === "total" ? "Total" : "Per Creator"}
                  </Badge>
                </div>
                <Slider
                  value={formData.budget}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, budget: value }))
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

        {/* Deliverables */}
        <Card>
          <CardHeader>
            <CardTitle>Content Deliverables *</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select the type of content you want creators to produce
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
                    checked={formData.deliverables.includes(deliverable.id)}
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
                Timeline *
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.timeline}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, timeline: value }))
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
                  checked={formData.approvalRequired}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      approvalRequired: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Auto-match Creators</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically find matching creators
                  </p>
                </div>
                <Switch
                  checked={formData.autoMatch}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, autoMatch: checked }))
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
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    targetAudience: e.target.value,
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
                value={formData.keywords}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, keywords: e.target.value }))
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
        <Button variant="primary" onClick={onNext} disabled={!isValid}>
          {formData.autoMatch
            ? "Create Campaign & Find Creators"
            : "Create Campaign"}
        </Button>
      </div>
    </div>
  );
};

export default CampaignStep;
