import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { OtpVerification } from "@/models/OtpVerification";
import { Order } from "@/models/Order";
import { stripe } from "@/lib/stripe";

// Flow: email + shipping address are collected together in one step, then
// OTP verification, then this endpoint creates the order (with shipping
// already known) and the PaymentIntent in one call, then payment.

interface ShippingAddressInput {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  zip: string;
}

function log(...args: unknown[]) {
  console.log("[create-intent]", ...args);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body?.email || "").toLowerCase().trim();
    const verifiedToken = body?.verifiedToken;
    const quantity = Number(body?.quantity) || 1;
    const shippingAddress: ShippingAddressInput | undefined =
      body?.shippingAddress;

    log("Incoming request", { email, quantity, hasToken: Boolean(verifiedToken) });

    if (!email || !verifiedToken) {
      console.error("[create-intent] Missing email or verifiedToken", { email, hasToken: Boolean(verifiedToken) });
      return NextResponse.json(
        { error: "Email and verified token are required." },
        { status: 400 }
      );
    }

    if (
      !shippingAddress ||
      !shippingAddress.name ||
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.zip
    ) {
      console.error("[create-intent] Incomplete shipping address", shippingAddress);
      return NextResponse.json(
        { error: "A complete shipping address is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    log("DB connected");

    const otpRecord = await OtpVerification.findOne({ email });

    if (
      !otpRecord ||
      otpRecord.verifiedToken !== verifiedToken ||
      !otpRecord.tokenExpiresAt ||
      otpRecord.tokenExpiresAt.getTime() < Date.now()
    ) {
      console.error("[create-intent] OTP verification failed", {
        email,
        found: Boolean(otpRecord),
        tokenMatches: otpRecord?.verifiedToken === verifiedToken,
        expired: otpRecord?.tokenExpiresAt
          ? otpRecord.tokenExpiresAt.getTime() < Date.now()
          : "no-expiry-on-record",
      });
      return NextResponse.json(
        { error: "Your email verification has expired. Please verify again." },
        { status: 401 }
      );
    }

    log("OTP token verified", { email });

    const UNIT_PRICE_CENTS = 5499; // $54.99 — TODO: move to a shared constant/config once more products exist
    const amount = UNIT_PRICE_CENTS * quantity;

    const order = await Order.create({
      email,
      stripePaymentIntentId: null,
      amount,
      quantity,
      shippingAddress: {
        name: shippingAddress.name,
        line1: shippingAddress.line1,
        line2: shippingAddress.line2,
        city: shippingAddress.city,
        state: "California", // only option the frontend offers; hardcoded here too as a backend-side guarantee
        zip: shippingAddress.zip,
      },
      status: "pending",
    });

    log("Order created", { orderId: order.id, amount });

    // Passing shipping to Stripe too (not just saving it in our own DB) —
    // this feeds Stripe's AVS/fraud checks and shows up on the payment's
    // receipt/dashboard view.
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        receipt_email: email,
        shipping: {
          name: shippingAddress.name,
          address: {
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            city: shippingAddress.city,
            state: "CA",
            postal_code: shippingAddress.zip,
            country: "US",
          },
        },
        metadata: {
          orderId: order.id,
        },
      });
    } catch (stripeErr) {
      // Split out from the generic catch below so a Stripe-side failure
      // (bad API key, account restriction, invalid params) is unmistakably
      // logged as a Stripe error and not confused with a DB error.
      console.error("[create-intent] Stripe PaymentIntent creation failed:", stripeErr);
      // Order was already created — mark it so it's not silently orphaned
      // in "pending" with no way to ever get paid.
      order.status = "failed";
      await order.save();
      return NextResponse.json(
        { error: "Could not start payment. Please try again." },
        { status: 502 }
      );
    }

    log("PaymentIntent created", { paymentIntentId: paymentIntent.id, orderId: order.id });

    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    log("Order linked to PaymentIntent", { orderId: order.id, paymentIntentId: paymentIntent.id });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("[create-intent] Unhandled error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}