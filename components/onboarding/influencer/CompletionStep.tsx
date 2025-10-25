import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Search, MessageCircle, Gift, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";
import { useAuthStore } from "@/stores/useAuthStore";
import { useInfluencerOnboarding } from "@/contexts/InfluencerOnboardingContext";

interface CompletionStepProps {
  onComplete: () => void;
}

const transformInfluencerDataForAPI = (data: any) => {
  console.log("profile_picture:", data.profile_picture);

  const payload = {
    influencer_profile: {
      display_name: data.display_name,
      short_bio: data.short_bio,
      profile_picture: data.profile_picture,
      instagram_handle: data.instagram_handle,
      tiktok_handle: data.tiktok_handle === "null" ? "" : data.tiktok_handle,
      youtube_handle: data.youtube_handle,
      twitter_handle: data.twitter_handle,
      linkedin_handle: data.linkedin_handle,
      whatsapp_handle: data.whatsapp_handle,

      content_niches: Array.isArray(data.content_niches)
        ? data.content_niches.join(", ")
        : "",
      audience_demographics: Array.isArray(data.audience_demographics)
        ? data.audience_demographics.join(", ")
        : "",
      keyword_and_tags: data.keyword_and_tags,
      content_formats: Array.isArray(data.content_formats)
        ? data.content_formats.join(", ")
        : "",
      payment_preferences: Array.isArray(data.payment_preferences)
        ? data.payment_preferences.join(", ")
        : "",
      // Rate and payment fields
      rate_range_for_social_post: data.rate_range_for_social_post,
      rate_range_for_youtube_video: data.rate_range_for_youtube_video,
      rate_range_for_blog_post: data.rate_range_for_blog_post,
      rate_range_for_youtube_short: data.rate_range_for_youtube_short,
      rate_range_for_repost: data.rate_range_for_repost,
      rate_range_for_instagram_story: data.rate_range_for_instagram_story,
      rate_range_for_instagram_reel: data.rate_range_for_instagram_reel,
      rate_range_for_tiktok_video: data.rate_range_for_tiktok_video,
      rate_range_for_podcast_mention: data.rate_range_for_podcast_mention,
      rate_range_for_live_stream: data.rate_range_for_live_stream,
      rate_range_for_ugc_creation: data.rate_range_for_ugc_creation,
      rate_range_for_whatsapp_status_post:
        data.rate_range_for_whatsapp_status_post,
      rate_range_for_affiliate_marketing_percent:
        data.rate_range_for_affiliate_marketing_percent,
      response_time: data.response_time,
      payment_method: data.payment_method,
      account_holder_name: data.account_holder_name,
      account_number: data.account_number ? String(data.account_number) : "",
      bank_name: data.bank_name,
      paypal_email: data.paypal_email,
    },
  };
  return payload;
};

const CompletionStep = ({ onComplete }: CompletionStepProps) => {
  const [referralCode] = useState("CREATOR-XYZ789");
  const { onboardingDataInfluencer, setOnboardingDataInfluencer } =
    useInfluencerOnboarding();
  const nextSteps = [
    {
      icon: Search,
      title: "Browse Campaigns",
      description: "Find brand campaigns that match your niche and interests",
      action: "Explore Campaigns",
    },
    {
      icon: MessageCircle,
      title: "Complete Your Profile",
      description: "Add more details to attract better brand partnerships",
      action: "Finish Profile",
    },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral code copied!",
      description: "Share with other micro-influencers to earn rewards",
    });
  };
  const { token } = useAuthStore();

  useEffect(() => {
    const submitOnboardingData = async () => {
      const storedData = localStorage.getItem("InfluencerOnboardingData");
      if (!storedData) return;

      try {
        const onboardingData = JSON.parse(storedData);
        console.log("profile_picture:", onboardingData.profile_picture);

        const apiPayload = transformInfluencerDataForAPI(onboardingData);

        await apiClient("user_service/update_user_profile/", {
          method: "PATCH",
          auth: true,
          body: JSON.stringify(apiPayload),
        });

        toast({
          title: "Profile Saved!",
          description: "Your influencer profile is now live.",
        });
        localStorage.removeItem("InfluencerOnboardingData");
      } catch (error) {
        console.error("Failed to submit influencer onboarding data:", error);
        toast({ title: "Error Saving Profile", variant: "destructive" });
      }
    };

    if (token) {
      submitOnboardingData();
    }
  }, [token]);

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold text-primary">
          Welcome to <span className="">The Social Market</span>!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your micro-influencers profile is complete and you&apos;re ready to
          start earning! Get ready to collaborate with amazing brands and grow
          your influence.
        </p>
      </div>

      {/* Creator Status */}
      <Card className="bg-secondary/5 border-secondary/20">
        <CardContent className="p-6 text-center space-y-4">
          <Badge variant="secondary" className="text-secondary bg-secondary/10">
            micro-influencers Account Active
          </Badge>
          <h3 className="font-semibold text-lg">Ready to Start Earning</h3>
          <p className="text-sm text-muted-foreground">
            Your profile is live and visible to brands. Start browsing campaigns
            or wait for brands to discover you!
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-semibold text-secondary">85%</div>
              <div className="text-muted-foreground">Your Earnings</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-secondary">Weekly</div>
              <div className="text-muted-foreground">Payouts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-secondary">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">What&apos;s Next?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {nextSteps.map((step, index) => (
            <Card key={index} className="hover-lift cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {step.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Gift className="w-5 h-5 text-secondary" />
            <h3 className="font-semibold">
              Earn $10 for Each micro-influencers Referral
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Invite other micro-influencers to join The Social Market and earn
            $10 when they complete their first campaign. They&apos;ll get
            priority matching for their first month too!
          </p>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <code className="flex-1 text-center font-mono text-sm bg-background px-3 py-2 rounded">
              {referralCode}
            </code>
            <Button size="sm" variant="outline" onClick={copyReferralCode}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          {/* Social Share Buttons */}
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="bg-primary text-white"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}&quote=Use my referral code ${referralCode}!`,
                  "_blank"
                )
              }
            >
              Facebook
            </Button>

            <Button
              size="sm"
              className="bg-primary text-white"
              variant="outline"
              onClick={() =>
                window.open(`https://www.instagram.com/`, "_blank")
              }
            >
              Instagram
            </Button>

            <Button
              size="sm"
              className="bg-primary text-white"
              variant="outline"
              onClick={() =>
                window.open(
                  `https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Join The Social Market using my referral code ${referralCode}! ${window.location.href}`
                  )}`,
                  "_blank"
                )
              }
            >
              WhatsApp
            </Button>

            <Button
              size="sm"
              className="bg-primary text-white"
              variant="outline"
              onClick={() =>
                (window.location.href = `mailto:?subject=Join The Social Market&body=Use my referral code ${referralCode} to sign up: ${window.location.href}`)
              }
            >
              Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-muted/30">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">💡 Pro Tips for Success</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <h4 className="font-medium">Profile Optimization</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Add high-quality profile photos</li>
                <li>• Include your best content examples</li>
                <li>• Keep your bio authentic and engaging</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Collaboration Success</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Respond to brand messages quickly</li>
                <li>• Always meet your deadlines</li>
                <li>• Communicate proactively</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button variant="hero" size="lg" onClick={onComplete}>
          Go to Dashboard
        </Button>
        <Button variant="outline" size="lg">
          <Link href={"/influencer-dashboard/campaigns"}>Browse Campaigns</Link>
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
