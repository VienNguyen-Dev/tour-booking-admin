import React from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import NotificationBadge from "./NotificationBadge";
import { Button } from "./ui/button";
import SvgIcon from "./SvgIcon";

const Notification = ({ notifications }: NotificationProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative justify-center items-center">
          <Image src={"/assets/icons/bell.svg"} alt="notification" width={26} height={24} className=" cursor-pointer " />
          {notifications.length > 0 && (
            <div className=" absolute top-0.5 -right-1 border-0.5 rounded-full bg-white flex items-center justify-center w-3 h-3">
              <SvgIcon path="/assets/icons/point-active.svg" width={8} height={8} color={"red"} />
            </div>
          )}
        </div>
      </SheetTrigger>

      <SheetClose asChild className="text-white">
        <SheetContent
          side={"right"}
          className=" shadow-sm shadow-[#00000040] px-[23px] py-[20px] border-none rounded-xl bg-white md:max-w-[300px] md:w-full w-fit md:mt-[62px] md:mr-[80px]  flex flex-col gap-4 h-fit mr-4 mt-4"
        >
          <SheetHeader className="flex items-center justify-center border-b p-2 border-gradient-custom">
            <SheetTitle className="text-[#014C46] text-lg xl:text-2xl font-bold h-[30px]">Notification</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            {notifications.map((noti: NotificationAdmin, index: number) => {
              return (
                <SheetClose asChild key={index}>
                  <NotificationBadge notification={noti} />
                </SheetClose>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button className="text-[#2F2B3D] text-sm xl:text-lg font-bold border-none focus-visible:ring-0 focus:ring-transparent hover:opacity-90 transition-opacity">See All</Button>
          </div>
        </SheetContent>
      </SheetClose>
    </Sheet>
  );
};

export default Notification;
