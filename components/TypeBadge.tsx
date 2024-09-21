import { cn } from "@/lib/utils";
import React from "react";

const BadgeType = ({ type }: BadgeTypeProps) => {
  return (
    <div
      className={cn(" rounded-md px-[10px] w-fit py-[2px] h-[24px] flex justify-center items-center capitalize  text-sm font-medium", {
        "bg-[#AB329729]  text-[#AB3297]": type === "staycation",
        "bg-[#316AC129]  text-[#316AC1]": type === "collection",
        "bg-[#68686829]  text-[#686868]": type === "default",
        "bg-[#28C76F29] text-[#28C76F]": type === "active",
        "bg-[#00000029] text-[#f60202ef]": type === "block",
        "bg-[#F0900029] text-[#F09000]  ": type === "superAdmin",
        "bg-[#6af30929] text-[#00f020] ": type === "admin",
        "bg-[#54634a29] text-[#5b5d5b]  ": type === "user",
      })}
    >
      {type}
    </div>
  );
};

export default BadgeType;
