"use client";

import { useState, useEffect, useRef } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, LogOut, RefreshCw } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRightLeft, Briefcase, Sparkles } from "lucide-react";
import { useNotificationStore } from "@/stores/useNotificationStore";
import Cookies from "js-cookie";

const DashboardTopHeader = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();
  const noti = useNotificationStore((s) => s.notifications);
  console.log("dashboard to header", noti);

  // --- UI States ---
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // --- Notification & Socket States ---
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // --- Refs ---
  const wsRef = useRef(null); // Store socket instance
  const reconnectTimeoutRef = useRef(null); // Store timeout ID

  const isBrandDashboard = pathname.startsWith("/brand-dashboard");
  const isInfluencerDashboard = pathname.startsWith("/influencer-dashboard");
  const { data: session, status: sessionStatus } = useSession();

  // --- 1. WebSocket Connection Logic ---
  const connectWebSocket = () => {
    const token = localStorage.getItem("access_token");

    // If already connected or no token, stop
    if (
      !token ||
      (wsRef.current && wsRef.current.readyState === WebSocket.OPEN)
    ) {
      return;
    }

    console.log("🔄 Attempting to connect WebSocket...");

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_NOTI_URL}?token=${token}`
    );

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      setIsSocketConnected(true);
      // Optional: Clear any pending reconnection timeouts
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🔔 Notification Received:", data);

        // Update UI
        setNotificationCount((prev) => prev + 1);
        setNotifications((prev) => [data, ...prev]);
      } catch (error) {
        console.error("Error parsing WS message:", error);
      }
    };

    ws.onclose = (event) => {
      console.log("🔌 WebSocket Disconnected", event.reason);
      setIsSocketConnected(false);
      wsRef.current = null;

      // --- Reconnection Logic ---
      // Try to reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("⏳ Reconnecting...");
        connectWebSocket();
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
      ws.close(); // Close triggers onclose, which handles reconnection
    };

    wsRef.current = ws;
  };

  // --- 2. Initialize Socket on Mount ---
  useEffect(() => {
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  // --- Handlers ---
  const switchDashboard = () => {
    if (isBrandDashboard) {
      router.push("/influencer-dashboard");
    } else if (isInfluencerDashboard) {
      router.push("/brand-dashboard");
    }
    setShowProfileDropdown(false);
  };

  const handleNotificationClick = async () => {
    // setShowNotifDropdown(!showNotifDropdown);
    // setShowProfileDropdown(false);
    const nextState = !showNotifDropdown;
    setShowNotifDropdown(nextState);

    if (!showNotifDropdown && notificationCount > 0) {
      try {
        const token =
          session?.accessToken || localStorage.getItem("access_token");
        if (!token) return;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}chat_service/noti_seen_all/`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (data) {
          setNotificationCount(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      const token =
        session?.accessToken || localStorage.getItem("access_token");
      if (!token) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}chat_service/get_unread_noti/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch unread notifications");
          return;
        }

        const json = await res.json();

        console.log("📦 Backend unread notifications:", json.data);

        const mapped = json.data.map((n) => ({
          id: n.id,
          message: n.payload.message,
        }));

        console.log("🧠 Mapped notifications:", mapped);
        let combinedNotifications = [...mapped];
        // 🔥 Replace state (not append)
        // setNotifications((prev) => [...mapped, ...prev]);

        // // 🔥 Set exact unread count
        // setNotificationCount(mapped.length);
        if (noti) {
          const messageNoti = noti.map((n) => ({
            id: n.id,
            message: n.message,
          }));

          // setNotifications((prev) => [...messageNoti, ...prev]);

          // // 🔥 Set exact unread count
          // setNotificationCount(messageNoti.length);
          combinedNotifications = [...messageNoti, ...combinedNotifications];
        }
        setNotifications(combinedNotifications);
        setNotificationCount(combinedNotifications.length);

        console.log("🔔 Unread count:", mapped.length);
      } catch (err) {
        console.error("Notification fetch error:", err);
      }
    };

    fetchUnreadNotifications();
  }, []);



// const handleLogout = async () => {
//   try {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("user");

//     Cookies.remove("access_token", {
//       path: "/",       
//     });

    

//     logout(); 
//     setToken(null);
//     setUser(null);

//     await signOut({
//       callbackUrl: "/",
//     });
//   } catch (err) {
//     console.error("Logout error:", err);
//   }
// };
const handleLogout =async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user"); 
    document.cookie = "access_token=; path=/; max-age=0;";
    await signOut({
    redirect: true,
    callbackUrl: "/",
  });
  };

  return (
    <div className="bg-white px-4 sm:px-8 py-5 border-b border-gray-100">
      <div className="flex items-center justify-between">
        {/* --- CONTEXT SWITCHER (DESKTOP) --- */}
        <div className="mr-6 hidden md:flex items-center">
          <Link
            href={
              pathname.startsWith("/brand-dashboard")
                ? "/influencer-dashboard"
                : "/brand-dashboard"
            }
            className="
      group flex items-center gap-2
      px-3 py-2 rounded-lg
      text-sm font-medium text-primary
      hover:bg-primary/5 transition
      whitespace-nowrap
    "
            title={
              pathname.startsWith("/brand-dashboard")
                ? "Currently logged in as Brand"
                : "Currently logged in as Influencer"
            }
          >
            {pathname.startsWith("/brand-dashboard") ? (
              <Briefcase size={16} className="opacity-70" />
            ) : (
              <Sparkles size={16} className="opacity-70" />
            )}

            <span>
              {pathname.startsWith("/brand-dashboard")
                ? "Brand Account"
                : "Influencer Account"}
            </span>

            <ArrowRightLeft
              size={14}
              className="ml-1 opacity-50 group-hover:opacity-80 transition"
            />
          </Link>
        </div>
        {/* --- CONTEXT SWITCHER (MOBILE) --- */}
        <div className="md:hidden flex justify-center">
          <button
            className="
      flex items-center gap-2
      px-3 py-1.5 rounded-md
      bg-primary/5 text-primary
      text-xs font-medium
      whitespace-nowrap
    "
          >
            {pathname.startsWith("/brand-dashboard") ? (
              <Briefcase size={14} className="opacity-70" />
            ) : (
              <Sparkles size={14} className="opacity-70" />
            )}

            {pathname.startsWith("/brand-dashboard")
              ? "Brand Account"
              : "Influencer Account"}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* --- NOTIFICATIONS --- */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="relative p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <IoIosNotificationsOutline size={26} className="text-gray-700" />

              {/* Badge Count */}
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                      Notifications
                    </h3>
                    <button className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 flex flex-col items-center justify-center text-gray-400">
                        <IoIosNotificationsOutline
                          size={40}
                          className="mb-2 opacity-20"
                        />
                        <p className="text-sm">No new notifications</p>
                      </div>
                    ) : (
                      notifications.map((notif, index) => (
                        <div
                          key={index}
                          className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3"
                        >
                          <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0"></div>
                          <div>
                            <p className="text-sm text-gray-800 leading-snug">
                              {notif.message || JSON.stringify(notif)}
                            </p>
                            <span className="text-xs text-gray-400 mt-1 block">
                              Just now
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* --- PROFILE --- */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifDropdown(false);
              }}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-3 transition"
            >
              {user?.brand_profile?.logo || user?.influencer_profile?.profile_picture ? (
                <Image
                  src={user?.brand_profile?.logo || user?.influencer_profile?.profile_picture}
                  width={44}
                  height={44}
                  alt="Profile"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-200"
                />
              ):(
                <div className="w-11 h-11 rounded-full bg-primary text-secondary flex items-center justify-center font-semibold uppercase">
  {(
    user?.brand_profile?.business_name ||
    user?.influencer_profile?.display_name ||
    user?.user?.first_name ||
    "Name"
  ).charAt(0).toUpperCase()}
</div>

              )}
              <ChevronDown
                size={18}
                className={`text-gray-600 transition-transform ${
                  showProfileDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-primary">
                      {user?.user?.first_name || "User"}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.user?.email}
                    </p>
                  </div>
                  <div className="py-2">
                    {(isBrandDashboard || isInfluencerDashboard) && (
                      <button
                        onClick={switchDashboard}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition"
                      >
                        <span className="font-semibold text-primary">
                          Switch
                        </span>
                        <span className="text-sm text-gray-500">
                          →{" "}
                          {isBrandDashboard
                            ? "Influencer Dashboard"
                            : "Brand Dashboard"}
                        </span>
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 flex items-center gap-3 transition"
                    >
                      <LogOut size={16} />
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
