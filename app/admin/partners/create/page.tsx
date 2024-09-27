"use client";
import PartnerInfo from "@/app/components/PartnerInfo";
import { usePathname } from "next/navigation";

import React from "react";

const CreatePartner = () => {
  const path = usePathname();
  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="font-bold text-xl xl:text-2xl text-[#014C46]">
        Partner List &#62; <span className=" capitalize">{path.includes("create") ? "Create" : path.includes("edit") ? `Username > Edit` : ""}</span>
      </h1>

      <PartnerInfo />
    </div>
  );
};

export default CreatePartner;
