"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import TourBookingForm from "@/components/TourBookingForm";
import { useCart } from "../context/CartContext";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import HeaderPage from "@/components/HeaderPage";

const Booking = () => {
  let { cart } = useCart();
  const path = usePathname();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser();
      setUser(loggedInUser);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-5">
      <HeaderPage user={user} cartCount={cart.length} />
      <h1 className="font-bold text-xl xl:text-2xl text-[#014C46]">
        <div className="flex items-center">
          <Link href={`/cart`} className=" hover:underline">
            Tour List
          </Link>
          &nbsp; &#62; &nbsp;
          <span className=" capitalize">{path.includes("booking") && "Book"}</span>
        </div>
      </h1>
      <TourBookingForm />
    </div>
  );
};

export default Booking;
