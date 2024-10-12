import React from "react";
import MobileNav from "./MobileNav";
import { formatDateTime } from "@/lib/utils";
import Notification from "./Notification";
import DropdownMenuAction from "./DropdownMenuAction";
import SvgIcon from "./SvgIcon";

const HeaderBoard = ({ user }: { user: User }) => {
  const notifications = [
    {
      name: "Vien",
      title: "Tour Dubai",
      content: "This is notification 1",
      time: formatDateTime(new Date(Date.now())).timeOnly,
    },
    {
      name: "Vien",
      title: "Tour Dubai",
      content: "This is notification 1",
      time: formatDateTime(new Date(Date.now())).timeOnly,
    },
    {
      name: "Vien",
      title: "Tour Dubai",
      content: "This is notification 1",
      time: formatDateTime(new Date(Date.now())).timeOnly,
    },
    {
      name: "Vien",
      title: "Tour Dubai",
      content: "This is notification 1",
      time: formatDateTime(new Date(Date.now())).timeOnly,
    },
    {
      name: "Vien",
      title: "Tour Dubai",
      content: "This is notification 1",
      time: formatDateTime(new Date(Date.now())).timeOnly,
    },
  ];
  return (
    <div className="rounded-bl-[12px] ml-3 flex justify-between items-center w-full min-w-[350px] min-h-[70px] py-4 px-6 bg-[#014C46]">
      <div className="lg:hidden max-lg:block flex-1">
        <MobileNav />
      </div>
      <div className="flex gap-6 justify-end items-center flex-1 mx-3">
        <Notification notifications={notifications} />

        <div className="flex">
          <DropdownMenuAction user={user} type="avatar" />
        </div>
        {user.role === "user" && (
          <div className="w-8 h-8 cursor-pointer">
            <SvgIcon path="/assets/icons/Orders.svg" width={32} height={32} color="white" fit />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBoard;
