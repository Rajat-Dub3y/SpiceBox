import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { OtpVerification } from "@/models/OtpVerification";
import { sendOtpEmail } from "@/lib/email";
import { generateOtp, hashOtp, OTP_TTL_MS, OTP_RESEND_COOLDOWN_MS } from "@/lib/otp";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body?.email || "").toLowerCase().trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await OtpVerification.findOne({ email });

    if (existing) {
      const msSinceLastRequest =
        Date.now() - existing.lastRequestedAt.getTime();
      if (msSinceLastRequest < OTP_RESEND_COOLDOWN_MS) {
        const waitSeconds = Math.ceil(
          (OTP_RESEND_COOLDOWN_MS - msSinceLastRequest) / 1000
        );
        return NextResponse.json(
          { error: `Please wait ${waitSeconds}s before requesting another code.` },
          { status: 429 }
        );
      }
    }

    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);
    const now = new Date();

    await OtpVerification.findOneAndUpdate(
      { email },
      {
        email,
        hashedOtp,
        otpExpiresAt: new Date(now.getTime() + OTP_TTL_MS),
        lastRequestedAt: now,
        attempts: 0,
        verifiedToken: null,
        tokenExpiresAt: null,
      },
      { upsert: true, returnDocument: "after" }
    );

    await sendOtpEmail(email, otp);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP request error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
