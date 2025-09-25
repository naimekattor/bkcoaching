import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Building, Globe, MapPin } from "lucide-react";
import PageHeaderWithSwitcher from "@/components/PageHeaderWithSwitcher";

interface BusinessInfoStepProps {
  onNext: () => void;
  onBack: () => void;
}

const BusinessInfoStep = ({ onNext, onBack }: BusinessInfoStepProps) => {
  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    bio: "",
    location: "",
    businessTypes: [] as string[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const businessTypes = [
    "Beauty & Skincare Brands – makeup, skincare, haircare",
    "Fashion & Apparel – clothing lines, modest fashion brands, boutique shops",
    "Jewelry & Accessories – watches, handbags, eyewear",
    "Health & Wellness – supplements, fitness programs, healthy living",
    "Food & Beverage – restaurants, cafes, packaged foods, specialty drinks",
    "Hospitality & Travel – hotels, resorts, Airbnb hosts, travel agencies",
    "Events & Experiences – retreats, workshops, conferences",
    "E-commerce Stores – online boutiques, curated shops, niche product sellers",
    "Local Service Providers – gyms, salons, spas, personal trainers",
    "Tech & Gadgets – phone accessories, smart devices, apps",
    "Education & Coaching – online courses, coaches, masterminds",
    "Parenting & Family Brands – baby products, toys, household goods",
    "Home & Lifestyle – decor, furniture, kitchenware, cleaning products",
    "Financial & Professional Services – investment apps, insurance, credit repair",
    "Nonprofits & Causes – charities, community organizations, social impact campaigns",
    "Other",
  ];

  const handleBusinessTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        businessTypes: [...prev.businessTypes, type],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        businessTypes: prev.businessTypes.filter((t) => t !== type),
      }));
    }
  };

  const isValid = formData.businessName && formData.businessTypes.length > 0;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // 🔹 Here you can also upload file to your backend/Cloudinary/S3
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeaderWithSwitcher role="brands" />
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">
          Tell us about your business
        </h1>
        <p className="text-muted-foreground">
          This helps us match you with the most relevant creators for your brand
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }))
                }
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                  placeholder="https://yourwebsite.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="City, Country"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Brief description of your business and what you do..."
                rows={4}
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Logo (Optional)</Label>
              <div
                onClick={handleClick}
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                {fileName ? (
                  <p className="text-sm font-medium">{fileName}</p>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 2MB
                    </p>
                  </>
                )}
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png,image/jpeg"
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Business Type */}
        <Card>
          <CardHeader>
            <CardTitle>Business Type *</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select all that apply to your business
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
              {businessTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={formData.businessTypes.includes(type)}
                    onCheckedChange={(checked) =>
                      handleBusinessTypeChange(type, checked as boolean)
                    }
                  />
                  <Label htmlFor={type} className="text-sm font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
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
  );
};

export default BusinessInfoStep;
