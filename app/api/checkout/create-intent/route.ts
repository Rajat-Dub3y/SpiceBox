import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { OtpVerification } from "@/models/OtpVerification";
import { Order } from "@/models/Order";
import { stripe } from "@/lib/stripe";

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
        state: "California",
        zip: shippingAddress.zip,
      },
      status: "pending",
    });

    // Create the PaymentIntent now that we have an order to attach it to.
    // orderId goes in metadata so the webhook can look the order up even
    // in edge cases where matching by stripePaymentIntentId alone isn't enough.
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      receipt_email: email,
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