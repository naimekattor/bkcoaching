"use client";

import { useState } from "react";

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const yearlyPlans = [
    {
      title: "I'm a Micro-Influencer",
      price: 100,
      description: "Ideal for influencers no matter your audience size. ",
      savings: "",
    },
    {
      title: "I'm a Brand",
      price: 100,
      description: "Perfect for Growing Businesses",
      savings: "",
    },
    {
      title: "I'm Both",
      price: 180,
      description:
        "Bundle Both and Save: Perfect for anyone growing their own business and also open to helping others grow (and getting paid!)",
      savings: "Save over 15%",
    },
  ];

  const monthlyPlans = [
    {
      title: "I'm a Micro-Influencer",
      price: 12,
      description: "Ideal for influencers no matter your audience size. ",
    },
    {
      title: "I'm a Brand",
      price: 12,
      description: "Perfect for Growing Businesses",
    },
    {
      title: "I'm Both",
      price: 20,
      description:
        "Bundle Both and Save: Perfect for anyone growing their own business and also open to helping others grow (and getting paid!)",
      savings: "Save over 15%",
    },
  ];

  const currentPlans = isYearly ? yearlyPlans : monthlyPlans;

  return (
    <section className="py-16 lg:py-24 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] font-bold text-primary mb-4">
            Flexible Plans For Everyone
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Pick The Plan That Works Best For You. Cancel Anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex bg-gray-200 rounded-lg ">
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
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-[#f6f8fa] rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8 text-center flex flex-col h-full justify-between">
                <h3 className="text-[40px] font-semibold text-primary mb-8">
                  {plan.title}
                </h3>

                <div className="mb-6">
                  <span className="md:text-[64px] text-3xl font-semibold text-primary">
                    ${plan.price}
                  </span>
                  <span className="text-[28px] text-primary font-semibold ml-1">
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

                <p className="text-primary text-[24px] mb-8 leading-relaxed">
                  {plan.description}
                </p>

                <button className="w-full bg-primary hover:bg-slate-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200">
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
