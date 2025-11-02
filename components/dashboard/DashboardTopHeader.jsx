import { IoIosNotificationsOutline } from "react-icons/io";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";

const DashboardTopHeader = () => {
  const { user, logout } = useAuthStore();
  console.log(user);

  return (
    <div className="bg-white px-8 py-6 ">
      <div className="flex items-center justify-between">
        <div className="flex-grow"></div>

        <div className="flex items-center gap-4">
          <div className="bg-[#EEF1F5] rounded-full p-2">
            <IoIosNotificationsOutline size={25} />
          </div>
          <div className="w-[41px] h-[41px]  rounded-full flex items-center justify-center">
            <Image
              src={user?.influencer_profile?.profile_picture || user?.brand_profile?.logo || "/images/person.jpg"}
              width={41}
              height={41}
              alt={user?.display_name || "User avatar"}
              className="w-full h-ull rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopHeader;
