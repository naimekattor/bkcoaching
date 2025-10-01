"use client";
import Image from "next/image";
import { useState } from "react";
export default function AboutPage() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Feedback submitted: ${feedback}`);
    setFeedback("");
    setIsFeedbackOpen(false);
  };

  return (
    <div className="">
      {/* First Section */}
      <section className="bg-gradient-to-b from-[#ffffff] to-[#E9F4FF]">
        <main className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="space-y-8 pb-8 pt-36">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                  The Social Market Backstory
                </h1>
              </div>

              <p className="text-primary text-[16px] leading-relaxed ">
                I had all these events and programs I wanted to share with the
                world, but every time I looked into advertising, it felt like
                the only option was spending a fortune on big influencers. That
                didn’t sit right with me—I wanted authentic growth that was
                affordable. The kind that comes from people who I feel aligned
                with, who repost and share because they care about what I’m
                doing, not only because they’re paid to say it.
              </p>
              <p className="text-primary text-[16px] leading-relaxed ">
                Then, randomly, I saw my friend—a health coach—posting about
                these adorable pajamas her girls were wearing. They were
                probably gifted, and it hit me: Wait. This is it. Maybe we don’t
                need giant influencers. Maybe we can help each other.
              </p>
              <p className="text-primary text-[16px] leading-relaxed ">
                That’s when the idea for{" "}
                <span className="font-semibold text-[16px]">
                  The Social Market.
                </span>{" "}
                started forming. A space where brands and micro-influencers can
                easily find each other, collaborate, and grow—organically and
                Welcome to{" "}
                <span className="font-semibold text-[16px]">
                  The Social Market.
                </span>{" "}
                It’s good to see you here 😉
              </p>

              {/* Feedback Button under paragraph */}
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="mt-4 bg-secondary text-primary font-semibold px-6 py-3 rounded hover:bg-secondary/80 transition"
              >
                Share Your Feedback
              </button>
            </div>

            {/* Right Image */}
            <div className="relative">
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

      {/* Second Section */}
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:col-span-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-primary leading-tight">
              Start Earning by Joining The Social Market
            </h1>

            <div className="space-y-6 text-[20px] text-primary leading-relaxed">
              <p>
                At The Social Market, we connect brands and micro-influencers to
                create authentic growth. Whether you&apos;re a brand looking to
                expand your reach or a micro-influencer wanting to monetize your
                influence, our platform makes it easy.
              </p>

              <p>
                Brands share their products, and micro-influencers share their
                passion—it&apos;s that simple. By working together, everyone
                grows.
              </p>
            </div>

            {/* <div className="pt-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-6">
                Grow Smarter, Not Harder.
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  From affordable campaigns to real, trusted recommendations, we
                  help brands boost sales while micro-influencers get rewarded
                  for their genuine influence.
                </p>

                <p>
                  With our easy-to-use platform, building meaningful connections
                  has never been simpler. And for brands, the results speak for
                  themselves—higher engagement, better conversions, and more
                  growth.
                </p>
              </div>
            </div> */}
          </div>

          {/* Right Images */}
          <div className="relative">
            <div className="grid grid-cols-2">
              <div className="space-y-4">
                <div className="border-white border-6 bg-white shadow-2xl rounded-full overflow-hidden h-full">
                  <Image
                    width={500}
                    height={800}
                    src="/images/about-img3.jpg"
                    alt="Professional working"
                    className="w-full h-full object-cover"
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
                <div className="border-white border-6 bg-white shadow-2xl rounded-full relative -mt-20 z-10 overflow-hidden w-fit">
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
      </main>

      {/* Feedback Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary w-full max-w-md p-6 rounded-xl shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsFeedbackOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-200"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Share Your Feedback
            </h2>

            <form
              onSubmit={handleFeedbackSubmit}
              className="flex flex-col gap-4"
            >
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded resize-none"
                rows={5}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFeedbackOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
