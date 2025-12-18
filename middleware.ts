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

//   try {
//     const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}subscription_service/get_user_subscription_information/`;
//     const res = await fetch(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) {
//       console.error(`Subscription API failed with status: ${res.status}`);
//       return NextResponse.next();
//     }

//     const subRes = await res.json();

//     const planName = subRes?.data?.plan_name;
//     const isActive = subRes?.data?.status === "active";

//     console.log(`Subscription check - Plan: ${planName}, Active: ${isActive}`);

//     /* ---------------- BRAND DASHBOARD ---------------- */
//     if (pathname.startsWith("/brand-dashboard")) {
//       const isSubscriptionPage = pathname === "/brand-dashboard/subscription";
//       const hasValidBrandPlan = isActive && (planName === "Businesses" || planName === "Both");

//       // If no valid plan and NOT on subscription page → redirect to subscription
//       if (!hasValidBrandPlan ) {
//         url.pathname = "/";
//         return NextResponse.redirect(url);
//       }

//       // If has valid plan but trying to access subscription page → allow it (they can view it)
//       // If no valid plan and on subscription page → allow it
//       return NextResponse.next();
//     }

//     /* ------------- INFLUENCER DASHBOARD -------------- */
//     if (pathname.startsWith("/influencer-dashboard")) {
//       const isSubscriptionPage = pathname === "/influencer-dashboard/subscription";
//       const hasValidInfluencerPlan = isActive && (planName === "Micro-Influencer" || planName === "Both");

//       // If no valid plan and NOT on subscription page → redirect to subscription
//       if (!hasValidInfluencerPlan ) {
//         url.pathname = "/";
//         return NextResponse.redirect(url);
//       }

//       // If has valid plan but trying to access subscription page → allow it (they can view it)
//       // If no valid plan and on subscription page → allow it
//       return NextResponse.next();
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Middleware error:", error);
//     return NextResponse.next();
//   }
}

export const config = {
  matcher: ["/brand-dashboard/:path*", "/influencer-dashboard/:path*"],
};