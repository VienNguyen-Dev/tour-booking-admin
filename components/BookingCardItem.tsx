import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { formatAmount } from "@/lib/utils";

import Link from "next/link";
import { Tour } from "./BookingCard";
import { useCart } from "@/app/context/CartContext";

export function BookingCardItem({ tour, user }: { tour: Tour; user: User }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(tour);
  };

  const handlePayment = () => {};
  if (!user) return;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className=" cursor-pointer">{tour.product.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-1.5 cursor-pointer">
          <img src={tour.image} alt={tour.product.name} width={350} height={250} className="rounded-sm" />
          <p className=" line-clamp-2">{tour.product.variant?.description}</p>
          <p>{formatAmount(tour.product.price)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleAddToCart} className="hover:bg-[#f79c51] bg-[#f79c51a1]" variant="outline">
          Add To Cart
        </Button>
        <Link href={`/cart/${user.$id!}`}>
          <Button className="hover:bg-[#52e7dbe0] bg-[#52e7db8e]" variant={"outline"}>
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
