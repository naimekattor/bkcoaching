import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
export function DashboardHeader() {
  return (
    <>
      <div className="bg-white px-8 py-6 ">
        <div className="flex items-center justify-between">
          <div className="flex-grow"></div>

          <div className="flex items-center gap-4">
            <div className="bg-[#EEF1F5] rounded-full p-2">
              <IoIosNotificationsOutline size={25} />
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              M
            </div>
          </div>
        </div>
      </div>
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
            <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-800 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ">
              <FaEdit /> Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
