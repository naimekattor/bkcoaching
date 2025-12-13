import Image from "next/image";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { useAuthStore } from "@/stores/useAuthStore";

export function DashboardHeader() {
  const { user, logout } = useAuthStore();
  console.log("brand_header",user);
const businessType=user?.brand_profile?.business_type.split("–")[0];
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center">
              {user?.brand_profile?.logo ? (
                <Image
                  width={64}
                  height={64}
                  src={user.brand_profile.logo}
                  alt="Brand logo"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-lg">
                  {user?.brand_profile?.business_name?.[0] || "B"}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {user?.brand_profile?.business_name}
              </h2>
              <p className="text-slate-600">{businessType}</p>
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
