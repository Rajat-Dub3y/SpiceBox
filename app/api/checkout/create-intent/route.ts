import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { OtpVerification } from "@/models/OtpVerification";
import { Order } from "@/models/Order";
import { stripe } from "@/lib/stripe";

// Flow: email + shipping address are collected together in one step, then
// OTP verification, then this endpoint creates the order (with shipping
// already known) and the PaymentIntent in one call, then payment.
// (Shipping is no longer attached after the fact — see the note about
// /api/orders/[id]/shipping below.)

interface ShippingAddressInput {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  zip: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body?.email || "").toLowerCase().trim();
    const verifiedToken = body?.verifiedToken;
    const quantity = Number(body?.quantity) || 1;
    const shippingAddress: ShippingAddressInput | undefined =
      body?.shippingAddress;

    if (!email || !verifiedToken) {
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
      return NextResponse.json(
        { error: "A complete shipping address is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const otpRecord = await OtpVerification.findOne({ email });

    if (
      !otpRecord ||
      otpRecord.verifiedToken !== verifiedToken ||
      !otpRecord.tokenExpiresAt ||
      otpRecord.tokenExpiresAt.getTime() < Date.now()
    ) {
      return NextResponse.json(
        { error: "Your email verification has expired. Please verify again." },
        { status: 401 }
      );
    }

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

    // Passing shipping to Stripe too (not just saving it in our own DB) —
    // this feeds Stripe's AVS/fraud checks and shows up on the payment's
    // receipt/dashboard view, which we didn't have when shipping was
    // collected after payment.
    const paymentIntent = await stripe.paymentIntents.create({
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

    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Create checkout intent error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}