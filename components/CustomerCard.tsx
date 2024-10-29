import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const CustomerCard = ({ customers, status }: { customers: Customer[]; status: string }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        className={cn("w-full h-[50px] rounded-bl-[8px] rounded-br-[8px] border-t-[4px] bg-white p-2 shadow-md shadow-[#00000040] capitalize mb-2", {
          "border-[#F09000] text-[#F09000] font-bold text-sm": status === "first-time",
          "border-[#005928] text-[#005928] font-bold text-sm": status === "repeated",
          "border-[#CF0000] text-[#CF0000] font-bold text-sm": status === "royality",
        })}
      >
        {status}
      </div>
      {customers.map((customer: Customer, index) => (
        <div className="flex flex-col gap-6 mt-2" key={index}>
          <div className="relative w-full h-fit rounded-md shadow-[#2F2B3D24] shadow-md bg-white p-4">
            <div className="flex flex-col mt-[14px] py-2  gap-2">
              <div className="flex gap-2">
                <img src={customer?.avatar} alt={customer?.name} width={38} height={38} className=" cursor-pointer rounded-full" />
                <h1 className="text-xl font-bold">{customer?.name}</h1>
              </div>
              <p>{customer.email}</p>
            </div>
            <div className="absolute -top-2 left-2 bg-[#014C4633] border-[0.5px] border-[#014C46] py-[4px] px-[10px] max-w-[200px] h-[24px] w-full rounded-[4px] text-[#014C46] font-medium text-sm flex items-center justify-start">
              {customer?.$id}
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

export default CustomerCard;
