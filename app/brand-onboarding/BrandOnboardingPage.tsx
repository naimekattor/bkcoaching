"use client";
import { useState } from "react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import WelcomeStep from "@/components/onboarding/brand/WelcomeStep";
import BusinessInfoStep from "@/components/onboarding/brand/BusinessInfoStep";
import ProfileSetupStep from "@/components/onboarding/brand/ProfileSetupStep";
import PaymentStep from "@/components/onboarding/brand/PaymentStep";
import CampaignStep from "@/components/onboarding/brand/CampaignStep";
import CompletionStep from "@/components/onboarding/brand/CompletionStep";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

const BrandOnboarding = () => {
  const params = useSearchParams();
  const stepParam = parseInt(params.get("step") || "1", 10);
  const [currentStep, setCurrentStep] = useState(stepParam);
  const navigate = useRouter();

  const steps = [
    { title: "Welcome", description: "Get started with your free trial" },
    { title: "Business Info", description: "Tell us about your business" },
    { title: "Profile Setup", description: "Define your brand and audience" },
    { title: "Payment & Plans", description: "Choose your subscription plan" },
    { title: "First Campaign", description: "Create your first campaign" },
    { title: "Complete", description: "You're ready to start collaborating!" },
  ];

  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);

      // Send welcome notifications
      if (currentStep === 1) {
        toast({
          title: "Welcome to CreatorHub!",
          description:
            "Check your email for next steps and support information.",
        });
      }

      // Send payment confirmation
      if (currentStep === 4) {
        toast({
          title: "Trial activated!",
          description:
            "Your 14-day free trial has started. Payment receipt sent to your email.",
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    toast({
      title: "Onboarding complete!",
      description:
        "Welcome to CreatorHub. Let's start creating amazing campaigns!",
    });
    navigate.push("/brand-dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={handleNext} />;
      case 2:
        return <BusinessInfoStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <ProfileSetupStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <PaymentStep onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <CampaignStep onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <CompletionStep onComplete={handleComplete} />;
      default:
        return <WelcomeStep onNext={handleNext} />;
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={currentStep > 1 ? handleBack : undefined}
      stepTitle={steps[currentStep - 1].title}
      stepDescription={steps[currentStep - 1].description}
      showBack={currentStep > 1 && currentStep < 6}
    >
      {renderStep()}
    </OnboardingLayout>
  );
};

export default BrandOnboarding;
