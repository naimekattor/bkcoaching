import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Target, Users, Hash, Heart, MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileSetupStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ProfileSetupStep = ({ onNext, onBack }: ProfileSetupStepProps) => {
  const [formData, setFormData] = useState({
    industries: [] as string[],
    targetAudience: [] as string[],
    keywords: "",
    demographics: [] as string[],
    values: [] as string[],
    inPersonAddress: "",
  });

  const industries = [
    "Beauty & Care",
    "Business & Finance",
    "Coaching & Personal Growth",
    "Fashion & Style",
    "Food & Cooking",
    "Health & Wellness",

    "Hair & Wigs",
    "Home & Garden",
    "Jewelry",
    "Lifestyle",
    "Makeup",
    "Music",
    "Nature & Outdoors",
    "Parenting & Chinuch",
    "Photography",
    "Skincare",
    "Simchas ",
    "Travel & Family Trips",
    "Women's Fitness",
  ];

  const targetAudiences = [
    "Women 18–24",
    "Women 25–34",
    "Women 35–44",
    "Men 18–24",
    "Men 25–34",
    "Men 35–44",
    "Men 45+",
    "Teen girls",
    "Teen boys",
    "Young married couples",
    "Mothers with young children",
    "Fathers with young children",
    "Newlyweds",
    "Singles in the dating stage",
  ];

  const demographics = [
    "Women 25–45",
    "Men 25–45",
    "Moms",
    "Teens & Young Adults",
    "Professionals",
    "Entrepreneurs",
    "Budget-Conscious",
    "Wellness-Oriented",
    "Trend Seekers",
    "Family-Focused",
    "Students",
    "Creatives",
    "Parents",
    "High-Income Bracket",
    "New Homeowners",
  ];

  const brandValues = [
    "Relatable",
    "Authentic",
    "Funny",
    "Direct",
    "Chill",
    "High-Energy",
    "Educational",
    "Bold",
    "Community",
    "Minimalist",
    "Aesthetic-Driven",
    "Uplifting",
    "Honest",
    "Motivational",
    "Clean Living",
    "Sustainable",
    "High-End Taste",
    "Budget Friendly",
    "Holistic Health",
    "Practical Tips",
    "Time Management",
    "Personal Growth",
    "Balance & Boundaries",
    "Family First",
    "Style on a Budget",
    "Mindful Living",
    "Creativity",
    "Simplicity",
    "Confidence",
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
    formData.industries.length > 0 && formData.targetAudience.length > 0;

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-primary">
            Build your brand profile
          </h1>
          <p className="text-muted-foreground">
            Help creators understand your brand and find the perfect
            collaboration fit
          </p>
        </div>

        <div className="grid gap-8">
          {/* Industries/Niches */}
          <Card>
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
                {industries.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={industry}
                      checked={formData.industries.includes(industry)}
                      onCheckedChange={(checked) =>
                        handleArrayChange(
                          "industries",
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
                {formData.industries.map((industry) => (
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
          </Card>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Target Audience *
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Who are you trying to reach with your campaigns?</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {targetAudiences.map((audience) => (
                  <div key={audience} className="flex items-center space-x-2">
                    <Checkbox
                      id={audience}
                      checked={formData.targetAudience.includes(audience)}
                      onCheckedChange={(checked) =>
                        handleArrayChange(
                          "targetAudience",
                          audience,
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor={audience} className="text-sm font-normal">
                      {audience}
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
                  Brand Values & Tone
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
          <Card>
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
              {/* <Button variant="ghost" size="sm" className="mt-2">
                Skip this step
              </Button> */}
            </CardContent>
          </Card>
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
