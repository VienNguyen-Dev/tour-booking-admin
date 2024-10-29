"use client";
import Image from "next/image";
import React from "react";
import BadgeType from "./TypeBadge";
import { cn, formatAmount } from "@/lib/utils";
import Link from "next/link";

const ProductCard = ({ products, status, refreshUserList }: { products: Product[]; status?: string; refreshUserList: () => void }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {status && (
        <div
          className={cn("w-full h-[50px] rounded-bl-[8px] rounded-br-[8px] border-t-[4px] bg-white p-2 shadow-md shadow-[#00000040] capitalize mb-2", {
            "border-[#2F2B3D] text-[#2F2B3D] font-bold text-sm": status === "collection",
            "border-[#F09000] text-[#F09000] font-bold text-sm": status === "staycation",
            "border-[#005928] text-[#005928] font-bold text-sm": status === "default",
          })}
        >
          {status}
        </div>
      )}
      {products.map((product: Product, index) => (
        <div className="flex flex-col gap-4 mt-2" key={index}>
          <div className="relative w-full h-fit rounded-md shadow-[#2F2B3D24] shadow-md bg-white p-3">
            <div className="flex flex-col mt-[14px] py-2  gap-2">
              <div className="flex gap-2">
                <Image src={"/assets/icons/car.png"} width={20} height={20} alt="car" />
                <h1 className="text-xl font-bold">{product.categories}</h1>
              </div>
              <p className=" font-semibold text-xl">{product.name}</p>
              <div className="flex justify-between">
                <BadgeType type={product.status} />
                <div className="flex">
                  <p className="font-semibold text-lg text-[#014C46]">{formatAmount(product.price)}</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-2 left-2 bg-[#014C4633] border-[0.5px] border-[#014C46] py-[4px] px-[10px] max-w-[200px] h-[24px] w-full rounded-[4px] text-[#014C46] font-medium text-sm flex items-center justify-start">
              {product?.$id}
            </div>
          </div>
        </div>
      ))}
      <Link
        href={"/admin/orders/new-order"}
        target="_blank"
        className="flex justify-start items-center gap-2  w-full cursor-pointer p-2 border border-[#D0D5DDB2] shadow-[#00000040]  hover:bg-black/20 rounded-[6px]"
      >
        <Image src={"/assets/icons/plus.png"} alt="plus" width={24} height={24} />
        <p className="text-[#2F2B3D] text-[14px] font-medium capitalize">Add new item</p>
      </Link>
    </div>
  );
};

export default ProductCard;
