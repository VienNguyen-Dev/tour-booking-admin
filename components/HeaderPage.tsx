import { useCart } from "@/app/context/CartContext";
import { formatDateTime } from "@/lib/utils";
import React from "react";
import Notification from "./Notification";
import DropdownMenuAction from "./DropdownMenuAction";
import Link from "next/link";
import SvgIcon from "./SvgIcon";

const HeaderPage = ({ user, cartCount }: { user: User; cartCount: number }) => {
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
      <div className="flex gap-6 justify-end items-center flex-1 mx-3">
        <Notification notifications={notifications} />

        <div className="flex">
          <DropdownMenuAction user={user} type="avatar" />
        </div>
        {user.role === "user" && (
          <Link href={`/cart/${user.$id}`} target="_blank" className="w-8 h-8 cursor-pointer">
            <div className="relative">
              <SvgIcon path="/assets/icons/Orders.svg" width={32} height={32} color="white" fit />
              <p className=" absolute text-red-500 -top-2 right-0.5 font-bold text-xl">{cartCount}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
