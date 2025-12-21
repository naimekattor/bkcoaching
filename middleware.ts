import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
const nextAuthToken  = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
const cookieToken = request.cookies.get("access_token")?.value;

  const accessToken =
  cookieToken ||
  (typeof nextAuthToken?.backendAccessToken === "string"
    ? nextAuthToken.backendAccessToken
    : null);

console.log("Cookie token:", cookieToken);
console.log("NextAuth backend token:", nextAuthToken?.backendAccessToken);
console.log("Final accessToken:", accessToken);

  console.log("Middleware token:", nextAuthToken);
  if (!accessToken) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}subscription_service/get_user_subscription_information/`;
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      console.error(`Subscription API failed with status: ${res.status}`);
      url.pathname = "/";
  return NextResponse.redirect(url);
    }

    const subRes = await res.json();

    const planName = subRes?.data?.plan_name;
    const isActive = subRes?.data?.status === "active";
    const status =subRes?.status === "failure";

    console.log(`Subscription check - Plan: ${planName}, Active: ${isActive}`);

    /* ---------------- BRAND DASHBOARD ---------------- */
    if (status) {
      url.pathname = "/";
        return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/brand-dashboard")) {
      const hasValidBrandPlan = isActive && (planName === "Businesses" || planName === "Both");

      if (!hasValidBrandPlan  ) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

      
    }

    /* ------------- INFLUENCER DASHBOARD -------------- */
    if (pathname.startsWith("/influencer-dashboard")) {
      
    
      const hasValidInfluencerPlan = isActive && (planName === "Micro-Influencer" || planName === "Both");

      if (!hasValidInfluencerPlan ) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

      
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/brand-dashboard/:path*", "/influencer-dashboard/:path*"],
};