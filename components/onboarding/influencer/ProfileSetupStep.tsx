"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Hash, Users, Camera } from "lucide-react";
import Image from "next/image";
import { industriesNiches } from "@/constants/niches";
import { demographics } from "@/constants/demographics";
import { useInfluencerOnboarding } from "@/contexts/InfluencerOnboardingContext";

interface ProfileSetupStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ProfileSetupStep = ({ onNext, onBack }: ProfileSetupStepProps) => {
  const { onboardingDataInfluencer, setOnboardingDataInfluencer } =
    useInfluencerOnboarding();
  // const [formData, setOnboardingDataInfluencer] = useState({
  //   displayName: "",
  //   bio: "",
  //   profilePhoto: null as File | null,
  //   profilePhotoPreview: null as string | null,
  //   socialLinks: {
  //     instagram: "",
  //     tiktok: "",
  //     youtube: "",
  //     twitter: "",
  //     linkedin: "",
  //     whatsapp: "",
  //   },
  //   niches: [] as string[],
  //   demographics: [] as string[],
  //   keywords: "",
  // });
  // type SocialPlatform = keyof typeof onboardingDataInfluencer.socialLinks;

  const handleArrayChange = (
    field: "content_niches" | "audience_demographics",
    value: string,
    checked: boolean
  ) => {
    if (checked) {
      setOnboardingDataInfluencer((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
    } else {
      setOnboardingDataInfluencer((prev) => ({
        ...prev,
        [field]: prev[field].filter((item) => item !== value),
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOnboardingDataInfluencer((prev) => ({
        ...prev,
        profile_picture: file,
        profilePhotoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const isValid =
    onboardingDataInfluencer.display_name &&
    onboardingDataInfluencer.short_bio &&
    onboardingDataInfluencer.content_niches.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl text-primary  font-bold">
          Create your micro-influencer profile
        </h1>
        <p className="text-muted-foreground">
          Show brands who you are and what makes your content special
        </p>
      </div>

      <div className="grid gap-8">
        {/* Basic Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Photo Upload */}
              <div className="space-y-2 md:w-1/3">
                <Label>Profile Photo *</Label>
                <label
                  htmlFor="profilePhoto"
                  className="aspect-square w-32 mx-auto md:mx-0 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors overflow-hidden"
                >
                  {onboardingDataInfluencer.profile_picture ? (
                    <Image
                      width={500}
                      height={500}
                      src={onboardingDataInfluencer.profile_picture}
                      alt="Profile preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <>
                      <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        Upload Photo
                      </p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              {/* Basic Info */}
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name *</Label>
                  <Input
                    id="displayName"
                    value={onboardingDataInfluencer.display_name}
                    onChange={(e) =>
                      setOnboardingDataInfluencer((prev) => ({
                        ...prev,
                        display_name: e.target.value,
                      }))
                    }
                    placeholder="Your micro-influencers name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Short Bio (160 characters) *</Label>
                  <Textarea
                    id="bio"
                    value={onboardingDataInfluencer.short_bio}
                    onChange={(e) =>
                      setOnboardingDataInfluencer((prev) => ({
                        ...prev,
                        short_bio: e.target.value,
                      }))
                    }
                    placeholder="Tell brands what makes you unique..."
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {onboardingDataInfluencer.short_bio.length}/160 characters
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Social Media</CardTitle>
            <p className="text-sm text-muted-foreground">
              Link your social accounts to showcase your reach and engagement
            </p>
          </CardHeader>
          {/* <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {(Object.keys(onboardingDataInfluencer.socialLinks) as SocialPlatform[]).map(
                (platform) => (
                  <div className="space-y-2" key={platform}>
                    <Label htmlFor={platform}>{platform}</Label>
                    <Input
                      id={platform}
                      value={onboardingDataInfluencer.socialLinks[platform]}
                      onChange={(e) =>
                        setOnboardingDataInfluencer((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            [platform]: e.target.value,
                          },
                        }))
                      }
                      placeholder={
                        platform === "whatsapp"
                          ? "+1 555-123-4567"
                          : "@yourusername or profile URL"
                      }
                    />
                  </div>
                )
              )}
            </div>
          </CardContent> */}
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram_handle">Instagram</Label>
                <Input
                  id="instagram_handle"
                  value={onboardingDataInfluencer.instagram_handle}
                  onChange={(e) =>
                    setOnboardingDataInfluencer((prev) => ({
                      ...prev,
                      instagram_handle: e.target.value,
                    }))
                  }
                  placeholder="@yourusername or profile URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok_handle">TikTok</Label>
                <Input
                  id="tiktok_handle"
                  value={onboardingDataInfluencer.tiktok_handle}
                  onChange={(e) =>
                    setOnboardingDataInfluencer((prev) => ({
                      ...prev,
                      tiktok_handle: e.target.value,
                    }))
                  }
                  placeholder="@yourusername or profile URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube_handle">YouTube</Label>
                <Input
                  id="youtube_handle"
                  value={onboardingDataInfluencer.youtube_handle}
                  onChange={(e) =>
                    setOnboardingDataInfluencer((prev) => ({
                      ...prev,
                      youtube_handle: e.target.value,
                    }))
                  }
                  placeholder="@yourusername or profile URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_handle">Twitter</Label>
                <Input
                  id="twitter_handle"
                  value={onboardingDataInfluencer.twitter_handle}
                  onChange={(e) =>
                    setOnboardingDataInfluencer((prev) => ({
                      ...prev,
                      twitter_handle: e.target.value,
                    }))
                  }
                  placeholder="@yourusername or profile URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_handle">LinkedIn</Label>
                <Input
                  id="linkedin_handle"
                  value={onboardingDataInfluencer.linkedin_handle}
                  onChange={(e) =>
                    setOnboardingDataInfluencer((prev) => ({
                      ...prev,
                      linkedin_handle: e.target.value,
                    }))
                  }
                  placeholder="@yourusername or profile URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp_handle">WhatsApp</Label>
                <Input
                  id="whatsapp_handle"
                  value={onboardingDataInfluencer.whatsapp_handle}
                  onChange={(e) =>
                    setOnboardingDataInfluencer((prev) => ({
                      ...prev,
                      whatsapp_handle: e.target.value,
                    }))
                  }
                  placeholder="+1 555-123-4567"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Niches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Content Niches *
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Select your primary content categories (choose 3-5 for best
              matches)
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {industriesNiches.map((niche) => (
                <div key={niche} className="flex items-center space-x-2">
                  <Checkbox
                    id={niche}
                    checked={onboardingDataInfluencer.content_niches.includes(
                      niche
                    )}
                    onCheckedChange={(checked) =>
                      handleArrayChange(
                        "content_niches",
                        niche,
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor={niche} className="text-sm font-normal">
                    {niche}
                  </Label>
                </div>
              ))}
            </div>
            <div className="mt-4">
              {onboardingDataInfluencer.content_niches.map((niche) => (
                <Badge key={niche} variant="secondary" className="mr-2 mb-2">
                  {niche}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audience Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Audience Demographics
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Help brands understand who follows you
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {demographics.map((demo) => (
                <div key={demo} className="flex items-center space-x-2">
                  <Checkbox
                    id={demo}
                    checked={onboardingDataInfluencer.audience_demographics.includes(
                      demo
                    )}
                    onCheckedChange={(checked) =>
                      handleArrayChange(
                        "audience_demographics",
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

        {/* Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Keywords & Tags</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add keywords that describe your content style and expertise
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              value={onboardingDataInfluencer.keyword_and_tags}
              onChange={(e) =>
                setOnboardingDataInfluencer((prev) => ({
                  ...prev,
                  keyword_and_tags: e.target.value,
                }))
              }
              placeholder="minimalist style, authentic reviews, storytelling, humor, educational content..."
              rows={3}
            />
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

export default ProfileSetupStep;
