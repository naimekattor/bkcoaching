"use client";
import React from "react";
import Header from "./header";
import { usePathname } from "next/navigation";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  // client-side pathname to detect nested auth routes
  const pathname = usePathname() || "";

  // hide the root Header for any route under /auth
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <div>
      {!isAuthRoute && <Header />}
      {children}
    </div>
  );
};

export default LayoutContent;
