import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Personalized Hair Profile",
      description:
        "Quickly identify your hair's unique characteristics, including curl pattern, porosity, density, thickness, and scalp condition. Type4 Pal's comprehensive quiz takes the guesswork out of hair care.",
    },
    {
      id: 2,
      title: " AI-Driven Recommendations",
      description:
        "Powered by advanced AI, Type4 Pal recommends hair products uniquely suited to your hair’s specific needs and environmental factors. No more guessing, get effective products matched to your exact hair profile.",
    },
    {
      id: 3,
      title: "Smart Routine Builder",
      description:
        "Create, schedule, and stick to personalized hair care routines with ease. Type4 Pal helps you never skip a step, ensuring consistent hair health improvements through daily, weekly, and monthly reminders.",
    },
    {
      id: 4,
      title: "Hair Health Dashboard",
      description:
        "Visually monitor your hair’s progress with the comprehensive hair-health dashboard. Track length, elasticity, strength, scalp health, and more! Celebrate your growth and identify areas for improvement.",
    },
  ];

  return (
    <section id="HowItWorks" className="relative ">
      <div className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#004D40]">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Left side boxes */}
          <div className="">
            <div className="flex items-center gap-2 bg-primary">
              <Image
                src={"/images/work-icon1.png"}
                width={56}
                height={32}
                alt="work icon"
              />
              <h2 className="text-[25px] font-medium text-accent">
                Businessess
              </h2>
            </div>
            <span className="text-[19px] text-[#838689]">
               Run authentic campaigns that build trust and drive sales.
            </span>
            <Button>Text Here</Button>
          </div>

          {/* Center image */}
          <div className="flex justify-center">
            <img
              src="/images/work-img.png"
              alt="How it works illustration"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Right side boxes */}
          <div className="">
            <div className="bg-orange-50 rounded-xl shadow-md p-6 text-left">
              <h3 className="text-xl font-bold text-[#FF6F61] mb-2">
                Smart Routine Builder
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Visually monitor your hair’s progress with the comprehensive
                hair-health dashboard. Track length, elasticity, strength, scalp
                health, and more! Celebrate your growth and identify areas for
                improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
