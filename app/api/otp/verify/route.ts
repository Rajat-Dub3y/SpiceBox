import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { OtpVerification } from "@/models/OtpVerification";
import {
  compareOtp,
  generateVerifiedToken,
  VERIFIED_TOKEN_TTL_MS,
  MAX_OTP_ATTEMPTS,
} from "@/lib/otp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body?.email || "").toLowerCase().trim();
    const otp = (body?.otp || "").trim();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and code are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const record = await OtpVerification.findOne({ email });

    if (!record) {
      return NextResponse.json(
        { error: "No verification in progress for this email." },
        { status: 400 }
      );
    }

    if (record.attempts >= MAX_OTP_ATTEMPTS) {
      return NextResponse.json(
        { error: "Too many attempts. Please request a new code." },
        { status: 429 }
      );
    }

    if (record.otpExpiresAt.getTime() < Date.now()) {
      return NextResponse.json(
        { error: "This code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const isMatch = await compareOtp(otp, record.hashedOtp);

    if (!isMatch) {
      record.attempts += 1;
      await record.save();
      return NextResponse.json({ error: "Incorrect code." }, { status: 400 });
    }

    const verifiedToken = generateVerifiedToken();
    record.verifiedToken = verifiedToken;
    record.tokenExpiresAt = new Date(Date.now() + VERIFIED_TOKEN_TTL_MS);
    record.attempts = 0;
    await record.save();

    return NextResponse.json({ success: true, verifiedToken });
  } catch (error) {
    console.error("OTP verify error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}