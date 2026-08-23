import { Resend } from "resend";

// Swap this file out if you go with a different provider (SendGrid, Postmark,
// etc.) — every controller calls these three functions, not Resend directly,
// so the rest of the backend doesn't need to change.

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.EMAIL_FROM || "orders@yourdomain.com";

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not set. Add it to .env.local.");
}

const resend = new Resend(resendApiKey);

export async function sendOtpEmail(email: string, otp: string) {
  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: "Your verification code",
    html: `<p>Your verification code is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
  });
}

// TODO: called from the Stripe webhook handler once payment work starts —
// wired here now so the payment step just has to call it.
export async function sendOrderConfirmationEmail(
  email: string,
  orderId: string
) {
  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: "Your order is confirmed",
    html: `<p>Thanks for your order (#${orderId}). We'll email you again once it ships.</p>`,
  });
}

export async function sendTrackingEmail(
  email: string,
  orderId: string,
  trackingId: string
) {
  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: "Your order has shipped",
    html: `<p>Your order (#${orderId}) is on its way. Tracking ID: <strong>${trackingId}</strong></p>`,
  });
}