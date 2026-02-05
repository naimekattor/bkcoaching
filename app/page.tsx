// import FAQSection from "@/components/FAQSection";
import Feature from "@/components/Feature";
import GlobalSection from "@/components/GlobalSection";
import Hero from "@/components/hero";
import HowItWorks from "@/components/HowItWorks";
import { PricingSection } from "@/components/pricing-section";
import WhySocial from "@/components/WhySocial";
import React from "react";
export const revalidate = 60; 

async function getPlans() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}subscription_service/get_subscription_plans/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}
const page = async() => {
  const data = await getPlans();
  console.log(data);
  
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhySocial />
      <Feature />
      <PricingSection initialData={data} planName="Your Plan"/>
      <GlobalSection />
      {/* <FAQSection /> */}
    </div>
  );
};

export default page;
