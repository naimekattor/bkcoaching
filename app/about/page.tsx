import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="">
      <section className="bg-gradient-to-b from-[#ffffff] to-[#E9F4FF]">
        <main className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2  items-center">
            {/* Left Content */}
            <div className=" space-y-8 flex-1">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl  font-bold text-primary leading-tight">
                  Empowering Brands and Influencers to{" "}
                  <span className="text-primary">Grow Together</span>
                </h1>
              </div>

              <p className="text-primary text-[16px] leading-relaxed max-w-lg">
                This headline speaks to the essence of your platform,
                emphasizing the collaborative nature.
              </p>
            </div>

            {/* Right Image (1/3) */}
            <div className="relative  ">
              <Image
                width={833}
                height={519}
                src={"/images/about-hero.png"}
                alt="Two stylish women representing micro-influencers"
                className="w-[833px] h-[619px] max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </main>
      </section>
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="container  mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-primary leading-tight">
                Start Earning by Joining The Social Market
              </h1>

              <div className="space-y-6 text-[20px] text-primary leading-relaxed">
                <p>
                  At The Social Market, we connect brands and micro-influencers
                  to create authentic growth. Whether you're a brand looking to
                  expand your reach or a micro-influencer wanting to monetize
                  your influence, our platform makes it easy.
                </p>

                <p>
                  Brands share their products, and micro-influencers share their
                  passion—it&apos;s that simple. By working together, everyone grows.
                </p>
              </div>

              <div className="pt-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">
                  Grow Smarter, Not Harder.
                </h2>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    From affordable campaigns to real, trusted recommendations,
                    we help brands boost sales while micro-influencers get
                    rewarded for their genuine influence.
                  </p>

                  <p>
                    With our easy-to-use platform, building meaningful
                    connections has never been simpler. And for brands, the
                    results speak for themselves—higher engagement, better
                    conversions, and more growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="relative">
              <div className="grid grid-cols-2 ">
                <div className="space-y-4">
                  <div className="border-white border-6 bg-white shadow-2xl rounded-full overflow-hidden">
                    <Image
                      width={500}
                      height={800}
                      src="/images/about-img3.jpg"
                      alt="Professional working"
                      className="w-[375px] h-[550px] object-cover"
                    />
                  </div>
                </div>
                <div className="relative -ml-15 space-y-4 pt-8 z-20">
                  <div className="border-white border-6 bg-white shadow-2xl rounded-full overflow-hidden w-fit">
                    <Image
                      src="/images/about-img2.jpg"
                      alt="Content creation"
                      width={162}
                      height={262}
                      style={{ width: "162px", height: "260px" }}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="border-white border-6 bg-white shadow-2xl rounded-full relative -mt-20 z-10  overflow-hidden w-fit">
                    <Image
                      src="/images/about-img1.jpg"
                      alt="Content creation"
                      width={162}
                      height={262}
                      style={{ width: "162px", height: "260px" }}
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
