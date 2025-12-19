"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar, FaSearch, FaLock, FaMapMarkerAlt } from "react-icons/fa";

// Ensure you have these shadcn/ui components installed
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function InfluencersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false); // State for the modal
  
  // Simulate membership status (Toggle to test locked/unlocked state)
  const isMember = false; 

  const influencers = [
    {
      id: 1,
      name: "John Doe",
      followers: "520k",
      category: "FASHION",
      rating: 5,
      location: "New York, USA",
      bio: "Trend-savvy fashion Creator known for blending streetwear with high-end style.",
      priceRange: "$150 - $500",
      collabs: 12,
      image: "/images/influencer/influencer1.jpg",
    },
    {
      id: 2,
      name: "Robert Smith",
      followers: "420k",
      category: "BEAUTY",
      rating: 4,
      location: "London, UK",
      bio: "Beauty Creator known for skincare tips and bold, trendsetting makeup looks.",
      priceRange: "$200 - $600",
      collabs: 8,
      image: "/images/influencer/influencer2.jpg",
    },
    {
      id: 3,
      name: "Johan",
      followers: "320k",
      category: "FITNESS",
      rating: 0, 
      location: "Berlin, DE",
      bio: "Dynamic fitness Creator known for high-energy workouts and motivational lifestyle content.",
      priceRange: "$100 - $300",
      collabs: 0,
      image: "/images/influencer/influencer3.jpg",
    },
    {
      id: 4,
      name: "Mike Tech",
      followers: "520k",
      category: "TECH",
      rating: 5,
      location: "San Francisco, USA",
      bio: "Tech Creator known for breaking down complex innovations into simple insights.",
      priceRange: "$500 - $1k",
      collabs: 24,
      image: "/images/influencer/influencer4.jpg",
    },
  ];

  const filteredInfluencers = influencers.filter((inf) => {
    const term = searchTerm.toLowerCase();
    return (
      inf.name.toLowerCase().includes(term) ||
      inf.category.toLowerCase().includes(term) ||
      inf.bio.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      
      {/* --- Hero Section --- */}
      <section className="bg-white border-b border-gray-100">
        <main className="container mx-auto px-4 pt-16 lg:pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-primary font-semibold text-sm tracking-wide uppercase">
                Find Your Voice
              </span> */}
              <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">

                Grow with <br />
                <span className="text-primary">Micro-Influencers</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Reach real people through trusted voices.Micro-influencer bring authentic connections and strong engagement,helping your brand shine without big budget.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-lg w-full mt-8 shadow-lg rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Search by niche, name, or keywords..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl transform scale-90" />
              <Image
                width={800}
                height={600}
                src="/images/inf-hero.png"
                alt="Influencers Collage"
                className="relative z-10 w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </main>
      </section>

      {/* --- Main Content --- */}
      <main className="container mx-auto py-16 px-4">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Creators</h2>
            <p className="text-gray-500 mt-1">
              {filteredInfluencers.length} active influencers match your search
            </p>
          </div>
        </div>

        {filteredInfluencers.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredInfluencers.map((influencer) => (
              <div
                key={influencer.id}
                className="group relative bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Image Section */}
                <div className="sm:w-48 h-48 sm:h-auto relative bg-gray-100 shrink-0">
                  <Image
                    src={influencer.image}
                    alt={influencer.name}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!isMember ? "blur-[2px]" : ""}`}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-md shadow-sm uppercase tracking-wide">
                      {influencer.category}
                    </span>
                  </div>

                  {/* Lock Overlay for Non-Members */}
                  {!isMember && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                      <div className="bg-white/90 p-2 rounded-full shadow-lg">
                        <FaLock className="text-gray-700 w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 relative">
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                        {isMember ? influencer.name : "Locked Profile"}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <FaMapMarkerAlt className="text-gray-400 w-3 h-3" />
                        {influencer.location}
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex flex-col items-end">
                      <div className="flex text-yellow-400 text-sm">
                        {influencer.rating > 0 ? (
                          [...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < influencer.rating ? "fill-current" : "text-gray-200"} />
                          ))
                        ) : (
                          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">New Talent</span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-primary mt-1">
                        {influencer.followers} Followers
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {influencer.bio}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Rate Range</p>
                      <p className="text-gray-900 font-semibold">{influencer.priceRange}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">SM Collabs</p>
                      <p className="text-gray-900 font-semibold">
                        {influencer.collabs > 0 ? influencer.collabs : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    {isMember ? (
                      <Link
                        href={`/influencer/${influencer.id}`}
                        className="block w-full py-2.5 text-center rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
                      >
                        View Full Profile
                      </Link>
                    ) : (
                      <button
                        onClick={() => setShowAuthModal(true)} // Opens the modal
                        className="w-full py-2.5 text-center rounded-lg bg-primary text-white font-medium text-sm hover:bg-gray-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FaLock className="w-3 h-3" />
                        Unlock to View
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No influencers found</h3>
            <p className="text-gray-500 mt-1 mb-6">We couldn't find any matches for "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-primary font-medium hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      {/* --- Auth Required Modal --- */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="max-w-md bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
          <DialogHeader className="space-y-3 text-center">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Join The Social Market
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-base">
              Choose your role to unlock full profile details, pricing, and contact info.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 pt-6">
            <Button
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                setShowAuthModal(false);
                router.push("/influencer-onboarding");
              }}
            >
              Sign up as Influencer
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-12 text-base font-semibold border-2 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => {
                setShowAuthModal(false);
                router.push("/brand-onboarding");
              }}
            >
              Sign up as Brand
            </Button>
          </div>

          <div className="flex justify-center pt-6 text-sm text-gray-500">
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  router.push("/auth/login");
                }}
                className="text-secondary font-semibold hover:underline ml-1"
              >
                Log in
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}