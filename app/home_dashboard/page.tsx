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
      // 1. Wait for session to finish loading
      if (sessionStatus === "loading") {
        console.log("⏳ Waiting for session to load...");
        return;
      }

      // 2. Get token - prioritize session token over localStorage
      const sessionToken = session?.accessToken;
      const localToken = typeof window !== "undefined" 
        ? localStorage.getItem("access_token") 
        : null;

      console.log("🔍 Token check:", {
        sessionStatus,
        hasSessionToken: !!sessionToken,
        hasLocalToken: !!localToken,
      });

      // 3. If session has token but localStorage doesn't, wait for AuthSessionSync
      if (sessionToken && !localToken) {
        console.log("⏳ Session token exists but not in localStorage yet. Waiting for AuthSessionSync...");
        
        // Poll localStorage for up to 3 seconds
        let attempts = 0;
        const maxAttempts = 30; // 30 * 100ms = 3 seconds
        
        const pollForToken = () => {
          const token = localStorage.getItem("access_token");
          if (token) {
            console.log("✅ Token synced to localStorage!");
            // Trigger re-run of this effect
            checkUserProfile();
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(pollForToken, 100);
          } else {
            console.log("⚠️ Timeout waiting for token sync, using session token directly");
            // Continue with session token
            proceedWithToken(sessionToken);
          }
        };
        
        pollForToken();
        return;
      }

      const effectiveToken = sessionToken ?? localToken;

      // 4. Handle unauthenticated state
      if (!effectiveToken) {
        console.log("❌ No session or local token found");
        setError("Please log in to continue.");
        return;
      }

      await proceedWithToken(effectiveToken);
    };

    const proceedWithToken = async (token: string) => {
      console.log("✅ Token found, fetching profile...");

      try {
        const res = await apiClient("user_service/get_user_info/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res || !res.data) {
          throw new Error("Invalid API response");
        }

        const userData = res?.data; 

        console.log("👤 User Data Received:", userData);

        const role = userData.signed_up_as;

        let redirectPath = "/influencer-dashboard";
        
        if (role === "brand") {
          redirectPath = "/brand-dashboard";
        } 
        else if (role === "influencer") {
          redirectPath = "/influencer-dashboard";
        } 

        if (statusParam === "success") {
          router.replace(`${redirectPath}?status=success`);
        } else {
          router.replace(redirectPath);
        }
      } catch (error: unknown) {
        console.error("❌ Profile check failed:", error);
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
            className="text-white bg-primary px-4 py-2 rounded cursor-pointer transition"
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