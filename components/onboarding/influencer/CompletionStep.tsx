import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Search,
  MessageCircle,
  TrendingUp,
  Gift,
  Copy,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface CompletionStepProps {
  onComplete: () => void;
}

const CompletionStep = ({ onComplete }: CompletionStepProps) => {
  const [referralCode] = useState("CREATOR-XYZ789");

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
    {
      icon: TrendingUp,
      title: "Set Your Rates",
      description: "Update your pricing to maximize your earning potential",
      action: "Update Rates",
    },
    {
      icon: Star,
      title: "Get Verified",
      description: "Verify your social accounts to unlock premium campaigns",
      action: "Verify Accounts",
    },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral code copied!",
      description: "Share with other creators to earn rewards",
    });
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold">
          Welcome to <span className="gradient-text">CreatorHub</span>!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your creator profile is complete and you're ready to start earning!
          Get ready to collaborate with amazing brands and grow your influence.
        </p>
      </div>

      {/* Creator Status */}
      <Card className="bg-secondary/5 border-secondary/20">
        <CardContent className="p-6 text-center space-y-4">
          <Badge variant="secondary" className="text-secondary bg-secondary/10">
            Creator Account Active
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
        <h2 className="text-2xl font-bold">What's Next?</h2>
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
              Earn $10 for Each Creator Referral
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Invite other creators to join CreatorHub and earn $10 when they
            complete their first campaign. They'll get priority matching for
            their first month too!
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
          Browse Campaigns
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
