"use client";

import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { SkeletonCard } from "./SkeletoCard";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

// --- Interfaces based on your API Response ---
interface Price {
  price_id: string;
  amount: number;
  currency: string;
  interval: "month" | "year";
}

interface Plan {
  product_id: string;
  name: string; // "Micro-Influencer" | "Businesses" | "Both"
  description: string;
  prices: Price[];
}

export interface PricingApiResponse {
  status: string;
  code: number;
  data: Plan[];
  error: Record<string, unknown>;
  meta: { timestamp: string };
}

export function PricingSection({
  planName,
  initialData,
}: {
  initialData?: PricingApiResponse;
  planName: string;
}) {
  const pathname = usePathname();
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>(initialData?.data || []);

  // --- Logic to determine Dashboard Context ---
  // Using includes() handles sub-paths like /influencer-dashboard/subscription
  const isInfluencerDashboard = pathname?.includes("/influencer-dashboard");
  const isBrandDashboard = pathname?.includes("/brand-dashboard");

  useEffect(() => {
    if (initialData?.data && initialData.data.length > 0) {
      setPlans(initialData.data);
      setLoading(false);
    } else {
      // Fallback if data isn't passed immediately
      setLoading(false);
    }
  }, [initialData]);

  // --- Filtering & Sorting Logic ---
  const filteredPlans = plans
    .filter((plan) => {
      // 1. Influencer Dashboard: Show "Micro-Influencer" + "Both"
      if (isInfluencerDashboard) {
        return plan.name === "Micro-Influencer" || plan.name === "Both";
      }

      // 2. Brand Dashboard: Show "Businesses" + "Both"
      if (isBrandDashboard) {
        return plan.name === "Businesses" || plan.name === "Both";
      }

      // 3. Fallback: Show all 3 if path doesn't match (e.g. public pricing page)
      return true;
    })
    .sort((a, b) => {
      // Optional: Sort so "Both" always appears last (on the right)
      if (a.name === "Both") return 1;
      if (b.name === "Both") return -1;
      return 0;
    });

  // --- Helper Functions ---
  const getPriceForInterval = (prices: Price[]) => {
    return (
      prices.find((p) => p.interval === (isYearly ? "year" : "month")) ||
      prices[0]
    );
  };

  const calculateSavings = (prices: Price[]) => {
    const monthly = prices.find((p) => p.interval === "month");
    const yearly = prices.find((p) => p.interval === "year");
    if (!monthly || !yearly) return null;

    const monthlyTotal = monthly.amount * 12;
    const savings = ((monthlyTotal - yearly.amount) / monthlyTotal) * 100;
    return savings > 0 ? `Save ${savings.toFixed(0)}%` : null;
  };

  const handleCheckout = async (priceId: string) => {
    try {
      const res = await apiClient(
        "subscription_service/create_checkout_session/",
        {
          auth: true,
          method: "POST",
          body: JSON.stringify({ price_id: priceId,success_url:"http://localhost:3000/home_dashboard?success",cancel_url:"http://localhost:3000/home_dashboard?cancel" }),
        }
      );

      if (res.data && res.data.checkout_url) {
        window.location.href = res.data.checkout_url;
      } else {
        toast("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast("Failed to create checkout session");
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <section className="px-4 py-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  // --- Empty/Error State ---
  if (error || filteredPlans.length === 0) {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto text-center">
          <p className="text-lg text-red-600">
            {error || "No applicable plans found for your account type."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] font-bold text-primary mb-4">
            Flexible Plans For Everyone
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Pick the plan that works best for you. Cancel anytime.
          </p>

          {/* Toggle Button */}
          <div className="inline-flex bg-gray-100 rounded-full shadow-sm p-1 transition-all duration-300">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200
                ${
                  !isYearly
                    ? "bg-primary text-white shadow-md scale-105"
                    : "text-gray-600 hover:text-gray-800"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200
                ${
                  isYearly
                    ? "bg-primary text-white shadow-md scale-105"
                    : "text-gray-600 hover:text-gray-800"
                }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 max-w-5xl mx-auto">
          {filteredPlans.map((plan) => {
            const price = getPriceForInterval(plan.prices);
            const savings = isYearly ? calculateSavings(plan.prices) : null;

            // UI Title Mapping
            const titleMap: Record<string, string> = {
              "Micro-Influencer": "I'm a Micro-Influencer",
              Businesses: "I'm a Brand",
              Both: "I'm Both",
            };

            return (
              <div
                key={plan.product_id}
                className="bg-[#f6f8fa] rounded-2xl shadow-lg border border-gray-200 overflow-hidden 
                hover:border-primary hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-2 
                transition-all duration-300 flex flex-col"
              >
                <div className="p-8 text-center flex flex-col flex-grow">
                  {/* Plan Name */}
                  <h3 className="md:text-[26px] text-[22px] font-semibold text-primary mb-8 min-h-[70px] flex items-center justify-center">
                    {titleMap[plan.name] || plan.name}
                  </h3>

                  {/* Price Display */}
                  <div className="mb-6 min-h-[90px] flex items-end justify-center">
                    <span className="md:text-[64px] text-3xl font-semibold text-primary leading-none">
                      ${price?.amount?.toFixed(0) || 0}
                    </span>
                    <span className="text-[28px] text-primary font-semibold ml-1 leading-none">
                      /{isYearly ? "Year" : "month"}
                    </span>
                  </div>

                  {/* Savings Badge */}
                  <div className="mb-4 min-h-[24px]">
                    {savings && (
                      <span className="text-red-500 font-semibold text-xl">
                        {savings}
                      </span>
                    )}
                    {/* Hardcoded extra discount logic for 'Both' plan if needed */}
                    {!isYearly && plan.name === "Both" && (
                      <span className="text-red-500 font-semibold text-xl">
                        Save 15%
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-primary text-[18px] mb-8 leading-relaxed flex-grow px-4">
                    {plan.description}
                  </p>

                  {/* Checkout Button */}
                  <button
                    className={`w-full cursor-pointer text-white font-semibold py-4 rounded-lg transition-colors duration-200
                      ${
                        plan.name === planName
                          ? "bg-secondary text-primary"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    onClick={() => handleCheckout(price.price_id)}
                  >
                    {plan.name === planName ? "Current Plan" : "Select Plan"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}