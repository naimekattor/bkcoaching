import Image from "next/image";
import Link from "next/link";
import React from "react";
// Removed unused Button import

const HowItWorks = () => {
  // Removed unused steps to satisfy lint rules
  // const steps = [
  //   {
  //     id: 1,
  //     title: "Personalized Hair Profile",
  //     description:
  //       "Quickly identify your hair's unique characteristics, including curl pattern, porosity, density, thickness, and scalp condition. Type4 Pal's comprehensive quiz takes the guesswork out of hair care.",
  //   },
  //   {
  //     id: 2,
  //     title: " AI-Driven Recommendations",
  //     description:
  //       "Powered by advanced AI, Type4 Pal recommends hair products uniquely suited to your hair’s specific needs and environmental factors. No more guessing, get effective products matched to your exact hair profile.",
  //   },
  //   {
  //     id: 3,
  //     title: "Smart Routine Builder",
  //     description:
  //       "Create, schedule, and stick to personalized hair care routines with ease. Type4 Pal helps you never skip a step, ensuring consistent hair health improvements through daily, weekly, and monthly reminders.",
  //   },
  //   {
  //     id: 4,
  //     title: "Hair Health Dashboard",
  //     description:
  //       "Visually monitor your hair’s progress with the comprehensive hair-health dashboard. Track length, elasticity, strength, scalp health, and more! Celebrate your growth and identify areas for improvement.",
  //   },
  // ];

  return (
    <section id="HowItWorks" className="relative ">
      <div className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Left side boxes */}
          <div className="">
            <div className="bg-white rounded shadow-md  text-left">
              <div className="flex gap-4 items-center justify-center bg-primary py-2 px-2 rounded">
                <Image
                  src={"/images/work-icon1.png"}
                  width={62}
                  height={41}
                  alt="icon"
                />
                <h3 className="text-xl font-bold text-[#ffffff] mb-2">
                  Businessess
                </h3>
              </div>
              <div className="px-6 pb-6">
                <p className="text-[#838689] text-sm md:text-[19px] text-center px-4 py-6">
                   Run authentic campaigns that build trust and drive sales.
                </p>

                <button className="bg-secondary w-full py-2 font-[600] text-[16px] text-primary rounded cursor-pointer">
                 <Link  href={'/auth/signup'}> Start Here</Link>  
                </button>
              </div>
            </div>
          </div>

          {/* Center image */}
          <div className="flex justify-center">
            <Image
              src="/images/work-img.png"
              alt="How it works illustration"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Right side boxes */}
          <div className="">
            <div className="bg-white rounded shadow-md  text-left">
              <div className="flex gap-4 items-center justify-center bg-primary py-2 px-2 rounded">
                <Image
                  src={"/images/work-icon2.png"}
                  width={62}
                  height={41}
                  alt="icon"
                />
                <h3 className="text-xl font-bold text-[#ffffff] mb-2">
                  Micro- Influencers
                </h3>
              </div>
              <div className="px-6 pb-6">
                <p className="text-[#838689] text-sm md:text-[19px] text-center px-4 py-6">
                  Monetize your influence by sharing products you love.
                </p>

                <button className="bg-secondary w-full py-2 font-[600] text-[16px] text-primary rounded cursor-pointer">
                 <Link  href={'/auth/signup'}>  Start Here</Link> 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
