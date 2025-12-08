"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { X, LogOut, LayoutDashboard, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/apiClient"; // Make sure this path is correct

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Brands", href: "/brands" },
  { name: "Micro-Influencers", href: "/micro-influencers" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy", href: "/privacy" },
];

interface UserData {
  id: number;
  user: { email: string; first_name: string; last_name: string };
  signed_up_as: "influencer" | "brand";
  influencer_profile?: { profile_picture?: string; display_name?: string };
  brand_profile?: { logo?: string; display_name?: string };
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const accessToken = localStorage.getItem("access_token");
    setToken(accessToken);

    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient("user_service/get_user_info/", {
        method: "GET",
        auth: true,
      });

      if (res.status === "success") {
        setUserData(res.data);
      } else {
        // Token might be invalid → clear it
        localStorage.removeItem("access_token");
        setToken(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      localStorage.removeItem("access_token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleStorageChange = () => fetchUser();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user"); 
    setToken(null);
    setUserData(null);
    window.location.href = "/";
  };

  const getDashboardLink = () => {
    if (!userData) return "/";
    return userData.signed_up_as === "influencer"
      ? "/influencer-dashboard"
      : "/brand-dashboard";
  };

  const getProfilePic = () => {
    if (userData?.signed_up_as === "influencer") {
      return userData.influencer_profile?.profile_picture || null;
    }
    return userData?.brand_profile?.logo || null;
  };

  const getDisplayName = () => {
    if (!userData) return "User";
    if (userData.signed_up_as === "influencer") {
      return userData.influencer_profile?.display_name || userData.user.first_name;
    }
    return userData.brand_profile?.display_name || userData.user.first_name;
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Desktop Auth Section
  const DesktopAuthSection = () => {
    if (loading) {
      return <Loader2 className="h-5 w-5 animate-spin text-white" />;
    }

    if (!token || !userData) {
      return (
        <Link href="/auth/login">
          <Button
            variant="default"
            size="sm"
            className={cn(
              "bg-primary cursor-pointer text-secondary border-secondary border hover:bg-background px-6 py-4",
              "transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            )}
          >
            Login
          </Button>
        </Link>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none">
            <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-offset-2 ring-primary transition-all hover:ring-accent">
              <AvatarImage src={getProfilePic() || undefined} alt={getDisplayName()} />
              <AvatarFallback className="bg-primary text-white font-semibold">
                {getDisplayName().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 mt-2">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{getDisplayName()}</p>
              <p className="text-xs text-muted-foreground">{userData.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={getDashboardLink()} className="flex items-center cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  // Mobile Auth Section
  const MobileAuthSection = () => {
    if (loading) return null;

    if (!token || !userData) {
      return (
        <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
          <Button
            variant="default"
            size="lg"
            className={cn(
              "bg-primary text-primary-foreground hover:bg-accent",
              "transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl px-8 py-3 text-lg"
            )}
          >
            Login
          </Button>
        </Link>
      );
    }

    return (
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-4 px-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={getProfilePic() || undefined} />
            <AvatarFallback className="text-2xl bg-primary text-white">
              {getDisplayName().charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold text-primary">{getDisplayName()}</p>
            <p className="text-sm text-primary">{userData.user.email}</p>
          </div>
        </div>

        <div className="space-y-4 px-6">
          <Link
            href={getDashboardLink()}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center text-primary hover:text-accent text-lg"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center text-primary hover:text-red-400 text-lg w-full"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-4 pt-6">
        <div className="container mx-auto px-4 py-2 sm:px-6 lg:px-8 bg-primary backdrop-blur rounded-md">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href={"/"}>
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image priority width={160} height={45} alt="social market" src={"/images/logo.png"} />
                </motion.div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navigationLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-sm font-medium text-navlink-primary transition-colors duration-300",
                      "hover:text-[#F6FBFF] hover:bg-[#002140] hover:border-[#F7FBFF] hover:border hover:scale-105 transform rounded-md px-2 py-1 block"
                    )}
                  >
                    {link.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex md:items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <DesktopAuthSection />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className={cn(
                  "relative z-50 flex h-10 w-10 items-center justify-center rounded-md text-accent transition-colors",
                  "hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
                )}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="flex h-5 w-5 flex-col items-center justify-center" animate={isMobileMenuOpen ? "open" : "closed"}>
                  <motion.span className="absolute h-0.5 w-5 bg-current" variants={{ closed: { rotate: 0, y: -6 }, open: { rotate: 45, y: 0 } }} transition={{ duration: 0.5 }} />
                  <motion.span className="absolute h-0.5 w-5 bg-current" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.3 }} />
                  <motion.span className="absolute h-0.5 w-5 bg-current" variants={{ closed: { rotate: 0, y: 6 }, open: { rotate: -45, y: 0 } }} transition={{ duration: 0.3 }} />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-secondary md:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="h-16 flex justify-center items-center">
                <X className="text-primary text-3xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
              </div>

              <nav className="flex flex-1 flex-col items-center justify-center space-y-8 px-6">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      className="text-xl font-semibold text-primary hover:text-accent"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pb-12 flex justify-center">
                <MobileAuthSection />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;