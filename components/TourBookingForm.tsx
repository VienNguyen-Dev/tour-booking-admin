import { CartContext } from "@/app/context/CartContext";
import React, { useState, useContext } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "./ui/form";
import CustomFormField from "./CustomFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { OrderItemCard } from "./OrderItemCard";
import PriceSlider from "./PriceSlider";

const newOrderSchema = z.object({
  productName: z.string(),
  bookingType: z.string(),
  type: z.string(),
  price: z.coerce.number().min(1).max(10000),
  dateRange: z.string(),
});
const TourBookingForm = ({ products }: { products: Product[] }) => {
  const { addToCart } = useContext(CartContext);
  const [isSending, setIsSending] = useState(false);
  const form = useForm<z.infer<typeof newOrderSchema>>({
    resolver: zodResolver(newOrderSchema),
  });

  async function onSubmit(values: z.infer<typeof newOrderSchema>) {
    //  const { email } = values;
    //  try {
    //    setIsSending(true);
    //    const res = await forgotPassword(email);
    //    if (res) setIsSuccess(true);
    //  } catch (error) {
    //    toast({
    //      title: "Change password error",
    //      description: "Please check your email and try again.",
    //      variant: "destructive",
    //    });
    //  } finally {
    //    setIsSending(false);
    //  }
  }
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    setSelectedDateRange(dateRange);
    console.log("Selected date range:", dateRange);
  };

  return (
    <div className="flex flex-col gap-4 p-5 justify-center items-center">
      <OrderItemCard products={products} />
      <Card className="w-full max-w-[600px] flex items-center flex-col justify-center mt-10">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Create a new Journey</CardTitle>
          <CardDescription>Please provide some information to complete a Journey.</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex gap-4 justify-center w-full">
              <div className="w-full max-w-[745px] space-y-4">
                <CustomFormField control={form.control} name="productName" label="Tour" placeholder="Select a tour" />
                <CustomFormField control={form.control} name="bookingType" label="Booking Type" placeholder="Select a booking type" />
                <CustomFormField control={form.control} name="type" label="Tour Type" placeholder="Select a tour type" />{" "}
                {/* <CustomFormField control={form.control} name="Tourprice" label="Tour Price" /> */}
                <PriceSlider />
                <CustomFormField control={form.control} name="dateRange" label="Date" placeholder="Select a date" dateRange={selectedDateRange} onDateRangeChange={handleDateRangeChange} />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-2">
          <Button variant="outline" className="text-[#a56538]  hover:bg-[#d65642] hover:text-white">
            Cancel
          </Button>
          <Button variant={"outline"} className="text-[#014C46]  hover:bg-[#014C46]/80 hover:text-white">
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TourBookingForm;
