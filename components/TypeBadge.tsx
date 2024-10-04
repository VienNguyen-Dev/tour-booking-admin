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
        "bg-[#6af30929] text-[#00f020]": type === "admin",
        "bg-[#54634a29] text-[#5b5d5b]": type === "user",
        "bg-[#F0900029] text-[#F09000]": type === "adventure",
        "bg-[#68686829] text-[#686868]": type === "sports",
        "bg-[#dfd51d29] text-[rgb(104,104,104)]": type === "family",
        "bg-[#78df1d29] text-[#b8aeae]": type === "family",
        "bg-[#0de79729] text-[#04ef99c9]": type === "nature",
        "bg-[#5d7d9429] text-[#0396f8]": type === "culture",
        "bg-[#7f15e329] text-[#bc5151]": type === "historical",
        "bg-[#e414ac29] text-[#e414add4]": type === "other",
        "bg-[#316AC129] text-[#316AC1]": type === "email",
        "bg-[#c1319b29] text-[#9aa5b7]": type === "phone",
        "bg-[#5ec12429] text-[#989faa]": type === "website",
        "bg-[#c9561c29] text-[#a07843]": type === "socialMedia",
        "bg-[#28C76F29] text-[#28C76F] ": type === "monthly",
        "bg-[#ea3b0a29] text-[#a05042] ": type === "daily",
        "bg-[#0d56df29] text-[#5b72a3] ": type === "weekly",
      })}
    >
      {type} {type === "daily" || type === "weekly" || (type === "monthly" && "Payments")}
    </div>
  );
};

export default BadgeType;
