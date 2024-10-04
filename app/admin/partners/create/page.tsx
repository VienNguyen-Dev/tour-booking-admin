"use client";
import PartnerInfo from "@/components/PartnerInfo";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const CreatePartner = () => {
  const path = usePathname();
  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="font-bold text-xl xl:text-2xl text-[#014C46]">
        <div className="flex items-center">
          <Link href={`/admin/partners`} className=" hover:underline">
            Partner List
          </Link>
          &nbsp; &#62; &nbsp;
          <span className=" capitalize">{path.includes("create") && "Create"}</span>
        </div>
      </h1>

      <PartnerInfo />
    </div>
  );
};

export default CreatePartner;
