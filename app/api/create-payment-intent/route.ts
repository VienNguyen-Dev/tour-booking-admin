import { createNewOrder } from "@/lib/actions/order.actions";
import { getProductById } from "@/lib/actions/product.actions";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const { userId, productId, amount } = await request.json();

  try {
    const product = await getProductById(productId as string);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    const orderData = {
      date: new Date().toDateString(),
      totalOrder: amount / 100,
      type: "physical",
      bookingStatus: "booked",
      status: "booking",
      customer: userId,
      product: productId,
      partner: product.partnerId.$id,
    } as CreateNewOrderParams;
    const newOrder = await createNewOrder(orderData);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: newOrder.$id,
    });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 });
  }
}
