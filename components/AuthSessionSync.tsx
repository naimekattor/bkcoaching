// components/AuthSessionSync.tsx

"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

// Extend the Session type to include our custom token fields
import type { Session } from "next-auth";
interface ExtendedSession extends Session {
  accessToken?: string;
  refresh_token?: string;
}

export default function AuthSessionSync() {
  const { data: session, status } = useSession() as {
    data: (ExtendedSession & { refreshToken?: string }) | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const {
    setToken,
    setRefreshToken,
    setUser,
    token: zustandToken,
  } = useAuthStore();

  console.log("🔐 AuthSessionSync - Status:", status, "Has accessToken:", !!session?.accessToken);

  useEffect(() => {
    // Sync session to Zustand when authenticated
    if (status === "authenticated" && session?.accessToken) {
      const currentAccessToken = session.accessToken;
      const currentRefreshToken = (session as any).refreshToken || session.refresh_token;

      if (currentAccessToken !== zustandToken) {
        console.log("🔄 Syncing NextAuth session to Zustand store...");
        setToken(currentAccessToken);

        if (currentRefreshToken) {
          console.log("🔄 Syncing Refresh Token...");
          setRefreshToken(currentRefreshToken);
        }

        if (session.user) {
          setUser(session.user);
        }
      }
    }

    // Optional: Clear Zustand if NextAuth is explicitly unauthenticated
    // Only do this if we had a token before and NOT on an auth page
    // This allows manual tokens during signup/verification to persist
    if (status === "unauthenticated" && zustandToken) {
      const isAuthRoute = window.location.pathname.startsWith('/auth');
      if (!isAuthRoute) {
        console.log("⚠️ NextAuth unauthenticated - Clearing Zustand state");
        setToken(null);
        setRefreshToken(null);
        setUser(null);
      } else {
        console.log("ℹ️ NextAuth unauthenticated but on auth route - Preserving local tokens");
      }
    }
  }, [session, status, setToken, setRefreshToken, setUser, zustandToken]);

  // This component doesn't render anything
  return null;
}
