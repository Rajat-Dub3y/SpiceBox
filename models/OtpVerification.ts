import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOtpVerification extends Document {
  email: string;
  hashedOtp: string;
  otpExpiresAt: Date;
  lastRequestedAt: Date; // drives the 2-minute resend cooldown
  attempts: number; // failed verify attempts, for brute-force protection
  verifiedToken: string | null;
  tokenExpiresAt: Date | null; // ~30 min window to complete checkout after verifying
  createdAt: Date;
  updatedAt: Date;
}

const OtpVerificationSchema = new Schema<IOtpVerification>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    hashedOtp: {
      type: String,
      required: true,
    },
    otpExpiresAt: {
      type: Date,
      required: true,
    },
    lastRequestedAt: {
      type: Date,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    verifiedToken: {
      type: String,
      default: null,
      index: true,
    },
    tokenExpiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// One active OTP record per email — new requests overwrite the previous one
// rather than accumulating rows.
OtpVerificationSchema.index({ email: 1 }, { unique: true });

export const OtpVerification: Model<IOtpVerification> =
  mongoose.models.OtpVerification ||
  mongoose.model<IOtpVerification>("OtpVerification", OtpVerificationSchema);
