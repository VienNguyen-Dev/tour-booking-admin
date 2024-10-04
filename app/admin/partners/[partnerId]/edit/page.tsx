"use client";
import EditPartnerForm from "@/components/EditPartnerForm";
import { getPartnerById, getProduct } from "@/lib/actions/partner.actions";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";

const EditPartner = () => {
  const path = usePathname();
  const [partner, setPartner] = useState({} as Partner);
  const [product, setProduct] = useState({} as Product);

  const { partnerId } = useParams();
  useEffect(() => {
    const res = async () => {
      const partnerInfo: Partner = await getPartnerById(partnerId as string);
      if (partnerInfo) {
        setPartner(partnerInfo);
      }
    };
    res();
  }, [partnerId]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res: Product = await getProduct(partnerId as string);
      if (res) setProduct(res);
    };
    fetchProduct();
  }, [partnerId]);
  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="font-bold text-sm lg:text-xl xl:text-2xl text-[#014C46]">
        <Link href={`/admin/partners`} className=" hover:underline">
          Partner List
        </Link>
        &nbsp; &#62; &nbsp;
        <span className=" capitalize">{path.includes("edit") && `${partner.name || "username"} > Edit`}</span>
      </h1>
      <EditPartnerForm partner={partner} product={product} />
    </div>
  );
};

export default EditPartner;
