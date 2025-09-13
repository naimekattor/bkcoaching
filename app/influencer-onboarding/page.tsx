"use client";
import { useState } from "react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import WelcomeStep from "@/components/onboarding/influencer/WelcomeStep";
import ProfileSetupStep from "@/components/onboarding/influencer/ProfileSetupStep";
import CollaborationPreferencesStep from "@/components/onboarding/influencer/CollaborationPreferencesStep";
import GuidelinesStep from "@/components/onboarding/influencer/GuidelinesStep";
import WorkflowStep from "@/components/onboarding/influencer/WorkflowStep";
import PaymentSetupStep from "@/components/onboarding/influencer/PaymentSetupStep";
import TermsStep from "@/components/onboarding/influencer/TermsStep";
import CompletionStep from "@/components/onboarding/influencer/CompletionStep";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const CreatorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useRouter();

  const steps = [
    { title: "Welcome", description: "Get started as a creator" },
    { title: "Profile Setup", description: "Create your creator profile" },
    {
      title: "Collaboration Preferences",
      description: "Set your rates and preferences",
    },
    {
      title: "Content Guidelines",
      description: "Review quality and disclosure rules",
    },
    {
      title: "Communication & Workflow",
      description: "Learn how collaborations work",
    },
    { title: "Payment Setup", description: "Choose how you get paid" },
    { title: "Terms & Privacy", description: "Review and accept our policies" },
    { title: "Complete", description: "You're ready to start earning!" },
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
            "Check your email for creator tips and support information.",
        });
      }

      // Profile setup reminder
      if (currentStep === 2) {
        toast({
          title: "Profile looking great!",
          description:
            "Complete your profile to unlock more collaboration opportunities.",
        });
      }

      // Payment setup confirmation
      if (currentStep === 6) {
        toast({
          title: "Payment method added!",
          description:
            "You're all set to start earning from your collaborations.",
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
        "Welcome to CreatorHub. Let's start creating amazing content!",
    });
    navigate.push("/influencer-dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={handleNext} />;
      case 2:
        return <ProfileSetupStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return (
          <CollaborationPreferencesStep
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return <GuidelinesStep onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <WorkflowStep onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <PaymentSetupStep onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <TermsStep onNext={handleNext} onBack={handleBack} />;
      case 8:
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
      showBack={currentStep > 1 && currentStep < 8}
    >
      {renderStep()}
    </OnboardingLayout>
  );
};

export default CreatorOnboarding;
