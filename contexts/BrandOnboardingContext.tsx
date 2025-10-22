import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface BrandOnboardingData {
  // From BusinessInfoStep
  businessName: string;
  website: string;
  timeZone: string;
  bio: string;
  businessTypes: string[];
  logoFile?: File | null;

  // From ProfileSetupStep
  targetAudience: string[];
  keywords: string;
  demographics: string[];
  values: string[]; // Brand tone

  // From PaymentStep (if needed, e.g., plan selection)
  selectedPlan: string;
  billingCycle: "monthly" | "yearly";

  // From CampaignStep
  campaignName: string;
  objective: string;
  budget: number[];
  budgetType: string;
  paymentPreferences: string[];
  description: string;
  deliverables: string[];
  timeline: string;
  approvalRequired: boolean;
  autoMatch: boolean;
  targetAudienceCampaign: string;
}

interface BrandOnboardingContextType {
  onboardingData: BrandOnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<BrandOnboardingData>>;
}
const BrandOnboardingContext = createContext<
  BrandOnboardingContextType | undefined
>(undefined);
const initialState: BrandOnboardingData = {
  businessName: "",
  website: "",
  bio: "",
  businessTypes: [],
  logoFile: null,
  targetAudience: [],
  keywords: "",
  demographics: [],
  values: [],
  selectedPlan: "",
  billingCycle: "monthly",
  campaignName: "",
  objective: "",
  budget: [1000],
  budgetType: "total",
  paymentPreferences: [],
  description: "",
  deliverables: [],
  timeline: "",
  approvalRequired: true,
  autoMatch: false,
  timeZone: "",
  targetAudienceCampaign: "",
};
const BrandOnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingData, setOnboardingData] = useState<BrandOnboardingData>(
    () => {
      try {
        const storedData = localStorage.getItem("brandOnBoardingData");
        return storedData ? JSON.parse(storedData) : initialState;
      } catch (error) {
        console.error(
          "Failed to parse brand onboarding data from localStorage",
          error
        );
        return initialState;
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("brandOnBoardingData", JSON.stringify(onboardingData));
  }, [onboardingData]);

  return (
    <BrandOnboardingContext.Provider
      value={{ onboardingData, setOnboardingData }}
    >
      {children}
    </BrandOnboardingContext.Provider>
  );
};
export default BrandOnboardingProvider;

export const useBrandOnBoarding = () => {
  const context = useContext(BrandOnboardingContext);
  if (!context) {
    throw new Error(
      "useBrandOnboarding must be used within a BrandOnboardingProvider"
    );
  }
  return context;
};
