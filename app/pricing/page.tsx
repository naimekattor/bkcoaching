import { PricingSection } from '@/components/pricing-section'
import React from 'react'
async function getPlans() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}subscription_service/get_subscription_plans/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}
const page = async() => {
    const data = await getPlans();
    
  return (
    <div>
      <PricingSection initialData={data} planName="Your Plan"/>
    </div>
  )
}

export default page
