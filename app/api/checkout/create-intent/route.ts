import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCT } from "@/lib/product";

function log(...args: unknown[]) {
  console.log("[create-session]", ...args);
}

export async function POST(request: NextRequest) {
  try {
    const origin =
      request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;

    if (!origin) {
      console.error("[create-session] No origin header and NEXT_PUBLIC_SITE_URL not set");
      return NextResponse.json(
        { error: "Server misconfigured. Please try again later." },
        { status: 500 }
      );
    }

    // Quantity is fixed at 1 for now — this is a single-product store with
    // no quantity selector on the page. Bump this if that changes.
    const quantity = 1;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Not passing payment_method_types on purpose: leaving it unset lets
      // Stripe show card + Apple Pay + Google Pay automatically, based on
      // the buyer's browser/device and your Stripe Dashboard settings.
      // (Apple Pay additionally requires domain verification in the
      // Dashboard under Settings > Payment methods > Apple Pay.)
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: PRODUCT.name,
              images: PRODUCT.image ? [PRODUCT.image] : undefined,
            },
            unit_amount: Math.round(PRODUCT.price * 100),
          },
          quantity,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      // Stripe's hosted page shows product + shipping + tax (if Stripe Tax
      // is enabled in the Dashboard) as a full total before the buyer pays.
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
    });

    log("Session created", { sessionId: session.id, url: session.url });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[create-session] Error creating checkout session:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}