// app/brand-dashboard/layout.js
"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Sidebar } from "../../../components/dashboard/Sidebar";
import { HiMenu, HiX } from "react-icons/hi";
import { brandLinks } from "../../../config/sidebarLinks";
import DashboardTopHeader from "../../../components/dashboard/DashboardTopHeader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function SubscriptionStatusToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success") {
      toast("Subscription completed successfully! 🎉");

      const url = new URL(window.location.href);
      url.searchParams.delete("status");
      router.replace(url.pathname);
    }
  }, [searchParams, router]);

  return null;
}

export default function BrandDashboardLayout({ children }) {
  const [showSideBar, setShowSideBar] = useState(false);
  const sideBarRef = useRef(null);
  const path = usePathname();

  useEffect(() => {
    const clickOutSideSideBar = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setShowSideBar(false);
      }
    };

    if (showSideBar) {
      document.addEventListener("mousedown", clickOutSideSideBar);
    } else {
      document.removeEventListener("mousedown", clickOutSideSideBar);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutSideSideBar);
    };
  }, [showSideBar]);

  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      <Suspense fallback={null}>
        <SubscriptionStatusToast />
      </Suspense>
      {/* Sidebar fixed (desktop) */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow z-10 hidden md:block">
        <Sidebar links={brandLinks} />
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setShowSideBar(!showSideBar)}
        className={`fixed top-5 left-4 z-30 p-2 bg-secondary text-primary rounded-lg shadow-lg md:hidden ${showSideBar ?"left-50":"left-4"}`}
      >
        {showSideBar ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar collapsible (mobile) */}
      <div
        ref={sideBarRef}
        className={`fixed top-0 left-0 h-screen w-64 shadow z-20 transform transition-transform duration-300 md:hidden ${
          showSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar links={brandLinks} setShowSideBar={setShowSideBar}/>
      </div>

      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-64 p-6 overflow-y-auto min-h-screen">
        {path != "/brand-dashboard/messages" && <DashboardTopHeader />}
        {children}
      </main>
    </div>
  );
}
