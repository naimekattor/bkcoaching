"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar({ links = [] }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  return (
    <div
      style={{ boxShadow: "2px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}
      className="w-64 bg-primary text-white flex flex-col rounded-r-3xl h-screen overflow-hidden"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-auto h-auto rounded-lg flex items-center justify-center">
            <Image
              width={100}
              height={100}
              src={"/images/logo.png"}
              alt="logo"
            />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {links.map((item) => {
            const isActive = pathname.startsWith(item.path);
            const linkClass = `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              isActive
                ? "bg-yellow-500 text-slate-800 font-medium"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`;
            return (
              <li key={item.name}>
                <Link href={item.path} className={linkClass}>
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center justify-start px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
          {/* <span className="mr-3">🚪</span> */}
          Logout
        </button>
      </div>
    </div>
  );
}
