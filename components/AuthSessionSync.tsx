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
    data: ExtendedSession | null;
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
  //    if (status === "unauthenticated") {
  //   console.log("Clearing Zustand auth state (unauthenticated)");
  //   setToken(null);
  //   setRefreshToken(null);
  //   setUser(null);
  //   return;
  // }
    // Check if the session is authenticated and has the access token
    if (status === "authenticated" && session?.accessToken) {
      // Sync only if the Zustand token is not already set, to avoid loops
      if (session.accessToken !== zustandToken) {
        console.log("Syncing NextAuth session to Zustand store...");
        console.log("Setting token:", session.accessToken?.substring(0, 20) + "...");
        setToken(session.accessToken);

        if (session.refresh_token) {
          setRefreshToken(session.refresh_token);
        }
        if (session.user) {
          setUser(session.user);
        }
      }
    }
  }, [session, status, setToken, setRefreshToken, setUser, zustandToken]);

  // This component doesn't render anything
  return null;
}
