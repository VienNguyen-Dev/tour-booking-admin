"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CardItem from "./CardItem";
import { Items } from "@/app/constants";
import Image from "next/image";

import { redeemSchema } from "./validations";
import CustomFormField from "./CustomFormField";

const EditRedeemForm = ({ order }: { order: Order }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof redeemSchema>>({
    resolver: zodResolver(redeemSchema),
    defaultValues: {
      email: order.customer?.email,
      contact: order.customer?.contact,
      orderStatus: order.status,
      bookingStatus: order.bookingStatus,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof redeemSchema>) {
    alert("You need to handle form edit redeem and exchange");
    // console.log(values);
  }
  const items = Items("redeem");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="flex gap-4 flex-col sm:w-full max-w-[663px] max-sm:min-w-[300px]">
          <div className="flex flex-col gap-4 ">
            {items.map((item, index) => {
              const subtitle = item.title === "total orders" ? "2000" : item.title === "total redeems" ? "1000" : item.title === "email" ? order.customer?.email : order.customer?.contact;
              return <CardItem key={index} title={item.title} icon={item.icon} subtitle={subtitle!} />;
            })}
          </div>
          <div
            className="sflex-col justify-center items-center space-y-6 h-fit p-[22px] rounded-xl bg-white "
            style={{
              boxShadow: "0px 3px 12px 0px #2F2B3D24",
            }}
          >
            <h2 className="text-[#014C46] font-bold text-[16px]">Redeem Activity</h2>
            <CustomFormField control={form.control} name="orderStatus" placeholder="Type..." label="Order Status" />
            <CustomFormField control={form.control} name="bookingStatus" label="Booking Status" placeholder="Select a booking status" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="flex gap-1 h-10 py-2 px-5 rounded-[4px]   border border-[#0D062D1A] cursor-pointer text-sm font-medium  hover:bg-blue-500/20 ">
            <Image src={"/assets/icons/Check.png"} width={20} height={20} alt="Check" />
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditRedeemForm;
