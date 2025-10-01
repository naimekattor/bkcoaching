import { ReactNode } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  stepTitle: string;
  stepDescription?: string;
  showBack?: boolean;
}

const OnboardingLayout = ({
  children,
  currentStep,
  totalSteps,
  onBack,
  stepTitle,
  stepDescription,
  showBack = true,
}: OnboardingLayoutProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background container px-4">
      {/* Header */}
      <header className="border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            {showBack && onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="text-2xl font-bold text-primary">
              The social Market
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className=" py-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{stepTitle}</span>
              <span className="text-muted-foreground">
                {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            {stepDescription && (
              <p className="text-sm text-muted-foreground">{stepDescription}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className=" py-8">
        <div className="mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
