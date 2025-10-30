"use client";

import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Replace with your actual base URL
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await apiClient(
          `subscription_service/get_subscription_plans/`,
          {
            method: "GET",
          }
        );

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        const result: ApiResponse = await response;

        if (result.status === "success" && result.data) {
          // Sort plans: Micro-Influencer -> Businesses -> Both
          const sortedPlans = result.data.sort((a, b) => {
            const order = ["Micro-Influencer", "Businesses", "Both"];
            return order.indexOf(a.name) - order.indexOf(b.name);
          });
          setPlans(sortedPlans);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load plans");
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [baseUrl]);

  // Helper to get price for current interval
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
      <section className="px-4 py-16 lg:py-[100px]">
        <div className="mx-auto text-center">
          <p className="text-lg text-gray-600">Loading plans...</p>
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
            Pick The Plan That Works Best For You. Cancel Anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex bg-gray-200 rounded-lg">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                !isYearly
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                isYearly
                  ? "bg-primary text-white shadow-sm"
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
                className="bg-[#f6f8fa] rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8 text-center flex flex-col h-full justify-between">
                  <h3 className="text-[40px] font-semibold text-primary mb-8">
                    {titleMap[plan.name] || plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className="md:text-[64px] text-3xl font-semibold text-primary">
                      ${price.amount.toFixed(0)}
                    </span>
                    <span className="text-[28px] text-primary font-semibold ml-1">
                      /{isYearly ? "Year" : "month"}
                    </span>
                  </div>

                  {savings && (
                    <div className="mb-4">
                      <span className="text-red-500 font-semibold text-sm">
                        {savings}
                      </span>
                    </div>
                  )}

                  <p className="text-primary text-[24px] mb-8 leading-relaxed">
                    {plan.description}
                  </p>

                  <button
                    className="w-full bg-primary cursor-pointer text-white font-semibold py-4 rounded-lg transition-colors duration-200 hover:bg-primary/90"
                    onClick={() => handleCheckout(price.price_id)}
                  >
                    Select
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
