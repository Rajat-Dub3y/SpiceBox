import { loadStripe, Stripe } from "@stripe/stripe-js";

// Publishable key is safe to expose client-side (that's what NEXT_PUBLIC_ is
// for) — it can only create PaymentIntents your backend has already set up,
// never move money on its own.

let stripePromise: Promise<Stripe | null>;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error(
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Add it to .env.local."
      );
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}