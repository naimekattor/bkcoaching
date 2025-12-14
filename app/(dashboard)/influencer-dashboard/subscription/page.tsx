"use client";

import { useEffect, useState } from "react";
import { PricingSection, type PricingApiResponse } from "@/components/pricing-section";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";

interface SubscriptionInfo {
  plan_name?: string;
  [key: string]: unknown;
}

export default function SubscriptionPage() {
  const [planData, setPlanData] = useState<SubscriptionInfo | null>(null);
  const [pricingData, setPricingData] = useState<PricingApiResponse | null>(null);
  const [portalData, setPortalData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  


  useEffect(() => {
    const loadSubscriptionPageData = async () => {
      try {
        // Get all subscription plans
        const plansRes = await apiClient('subscription_service/get_subscription_plans/',{
          method:"GET"
        });
        const plansData = plansRes as PricingApiResponse;
        console.log(plansData);
        

        
        // Check if the response was successful
        if (plansData.status === "success") {
          setPricingData(plansData);
        } else {
          console.warn("Failed to fetch plans:", plansData.error);
        }

        // Get user’s current subscription
        const subRes = await apiClient(
          "subscription_service/get_user_subscription_information/",
          { auth: true, method: "GET" }
        );

        if (subRes.status === "success") {
          setPlanData(subRes.data);
          console.log(subRes);
          
        }

        // Get Stripe portal URL
        const portalRes = await apiClient("subscription_service/customer-portal/", {
          auth: true,
          method: "GET",
        });

        if (portalRes.status === "success") {
          setPortalData(portalRes.data.portal_url);
        }
      } catch (error) {
        console.error("Failed loading subscription page:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptionPageData();
  }, []);

  if (loading) {
    return <div className="py-10 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="mx-auto">
      {/* If planData exists, pass current plan name to PricingSection */}
      <PricingSection
        planName={planData?.plan_name ?? ""}
        initialData={pricingData ?? undefined}
      />

      {/* If user clicks Upgrade/Change Plan */}
      {portalData && (
        <div className="text-center mt-6">
          <button
            onClick={() => router.push(portalData)}
            className="px-5 py-2 cursor-pointer bg-secondary text-primary font-semibold rounded-lg hover:bg-[var(--secondaryhover)]"
          >
            Manage Billing in Stripe
          </button>
        </div>
      )}
    </div>
  );
}
