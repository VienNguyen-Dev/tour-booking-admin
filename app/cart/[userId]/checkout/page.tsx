"use client";

import { useCart } from "@/app/context/CartContext";
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { formatAmount } from "@/lib/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { totalOrder } = useCart();
  const cart = JSON.parse(localStorage.getItem("cart") as string);
  const { userId } = useParams();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Total items: {cart.length}</h1>
        <h2 className="text-2xl">
          Complete to receive a jouney only with
          <span className="font-bold"> {formatAmount(totalOrder)}</span>
        </h2>
      </div>

      {totalOrder && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(totalOrder),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={totalOrder!} userId={userId as string} productId={productId as string} />
        </Elements>
      )}
    </main>
  );
}
