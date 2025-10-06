"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function Footer() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  //console.log(pathName);
  const handleSignupRoute = () => {
    setShowAuthModal(true);
  };

  return (
    <footer className=" ">
      {/* CTA Section */}
      {pathName !== "/influencer-onboarding" &&
        pathName !== "/brand-onboarding" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
              Ready to grow smarter?
            </h2>

            <button
              onClick={handleSignupRoute}
              className="inline-block bg-secondary hover:bg-[var(--secondaryhover)] text-primary font-semibold px-8 py-3 rounded-lg transition-colors duration-200 mb-4"
            >
              Sign Up Free Today
            </button>

            <p className="text-sm text-gray-600 italic">
              Free for the first 100 users
            </p>
          </div>
        )}

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

      {/* Navigation Links */}
      <div className=" py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>

            <Link
              href="/brands"
              className="hover:text-gray-900 transition-colors"
            >
              For Brands
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>

            <Link
              href="/influencers"
              className="hover:text-gray-900 transition-colors"
            >
              For Micro-Influencers
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>

            <Link
              href="/about"
              className="hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>

            <Link
              href="/help"
              className="hover:text-gray-900 transition-colors"
            >
              Help
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>

            <Link
              href="/terms"
              className="hover:text-gray-900 transition-colors"
            >
              Terms
            </Link>
            <span className="text-gray-400 hidden sm:inline">|</span>

            <Link
              href="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
