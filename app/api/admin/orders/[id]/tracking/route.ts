import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { sendTrackingEmail } from "@/lib/email";

// Auth note: this route is covered by the same basic-auth middleware as the
// /admin panel — see the updated `matcher` in middleware.ts, which now
// includes /api/admin/:path* alongside /admin/:path*.

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const trackingId = (body?.trackingId || "").trim();
    const trackingCarrier = body?.trackingCarrier || null;

    if (!trackingId) {
      return NextResponse.json(
        { error: "trackingId is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const order = await Order.findById(params.id);

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    order.trackingId = trackingId;
    order.trackingCarrier = trackingCarrier;
    order.status = "shipped";
    await order.save();

    await sendTrackingEmail(order.email, order.id, trackingId);

    order.trackingEmailSent = true;
    await order.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking update error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}