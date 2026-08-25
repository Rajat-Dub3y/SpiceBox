import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { stripe } from "@/lib/stripe";

// Called from the "shipping" step, after payment has already been
// confirmed. orderId comes back from create-intent and is a MongoDB
// ObjectId — not practically guessable — which is the access control for
// this MVP. Revisit if this ever needs to be hardened further (e.g. by
// also checking the submitted email matches order.email).

interface ShippingAddressInput {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  zip: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const email = (body?.email || "").toLowerCase().trim();
    const shippingAddress: ShippingAddressInput | undefined =
      body?.shippingAddress;

    if (
      !shippingAddress ||
      !shippingAddress.name ||
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.zip
    ) {
      return NextResponse.json(
        { error: "A complete shipping address is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (email && order.email !== email) {
      return NextResponse.json(
        { error: "Order does not match this email." },
        { status: 403 }
      );
    }

    if (order.status === "pending") {
      // Don't trust order.status alone here — the webhook that flips it to
      // "paid" is asynchronous and can lag a beat behind the client's
      // confirmPayment() resolving. Check Stripe directly instead, and if
      // it confirms success but our webhook hasn't caught up yet, update
      // the order ourselves now rather than falsely rejecting a paid order.
      if (!order.stripePaymentIntentId) {
        return NextResponse.json(
          { error: "Payment has not been confirmed for this order yet." },
          { status: 409 }
        );
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(
        order.stripePaymentIntentId
      );

      if (paymentIntent.status !== "succeeded") {
        return NextResponse.json(
          { error: "Payment has not been confirmed for this order yet." },
          { status: 409 }
        );
      }

      order.status = "paid";
      // Note: not sending the confirmation email from here — that stays the
      // webhook's job exclusively, so it only ever gets sent once from one
      // place. This block only unblocks shipping from being wrongly rejected.
    }

    order.shippingAddress = {
      name: shippingAddress.name,
      line1: shippingAddress.line1,
      line2: shippingAddress.line2,
      city: shippingAddress.city,
      state: "California", // hardcoded server-side regardless of what's submitted
      zip: shippingAddress.zip,
    };
    await order.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Attach shipping address error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}