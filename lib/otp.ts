import crypto from "crypto";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;
export const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
export const OTP_RESEND_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes
export const VERIFIED_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes
export const MAX_OTP_ATTEMPTS = 5;

export function generateOtp(): string {
  // 6-digit numeric code, zero-padded
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export async function hashOtp(otp: string): Promise<string> {
  return bcrypt.hash(otp, SALT_ROUNDS);
}

export async function compareOtp(
  otp: string,
  hashedOtp: string
): Promise<boolean> {
  return bcrypt.compare(otp, hashedOtp);
}

export function generateVerifiedToken(): string {
  return crypto.randomBytes(32).toString("hex");
}