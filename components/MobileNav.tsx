"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { LinkSideBar } from "@/app/constants";
import { usePathname } from "next/navigation";
import SvgIcon from "./SvgIcon";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src={"/assets/icons/menu-2.png"} alt="menu-2" width={32} height={32} className=" cursor-pointer " />
      </SheetTrigger>

      <SheetClose asChild className="text-white">
        <SheetContent side={"left"} className="border-none bg-[#014C46] space-y-6 max-w-[320px]">
          <Link href={"/admin/redeems-exchanges"} className="flex items-center justify-center gap-2 pt-[22px] w-full min-h-[80px] border-none">
            <Image src={"/assets/icons/redeems-exchanges.png"} width={35} height={35} alt="logo" />
            <p className=" text-xl xl:text-3xl font-bold text-white ">Tour Dubai</p>
          </Link>
          <nav className="flex flex-col gap-6 ">
            {LinkSideBar.map((item) => {
              const pathname = usePathname();

              const isActive = pathname.includes(item.link) || pathname.startsWith(`/admin/${item.link}`);
              return (
                <SheetClose asChild key={item.label}>
                  <Link href={item.link} key={item.label} className={`flex items-center px-3  gap-2 min-h-[40px] rounded-md ${isActive ? "bg-white w-full text-[#014C46]" : "text-white"}`}>
                    <SvgIcon fit path={item.icon} width={32} height={32} color={`${isActive ? "#014C46" : "white"}`} />
                    <p className="text-sidebar-label">{item.label}</p>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </SheetClose>
    </Sheet>
  );
};

export default MobileNav;
