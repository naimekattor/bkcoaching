"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { apiClient } from "@/lib/apiClient";
import { Loader2 } from "lucide-react"; // A nice loading spinner icon
import Link from "next/link";
import { useSession } from "next-auth/react";
import { setAuthFromResponse } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const params = useSearchParams();

  const searchParams = useSearchParams();
  const token = useAuthStore((state) => state.token);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { data: session } = useSession();
  const returnTo = params.get("returnTo");

  console.log(session, returnTo);

  console.log(token);
  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (statusParam) setStatus(statusParam);
  }, [searchParams]);

  useEffect(() => {
    const handleGoogleAuth = async () => {
      if (!session) return;

      const payload = {
        first_name: session.user?.name?.split(" ")[0] || "",
        last_name: session.user?.name?.split(" ")[1] || "",
        email: session.user?.email,
        password: "google_auth",
        signup_method: "google",
        signed_up_as: "brand", // or dynamic
      };

      try {
        const res = await apiClient(`user_service/signup/`, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        console.log(res);

        setAuthFromResponse(res);
        if (returnTo) {
          router.push(returnTo);
        }
      } catch (err: any) {
        if (err?.status === 400) {
          const loginRes = await apiClient(`user_service/login/`, {
            method: "POST",

            body: JSON.stringify({
              email: payload.email,
              password: "google_auth",
            }),
          });

          console.log(loginRes);

          setAuthFromResponse(loginRes);
          if (returnTo) {
            router.push(returnTo);
          }
        } else {
          console.error("Google Auth failed", err);
        }
      }
    };

    handleGoogleAuth();
  }, [session]);

  useEffect(() => {
    // This function will run once the token is available in the Zustand store.
    const checkUserProfile = async () => {
      console.log("Token found, checking user profile...");
      try {
        const userInfo = await apiClient("user_service/get_user_info/", {
          auth: true, // This will use the token from Zustand/localStorage
          method: "GET",
        });

        if (!userInfo?.data) {
          throw new Error("Failed to load user information.");
        }

        const userData = userInfo.data;

        const hasBrandProfile =
          userData.brand_profile?.business_name != null &&
          userData.brand_profile.business_name !== "null";

        const hasInfluencerProfile =
          userData.influencer_profile?.display_name != null &&
          userData.influencer_profile.display_name !== "null";

        let redirectPath = "/influencer-dashboard";
        if (hasBrandProfile && !hasInfluencerProfile) {
          redirectPath = "/brand-dashboard";
        }

        if (status === "success") {
          router.replace(`${redirectPath}?status=success`);
        } else {
          router.replace(redirectPath);
        }
      } catch (err: any) {
        console.error("Profile check failed:", err);
        setError(
          "Could not retrieve your profile. Please try logging in again."
        );
      }
    };

    if (token) {
      checkUserProfile();
    }
  }, [token, router, status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      {error ? (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline mt-4"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-xl">Loading your dashboard...</span>
        </div>
      )}
    </div>
  );
}
