import React from "react";
import { IoPersonOutline } from "react-icons/io5";

const Feature = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#F5FAFF] to-[#F4FAFF]">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Simple. <span className="text-yellow-500">Authentic.</span> Effective
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* For Brands Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-primary text-white text-center py-6">
            <h3 className="text-2xl font-bold">For Brands</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 bg-[#F7F8F9] shadow p-1 rounded border-white border-3 text-[#838689] text-[24px]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <IoPersonOutline />
              </div>
              <span className="text-lg">Create your free profile</span>
            </div>
            <div className="flex items-center gap-4 bg-[#F7F8F9] shadow p-1 rounded border-white border-3 text-[#838689] text-[24px]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Post a campaign or browse influencers
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[#F7F8F9] shadow p-1 rounded border-white border-3 text-[#838689] text-[24px]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Match instantly with the right people
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[#F7F8F9] shadow p-1 rounded border-white border-3 text-[#838689] text-[24px]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 000-6a2 2 0 000-6h2a2 2 0 002-2h2a2 2 0 002 2h2a2 2 0 002 2v6a2 2 0 000 6a2 2 0 000 6v2a2 2 0 00-2 2h-2a2 2 0 00-2 2h-2a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Collaborate directly and track results
              </span>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-lg transition-colors duration-200 text-lg mt-8">
              Grow My Brand
            </button>
          </div>
        </div>

        {/* For Micro-Influencer Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-primary text-white text-center py-6">
            <h3 className="text-2xl font-bold">For Micro-Influencer</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 bg-[#F7F8F9] shadow p-1 rounded border-white border-3 text-[#838689] text-[24px]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="text-lg">Create your free profile</span>
            </div>
            <div className="flex items-center gap-4 bg-[#F7F8F9] shadow p-1 rounded border-white border-3 text-[#838689] text-[24px]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Post a campaign or browse influencers
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[#F7F8F9] shadow p-1 rounded border-white border-3 text-[#838689] text-[24px]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Match instantly with the right people
              </span>
            </div>
            <div className="flex items-center gap-4 bg-[#F7F8F9] shadow p-1 rounded border-white border-3 text-[#838689] text-[24px]">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <span className="text-lg">
                Collaborate directly and track results
              </span>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-lg transition-colors duration-200 text-lg mt-8">
              Monetize My Influence
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
