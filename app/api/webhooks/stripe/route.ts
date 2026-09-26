import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { stripe } from "@/lib/stripe";
import { sendOrderConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set. Add it to .env.local.");
}

const PRODUCT_NAME = "Hexagonal Spice Box — Neem Wood";

function log(...args: unknown[]) {
  console.log("[stripe-webhook]", ...args);
}

function orderNumberFromSessionId(sessionId: string) {
  return sessionId.replace("cs_", "").slice(-8).toUpperCase();
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  log("Incoming request", { hasSignature: Boolean(signature), bodyLength: rawBody.length });

  if (!signature) {
    console.error("[stripe-webhook] Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret as string);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  log("Verified event", { type: event.type, id: event.id });

  // This is now the source of truth for a completed order — Checkout
  // Sessions collect email + shipping + payment together, so we create
  // the Order record here rather than beforehand.
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    log("Handling checkout.session.completed", { sessionId: session.id });

    if (session.payment_status !== "paid") {
      // Can happen with delayed/async payment methods — nothing to do yet;
      // a checkout.session.async_payment_succeeded event follows later.
      log("Session not yet paid — skipping", { sessionId: session.id, status: session.payment_status });
      return NextResponse.json({ received: true });
    }

    try {
      await connectToDatabase();
      log("DB connected");

      // Idempotency: Stripe can redeliver the same event more than once.
      let order = await Order.findOne({ stripeCheckoutSessionId: session.id });

      if (!order) {
        const shipping = session.shipping_details ?? session.customer_details;
        const address = shipping?.address;

        order = await Order.create({
          email: session.customer_details?.email?.toLowerCase().trim() || "",
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
          amount: session.amount_total ?? 0,
          quantity: 1,
          shippingAddress: {
            name: shipping?.name || "",
            line1: address?.line1 || "",
            line2: address?.line2 || undefined,
            city: address?.city || "",
            state: "California",
            zip: address?.postal_code || "",
          },
          status: "paid",
        });

        log("Order created from session", { orderId: order.id, sessionId: session.id });
      } else {
        log("Order already exists for this session — skipping create", {
          orderId: order.id,
          sessionId: session.id,
        });
      }

      if (!order.confirmationEmailSent) {
        const orderNumber = orderNumberFromSessionId(session.id);
        log("Sending confirmation email", { to: order.email, orderNumber });
        await sendOrderConfirmationEmail(order.email, orderNumber, PRODUCT_NAME, order.amount);
        order.confirmationEmailSent = true;
        await order.save();
        log("Confirmation email sent and flagged", { orderId: order.id });
      } else {
        log("Confirmation email already sent — skipping", { orderId: order.id });
      }
    } catch (err) {
      console.error("[stripe-webhook] Error processing checkout.session.completed:", err);
      return NextResponse.json({ error: "Processing error." }, { status: 500 });
    }
  }

  // Acknowledge all other event types without special handling for now.
  return NextResponse.json({ received: true });
}