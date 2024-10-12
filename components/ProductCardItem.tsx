import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { formatAmount } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";

import Link from "next/link";

export function ProductCardItem({ product }: { product: Product }) {
  const handleAddToCart = () => {};

  const handlePayment = () => {};

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <p>{product.categories}</p>
          <p>{product.url}</p>
          <p>{formatAmount(product.price)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="hover:bg-[#f79c51] bg-[#f79c51a1]" variant="outline">
          Add To Card
        </Button>
        <Link href={`/checkout/${product.$id}`}>
          <Button className="hover:bg-[#52e7dbe0] bg-[#52e7db8e]" variant={"outline"}>
            Buy
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
