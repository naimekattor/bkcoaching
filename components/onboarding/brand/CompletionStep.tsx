import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Users,
  Target,
  MessageCircle,
  BarChart3,
  Gift,
  Copy,
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface CompletionStepProps {
  onComplete: () => void;
}

const CompletionStep = ({ onComplete }: CompletionStepProps) => {
  const [referralCode] = useState("BRAND-ABC123");

  const nextSteps = [
    {
      icon: Users,
      title: "Browse Creators",
      description:
        "Explore our marketplace to find perfect collaboration partners",
      action: "Browse Now",
    },
    {
      icon: Target,
      title: "Review Matches",
      description: "Check out creators we've matched with your campaign",
      action: "View Matches",
    },
    // {
    //   icon: MessageCircle,
    //   title: "Send Offers",
    //   description: "Start conversations and send collaboration offers",
    //   action: "Message Creators",
    // },
    // {
    //   icon: BarChart3,
    //   title: "Track Performance",
    //   description: "Monitor your campaign progress and analytics",
    //   action: "View Dashboard",
    // },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral code copied!",
      description: "Share with other brands to earn rewards",
    });
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">
          Welcome to <span className="gradient-text">The Social Market</span>!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your brand profile is complete and your first campaign is ready.
          You&apos;re all set to start collaborating with amazing creators!
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
        <h2 className="text-2xl font-bold">What&apos;s Next?</h2>
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
            Share CreatorHub with other brands and earn $20 when they sign up.
            They&apos;ll get 25% off their first month too!
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
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button variant="primary" size="lg" onClick={onComplete}>
          Go to Dashboard
        </Button>
        <Button variant="outline" size="lg">
          <Link href={"/brand-dashboard/microinfluencerspage"}>
            Browse Creators
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
