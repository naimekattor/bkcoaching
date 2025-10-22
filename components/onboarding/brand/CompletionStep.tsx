// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { CheckCircle, Users, Target, Gift, Copy } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "@/hooks/use-toast";
// import Link from "next/link";
// import { useAuthStore } from "@/stores/useAuthStore";
// import { apiClient } from "@/lib/apiClient";

// interface CompletionStepProps {
//   onComplete: () => void;
// }
// const transformBrandDataForAPI = (data: any) => {
//   const payload = {
//     brand_profile: {
//       // From BusinessInfoStep
//       business_name: data.businessName,
//       website: data.website,
//       time_zone: data.timeZone,
//       bio: data.bio,
//       business_types: Array.isArray(data.businessTypes)
//         ? data.businessTypes.join(", ")
//         : "",
//       logo_file: data.logoFile ? data.logoFile.name : "",
//       target_audience: Array.isArray(data.targetAudience)
//         ? data.targetAudience.join(", ")
//         : "",
//       keywords: data.keywords,
//       demographics: Array.isArray(data.demographics)
//         ? data.demographics.join(", ")
//         : "",
//       values: Array.isArray(data.values) ? data.values.join(", ") : "",
//       selected_plan: data.selectedPlan,
//       billing_cycle: data.billingCycle,

//       // From CampaignStep
//       campaign_name: data.campaignName,
//       objective: data.objective,
//       budget: Array.isArray(data.budget)
//         ? data.budget.map((num) => num.toString()).join(", ")
//         : "",
//       budget_type: data.budgetType,
//       payment_preferences: Array.isArray(data.paymentPreferences)
//         ? data.paymentPreferences.join(", ")
//         : "",
//       description: data.description,
//       deliverables: Array.isArray(data.deliverables)
//         ? data.deliverables.join(", ")
//         : "",
//       timeline: data.timeline,
//       approval_required: data.approvalRequired,
//       auto_match: data.autoMatch,
//       target_audience_campaign: data.targetAudienceCampaign,
//     },
//   };
//   return payload;
// };

// const CompletionStep = ({ onComplete }: CompletionStepProps) => {
//   const [referralCode] = useState("BRAND-ABC123");

//   const nextSteps = [
//     {
//       icon: Users,
//       title: "Browse micro-influencers",
//       description:
//         "Explore our marketplace to find perfect collaboration partners",
//       action: "Browse Now",
//       link: "/brand-dashboard/campaigns",
//     },
//     {
//       icon: Target,
//       title: "Review Matches",
//       description:
//         "Check out micro-influencers we've matched with your campaign",
//       action: "View Matches",
//       link: "/brand-dashboard/campaigns",
//     },
//   ];

//   const copyReferralCode = () => {
//     navigator.clipboard.writeText(referralCode);
//     toast({
//       title: "Referral code copied!",
//       description: "Share with other brands to earn rewards",
//     });
//   };

//   const { token } = useAuthStore();

//   useEffect(() => {
//     const submitOnboardingData = async () => {
//       const storedData = localStorage.getItem("onboardingData");
//       if (!storedData) return;

//       try {
//         const onboardingData = JSON.parse(storedData);
//         const apiPayload = transformBrandDataForAPI(onboardingData);

//         await apiClient("user_service/update_user_profile/", {
//           method: "PATCH",
//           auth: true,
//           body: JSON.stringify(apiPayload),
//         });

//         toast({
//           title: "Profile Saved!",
//           description: "Your brand profile is now live.",
//         });
//         localStorage.removeItem("onboardingData");
//       } catch (error) {
//         console.error("Failed to submit influencer onboarding data:", error);
//         toast({ title: "Error Saving Profile", variant: "destructive" });
//       }
//     };

//     if (token) {
//       submitOnboardingData();
//     }
//   }, [token]);

//   return (
//     <div className="text-center space-y-8">
//       <div className="space-y-4">
//         <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
//           <CheckCircle className="w-10 h-10 text-primary" />
//         </div>
//         <h1 className="text-3xl text-primary font-bold">
//           Welcome to <span className="gradient-text">The Social Market</span>!
//         </h1>
//         <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
//           Your brand profile is complete and your first campaign is ready.
//           You&apos;re all set to start collaborating with amazing
//           micro-influencers!
//         </p>
//       </div>

//       {/* Trial Status */}
//       <Card className="bg-primary/5 border-primary/20">
//         <CardContent className="p-6 text-center space-y-4">
//           <Badge variant="secondary" className="text-primary bg-primary/10">
//             Free Trial Active
//           </Badge>
//           <h3 className="font-semibold text-lg">14 Days of Full Access</h3>
//           <p className="text-sm text-muted-foreground">
//             Your Growth plan trial includes unlimited campaigns, AI matching,
//             and priority support. No payment required until your trial ends.
//           </p>
//         </CardContent>
//       </Card>

//       {/* Next Steps */}
//       <div className="space-y-6">
//         <h2 className="text-2xl text-primary font-bold">What&apos;s Next?</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           {nextSteps.map((step, index) => (
//             <Card key={index} className="hover-lift cursor-pointer">
//               <CardContent className="p-6 text-center space-y-4">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
//                   <step.icon className="w-6 h-6 text-primary" />
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="font-semibold">{step.title}</h3>
//                   <p className="text-sm text-muted-foreground">
//                     {step.description}
//                   </p>
//                 </div>
//                 <Button variant="outline" size="sm">
//                   {step.action}
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Referral Program */}
//       <Card>
//         <CardContent className="p-6 space-y-4">
//           <div className="flex items-center justify-center gap-2">
//             <Gift className="w-5 h-5 text-primary" />
//             <h3 className="font-semibold">Earn $20 for Each Referral</h3>
//           </div>
//           <p className="text-sm text-muted-foreground">
//             Share The Social Market with other brands and earn $20 when they
//             sign up. They&apos;ll get first month free!
//           </p>
//           <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
//             <code className="flex-1 text-center font-mono text-sm bg-background px-3 py-2 rounded">
//               {referralCode}
//             </code>
//             <Button size="sm" variant="outline" onClick={copyReferralCode}>
//               <Copy className="w-4 h-4 mr-2" />
//               Copy
//             </Button>
//           </div>

//           {/* Social Share Buttons */}
//           <div className="pt-4 flex flex-wrap justify-center gap-3">
//             <Button
//               size="sm"
//               variant="outline"
//               className="bg-primary text-white"
//               onClick={() =>
//                 window.open(
//                   `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                     window.location.href
//                   )}&quote=Use my referral code ${referralCode}!`,
//                   "_blank"
//                 )
//               }
//             >
//               Facebook
//             </Button>

//             <Button
//               size="sm"
//               className="bg-primary text-white"
//               variant="outline"
//               onClick={() =>
//                 window.open(`https://www.instagram.com/`, "_blank")
//               }
//             >
//               Instagram
//             </Button>

//             <Button
//               size="sm"
//               className="bg-primary text-white"
//               variant="outline"
//               onClick={() =>
//                 window.open(
//                   `https://api.whatsapp.com/send?text=${encodeURIComponent(
//                     `Join The Social Market using my referral code ${referralCode}! ${window.location.href}`
//                   )}`,
//                   "_blank"
//                 )
//               }
//             >
//               WhatsApp
//             </Button>

//             <Button
//               size="sm"
//               className="bg-primary text-white"
//               variant="outline"
//               onClick={() =>
//                 (window.location.href = `mailto:?subject=Join The Social Market&body=Use my referral code ${referralCode} to sign up: ${window.location.href}`)
//               }
//             >
//               Email
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
//         <Button variant="primary" size="lg" onClick={onComplete}>
//           Go to Dashboard
//         </Button>
//         <Button variant="outline" size="lg">
//           <Link href={"/brand-dashboard/microinfluencerspage"}>
//             Browse micro-influencers
//           </Link>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CompletionStep;

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Target, Gift, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { apiClient } from "@/lib/apiClient";

interface CompletionStepProps {
  onComplete: () => void;
}

const transformProfileDataForAPI = (data: any) => {
  const profilePayload = {
    brand_profile: {
      business_name: data.businessName,
      website: data.website,
      time_zone: data.timeZone,
      bio: data.bio,
      business_types: Array.isArray(data.businessTypes)
        ? data.businessTypes.join(", ")
        : "",
      logo_file: data.logoFile ? data.logoFile.name : "",
      target_audience: Array.isArray(data.targetAudience)
        ? data.targetAudience.join(", ")
        : "",
      keywords: data.keywords,
      demographics: Array.isArray(data.demographics)
        ? data.demographics.join(", ")
        : "",
      values: Array.isArray(data.values) ? data.values.join(", ") : "",
      selected_plan: data.selectedPlan,
      billing_cycle: data.billingCycle,
    },
  };
  return profilePayload;
};

const transformCampaignDataForAPI = (data: any) => {
  const campaignPayload = {
    campaign: {
      campaign_name: data.campaignName,
      objective: data.objective,
      budget: Array.isArray(data.budget)
        ? data.budget.map((num) => num.toString()).join(", ")
        : "",
      budget_type: data.budgetType,
      payment_preferences: Array.isArray(data.paymentPreferences)
        ? data.paymentPreferences.join(", ")
        : "",
      description: data.description,
      deliverables: Array.isArray(data.deliverables)
        ? data.deliverables.join(", ")
        : "",
      timeline: data.timeline,
      approval_required: data.approvalRequired,
      auto_match: data.autoMatch,
      target_audience_campaign: data.targetAudienceCampaign,
    },
  };
  return campaignPayload;
};

const CompletionStep = ({ onComplete }: CompletionStepProps) => {
  const [referralCode] = useState("BRAND-ABC123");

  const nextSteps = [
    {
      icon: Users,
      title: "Browse micro-influencers",
      description:
        "Explore our marketplace to find perfect collaboration partners",
      action: "Browse Now",
      link: "/brand-dashboard/campaigns",
    },
    {
      icon: Target,
      title: "Review Matches",
      description:
        "Check out micro-influencers we've matched with your campaign",
      action: "View Matches",
      link: "/brand-dashboard/campaigns",
    },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral code copied!",
      description: "Share with other brands to earn rewards",
    });
  };

  const { token } = useAuthStore();

  useEffect(() => {
    const submitOnboardingData = async () => {
      const storedData = localStorage.getItem("onboardingData");
      if (!storedData) return;

      try {
        const onboardingData = JSON.parse(storedData);

        // Submit profile data to user_service
        const profilePayload = transformProfileDataForAPI(onboardingData);
        await apiClient("user_service/update_user_profile/", {
          method: "PATCH",
          auth: true,
          body: JSON.stringify(profilePayload),
        });

        // Submit campaign data to campaign_service
        const campaignPayload = transformCampaignDataForAPI(onboardingData);
        await apiClient("campaign_service/create_campaign/", {
          method: "POST",
          auth: true,
          body: JSON.stringify(campaignPayload),
        });

        toast({
          title: "Profile Saved!",
          description: "Your brand profile and campaign are now live.",
        });
        localStorage.removeItem("onboardingData");
      } catch (error) {
        console.error("Failed to submit onboarding data:", error);
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
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl text-primary font-bold">
          Welcome to <span className="gradient-text">The Social Market</span>!
        </h1>
        <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto">
          Your brand profile is complete and your first campaign is ready.
          You&apos;re all set to start collaborating with amazing
          micro-influencers!
        </p>
      </div>

      {/* Trial Status */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center space-y-4">
          <Badge variant="secondary" className="text-primary bg-primary/10">
            Free Trial Active
          </Badge>
          <h3 className="font-semibold text-lg">14 Days of Full Access</h3>
          <p className="text-sm text-muted-foreground">
            Your Growth plan trial includes unlimited campaigns, AI matching,
            and priority support. No payment required until your trial ends.
          </p>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl text-primary font-bold">What&apos;s Next?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {nextSteps.map((step, index) => (
            <Card key={index} className="hover-lift cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <step.icon className="w-6 h-6 text-primary" />
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
            <Gift className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Earn $20 for Each Referral</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Share The Social Market with other brands and earn $20 when they
            sign up. They&apos;ll get first month free!
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button variant="primary" size="lg" onClick={onComplete}>
          Go to Dashboard
        </Button>
        <Button variant="outline" size="lg">
          <Link href={"/brand-dashboard/microinfluencerspage"}>
            Browse micro-influencers
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
