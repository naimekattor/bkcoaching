"use client";
import React from "react";
import Header from "./header";
import { usePathname } from "next/navigation";
import Footer from "./footer";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  // client-side pathname to detect nested auth routes
  const pathname = usePathname() || "";

  // hide the root Header for any route under /auth
  const hiddenRoutes = ["/auth", "/brand-dashboard", "/influencer-dashboard"];
  const isHiddenRoute = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <div>
      {!isHiddenRoute && <Header />}
      {children}
      {!isHiddenRoute && <Footer />}
    </div>
  );
};

export default LayoutContent;
