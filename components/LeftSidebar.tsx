"use client";
import { LinkSideBar } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SvgIcon from "./SvgIcon";

const LeftSidebar = () => {
  return (
    <div className="min-h-screen max-w-[320px] w-full max-lg:hidden bg-[#014C46] flex flex-col items-start justify-start p-4 space-y-8">
      <Link href={"/admin/redeems-exchanges"} className="flex items-center justify-center gap-2 pt-[22px] w-full min-h-[80px]">
        <Image src={"/assets/icons/redeems-exchanges.png"} width={35} height={35} alt="logo" />
        <p className=" text-xl xl:text-3xl font-bold text-white ">Tour Dubai</p>
      </Link>
      {LinkSideBar.map((item) => {
        const pathname = usePathname();

        const isActive = pathname.includes(item.link) || pathname.startsWith(`/admin/${item.link}`);
        return (
          <Link href={item.link} key={item.label} className={`flex items-center px-3  gap-2 min-h-[40px] rounded-md ${isActive ? "bg-white w-full text-[#014C46]" : "text-white"}`}>
            <SvgIcon fit path={item.icon} width={32} height={32} color={`${isActive ? "#014C46" : "white"}`} />
            <p className="text-sidebar-label">{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default LeftSidebar;
