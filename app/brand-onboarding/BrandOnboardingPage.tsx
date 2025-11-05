"use client";
import { useState } from "react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import BusinessInfoStep from "@/components/onboarding/brand/BusinessInfoStep";
import ProfileSetupStep from "@/components/onboarding/brand/ProfileSetupStep";
import PaymentStep from "@/components/onboarding/brand/PaymentStep";
import CampaignStep from "@/components/onboarding/brand/CampaignStep";
import CompletionStep from "@/components/onboarding/brand/CompletionStep";
import { useRouter, useSearchParams } from "next/navigation";
import BrandOnboardingProvider from "@/contexts/BrandOnboardingContext";

const BrandOnboarding = () => {
  const params = useSearchParams();
  const stepParam = parseInt(params.get("step") || "1", 10);
  const [currentStep, setCurrentStep] = useState(stepParam);
  const navigate = useRouter();

  const steps = [
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
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    // toast({
    //   title: "Onboarding complete!",
    //   description:
    //     "Welcome to The Social Market. Let's start creating amazing campaigns!",
    // });
    navigate.push("/brand-dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      // case 1:
      // return <WelcomeStep onNext={handleNext} />;
      case 1:
        return <BusinessInfoStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <ProfileSetupStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PaymentStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <CampaignStep onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <CompletionStep onComplete={handleComplete} />;
      default:
        return <BusinessInfoStep onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <BrandOnboardingProvider>
      <OnboardingLayout
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={currentStep > 1 ? handleBack : undefined}
        stepTitle={steps[currentStep - 1].title}
        stepDescription={steps[currentStep - 1].description}
        showBack={currentStep > 1 && currentStep < 6}
        skipRole="brand"
        finalStep ="5"
      >
        {renderStep()}
      </OnboardingLayout>
    </BrandOnboardingProvider>
  );
};

export default BrandOnboarding;
