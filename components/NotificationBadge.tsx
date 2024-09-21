import React from "react";

const NotificationBadge = ({ notification }: { notification: NotificationAdmin }) => {
  return (
    <div className="rounded-md shadow-xl  border-[1px] border-[#2F2B3D24]  min-h-[70px] flex justify-center items-center py-[10px] pl-[20px] pr-[28px] gap-2 shadow-badge-notification  w-full">
      <p className="rounded-full min-w-[50px] min-h-[50px] object-cover flex items-center justify-center uppercase bg-orange-300 w-[50px] h-[50px]">{notification.name[0]}</p>
      <div className="flex flex-col gap-1  w-full min-w-[150px]">
        <h2 className="font-bold text-sm text-[#014C46]">{notification.name}</h2>
        <p className="font-bold text-xs text-[#2F2B3D]">{notification.title}</p>
        <div className="flex justify-between items-center">
          <p className="text-xs font-normal text-[#2F2B3D]">{notification.content}</p>
          {/* <p className="text-end text-[8px] font-normal text-gray-500">{notification.time}</p> */}
        </div>
      </div>
    </div>
  );
};

export default NotificationBadge;
