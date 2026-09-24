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

// Single-product store for now — if a second product gets added later,
// this needs to come from the order itself instead of being hardcoded.
const PRODUCT_NAME = "Hexagonal Spice Box — Neem Wood";

// Small helper so every log line from this route is easy to grep for.
function log(...args: unknown[]) {
  console.log("[stripe-webhook]", ...args);
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  log("Incoming request", {
    hasSignature: Boolean(signature),
    bodyLength: rawBody.length,
  });

  if (!signature) {
    console.error("[stripe-webhook] Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret as string);
  } catch (err) {
    // This is almost always one of: wrong webhook secret (test vs live,
    // or copied from a different endpoint), body was re-parsed/mutated
    // before reaching here, or the request didn't actually come from Stripe.
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  log("Verified event", { type: event.type, id: event.id });

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    log("Handling payment_intent.succeeded", { paymentIntentId: paymentIntent.id });

    try {
      await connectToDatabase();
      log("DB connected");

      const order = await Order.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      if (!order) {
        // Shouldn't normally happen (order is created before the PaymentIntent
        // is confirmed), but don't error the webhook over it — log and move on.
        console.error(
          `[stripe-webhook] No order found for PaymentIntent ${paymentIntent.id}`
        );
        return NextResponse.json({ received: true });
      }

      log("Order found", { orderId: order.id, currentStatus: order.status });

      // Idempotency check: Stripe can and will deliver the same event more
      // than once. If we've already marked this order paid, don't re-process.
      if (order.status === "paid" || order.status === "shipped" || order.status === "delivered") {
        log("Order already processed — skipping (idempotent)", { orderId: order.id });
        return NextResponse.json({ received: true });
      }

      order.status = "paid";
      await order.save();
      log("Order marked paid", { orderId: order.id });

      if (!order.confirmationEmailSent) {
        log("Sending confirmation email", { to: order.email, orderId: order.id });
        await sendOrderConfirmationEmail(
          order.email,
          order.id,
          PRODUCT_NAME,
          order.amount
        );
        order.confirmationEmailSent = true;
        await order.save();
        log("Confirmation email sent and flagged", { orderId: order.id });
      } else {
        log("Confirmation email already sent — skipping", { orderId: order.id });
      }
    } catch (err) {
      console.error("[stripe-webhook] Error processing payment_intent.succeeded:", err);
      // Return 500 so Stripe retries — this is a processing failure on our
      // side, not a bad event, so we want the retry.
      return NextResponse.json({ error: "Processing error." }, { status: 500 });
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    log("Handling payment_intent.payment_failed", { paymentIntentId: paymentIntent.id });

    try {
      await connectToDatabase();

      const order = await Order.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      if (!order) {
        console.error(
          `[stripe-webhook] No order found for failed PaymentIntent ${paymentIntent.id}`
        );
        return NextResponse.json({ received: true });
      }

      // Don't touch order.status here — it should stay "pending". The
      // PaymentIntent is still alive and the customer can retry with the
      // same clientSecret, so this order can still become "paid" normally
      // via payment_intent.succeeded. We're only recording the failure for
      // visibility (admin panel / your own debugging), not ending the order.
      const reason = paymentIntent.last_payment_error?.message || "Payment failed.";
      order.paymentFailedAttempts = (order.paymentFailedAttempts || 0) + 1;
      order.lastPaymentError = reason;
      await order.save();

      log("Recorded failed payment attempt", {
        orderId: order.id,
        attempts: order.paymentFailedAttempts,
        reason,
      });
    } catch (err) {
      console.error("[stripe-webhook] Error processing payment_intent.payment_failed:", err);
      return NextResponse.json({ error: "Processing error." }, { status: 500 });
    }
  }

  // Acknowledge all other event types without special handling for now.
  return NextResponse.json({ received: true });
}