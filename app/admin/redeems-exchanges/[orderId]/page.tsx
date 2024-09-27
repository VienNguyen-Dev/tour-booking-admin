"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas-pro";

import { cn, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EditRedeemForm from "../components/EditRedeemForm";
import RemoveDialog from "../components/RemoveDialog";

const RedeemDetail = () => {
  const { orderId } = useParams();
  const voucherRef = useRef<HTMLDivElement>(null);

  const handleArchive = async () => {
    if (voucherRef.current) {
      const canva = await html2canvas(voucherRef.current);
      const imgData = canva.toDataURL("image/png");
      const linkElement = document.createElement("a");
      linkElement.href = imgData;
      linkElement.download = `redeem_${orderId}.png`;
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    }
  };
  //Write a function to handle server side to take order by orderId
  //   useEffect(() => {
  //   const fetchOrderById = async() => {
  // const order = await getOrderById(orderId);
  // return order;
  //   }
  //   fetchOrderById();
  //   }, [orderId])
  const order = {
    orderId: "728ed52f1",
    date: new Date(Date.now()).toString(),
    customer: {
      name: "Vien",
      email: "vien@gmail.com",
      orderCount: 4,
      contact: "05894989333",
      shippingInfo: {
        address: "PO Box 944881, Meadows 8 - Street 2 Villa 15",
        city: "Dubai",
        country: "Arab Emirates",
        packageType: "Gift Envelope",
        shippingOption: "standard",
      },
    },
    product: {
      name: "Helocopter Ride",
      status: "live",
      categories: "SPA",
      partner: {
        name: "Teo",
        email: "teo@gmail.com",
        phone: "0943974857",
      },
      type: "default",
      price: 123,
    },

    status: "received",
  };

  return (
    <section className="flex flex-col w-full space-y-6 p-[22px]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg xl:text-xl font-bold  text-[#014C46]">{`Redeems & Exchanges - ${orderId}`}</h2>
      </div>
      {/* Voucher and eidt redeem */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Voucher */}
        <div className="flex flex-col gap-4 w-full space-y-6 flex-1 md:min-w-[663px]">
          <div
            ref={voucherRef}
            className="flex flex-col max-w-[663px] relative w-full rounded-[12px] "
            style={{
              boxShadow: "4px 4px 4px 4px #00000040",
            }}
          >
            <div className="flex-1 w-full flex flex-col gap-4 rounded-[6px] ">
              <div className="relative min-h-[260px]">
                <div className="absolute top-0 right-0 z-0">
                  <div className=" relative ">
                    <Image src="/assets/image/redeem-background.png" width={433} height={300} alt="redeem-background" className="object-cover rounded-tr-[12px]  h-[240px] xl:w-[433px]" />
                  </div>
                </div>
                <div className="relative z-10 min-h-[260px] bg-[url('/assets/image/redeem-bg.png')] flex flex-col gap-1 ">
                  <div className="absolute  bottom-4 left-[270px] z-10">
                    <div className="relative">
                      <Image src={"/assets/icons/coupon.png"} width={100} height={100} alt="coupon" />

                      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
                        <span className="font-kapakana text-[22px] text-[#FFB849] font-normal block">Ride</span>
                        <span className="font-medium text-[14px] text-[#FFB849] block italic">$274,00</span>
                        <span className="font-kapakana text-[22px] text-[#FFB849] font-normal block">Only</span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute  bottom-2 right-2 z-10 rounded-[4px] p-2 bg-[#FFFFFF]"
                    style={{
                      boxShadow: "2px 2px 4px 0px #00000040",
                    }}
                  >
                    <Image src={"/assets/icons/qrcode.png"} width={40} height={40} alt="qrcode" />
                  </div>
                  <div className="pt-[26px] pl-[30px]">
                    <div className="relative max-w-[200px] mb-2 ">
                      <Image src={"/assets/icons/voucher.png"} alt="voucher" width={156} height={50} />
                      <p className="absolute -top-2 right-10 text-[#FFB849] font-kaushan-script text-sm ">Details</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="font-bold text-[16px] text-[#0D062D] ">{order.customer.name}</h2>
                      <div className="flex gap-2">
                        <p className="text-[#014C46] text-[12px] font-bold">City:</p>
                        <span className="font-normal text-[12px] text-[#0D062D]">{order.customer.shippingInfo.city}</span>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-[#014C46] text-[12px] font-bold">Country:</p>
                        <span className="font-normal text-[12px] text-[#0D062D]">{order.customer.shippingInfo.country}</span>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-[#014C46] text-[12px] font-bold capitalize">Package Type:</p>
                        <span className="font-normal text-[12px] text-[#0D062D]">{order.customer.shippingInfo.packageType}</span>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-[#014C46] text-[12px] font-bold capitalize">Shipping option:</p>
                        <span className="font-normal text-[12px] text-[#0D062D]">{order.customer.shippingInfo.shippingOption}</span>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-[#014C46] text-[12px] font-bold capitalize">Expiry date:</p>
                        <span className="font-normal text-[12px] text-[#0D062D]">December 25, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" h-[28px] bg-[#0D062D] rounded-bl-[12px] rounded-br-[6px] w-full">
              <div className="flex justify-center items-center gap-1 border-none space-y-1">
                <Image src={"/assets/icons/Location.png"} width={16} height={16} alt="location" className="mt-1" />
                <p className="text-sm font-normal text-white">{order.customer.shippingInfo.address}</p>
              </div>
            </div>
            <div className=" absolute left-0 bottom-0 z-10">
              <div className="relative">
                <Image src={"/assets/icons/triangle.png"} width={54} height={75} alt="triangle" className="rounded-bl-[12px]" />
                <div className="absolute top-1.5 -right-0.5">
                  <Image src={"/assets/icons/border-white.png"} width={55} height={71} alt="border" className="rounded-bl-[12px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Processing of the voucher */}
          <div
            className="flex max-w-[663px] min-h-[334px] relative w-full rounded-[12px] bg-white pl-8 pr-6 pt-8 pb-4"
            style={{
              boxShadow: "0px 3px 12px 0px #2F2B3D24",
            }}
          >
            <div className=" flex">
              {/* Pricess session */}
              <div className="space-y-4 w-full max-w-[267px] mr-14">
                {[
                  { status: "received", subtext: "Order was sent by customer Y", date: "2023-03-15 10:10 AM" },
                  { status: "canceled", subtext: "Order was canceled by customer Y", date: "2023-03-15 10:15 AM" },
                  { status: "processing", subtext: "Order was selected to process by...", date: "2023-03-15 10:00 AM" },
                  { status: "booked", subtext: "Order was booked by...", date: "2023-03-15 10:05 AM" },
                  { status: "invoice sent", subtext: "The invoice for partner X was sent" },
                  { status: "complete", subtext: "The customer X has enjoyed the experience" },
                ].map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={cn("w-5 h-5 bg-white rounded-full border-[2px] border-[#014C46] ", {
                          "bg-[#2F2B3D] border-none": step.status === "received",
                          "bg-[#CF0000] border-none": step.status === "canceled",
                          "bg-[#28C76F] border-none": step.status === "processing",
                          "bg-[#316AC1] border-none": step.status === "booked",
                        })}
                      ></div>
                      {step.status !== "complete" && <p className="border h-[38px] border-[#014C46] w-[1px]"></p>}
                    </div>

                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center ">
                        <p className="font-bold text-[#014C46] text-[15px] capitalize">{step.status}</p>
                        {step.status !== "complete" && step.status !== "invoice sent" && <p className="font-normal text-[#727272] text-xs">{formatDateTime(new Date(step.date!)).timeOnly}</p>}
                      </div>
                      <p className="font-normal text-[#0D062D] text-sm line-clamp-1">{step.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Comments section */}
              <div className="w-full space-y-4 max-w-[279px] border-b-[0.5px] border-[#B2B2B2] py-[13px] h-fit hidden md:block">
                {[
                  { name: "Cora Malower", avatar: "/assets/icons/user1.png", createdAt: "Jul 24", content: "Reddem created manually due to technical error" },
                  { name: "Lukas Krejca", avatar: "/assets/icons/user.png", createdAt: "3m", content: "Wating for Gigi to decide on exchnage as this experience is unavalible till October" },
                ].map((comment, index) => (
                  <div key={index} className={`flex flex-col gap-1`}>
                    <div className={`flex gap-2 h-[30px] justify-start items-center`}>
                      <Image src={comment.avatar} alt="user" width={30} height={30} />
                      <p className=" font-bold text-xs text-[#014C46]">{comment.name}</p>
                      <p className="text-xs text-[#494949] font-light">{comment.createdAt}</p>
                    </div>
                    <p className="pl-10 font-normal text-xs text-[#0D062D]">{comment.content}</p>
                  </div>
                ))}
                <div className="flex gap-4 min-w-[134px] w-full h-[30px] items-center">
                  {/* Comment of Admin or supper Admin */}
                  <Image src={"/assets/icons/super-admin.png"} width={30} height={30} alt="admin-comment" />
                  <Input className="border-none h-[30px] focus-visible:ring-0 focus:ring-transparent" placeholder="Add a comment..." />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Form Edit redeem and exchange */}
        <div className="md:min-w-[300px] w-full flex-col justify-center items-center gap-2">
          <EditRedeemForm order={order} />
        </div>
      </div>
      {/* Button  */}
      <div className="flex gap-4 ">
        <Button onClick={handleArchive} className="flex gap-1 h-10 py-2 px-5 rounded-[4px]  border border-[#0D062D1A] cursor-pointer text-sm font-medium items-center hover:bg-orange-200">
          <Image src={"/assets/icons/archive.png"} width={20} height={20} alt="archive" />
          Archive
        </Button>
        {/* This is delete content  */}
        <RemoveDialog />
      </div>
    </section>
  );
};

export default RedeemDetail;
