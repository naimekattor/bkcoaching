import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, DollarSign, Users } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Monetize Your Content",
      description: "Turn your passion into profit with brand partnerships",
    },
    {
      icon: Users,
      title: "Work with Top Brands",
      description: "Collaborate with verified brands that match your values",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Audience",
      description: "Expand your reach through strategic partnerships",
    },
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
          <Star className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold">
          Welcome to <span className="gradient-text">CreatorHub</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          You're about to join thousands of creators who've turned their passion
          into profit. Let's get your creator profile set up and start earning!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {benefits.map((benefit, index) => (
          <Card key={index} className="hover-lift">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <benefit.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <Button variant="hero" size="lg" onClick={onNext}>
          Let's Get Started
        </Button>
        <p className="text-sm text-muted-foreground">
          Free to join • Keep 85% of earnings • Get paid weekly
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
