import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
export function DashboardHeader() {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
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
                TechFlow Solutions
              </h2>
              <p className="text-slate-600">Skincare & Wellness | Remote</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href={"/brand-dashboard/settings"}
              className="bg-secondary hover:bg-[var(--secondaryhover)] text-slate-800 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1 "
            >
              <FaEdit /> Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
