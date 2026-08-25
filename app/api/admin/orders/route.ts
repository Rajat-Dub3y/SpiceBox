import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order as OrderModel } from "@/models/Order";

// Protected by the same Basic Auth middleware as /admin (see middleware.ts
// matcher, which covers /api/admin/:path* too).

export const dynamic = "force-dynamic";

// Single-product store for now — if a second product gets added later,
// this needs to come from the order itself instead of being hardcoded.
const PRODUCT_NAME = "Hexagonal Spice Box — Neem Wood";

export async function GET() {
  try {
    await connectToDatabase();

    const docs = await OrderModel.find().sort({ createdAt: -1 }).lean();

    const orders = docs.map((doc) => ({
      id: String(doc._id),
      customerName: doc.shippingAddress?.name ?? null,
      email: doc.email,
      orderDate: doc.createdAt.toISOString().slice(0, 10),
      product: PRODUCT_NAME,
      amount: doc.amount,
      shippingAddress: doc.shippingAddress
        ? {
            line1: doc.shippingAddress.line1,
            city: doc.shippingAddress.city,
            state: doc.shippingAddress.state,
            zip: doc.shippingAddress.zip,
          }
        : null,
      status: doc.status,
      trackingId: doc.trackingId ?? null,
      trackingEmailSent: doc.trackingEmailSent,
    }));

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Fetch admin orders error:", error);
    return NextResponse.json(
      { error: "Failed to load orders." },
      { status: 500 }
    );
  }
}