import React from "react";
import MobileNav from "./MobileNav";
import { formatDateTime } from "@/lib/utils";
import Notification from "./Notification";
import DropdownMenuAction from "./DropdownMenuAction";

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
      </div>
    </div>
  );
};

export default HeaderBoard;
