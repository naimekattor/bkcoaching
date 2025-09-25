"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Brands", href: "/brands" },
  { name: "Micro-Influencers", href: "/micro-Influencers" },
  { name: "About", href: "/about" },
  { name: "Faq", href: "/faq" },
  { name: "Privacy", href: "/privacy" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-4 pt-6">
        <div className="container mx-auto px-4 py-2 sm:px-6 lg:px-8 bg-primary backdrop-blur rounded-md">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-primary"
              >
                <Image
                  priority
                  width={160}
                  height={45}
                  alt="social market"
                  src={"/images/logo.png"}
                />
              </motion.div>
            </div>

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
                      "hover:text-[#F6FBFF] hover:bg-[#002140] hover:border-[#F7FBFF] hover:border-1 hover:scale-105 transform",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1 block"
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

            {/* Desktop Login Button */}
            <div className="hidden md:flex md:items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link href="/auth/login">
                  <Button
                    variant="default"
                    size="sm"
                    className={cn(
                      "bg-primary text-secondary border-secondary border-1 hover:bg-background px-6 py-4 cursor-pointer",
                      "transition-all duration-300 transform hover:scale-105",
                      "shadow-md hover:shadow-lg"
                    )}
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className={cn(
                  "relative z-50 flex h-10 w-10 items-center justify-center",
                  "rounded-md text-accent transition-colors duration-300",
                  "hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
                )}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="flex h-5 w-5 flex-col items-center justify-center"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                >
                  <motion.span
                    className="absolute h-0.5 w-5 bg-current"
                    variants={{
                      closed: { rotate: 0, y: -6 },
                      open: { rotate: 45, y: 0 },
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-5 bg-current"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-5 bg-current"
                    variants={{
                      closed: { rotate: 0, y: 6 },
                      open: { rotate: -45, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
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
              {/* Spacer for header */}
              <div className="h-16" />

              {/* Navigation Links */}
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
                      className={cn(
                        "text-2xl font-semibold text-foreground transition-colors duration-300",
                        "hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-4 py-2 block"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Login Button */}
              <div className="flex justify-center pb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Link href="/auth/login">
                    <Button
                      variant="default"
                      size="lg"
                      className={cn(
                        "bg-primary text-primary-foreground hover:bg-accent",
                        "transition-all duration-300 transform hover:scale-105",
                        "shadow-lg hover:shadow-xl px-8 py-3 text-lg"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
