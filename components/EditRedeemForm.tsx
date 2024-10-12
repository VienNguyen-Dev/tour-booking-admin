"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardItem from "./CardItem";
import { bookingStatus, Items } from "@/app/constants";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  email: z.string().email("Please enter am email valid"),
  contact: z.string().min(10).max(15),
  orderStatus: z.string().optional(),
  bookingStatus: z.string().optional(),
});

const EditRedeemForm = ({ order }: { order: Order }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: order.customer?.email,
      contact: order.customer?.contact,
      orderStatus: order.status,
      bookingStatus: "booked",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
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
            <FormField
              control={form.control}
              name="orderStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#014C46] text-sm">Order Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Type..." {...field} />
                  </FormControl>
                  <FormMessage className="text-error-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bookingStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#014C46] text-sm">Booking Status</FormLabel>
                  <FormControl>
                    <Select defaultValue={order.partner?.bookingType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a booking status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          {bookingStatus.map((type, index) => (
                            <SelectItem key={index} value={type} className=" capitalize">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-error-message" />
                </FormItem>
              )}
            />
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
