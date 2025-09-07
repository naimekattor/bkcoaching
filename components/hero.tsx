import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#ffffff] to-[#E9F4FF]">
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8 flex-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl  font-bold text-primary leading-tight">
                Micro-influencers.{" "}
                <span className="text-primary">Mega results.</span>
              </h1>
              <p className="text-xl  text-primary font-normal">
                Real People. Real Influence. Real Growth
              </p>
            </div>

            <button className="bg-secondary hover:bg-yellow-500 text-primary font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg">
              Sign up for free
            </button>

            <div className="flex items-center gap-2 text-[16px] text-primary">
              <span className="text-red-500">♥</span>
              <span>Free for the first 100 users - &quot;Get in early!&quot;</span>
            </div>

            <p className="text-primary text-[16px] leading-relaxed max-w-lg">
              The Social Market is where brands and micro-influencers team up.
              Brands get affordable, authentic marketing. Micro-influencers get
              paid to share services. They actually love. It&apos;s word-of-mouth,
              made smarter, faster, and scalable.
            </p>
          </div>

          {/* Right Image (1/3) */}
          <div className="relative">
            <Image
              width={365}
              height={393}
              src={"/images/hero-img.png"}
              alt="Two stylish women representing micro-influencers"
              className="w-full h-auto max-w-md mx-auto lg:max-w-full"
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;
