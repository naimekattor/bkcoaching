"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <footer className=" ">
      {/* CTA Section */}
      {pathName !== "/influencer-onboarding" &&
        pathName !== "/brand-onboarding" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
              Ready to grow smarter?
            </h2>

            <Link
              href="/auth/signup"
              className="inline-block bg-secondary hover:bg-yellow-600 text-primary font-semibold px-8 py-3 rounded-lg transition-colors duration-200 mb-4"
            >
              Sign Up Free Today
            </Link>

            <p className="text-sm text-gray-600 italic">
              Free for the first 100 users - claim your spot now
            </p>
          </div>
        )}

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
