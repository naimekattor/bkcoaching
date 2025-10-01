import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Users, Hash, Heart, Users2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { demographics } from "@/constants/demographics";

interface ProfileSetupStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ProfileSetupStep = ({ onNext, onBack }: ProfileSetupStepProps) => {
  const [formData, setFormData] = useState({
    // industriesNiches: [] as string[],
    targetAudience: [] as string[],
    keywords: "",
    demographics: [] as string[],
    values: [] as string[],
    inPersonAddress: "",
  });

  const targetAudiences = [
    {
      label: "Women 18–24",
      tooltip: "Gen Z – digital natives, heavy TikTok/IG use.",
    },
    {
      label: "Women 25–34",
      tooltip: "Millennials – young professionals / family-forming stage.",
    },
    {
      label: "Women 35–44",
      tooltip: "Older Millennials / Gen X – career stability & young families.",
    },
    {
      label: "Men 18–24",
      tooltip: "Gen Z – early adopters, trend-driven.",
    },
    {
      label: "Men 25–34",
      tooltip: "Millennials – tech-savvy, lifestyle & career focused.",
    },
    {
      label: "Men 35–44",
      tooltip: "Older Millennials / Gen X – higher disposable income.",
    },
    {
      label: "Men 45+",
      tooltip: "Gen X / Boomers – loyalty and financial stability.",
    },
    {
      label: "Teen girls",
      tooltip: "Gen Alpha / Gen Z – early fashion & fandom adopters.",
    },
    {
      label: "Teen boys",
      tooltip: "Gen Alpha / Gen Z – gaming, YouTube, and sports-heavy.",
    },
    {
      label: "Young married couples",
      tooltip: "Millennials – family-oriented, prioritizing lifestyle value.",
    },
    {
      label: "Mothers with young children",
      tooltip: "Millennials / Gen X – parenting, childcare, home-focused.",
    },
    {
      label: "Fathers with young children",
      tooltip: "Millennials / Gen X – parenting, career/family balance.",
    },
    {
      label: "Newlyweds",
      tooltip:
        "Mostly Millennials – aspirational, home, and lifestyle-focused.",
    },
    {
      label: "Singles in the dating stage",
      tooltip:
        "Gen Z / Millennials – lifestyle, social apps, and trend-driven.",
    },
  ];

  const brandValues = [
    "Relatable",
    "Authentic",
    "Funny",
    "High-Energy",
    "Educational",
    "Bold",
    "Uplifting",
    "Honest",
    "Motivational",
    "Creative",
  ];

  const handleArrayChange = (
    field: keyof typeof formData,
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: (prev[field] as string[]).filter((item) => item !== value),
      }));
    }
  };

  const isValid =
    // formData.industriesNiches.length > 0 &&
    formData.targetAudience.length > 0;

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-primary">
            Build your brand profile
          </h1>
          <p className="text-muted-foreground">
            Help micro-influencers understand your brand and find the perfect
            collaboration fit
          </p>
        </div>

        <div className="grid gap-8">
          {/* Industries/Niches */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Industries & Niches *
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the industries most relevant to your brand</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {industriesNiches.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={industry}
                      checked={formData.industriesNiches.includes(industry)}
                      onCheckedChange={(checked) =>
                        handleArrayChange(
                          "industriesNiches",
                          industry,
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor={industry} className="text-sm font-normal">
                      {industry}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {formData.industriesNiches.map((industry) => (
                  <Badge
                    key={industry}
                    variant="secondary"
                    className="mr-2 mb-2"
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card> */}

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users2 className="w-5 h-5" />
                Target Audiences *
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the audiences most relevant to your brand</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {targetAudiences.map((audience) => (
                  <div
                    key={audience.label}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={audience.label}
                      checked={formData.targetAudience.includes(audience.label)}
                      onCheckedChange={(checked) =>
                        handleArrayChange(
                          "targetAudience",
                          audience.label,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={audience.label}
                      className="flex items-center gap-1 text-sm font-normal"
                    >
                      {audience.label}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs text-sm">
                          {audience.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Keywords & Hashtags
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Keywords that represent your brand (comma-separated)</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.keywords}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, keywords: e.target.value }))
                }
                placeholder="sustainable fashion, eco-friendly, organic, wellness, lifestyle..."
                rows={3}
              />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Demographics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Audience Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                  {demographics.map((demo) => (
                    <div key={demo} className="flex items-center space-x-2">
                      <Checkbox
                        id={demo}
                        checked={formData.demographics.includes(demo)}
                        onCheckedChange={(checked) =>
                          handleArrayChange(
                            "demographics",
                            demo,
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor={demo} className="text-sm font-normal">
                        {demo}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Brand Values */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Brand tone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                  {brandValues.map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={value}
                        checked={formData.values.includes(value)}
                        onCheckedChange={(checked) =>
                          handleArrayChange("values", value, checked as boolean)
                        }
                      />
                      <Label htmlFor={value} className="text-sm font-normal">
                        {value}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Optional In-Person Address */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                In-Person Address (Optional)
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      For local events, store visits, or in-person
                      collaborations
                    </p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.inPersonAddress}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inPersonAddress: e.target.value,
                  }))
                }
                placeholder="Store address, office location, or event venue..."
                rows={2}
              />
              <Button variant="ghost" size="sm" className="mt-2">
                Skip this step
              </Button>
            </CardContent>
          </Card> */}
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
    </TooltipProvider>
  );
};

export default ProfileSetupStep;
