"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function DashboardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status: sessionStatus } = useSession(); 
  
  const [error, setError] = useState<string | null>(null);
  const [statusParam, setStatusParam] = useState<string | null>(null);

  useEffect(() => {
    const s = searchParams.get("status");
    if (s) setStatusParam(s);
  }, [searchParams]);

  useEffect(() => {
    const checkUserProfile = async () => {
      // 1. Resolve the token (Session has priority, fallback to LocalStorage)
      // We access localStorage inside useEffect to avoid Next.js hydration mismatch
      const localToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;
      const effectiveToken = session?.accessToken || localToken;
      console.log(session?.accessToken);
      console.log(localToken);
      
      

      // 2. Handle Loading State
      // If we don't have a token yet AND the session is still loading, wait.
      // If we DO have a localToken, we proceed immediately without waiting for session.
      if (!effectiveToken && sessionStatus === "loading") {
        return; 
      }
      
      // 3. Handle Unauthenticated State
      if (!effectiveToken) {
        console.log("No session or local token found");
        setError("Please log in to continue.");
        return;
      }

      console.log("Token found, fetching profile...");

      try {
        const res = await apiClient("user_service/get_user_info/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${effectiveToken}`,
          },
        });

        if (!res || !res.data) {
          throw new Error("Invalid API response");
        }

        const userData = res?.data; 

        console.log("User Data Received:", userData);

        // const hasBrandProfile = userData.signed_up_as === "brand";
        // const hasInfluencerProfile = userData.signed_up_as === "influencer";
        const role = userData.signed_up_as;

        let redirectPath = "/influencer-dashboard";
        
         if (role === "brand") {
          redirectPath = "/brand-dashboard";
        } 
        else if (role === "influencer") {
          // This block will execute for your specific API response
          redirectPath = "/influencer-dashboard";
        } 

        if (statusParam === "success") {
          router.replace(`${redirectPath}?status=success`);
        } else {
          router.replace(redirectPath);
        }
      } catch (error: unknown) {
        console.error("Profile check failed:", error);
        // Optional: If API fails with 401, clear local storage
        // localStorage.removeItem("access_token"); 
        setError("Could not retrieve your profile. Please try logging in again.");
      }
    };

    checkUserProfile();
  }, [session, sessionStatus, router, statusParam]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      {error ? (
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link
            href="/auth/login"
            className="text-white bg-primary px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 text-gray-600">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <span className="text-xl font-medium">Loading your dashboard...</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin"/></div>}>
      <DashboardPageContent />
    </Suspense>
  );
}