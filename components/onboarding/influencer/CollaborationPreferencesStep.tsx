import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";

interface CollaborationPreferencesStepProps {
  onNext: () => void;
  onBack: () => void;
}

const CollaborationPreferencesStep = ({
  onNext,
  onBack,
}: CollaborationPreferencesStepProps) => {
  const [formData, setFormData] = useState({
    contentFormats: [] as string[],
    paymentPreferences: [] as string[],
    rates: {
      instagramPost: "",
      instagramStory: "",
      instagramReel: "",
      tiktokVideo: "",
      youtubeVideo: "",
      youtubeShort: "",
      blogPost: "",
      podcastMention: "",
    },
    preferredBrands: "",
    avoidBrands: "",
  });

  const contentFormats = [
    { id: "instagram-post", label: "Instagram Post", icon: Image },
    { id: "instagram-story", label: "Instagram Story", icon: Image },
    { id: "instagram-reel", label: "Instagram Reel", icon: Video },
    { id: "tiktok-video", label: "TikTok Video", icon: Video },
    { id: "youtube-video", label: "YouTube Video", icon: Video },
    { id: "youtube-short", label: "YouTube Short", icon: Video },
    { id: "blog-post", label: "Blog Post", icon: FileText },
    { id: "podcast-mention", label: "Podcast Mention", icon: Mic },
    { id: "live-stream", label: "Live Stream", icon: Video },
    { id: "user-generated-content", label: "UGC Creation", icon: Video },
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
    { value: "0-100", label: "$0 - $100" },
    { value: "100-500", label: "$100 - $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-2500", label: "$1,000 - $2,500" },
    { value: "2500-5000", label: "$2,500 - $5,000" },
    { value: "5000+", label: "$5,000+" },
    { value: "custom", label: "Custom Rate" },
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

  const handleRateChange = (format: string, rate: string) => {
    setFormData((prev) => ({
      ...prev,
      rates: { ...prev.rates, [format]: rate },
    }));
  };

  const isValid =
    formData.contentFormats.length > 0 &&
    formData.paymentPreferences.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Collaboration preferences</h1>
        <p className="text-muted-foreground">
          Help brands understand how you like to work and what you charge
        </p>
      </div>

      <div className="grid gap-8">
        {/* Content Formats */}
        <Card>
          <CardHeader>
            <CardTitle>Content Formats *</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select the types of content you create (choose all that apply)
            </p>
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
            <p className="text-sm text-muted-foreground">
              How do you prefer to be compensated for your work?
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {paymentTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
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
              <p className="text-sm text-muted-foreground">
                Set your typical rates for different content types (these can be
                negotiated)
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {formData.contentFormats
                  .filter((format) =>
                    [
                      "instagram-post",
                      "instagram-story",
                      "instagram-reel",
                      "tiktok-video",
                      "youtube-video",
                      "youtube-short",
                      "blog-post",
                      "podcast-mention",
                    ].includes(format)
                  )
                  .map((format) => (
                    <div key={format} className="space-y-2">
                      <Label>
                        {contentFormats.find((f) => f.id === format)?.label}
                      </Label>
                      <Select
                        value={
                          formData.rates[format as keyof typeof formData.rates]
                        }
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
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Brand Preferences */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Preferred Brand Types</CardTitle>
              <p className="text-sm text-muted-foreground">
                What types of companies do you love working with?
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.preferredBrands}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    preferredBrands: e.target.value,
                  }))
                }
                placeholder="Sustainable brands, tech startups, local businesses, fashion brands..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brands to Avoid</CardTitle>
              <p className="text-sm text-muted-foreground">
                Any industries or types of brands you prefer not to work with?
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.avoidBrands}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    avoidBrands: e.target.value,
                  }))
                }
                placeholder="Fast fashion, gambling, tobacco, etc."
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
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CollaborationPreferencesStep;
