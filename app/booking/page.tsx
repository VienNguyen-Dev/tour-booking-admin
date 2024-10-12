"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import TourBookingForm from "@/components/TourBookingForm";
import { getAllProducts } from "@/lib/actions/product.actions";

const Booking = () => {
  const path = usePathname();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getAllProducts();
      if (products) setData(products);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="font-bold text-xl xl:text-2xl text-[#014C46]">
        <div className="flex items-center">
          <Link href={`/cart`} className=" hover:underline">
            Cart List
          </Link>
          &nbsp; &#62; &nbsp;
          <span className=" capitalize">{path.includes("booking") && "New"}</span>
        </div>
      </h1>
      <TourBookingForm products={data} />
    </div>
  );
};

export default Booking;
