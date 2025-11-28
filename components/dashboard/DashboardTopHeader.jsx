"use client";

import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";

const DashboardTopHeader = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  // Detect current dashboard
  const isBrandDashboard = pathname.startsWith("/brand-dashboard");
  const isInfluencerDashboard = pathname.startsWith("/influencer-dashboard");

  const switchDashboard = () => {
    if (isBrandDashboard) {
      router.push("/influencer-dashboard");
    } else if (isInfluencerDashboard) {
      router.push("/brand-dashboard");
    }
    setShowDropdown(false);
  };

  return (
    <div className="bg-white px-4 sm:px-8 py-5 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-grow" />

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <IoIosNotificationsOutline size={26} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-3 transition"
            >
              <Image
                src={
                  user?.influencer_profile?.profile_picture ||
                  user?.brand_profile?.logo ||
                  "/images/person.jpg"
                }
                width={44}
                height={44}
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-200"
              />
              <ChevronDown
                size={18}
                className={`text-gray-600 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-primary">
                      {user?.user?.first_name || "User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.user?.email || "No email"}
                    </p>
                  </div>

                  <div className="py-2">
                    {(isBrandDashboard || isInfluencerDashboard) && (
                      <button
                        onClick={switchDashboard}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition"
                      >
                        <span className="font-semibold text-primary">Switch</span>
                        <span className="text-sm text-gray-500">
                          →{" "}
                          {isBrandDashboard
                            ? "Influencer Dashboard"
                            : "Brand Dashboard"}
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        router.push("/auth/login");
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 flex items-center gap-3 transition"
                    >
                      <span className=""><LogOut size={16}/></span>
                      <span className="text-[16px]">Log Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopHeader;