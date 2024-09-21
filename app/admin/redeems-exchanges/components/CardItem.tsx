"use client";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CardItem = ({ title, icon, subtitle }: CardItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [phone, setPhone] = useState(title === "contact no" ? subtitle : "");
  return (
    <div
      className=" md:w-full max-md:max-w-[300px] rounded-xl border p-2 flex gap-2 border-[#014C461A] bg-white items-center justify-between"
      style={{
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
    >
      <div className="flex gap-2 ">
        <div className="w-10 h-10 rounded-[10px] p-2 flex items-center justify-center bg-[#014C4633]">
          <Image src={icon} alt={title} width={22} height={22} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className=" text-[16px] font-bold text-[#014C46] capitalize">{title}</h2>
          <p className={`${isEdit && "hidden"}`}>{subtitle}</p>
          {isEdit &&
            (title !== "contact no" ? (
              <Input
                placeholder={"expamle.@gmail.com"}
                type={title === "email" ? "email" : "text"}
                disabled={!isEdit}
                className=" font-normal text-sm text-black bg-transparent p-4 h-4 w-[180px]"
                required
                defaultValue={title === "total orders" || title === "total radeem" ? Number(subtitle) : subtitle}
              />
            ) : (
              <PhoneInput
                disabled={!isEdit}
                inputStyle={{
                  width: "180px",
                }}
                placeholder="(+971) 5372948395"
                country={"ae"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            ))}
        </div>
      </div>
      {(title === "email" || title === "contact no") && (
        <Image onClick={() => setIsEdit(true)} src={"/assets/icons/edit.png"} alt={title} width={16} height={16} className=" cursor-pointer hover:opacity-75" />
      )}
    </div>
  );
};

export default CardItem;
