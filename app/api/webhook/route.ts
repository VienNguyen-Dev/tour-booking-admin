import { updateOrderStatus } from "@/lib/actions/order.actions";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature") as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error: Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      updateOrderStatus({ orderId: paymentIntent.metadata.orderId, status: "received" });
      break;
    case "payment_intent.payment_failed":
      const failedIntent = event.data.object;

      updateOrderStatus({ orderId: failedIntent.metadata.orderId, status: "canceled" });
      break;
    case "charge.refunded":
      const refund = event.data.object;
      updateOrderStatus({ orderId: refund.metadata.orderId, status: "refund" });
      break;
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
