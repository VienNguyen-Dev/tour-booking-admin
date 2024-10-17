import { CartContext } from "@/app/context/CartContext";
import React, { useState, useContext, useEffect } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "./ui/form";
import CustomFormField from "./CustomFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import PriceSlider from "./PriceSlider";
import { BookingCard, Tour } from "./BookingCard";
import { getAllTours } from "@/lib/actions/tour.actions";

const newOrderSchema = z.object({
  productName: z.string(),
  bookingType: z.string(),
  type: z.string(),
  price: z.coerce.number().min(1).max(10000),
  dateRange: z.string(),
});
const TourBookingForm = () => {
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

  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchTour = async () => {
      const res = await getAllTours();
      setTours(res);
    };
    fetchTour();
  }, []);
  // const tours = [
  //   {
  //     $id: "tour1-id",
  //     name: "Dinner in the Sky",
  //     description:
  //       "Dinner in the Sky is one of the most unique dining experiences in Dubai. A table is suspended by a crane 50 meters high in the sky while you indulge in the luxurious dining experience. Dinner in the sky is one of the most unusual restaurant in the world. Celebrate special occasion and make your day a memorable one with this ultimate dining experience in Dubai.",
  //     price: 135,
  //     image: "/assets/image/board-tour.jpg",
  //   },
  //   {
  //     $id: "tour2-id",
  //     name: "Super Yacht Experience",
  //     description: "Enjoy cruising on a tri deck luxury super yacht. Suitable for families, couples and friends alike.",
  //     price: 360,
  //     image: "/assets/image/city-tour.jpg",
  //   },

  //   {
  //     $id: "tour3-id",

  //     name: "Evening Desert Safari with BBQ Dinner and Entertainment",
  //     description:
  //       "The tour begins with 4x4 vehicle picking you up from your hotel or home and driving down you to the outskirts of desert. An experienced safari drivers will drive you through the exciting desert sand dunes to experience the roller coaster thrilling dune bashing. Experience your adrenaline going high up while the sands sweeps around your vehicle. Dont miss the chance to capture some breathtaking pictures of the desert during sunset. Once you arrive at the campsite you can enjoy a , traditional arabic coffee as a welcome drink,  ladies can get a henna tattoo. Apart from the this, enjoy the highlights of the tour the tanoura dance, belly dance, other live performances and delicious buffet dinner.",
  //     price: 90,
  //     image: "/assets/image/night-city-tour.jpg",
  //   },
  //   {
  //     $id: "tour4-id",

  //     name: "Iconic Tour - 12 min",
  //     description:
  //       "Depart from the Helidubai Jumeirah Heliport and experience a mesmerizing sites of the Palm Jumeirah and Burj Al Arab’s iconic structure. As your aerial tour continues, fly above the astonishing Dubai beaches. Be adorned with the views of the amazing architectural masterpiece of Burj Khalifa – the tallest building in the world, the Dubai Canal, and other artistically built skyscrapers at the Business Bay. Return towards Helidubai Helipad with unforgettable memories of Dubai.",
  //     price: 90,
  //     image: "/assets/image/heliport.jpg",
  //   },
  //   {
  //     $id: "tour5-id",

  //     name: "AYA Universe and View at The Palm Combo",
  //     description:
  //       "Visit 2 best toursit attractions in Dubai AYA Universe and View at the Palm. AYA Park is a space where you can dance with avatars, encounter new creatures, and interact with elements that exist nowhere else. It's a truly unique and immersive experience that will leave you in awe. The View observatory deck on level 52 of Palm Tower offers panoramic, 360-degree views of Palm Jumeirah, the Arabian Gulf and iconic landmarks of Dubai from an outdoor terrace.",
  //     price: 90,
  //     image: "/assets/image/car-tour.jpg",
  //   },
  // ] as Tour[];
  return (
    <div className="flex flex-col gap-4 p-5 justify-center items-center">
      <BookingCard tours={tours} />
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
