import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Video,
  Image,
  Mic,
  FileText,
  DollarSign,
  Gift,
  Percent,
  Crown,
  Repeat, // Using 'Repeat' for Repost
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface CollaborationPreferencesStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface RateOption {
  type: string;
  custom: string;
}

const CollaborationPreferencesStep = ({
  onNext,
  onBack,
}: CollaborationPreferencesStepProps) => {
  const [formData, setFormData] = useState({
    contentFormats: [] as string[],
    paymentPreferences: [] as string[],
    paymentPercentages: {} as Record<string, string>,
    rates: {
      socialPost: { type: "", custom: "" } as RateOption, // Changed
      repost: { type: "", custom: "" } as RateOption, // Changed
      instagramStory: { type: "", custom: "" } as RateOption,
      instagramReel: { type: "", custom: "" } as RateOption,
      tiktokVideo: { type: "", custom: "" } as RateOption,
      youtubeVideo: { type: "", custom: "" } as RateOption,
      youtubeShort: { type: "", custom: "" } as RateOption,
      blogPost: { type: "", custom: "" } as RateOption,
      podcastMention: { type: "", custom: "" } as RateOption,
      whatsappStatus: { type: "", custom: "" } as RateOption,
      liveStream: { type: "", custom: "" } as RateOption,
      userGeneratedContent: { type: "", custom: "" } as RateOption,
    },
    preferredBrands: "",
    avoidBrands: "",
  });

  const contentFormats = [
    { id: "socialPost", label: "Social Post", icon: Image }, // Changed
    { id: "repost", label: "Repost", icon: Repeat }, // Changed
    { id: "instagramStory", label: "Instagram Story", icon: Image },
    { id: "instagramReel", label: "Instagram Reel", icon: Video },
    { id: "tiktokVideo", label: "TikTok Video", icon: Video },
    { id: "youtubeVideo", label: "YouTube Video", icon: Video },
    { id: "youtubeShort", label: "YouTube Short", icon: Video },
    { id: "blogPost", label: "Blog Post", icon: FileText },
    { id: "podcastMention", label: "Podcast Mention", icon: Mic },
    { id: "liveStream", label: "Live Stream", icon: Video },
    { id: "userGeneratedContent", label: "UGC Creation", icon: Video },
    { id: "whatsappStatus", label: "WhatsApp Status Post", icon: Image },
  ];

  const paymentTypes = [
    {
      id: "gifted",
      label: "Gifted Products",
      icon: Gift,
      description: "Receive free products in exchange for content",
    },
    {
      id: "paid",
      label: "Paid Collaborations",
      icon: DollarSign,
      description: "Get paid for your content creation",
    },
    {
      id: "affiliate",
      label: "Affiliate Marketing",
      icon: Percent,
      description: "Earn commission on sales you generate",
    },
    {
      id: "ambassador",
      label: "Brand Ambassador",
      icon: Crown,
      description: "Long-term partnerships with ongoing benefits",
    },
  ];

  const rateRanges = [
    { value: "free", label: "Free" },
    { value: "0-100", label: "$0 – $100" },
    { value: "101-499", label: "$101 – $499" },
    { value: "500+", label: "$500+" },
    { value: "custom", label: "Custom amount" },
  ];

  const handleArrayChange = (
    field: "contentFormats" | "paymentPreferences",
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((item) => item !== value),
      }));
    }
  };

  const handleRateChange = (format: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      rates: {
        ...prev.rates,
        [format]: {
          ...prev.rates[format as keyof typeof prev.rates],
          type: value,
        },
      },
    }));
  };

  const handleCustomChange = (format: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      rates: {
        ...prev.rates,
        [format]: {
          ...prev.rates[format as keyof typeof prev.rates],
          custom: value,
        },
      },
    }));
  };

  const isValid =
    formData.contentFormats.length > 0 &&
    formData.paymentPreferences.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl text-primary font-bold">
          Collaboration preferences
        </h1>
        <p className="text-muted-foreground">
          Help brands understand how you like to work and what you charge
        </p>
      </div>

      <div className="grid gap-8">
        {/* Content Formats */}
        <Card>
          <CardHeader>
            <CardTitle>Content Formats *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contentFormats.map((format) => (
                <div
                  key={format.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={format.id}
                    checked={formData.contentFormats.includes(format.id)}
                    onCheckedChange={(checked) =>
                      handleArrayChange(
                        "contentFormats",
                        format.id,
                        checked as boolean
                      )
                    }
                  />
                  <format.icon className="w-4 h-4 text-muted-foreground" />
                  <Label
                    htmlFor={format.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {format.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Preferences *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {paymentTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={type.id}
                      checked={formData.paymentPreferences.includes(type.id)}
                      onCheckedChange={(checked) =>
                        handleArrayChange(
                          "paymentPreferences",
                          type.id,
                          checked as boolean
                        )
                      }
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <type.icon className="w-4 h-4 text-muted-foreground" />
                        <Label
                          htmlFor={type.id}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {type.label}
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>

                  {/* NEW: Percentage Input for relevant payment types */}
                  {type.id === "affiliate" &&
                    formData.paymentPreferences.includes(type.id) && (
                      <div className="flex flex-col">
                        <Label className="text-xs font-medium">
                          Percentage (%)
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          placeholder="e.g. 20"
                          value={formData.paymentPercentages[type.id] || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentPercentages: {
                                ...prev.paymentPercentages,
                                [type.id]: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                    )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              {formData.paymentPreferences.map((pref) => (
                <Badge key={pref} variant="secondary" className="mr-2 mb-2">
                  {paymentTypes.find((p) => p.id === pref)?.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rate Ranges */}
        {formData.paymentPreferences.includes("paid") && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Your Rate Ranges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {formData.contentFormats.map((format) => {
                  const selectedRate =
                    formData.rates[format as keyof typeof formData.rates];
                  if (!selectedRate) return null;

                  return (
                    <div key={format} className="space-y-2">
                      <Label>
                        {contentFormats.find((f) => f.id === format)?.label}
                      </Label>

                      {/* Dropdown */}
                      <Select
                        value={selectedRate.type}
                        onValueChange={(value) =>
                          handleRateChange(format, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rate range" />
                        </SelectTrigger>
                        <SelectContent>
                          {rateRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Custom Input */}
                      {selectedRate.type === "custom" && (
                        <Input
                          type="number"
                          placeholder="Enter custom rate"
                          value={selectedRate.custom}
                          onChange={(e) =>
                            handleCustomChange(format, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onNext} disabled={!isValid}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CollaborationPreferencesStep;
