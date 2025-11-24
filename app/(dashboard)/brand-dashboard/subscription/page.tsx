"use client";

import { useEffect, useState } from "react";
import { PricingSection } from "@/components/pricing-section";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";

export default function SubscriptionPage() {
  const [planData, setPlanData] = useState(null); 
  const [pricingData, setPricingData] = useState([]); 
  const [portalData, setPortalData] = useState(null); 
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  


  useEffect(() => {
    const loadSubscriptionPageData = async () => {
      try {
        // Get user’s current subscription
        const subRes = await apiClient(
          "subscription_service/get_user_subscription_information/",
          { auth: true, method: "GET" }
        );

        if (subRes.status === "success") {
          setPlanData(subRes.data);
        }

        // Get Stripe portal URL
        const portalRes = await apiClient("subscription_service/customer-portal/", {
          auth: true,
          method: "GET",
        });

        if (portalRes.status === "success") {
          setPortalData(portalRes.data.portal_url);
        }

        // Get all subscription plans
        const plansRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}subscription_service/get_subscription_plans/`
        );

        // Parse the JSON response
        const plansData = await plansRes.json();
        console.log("Pricing Plans:", plansData);

        // Check if the response was successful
        if (plansData.status === "success") {
          setPricingData(plansData);
        } else {
          console.warn("Failed to fetch plans:", plansData.error);
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
      {/* <PricingSection planName={planData?.plan_name} initialData={pricingData}/> */}

      {/* If user clicks Upgrade/Change Plan */}
      {portalData && (
        <div className="text-center mt-6">
          <button
            onClick={() => router.push(portalData)}
            className="px-5 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-[var(--secondaryhover)]"
          >
            Manage Billing in Stripe
          </button>
        </div>
      )}
    </div>
  );
}
