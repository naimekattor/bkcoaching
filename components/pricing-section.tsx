"use client";

import { useState } from "react";

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const yearlyPlans = [
    {
      title: "I'm a Micro-Influencer",
      price: 100,
      description: "Ideal for individual Micro-Influencer",
    },
    {
      title: "I'm a Brand",
      price: 100,
      description: "Perfect for small businesses",
    },
    {
      title: "I'm Both",
      price: 180,
      description: "Bundle of both plans",
      savings: "Save 20%",
    },
  ];

  const monthlyPlans = [
    {
      title: "I'm a Micro-Influencer",
      price: 12,
      description: "Ideal for individual Micro-Influencer",
    },
    {
      title: "I'm a Brand",
      price: 12,
      description: "Perfect for small businesses",
    },
    {
      title: "I'm Both",
      price: 20,
      description: "Bundle of both plans",
      savings: "Save 20%",
    },
  ];

  const currentPlans = isYearly ? yearlyPlans : monthlyPlans;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Flexible Plans For Everyone
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Pick The Plan That Works Best For You. Cancel Anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                !isYearly
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                isYearly
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-8">
                  {plan.title}
                </h3>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-800">
                    ${plan.price}
                  </span>
                  <span className="text-lg text-gray-600 ml-1">
                    /{isYearly ? "Year" : "month"}
                  </span>
                </div>

                {plan.savings && (
                  <div className="mb-4">
                    <span className="text-red-500 font-semibold text-sm">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {plan.description}
                </p>

                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
