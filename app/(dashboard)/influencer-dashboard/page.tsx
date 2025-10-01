// app/brand-dashboard/page.js

import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
// Removed unused dashboard imports to satisfy lint rules
const analyticsData = [
  { value: "12", label: "Total Campaigns", color: "#F3EFFF" },
  { value: "$2250", label: "Earnings", color: "#E1F5FF" },
  { value: "5", label: "New Messages", color: "#FEFCE8" },
];
export default function Page() {
  return (
    <div className="">
      <div className="flex-1">
        <div className="bg-white rounded-lg border-2 border-dashed border-primary p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center">
                <Image
                  width={64}
                  height={64}
                  src={"/images/logo.png"}
                  alt="logo"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Welcome back, Maya! 👋
                </h2>
                <p className="text-slate-600">
                  Ready to grow your influence today?
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href={"/influencer-dashboard/settings"}
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1 "
              >
                <FaEdit /> Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {analyticsData.map((item, index) => (
              <div
                key={index}
                className=" rounded-lg p-6 text-center"
                style={{ backgroundColor: item.color }}
              >
                <div className="text-3xl font-bold mb-2">{item.value}</div>
                <div className="text-slate-600 text-sm font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* My Campaigns */}
            <div className="col-span-1 lg:col-span-2 border-2 rounded p-6">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">
                  My Campaigns
                </h2>
              </div>
              <div className="space-y-4">
                {/* Campaign Item 1 */}
                <div className="flex justify-between items-center p-4 border rounded-xl ">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Summer Fashion Collection
                    </h3>
                    <p className="text-sm text-gray-500">
                      Fashion Business collaboration for summer collection
                      launch
                    </p>
                    <p className="text-xs text-gray-400">Due: July 30, 2024</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-green-600 bg-green-100 rounded-full px-2 py-1">
                      Accepted
                    </span>
                    <span className="mt-2 text-lg font-semibold text-green-600">
                      $500
                    </span>
                  </div>
                </div>
                {/* Campaign Item 2 */}
                <div className="flex justify-between items-center p-4 border rounded-xl ">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Tech Product Review
                    </h3>
                    <p className="text-sm text-gray-500">
                      Review latest smartphone for tech audience
                    </p>
                    <p className="text-xs text-gray-400">Due: Aug 15, 2024</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-green-600 bg-green-100 rounded-full px-2 py-1">
                      Accepted
                    </span>
                    <span className="mt-2 text-lg font-semibold text-green-600">
                      $750
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Media Kit */}
            <div className="border-2 rounded p-6 flex flex-col items-center text-center">
              <div className="flex items-center space-x-2 mb-4 self-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7v4a2 2 0 002 2h4a2 2 0 002-2V7m-4 10h4m-4 0v-4m0 4h.01M12 14v4m0 0h.01M12 14h.01M12 14v.01"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Media Kit</h2>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center p-4 border-2 border-dashed bg-[#f9fafb] rounded-xl w-full mb-4">
                <Image
                  width={48}
                  height={48}
                  src="https://placehold.co/60x80/e5e7eb/6b7280?text=PDF"
                  alt="PDF icon"
                  className="w-12 h-16 mb-2"
                />
                <p className="text-gray-500 text-sm">Your media kit preview</p>
              </div>
              <div className="w-full space-y-2">
                <button className="w-full bg-yellow-400 text-gray-800 font-semibold py-3 rounded shadow hover:bg-yellow-500 transition-colors">
                  View Media Kit
                </button>
                <button className="w-full bg-[#f3f4f6] text-gray-800 font-semibold py-3 rounded shadow  transition-colors">
                  Edit Media Kit
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Messages (75%) */}
            <div className="border-2 rounded shadow p-6 lg:col-span-3">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-9-6a2 2 0 01-2-2v-3a2 2 0 012-2h8a2 2 0 012 2v3a2 2 0 01-2 2h-4a2 2 0 01-2-2z"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              </div>
              <div className="space-y-4">
                {/* Message Item 1 */}
                <div className="flex items-start space-x-4">
                  <Image
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                    src="https://placehold.co/40x40/e0e9d6/658e65?text=TB"
                    alt="TechBusiness Inc. avatar"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        TechBusiness Inc.
                      </span>
                      <span className="text-xs text-gray-400">2h ago</span>
                    </div>
                    <p className="text-gray-600">
                      Great content! When can we schedule the next post?
                    </p>
                  </div>
                </div>
                {/* Message Item 2 */}
                <div className="flex items-start space-x-4">
                  <Image
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                    src="https://placehold.co/40x40/e0e9d6/658e65?text=FF"
                    alt="Fashion Forward avatar"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        Fashion Forward
                      </span>
                      <span className="text-xs text-gray-400">1d ago</span>
                    </div>
                    <p className="text-gray-600">
                      Payment has been processed successfully
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings (25%) */}
            <div className="border-2 rounded shadow p-6 flex flex-col items-center text-center lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4 self-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3v2a3 3 0 006 0v-2c0-1.657-1.343-3-3-3zM7 13h10"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Earnings</h2>
              </div>
              <div className="bg-green-100 rounded-xl p-4 w-full flex flex-col items-center justify-center space-y-2 mb-4">
                <span className="text-sm text-gray-600">Total Earnings</span>
                <span className="text-3xl font-bold text-green-600">
                  $2,450
                </span>
                <span className="text-xs text-green-600 font-medium">
                  +15% this month
                </span>
              </div>
              <div className="w-full space-y-2">
                <button className="w-full bg-yellow-400 text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:bg-yellow-500 transition-colors">
                  Withdraw
                </button>
                <button className="w-full bg-yellow-400 text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:bg-yellow-500 transition-colors">
                  Payment Methods
                </button>
              </div>
            </div>
          </div>
          {/* Content Niche */}
          <div className="w-full">
            <div className=" border-2 mt-4 rounded shadow p-6 w-3/4 ">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">
                  Content Niche
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Spring Chic",
                  "Glow & Go",
                  "Heels & Hues",
                  "Coquette Edit",
                  "Purpose of Style",
                  "Day to Night",
                  "Thread Talk",
                  "Fashion Hauls",
                  "OOTD Reels",
                  "Heel Styling",
                  "Care Routine",
                  "Get Ready",
                  "Wardrobe Style",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
