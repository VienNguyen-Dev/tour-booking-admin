"use client";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CardItem = ({ title, icon, subtitle }: CardItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [phone, setPhone] = useState(title === "contact no" ? subtitle : "");

  const placeholderMap: { [key: string]: string } = {
    email: "example.@gmail.com",
    "poc contact": "example.@gmail.com",
    fee: "$123",
    website: "https://domain.com",
    "contact no": "(+971)8578493657",
  };

  const placeholder = placeholderMap[title];

  return (
    <div
      className=" md:w-full max-md:max-w-[300px] rounded-xl border p-2 flex gap-2 border-[#014C461A] bg-white items-center justify-between"
      style={{
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
    >
      <div className="flex gap-2 flex-col lg:flex-row">
        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-[10px] p-2 flex items-center justify-center bg-[#014C4633]">
          <Image src={icon} alt={title} width={22} height={22} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm lg:text-[16px] font-bold text-[#014C46] capitalize">{title}</h2>
          <p className={`${isEdit && "hidden"} text-xs`}>
            {subtitle}
            {`${title === "fee" ? "%" : ""}`}
          </p>
          {isEdit &&
            (title !== "contact no" ? (
              <Input
                placeholder={placeholder}
                type={title === "email" ? "email" : title === "fee" ? "number" : "text"}
                disabled={!isEdit}
                className=" font-normal text-sm text-black bg-transparent p-4 h-4 w-[200px]"
                required
                defaultValue={title === "total orders" || title === "total radeem" || title === "fee" ? `${Number(subtitle)}` : subtitle}
                min={0}
                step={0.1}
                max={100}
              />
            ) : (
              <PhoneInput
                disabled={!isEdit}
                inputStyle={{
                  width: "200px",
                }}
                placeholder={placeholder}
                country={"ae"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            ))}
        </div>
      </div>
      {/*  "total orders": "2000",
                "total redeems": "1000", */}
      {title !== "total orders" && title !== "total redeems" && (
        <Image onClick={() => setIsEdit(true)} src={"/assets/icons/edit.png"} alt={title} width={16} height={16} className=" cursor-pointer hover:opacity-75" />
      )}
    </div>
  );
};

export default CardItem;
