import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

function log(...args: unknown[]) {
  console.log("[session-lookup]", ...args);
}

// Reads the session directly from Stripe (not our DB) so the thank-you
// page can render immediately, without waiting on the webhook — which is
// asynchronous and can lag a beat behind the redirect landing.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || !id.startsWith("cs_")) {
    return NextResponse.json({ error: "Invalid session id." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });

    log("Retrieved session", { id: session.id, paymentStatus: session.payment_status });

    if (session.payment_status !== "paid") {
      // Buyer landed here without actually completing payment (e.g. hit
      // back/forward, or shared the URL) — don't show a confirmation.
      return NextResponse.json(
        { error: "This order has not been paid yet." },
        { status: 402 }
      );
    }

    // Short, human-friendly order number derived from the session id —
    // matches whatever the webhook uses so the buyer sees the same number
    // in the confirmation email.
    const orderNumber = session.id.replace("cs_", "").slice(-8).toUpperCase();

    return NextResponse.json({
      orderNumber,
      email: session.customer_details?.email ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
      lineItems:
        session.line_items?.data.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          amountTotal: item.amount_total,
        })) ?? [],
    });
  } catch (err) {
    console.error("[session-lookup] Error retrieving session:", err);
    return NextResponse.json({ error: "Could not find that order." }, { status: 404 });
  }
}