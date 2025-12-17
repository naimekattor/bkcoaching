"use client";

import { useState, useEffect, useRef } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, LogOut, RefreshCw } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ArrowRightLeft, Briefcase, Sparkles } from "lucide-react";
const DashboardTopHeader = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();

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

  // --- 1. WebSocket Connection Logic ---
  const connectWebSocket = () => {
    const token = localStorage.getItem("access_token");

    // If already connected or no token, stop
    if (!token || (wsRef.current && wsRef.current.readyState === WebSocket.OPEN)) {
      return;
    }

    console.log("🔄 Attempting to connect WebSocket...");
    
    const ws = new WebSocket(
      `wss://exhaust-minute-picked-reservations.trycloudflare.com/chat_handshake/ws/notification/?token=${token}`
    );

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      setIsSocketConnected(true);
      // Optional: Clear any pending reconnection timeouts
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
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

  const handleNotificationClick = () => {
    setShowNotifDropdown(!showNotifDropdown);
    setShowProfileDropdown(false);

    if (!showNotifDropdown && notificationCount > 0) {
      setNotificationCount(0);
      // TODO: Call API to mark read here
    }
  };

  return (
    <div className="bg-white px-4 sm:px-8 py-5 border-b border-gray-100">
      <div className="flex items-center justify-between">
        {/* Left Spacer */}
        {/* <div className="flex-grow" /> */}
         {/* --- NEW CONTEXT SWITCHER --- */}
  <div className="mr-6 hidden md:block">
    {pathname.startsWith("/brand-dashboard") && (
      <Link
        href="/influencer-dashboard"
        className="group flex items-center gap-2 px-3 py-1.5 rounded-full  border border-blue-100 text-blue-700  transition-all duration-200"
        title="Switch to Influencer Dashboard"
      >
        <Briefcase size={14} className="fill-blue-700/10" />
        <div className="flex flex-col leading-none">
          <span className="text-[10px] uppercase tracking-wider font-bold opacity-90">Current View</span>
          <span className="text-xs font-semibold">Brand Dashboard</span>
        </div>
        <div className="w-px h-4 bg-blue-200 mx-1"></div>
        <span className="flex items-center text-[10px] font-medium opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
          Switch <ArrowRightLeft size={10} className="ml-1" />
        </span>
      </Link>
    )}

    {pathname.startsWith("/influencer-dashboard") && (
      <Link
        href="/brand-dashboard"
        className="group flex items-center gap-2 px-3 py-1.5 rounded-full  border border-primary text-primary  transition-all duration-200"
        title="Switch to Brand Dashboard"
      >
        <Sparkles size={14} className="fill-primary" />
        <div className="flex flex-col leading-none">
          <span className="text-[10px] uppercase tracking-wider font-bold opacity-90">Current View</span>
          <span className="text-xs font-semibold">Influencer Dashboard</span>
        </div>
        <div className="w-px h-4 bg-primary mx-1"></div>
        <span className="flex items-center text-[10px] font-medium opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
          Switch <ArrowRightLeft size={10} className="ml-1" />
        </span>
      </Link>
    )}
  </div>

        <div className="flex items-center gap-4">
          
          {/* --- CONNECTION STATUS INDICATOR (For Debugging/User Info) --- */}
          {/* <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-gray-50 border border-gray-100">
             <div 
               className={`w-2.5 h-2.5 rounded-full ${isSocketConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} 
             />
             <span className={isSocketConnected ? "text-green-700" : "text-red-700"}>
               {isSocketConnected ? "Live" : "Offline"}
             </span>
          </div> */}

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
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)} />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <button className="text-xs text-blue-600 hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 flex flex-col items-center justify-center text-gray-400">
                        <IoIosNotificationsOutline size={40} className="mb-2 opacity-20"/>
                        <p className="text-sm">No new notifications</p>
                      </div>
                    ) : (
                      notifications.map((notif, index) => (
                        <div key={index} className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3">
                          <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm text-gray-800 leading-snug">{notif.message || JSON.stringify(notif)}</p>
                            <span className="text-xs text-gray-400 mt-1 block">Just now</span>
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
              {user && (
                <Image
                  src={user?.brand_profile?.logo || "/images/person.jpg"}
                  width={44}
                  height={44}
                  alt="Profile"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-200"
                />
              )}
              <ChevronDown size={18} className={`text-gray-600 transition-transform ${showProfileDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-primary">{user?.user?.first_name || "User"}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.user?.email}</p>
                  </div>
                  <div className="py-2">
                    {(isBrandDashboard || isInfluencerDashboard) && (
                      <button onClick={switchDashboard} className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition">
                        <span className="font-semibold text-primary">Switch</span>
                        <span className="text-sm text-gray-500">→ {isBrandDashboard ? "Influencer Dashboard" : "Brand Dashboard"}</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        signOut({ callbackUrl: "/" });
                        router.push("/auth/login");
                      }}
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