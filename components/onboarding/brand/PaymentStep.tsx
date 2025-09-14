import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, CreditCard, Shield, Zap, Users } from "lucide-react";

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
}

const PaymentStep = ({ onNext, onBack }: PaymentStepProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("growth");
  const [acceptedTOS, setAcceptedTOS] = useState(false);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 5 active campaigns",
        "Basic creator matching",
        "Email support",
        "Campaign analytics",
        "Secure payments",
      ],
      badge: null,
    },
    {
      id: "growth",
      name: "Growth",
      price: "$149",
      period: "/month",
      description: "For growing brands with multiple campaigns",
      features: [
        "Unlimited campaigns",
        "Advanced AI matching",
        "Priority support",
        "Advanced analytics",
        "Custom contract templates",
        "Team collaboration",
        "API access",
      ],
      badge: "Most Popular",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Growth",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "Advanced security",
        "Custom reporting",
        "SLA guarantee",
      ],
      badge: "Best Value",
    },
  ] as const;
  type PlanId = (typeof plans)[number]["id"];

  const trialFeatures = [
    {
      icon: Zap,
      title: "14-Day Free Trial",
      description: "Full access to all Growth plan features",
    },
    {
      icon: Shield,
      title: "No Credit Card Required",
      description: "Start exploring without any commitment",
    },
    {
      icon: Users,
      title: "Instant Access",
      description: "Connect with creators immediately",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Choose your plan</h1>
        <p className="text-muted-foreground">
          Start with a free trial and upgrade anytime. All plans include secure
          payments and creator protection.
        </p>
      </div>

      {/* Free Trial Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        {trialFeatures.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan Selection */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer transition-all hover-lift ${
              selectedPlan === plan.id ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <CardHeader className="text-center space-y-4">
              <div className="space-y-2">
                {plan.badge && (
                  <Badge variant="secondary" className="mx-auto">
                    {plan.badge}
                  </Badge>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              {selectedPlan === plan.id && (
                <div className="pt-4">
                  <Badge
                    variant="outline"
                    className="w-full justify-center text-primary border-primary"
                  >
                    Selected Plan
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-medium">Secure Payment Processing</span>
            </div>
            <p className="text-sm text-muted-foreground">
              No payment required for your 14-day free trial. Add your payment
              method to continue after the trial period.
            </p>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Payment method will be added after trial activation
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="tos"
              checked={acceptedTOS}
              onCheckedChange={(checked) => setAcceptedTOS(checked as boolean)}
            />
            <div className="space-y-2">
              <Label htmlFor="tos" className="text-sm font-normal">
                I agree to the{" "}
                <button className="text-primary hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-primary hover:underline">
                  Privacy Policy
                </button>
              </Label>
              <p className="text-xs text-muted-foreground">
                By continuing, you acknowledge that you understand and agree to
                our terms and conditions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onNext} disabled={!acceptedTOS}>
          Start Free Trial
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
