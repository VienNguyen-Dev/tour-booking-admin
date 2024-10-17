"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
import TourBookingForm from "@/components/TourBookingForm";

const NewOrder = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="font-bold text-xl xl:text-2xl text-[#014C46]">
        <div className="flex items-center">
          <Link href={`/admin/orders`} className=" hover:underline">
            Order List
          </Link>
          &nbsp; &#62; &nbsp;
          <span className=" capitalize">{path.includes("new-order") && "New"}</span>
        </div>
      </h1>
      <TourBookingForm />
    </div>
  );
};

export default NewOrder;
