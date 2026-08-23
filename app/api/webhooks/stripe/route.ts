import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { stripe } from "@/lib/stripe";
import { sendOrderConfirmationEmail } from "@/lib/email";

// Stripe needs the raw request body (unparsed) to verify the signature,
// so we read it with request.text() below rather than request.json().
export const runtime = "nodejs";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set. Add it to .env.local.");
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret as string);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    try {
      await connectToDatabase();

      const order = await Order.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      if (!order) {
        // Shouldn't normally happen (order is created before the PaymentIntent
        // is confirmed), but don't error the webhook over it — log and move on.
        console.error(
          `No order found for PaymentIntent ${paymentIntent.id}`
        );
        return NextResponse.json({ received: true });
      }

      // Idempotency check: Stripe can and will deliver the same event more
      // than once. If we've already marked this order paid, don't re-process.
      if (order.status === "paid" || order.status === "shipped" || order.status === "delivered") {
        return NextResponse.json({ received: true });
      }

      order.status = "paid";
      await order.save();

      if (!order.confirmationEmailSent) {
        await sendOrderConfirmationEmail(order.email, order.id);
        order.confirmationEmailSent = true;
        await order.save();
      }
    } catch (err) {
      console.error("Error processing payment_intent.succeeded:", err);
      // Return 500 so Stripe retries — this is a processing failure on our
      // side, not a bad event, so we want the retry.
      return NextResponse.json({ error: "Processing error." }, { status: 500 });
    }
  }

  // Acknowledge all other event types without special handling for now.
  return NextResponse.json({ received: true });
}