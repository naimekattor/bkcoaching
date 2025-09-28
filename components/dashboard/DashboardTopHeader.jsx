import { IoIosNotificationsOutline } from "react-icons/io";

const DashboardTopHeader = () => {
  return (
    <div className="bg-white px-8 py-6 ">
      <div className="flex items-center justify-between">
        <div className="flex-grow"></div>

        <div className="flex items-center gap-4">
          <div className="bg-[#EEF1F5] rounded-full p-2">
            <IoIosNotificationsOutline size={25} />
          </div>
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
            M
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopHeader;
