import Image from "next/image";
import React from "react";
import BadgeType from "./TypeBadge";
import { cn } from "@/lib/utils";
import SvgIcon from "./SvgIcon";

const PartnerCard = ({ partners, type }: { partners: Partner[]; type: string }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        className={cn("w-full h-[50px] rounded-bl-[8px] rounded-br-[8px] border-t-[4px] bg-white p-2 shadow-md shadow-[#00000040] capitalize mb-2", {
          "border-[#2F2B3D] text-[#2F2B3D] font-bold text-sm": type === "phone",
          "border-[#F09000] text-[#F09000] font-bold text-sm": type === "website",
          "border-[#005928] text-[#005928] font-bold text-sm": type === "email",
          "border-[#CF0000] text-[#CF0000] font-bold text-sm": type === "social media",
        })}
      >
        {type}
      </div>
      {partners.map((partner: Partner) => (
        <div className="flex flex-col gap-4 mt-2">
          <div className="relative w-full h-fit rounded-md shadow-[#2F2B3D24] shadow-md bg-white p-3">
            <div className="flex flex-col border-b-[1.5px] border-[#38414A] mt-[14px] py-2  gap-2">
              <div className="flex gap-2">
                <SvgIcon path="/assets/icons/user-regular.svg" width={20} height={20} />
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl font-bold">{partner.name}</h1>
                  <p className="text-sm font-normal text-gray-500">{partner.email}</p>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {partner.tags.map((tag: string, index: number) => (
                  <BadgeType key={index} type={tag} />
                ))}
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center gap-2">
              <div className="w-full max-w-[200px] h-[24px] rounded-[4px] border text-[10px]  px-[6px] py-[4px] border-[#E2E2E2] text-[#0D062D] flex justify-center items-center gap-1">
                <div className="flex gap-1 justify-center items-center">
                  <SvgIcon path="/assets/icons/cart.svg" width={10} height={10} color="orange" />
                  <p>{`Orders: 30`}</p>
                </div>
                |
                <div className="flex gap-1 justify-center items-center">
                  <SvgIcon path="/assets/icons/ban.svg" width={10} height={10} color="red" />
                  <p>{`Cancel: 2`}</p>
                </div>
                |
                <div className="flex gap-1 justify-center items-center">
                  <SvgIcon path="/assets/icons/list.svg" width={10} height={10} color="blue" />
                  <p>{`Total: 32`}</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <BadgeType type={partner.type} />
              </div>
            </div>
            <div className="absolute -top-2 left-2 bg-[#014C4633] border-[0.5px] border-[#014C46] py-[4px] px-[10px] max-w-[109px] h-[24px] w-full rounded-[4px] text-[#014C46] font-medium text-sm flex items-center justify-start">
              {partner.$id}
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-start items-center gap-2  w-full cursor-pointer p-2 border border-[#D0D5DDB2] shadow-[#00000040]  hover:bg-black/20 rounded-[6px]">
        <Image src={"/assets/icons/plus.png"} alt="plus" width={24} height={24} />
        <p className="text-[#2F2B3D] text-[14px] font-medium capitalize">Add new item</p>
      </div>
    </div>
  );
};

export default PartnerCard;
