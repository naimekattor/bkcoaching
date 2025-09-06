"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Success Message */}
      <div className="w-full lg:w-1/2 bg-slate-800 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
            </div>
            <span className="text-white font-semibold">The Social Market</span>
          </div>
          <Button
            variant="outline"
            className="bg-yellow-500 text-slate-800 border-yellow-500 hover:bg-yellow-600"
            asChild
          >
            <Link href="/">Back to website →</Link>
          </Button>
        </div>

        {/* Success Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                You're In! Let's Grow!
              </h1>
            </div>

            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-semibold py-3 px-8 rounded-lg"
              asChild
            >
              <Link href="/">← Back to</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-100 items-center justify-center p-8">
        <div className="max-w-md">
          <img
            src="/person-celebrating-with-trophy-and-achievement-ico.jpg"
            alt="Success illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
