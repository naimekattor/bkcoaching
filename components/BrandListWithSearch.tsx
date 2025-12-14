// components/BrandListWithSearch.tsx
"use client"; // This directive is crucial

import { useState } from "react";
import BrandCard from "./BrandCard";
import { FaSearch } from "react-icons/fa"; // Assuming you have react-icons, or use an SVG

// Define the type matching your mapped data
type BrandData = {
  id: any;
  name: string;
  location: string;
  category: string;
  description: string;
  image: string;
  logo: string;
  service: string;
  rating: number;
  reviews: number;
};

export default function BrandListWithSearch({ brands }: { brands: BrandData[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic: checks Name, Category, or Description
  const filteredBrands = brands.filter((brand) => {
    const term = searchTerm.toLowerCase();
    return (
      brand.name.toLowerCase().includes(term) ||
      brand.category.toLowerCase().includes(term) ||
      brand.description.toLowerCase().includes(term) ||
      brand.location.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container mx-auto px-4 py-16 lg:py-[100px]">
      {/* Search Input Section */}
      <div className="max-w-2xl mx-auto mb-16 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by brand name, category, or location..."
          className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-4 top-4 text-gray-400 text-sm">
          {filteredBrands.length} found
        </div>
      </div>

      {/* Brand List */}
      <div className="space-y-12">
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <BrandCard key={brand.id} {...brand} />
          ))
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-gray-700">No brands found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}