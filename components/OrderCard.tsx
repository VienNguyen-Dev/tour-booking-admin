import Image from "next/image";
import React from "react";
import BadgeType from "./TypeBadge";
import { cn, formatDateTime } from "@/lib/utils";

const OrderCard = ({ orders, status }: { orders: Order[]; status: string }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        className={cn("w-full h-[50px] rounded-bl-[8px] rounded-br-[8px] border-t-[4px] bg-white p-2 shadow-md shadow-[#00000040] capitalize mb-2", {
          "border-[#2F2B3D] text-[#2F2B3D] font-bold text-sm": status === "received",
          "border-[#F09000] text-[#F09000] font-bold text-sm": status === "processing",
          "border-[#005928] text-[#005928] font-bold text-sm": status === "booking",
          "border-[#CF0000] text-[#CF0000] font-bold text-sm": status === "canceled",
        })}
      >
        {status}
      </div>
      {orders.map((order: Order) => (
        <div className="flex flex-col gap-4 mt-2">
          <div className="relative w-full h-fit rounded-md shadow-[#2F2B3D24] shadow-md bg-white p-3">
            <div className="flex flex-col border-b-[1.5px] border-[#38414A] mt-[14px] py-2  gap-2">
              <div className="flex gap-2">
                <Image src={"/assets/icons/car.png"} width={20} height={20} alt="car" />
                <h1 className="text-xl font-bold">{order?.product.categories}</h1>
              </div>
              <p>{order?.product.name}</p>
              <div className="flex justify-between">
                <BadgeType type={order?.product.type} />
                <div className="flex">
                  <Image src={"/assets/icons/admin.png"} width={24} height={24} alt="admin" className="object-cover" />
                  <Image src={"/assets/icons/user.png"} width={24} height={24} alt="user" className="object-cover" />
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center gap-2">
              <div className="w-full max-w-[200px] h-[24px] rounded-[4px] border text-[10px]  px-[6px] py-[4px] border-[#E2E2E2] text-[#0D062D]">
                {formatDateTime(new Date(order?.date)).dateOnly} | {formatDateTime(new Date(order?.date)).timeOnly}
              </div>
              <div className="flex gap-1 justify-center items-center">
                <Image src={"/assets/icons/message.png"} width={12} height={12} alt="message" />
                <p className=" text-xs font-medium text-black">12</p>
              </div>
            </div>
            <div className="absolute -top-2 left-2 bg-[#014C4633] border-[0.5px] border-[#014C46] py-[4px] px-[10px] max-w-[109px] h-[24px] w-full rounded-[4px] text-[#014C46] font-medium text-sm flex items-center justify-start">
              {order?.orderId}
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

export default OrderCard;
