"use client";

import CheckoutPage from "@/components/CheckoutPage";
import { getProductById } from "@/lib/actions/product.actions";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { formatAmount } from "@/lib/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { productId } = useParams();
  const [product, setProduct] = useState({} as Product);
  console.log(typeof product.price);
  useEffect(() => {
    const fetchProductById = async () => {
      const res = await getProductById(productId as string);
      if (res) setProduct(res);
    };
    fetchProductById();
  }, [productId]);
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">{product.name}</h1>
        <h2 className="text-2xl">
          Complete to receive a jouney only with
          <span className="font-bold"> {formatAmount(product.price)}</span>
        </h2>
      </div>

      {product.price && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(product.price),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={product.price!} />
        </Elements>
      )}
    </main>
  );
}
