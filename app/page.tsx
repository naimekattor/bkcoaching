// import FAQSection from "@/components/FAQSection";
import Feature from "@/components/Feature";
import GlobalSection from "@/components/GlobalSection";
import Hero from "@/components/hero";
import HowItWorks from "@/components/HowItWorks";
import { PricingSection } from "@/components/pricing-section";
import WhySocial from "@/components/WhySocial";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhySocial />
      <Feature />
      <PricingSection />
      <GlobalSection />
      {/* <FAQSection /> */}
    </div>
  );
};

export default page;
