import React from "react";
import { TabsList, TabsTrigger } from "./ui/tabs";
import { TypesData } from "@/app/constants";
import SvgIcon from "./SvgIcon";

const DataTrigger = ({ value }: { value: string }) => {
  return (
    <TabsList>
      <div className="flex items-center ">
        {TypesData.map((type) => {
          return (
            <TabsTrigger key={type.title} value={type.title} className={`${value === "board" && type.title === "board" ? "rounded-tl-[4px] rounded-bl-[4px]" : "rounded-tr-[4px] rounded-br-[4px]"}`}>
              <div
                className={`
                     p-[10px] flex items-center gap-2 h-[40px] max-w-[80px] hover:opacity-90 transition-opacity cursor-pointer  border-[1px] border-[#014C461A]`}
              >
                <SvgIcon width={20} height={20} color={`${type.title === value ? "white" : "#014C46"} `} path={type.icon} />
                <p className=" font-medium text-[13px] capitalize">{type.title}</p>
              </div>
            </TabsTrigger>
          );
        })}
      </div>
    </TabsList>
  );
};

export default DataTrigger;
