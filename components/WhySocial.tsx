import Image from "next/image";
import React from "react";

const WhySocial = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-[40px] text-primary mb-8">
        Why The Social Market?
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-start space-y-12 sm:space-y-0 sm:space-x-12">
        {/* Affordable Section */}
        <div className="flex flex-col items-center max-w-sm text-center">
          <div className=" inline-flex items-center justify-center mb-6">
            <Image
              src="/images/why-icon3.png"
              width={76}
              height={76}
              alt="Affordable"
              className="w-[76px] h-[76px]"
            />
          </div>
          <h3 className="text-3xl font-semibold text-primary mb-2">
            Affordable
          </h3>
          <p className="text-primary text-[24px] w-3/4">
            Lower cost than traditional ads
          </p>
        </div>

        {/* Authentic Section */}
        <div className="flex flex-col items-center max-w-sm text-center">
          <div className=" inline-flex items-center justify-center mb-6">
            <Image
              src="/images/why-icon2.png"
              width={76}
              height={76}
              alt="Authentic"
              className="w-[76px] h-[76px]"
            />
          </div>
          <h3 className="text-3xl font-semibold text-primary mb-2">
            Authentic
          </h3>
          <p className="text-primary text-[24px] w-3/4">
            Recommendations that people actually trust
          </p>
        </div>

        {/* Effective Section */}
        <div className="flex flex-col items-center max-w-sm text-center">
          <div className=" rounded-full inline-flex items-center justify-center mb-6">
            <Image
              src="/images/why-icon1.png"
              width={76}
              height={76}
              alt="Effective"
              className="w-[90px] h-[77px]"
            />
          </div>
          <h3 className="text-3xl font-semibold text-primary mb-2">
            Effective
          </h3>
          <p className="text-primary text-[24px] w-3/4">
            More engagement, more conversions, more results
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhySocial;
