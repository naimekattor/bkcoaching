"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Typewriter from "./Typewriter";

const Hero = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const handleSignupRoute = () => {
    setShowAuthModal(true);
  };
  return (
    <section className="bg-gradient-to-b from-[#ffffff] to-[#E9F4FF]">
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8 flex-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl  font-bold text-primary leading-tight">
                <Typewriter
                  words={["Micro-influencers", "Brands"]}
                  speed={80}
                  pause={2000}
                />{" "}
                <span className="text-primary">Mega results.</span>
              </h1>
              <p className="text-xl  text-primary font-normal">
                Real People. Real Influence. Real Growth
              </p>
            </div>

            <button
              className="bg-secondary hover:bg-yellow-500 text-primary font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
              onClick={handleSignupRoute}
            >
              Sign up for free
            </button>

            {/* <div className="flex items-center gap-2 text-[16px] text-primary">
              <span className="text-red-500">♥</span>
              <span>
                Free for the first 100 users - &quot;Get in early!&quot;
              </span>
            </div> */}

            <p className="text-primary text-[16px] leading-relaxed max-w-lg">
              <span className="font-bold text-[22px]">
                The Social Market is where brands and micro-influencers team up.
              </span>{" "}
              Brands get affordable, authentic marketing. Micro-influencers get
              paid to share services they actually love.
              <span className="font-bold text-[22px]">
                {" "}
                It&apos;s word-of-mouth, made smarter, faster, and scalable.
              </span>
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
      {/* Auth Required Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Join The Social Market</DialogTitle>
            <DialogDescription>
              Choose your role to continue. You can always switch later if
              needed.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={() => {
                router.push("/influencer-onboarding");
                setShowAuthModal(false);
              }}
            >
              Sign up as Influencer
            </Button>
            <Button
              onClick={() => {
                router.push("/brand-onboarding");
                setShowAuthModal(false);
              }}
            >
              Sign up as Brand
            </Button>
          </div>

          <div className="flex justify-center pt-4 text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/auth/login")}
                className="text-primary hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
