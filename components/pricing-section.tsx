"use client";

import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { SkeletonCard } from "./SkeletoCard";

interface Price {
  price_id: string;
  amount: number;
  currency: string;
  interval: "month" | "year";
}

interface Plan {
  product_id: string;
  name: string;
  description: string;
  prices: Price[];
}

interface ApiResponse {
  status: string;
  code: number;
  data: Plan[];
  error: Record<string, unknown>;
  meta: { timestamp: string };
}

export function PricingSection({ planName,initialData }: {initialData?: ApiResponse; planName: string }) {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>(initialData?.data || []);
  console.log(initialData);
  
  useEffect(() => {
    if (initialData?.data && initialData.data.length > 0) {
      setPlans(initialData.data);
      setLoading(false);
    }
  }, [initialData]);
  const getPriceForInterval = (prices: Price[]) => {
    return (
      prices.find((p) => p.interval === (isYearly ? "year" : "month")) ||
      prices[0]
    );
  };

  // Helper to calculate savings
  const calculateSavings = (prices: Price[]) => {
    const monthly = prices.find((p) => p.interval === "month");
    const yearly = prices.find((p) => p.interval === "year");
    if (!monthly || !yearly) return null;

    const monthlyTotal = monthly.amount * 12;
    const savings = ((monthlyTotal - yearly.amount) / monthlyTotal) * 100;
    return savings > 0 ? `Save ${savings.toFixed(0)}%` : null;
  };

  if (loading) {
    return (
      <section className="px-4 py-16 lg:py-[100px] container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error || plans.length === 0) {
    return (
      <section className="px-4 py-16 lg:py-[100px]">
        <div className="mx-auto text-center">
          <p className="text-lg text-red-600">
            {error || "No plans available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  console.log(plans);

  const handleCheckout = async (priceId: string) => {
    try {
      const res = await apiClient(
        "subscription_service/create_checkout_session/",
        {
          auth: true,
          method: "POST",
          body: JSON.stringify({
            price_id: priceId,
          }),
        }
      );
      console.log("Checkout response:", res);

      // TODO: Redirect to Stripe Checkout
      if (res.data) {
        window.location.href = res.data.checkout_url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to create checkout session");
    }
  };

  return (
    <section className="px-4 py-16 lg:py-[100px]">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] font-bold text-primary mb-4">
            Flexible Plans For Everyone
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Pick the plan that works best for you. Cancel anytime.
          </p>

          {/* Toggle */}
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

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const price = getPriceForInterval(plan.prices);
            const savings = isYearly ? calculateSavings(plan.prices) : null;

            // Map API name to display title
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
                  {/* Title */}
                  <h3 className="md:text-[26px] text-[22px] font-semibold text-primary mb-8 min-h-[70px] flex items-center justify-center">
                    {titleMap[plan.name] || plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6 min-h-[90px] flex items-end justify-center">
                    <span className="md:text-[64px] text-3xl font-semibold text-primary leading-none">
                      ${price.amount.toFixed(0)}
                    </span>
                    <span className="text-[28px] text-primary font-semibold ml-1 leading-none">
                      /{isYearly ? "Year" : "month"}
                    </span>
                  </div>

                  {/* Savings */}
                  <div className="mb-4 min-h-[24px]">
                    {savings && (
                      <span className="text-red-500 font-semibold text-xl">
                        {savings}
                      </span>
                    )}
                    {!isYearly && plan.name === "Both" && (
                      <span className="text-red-500 font-semibold text-xl">
                        Save 15%
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-primary text-[18px] mb-8 leading-relaxed flex-grow">
                    {plan.description?.charAt(0).toUpperCase() +
                      plan.description?.slice(1).toLowerCase()}
                  </p>

                  {/* CTA Button */}
                  <button
                    className="w-full bg-primary cursor-pointer text-white font-semibold py-4 rounded-lg transition-colors duration-200 hover:bg-primary/90"
                    onClick={() => handleCheckout(price.price_id)}
                  >
                    {plan.name === planName ? "Selected" : "Select"}
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
