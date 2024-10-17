import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookingCardItem } from "./BookingCardItem";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";

export declare interface Tour {
  $id: string;
  product: Product;
  image: string;
}
export function BookingCard({ tours }: { tours: Tour[] }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchGetCurrentUser = async () => {
      const loggedIn = await getLoggedInUser();
      if (loggedIn) setUser(loggedIn);
    };
    fetchGetCurrentUser();
  }, []);
  return (
    <Carousel className="w-full max-w-6xl">
      <CarouselContent className="-ml-1">
        {tours.map((tour, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <BookingCardItem tour={tour} user={user!} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
