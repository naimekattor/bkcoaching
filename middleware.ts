// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const token = request.cookies.get("access_token")?.value;

  // 1. No token → login
  if (!token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}subscription_service/get_user_subscription_information/`;
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Subscription fetch failed");

    const subRes = await res.json();

    const planName = subRes?.data?.plan_name;
    const isActive = subRes?.data?.status === "active";

    /* ---------------- BRAND DASHBOARD ---------------- */
    if (pathname.startsWith("/brand-dashboard")) {
      const isSubscriptionPage = pathname === "/brand-dashboard/subscription";

      if (
        !isSubscriptionPage &&
        (!isActive || (planName !== "Businesses" && planName !== "Both"))
      ) {
        url.pathname = "/brand-dashboard/subscription";
        return NextResponse.redirect(url);
      }
    }

    /* ------------- INFLUENCER DASHBOARD -------------- */
    if (pathname.startsWith("/influencer-dashboard")) {
      const isSubscriptionPage =
        pathname === "/influencer-dashboard/subscription";

      if (
        !isSubscriptionPage &&
        (!isActive ||
          (planName !== "Micro-Influencer" && planName !== "Both"))
      ) {
        url.pathname = "/influencer-dashboard/subscription";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/brand-dashboard/:path*", "/influencer-dashboard/:path*"],
};
