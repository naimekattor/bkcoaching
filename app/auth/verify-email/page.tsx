"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== 4) {
      setError("Please enter the complete verification code");
      return;
    }

    // Handle verification - redirect to success page
    window.location.href = "/auth/success";
  };

  const handleResendCode = () => {
    // Handle resend code logic
    console.log("Resending verification code...");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Form */}
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

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Verify Your Email
              </h1>
              <p className="text-slate-300 mb-1">
                Enter The 4 Digit Code Sent To
              </p>
              <p className="text-slate-300">creativeitem@gmail.com</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-4">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                ))}
                <Button
                  type="button"
                  onClick={handleResendCode}
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-semibold px-4 py-2 rounded-lg text-sm"
                >
                  Resend
                </Button>
              </div>

              {error && (
                <p className="text-red-400 text-center text-sm">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-semibold py-3 rounded-lg"
              >
                Verify
              </Button>

              <div className="text-center">
                <Button
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                  asChild
                >
                  <Link href="/auth/login">← Back to Log in</Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-100 items-center justify-center p-8">
        <div className="max-w-md">
          <img
            src="/person-with-phone-showing-verification-code-interf.jpg"
            alt="Email verification illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
