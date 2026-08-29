import { Resend } from "resend";

// Swap this file out if you go with a different provider (SendGrid, Postmark,
// etc.) — every controller calls these three functions, not Resend directly,
// so the rest of the backend doesn't need to change.

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.EMAIL_FROM || "orders@theecoshop.co";
const BRAND_NAME = "The Eco Shop";

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not set. Add it to .env.local.");
}

const resend = new Resend(resendApiKey);

// Shared wrapper so every email has the same header/footer instead of
// re-writing that markup three times.
function wrapEmail(bodyHtml: string): string {
  return `
  <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #2b2620;">
    <div style="padding: 32px 24px 16px; text-align: center; border-bottom: 1px solid #e8e2d8;">
      <span style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #8a7f6d;">
        ${BRAND_NAME}
      </span>
    </div>
    <div style="padding: 32px 24px;">
      ${bodyHtml}
    </div>
    <div style="padding: 24px; text-align: center; border-top: 1px solid #e8e2d8; font-family: Arial, sans-serif; font-size: 12px; color: #9a8f7d;">
      <p style="margin: 0;">Questions about your order? Just reply to this email.</p>
      <p style="margin: 8px 0 0;">${BRAND_NAME} · Handcrafted, shipped from California</p>
    </div>
  </div>`;
}

export async function sendOtpEmail(email: string, otp: string) {
  const html = wrapEmail(`
    <h1 style="font-size: 20px; margin: 0 0 16px;">Verify your email to continue</h1>
    <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4a4238;">
      Enter this code on the checkout page to confirm it's really you — this step exists
      so we can reach you about your order later, and so no one else can complete a
      purchase using your email by mistake.
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <span style="display: inline-block; font-family: Arial, sans-serif; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 12px 24px; background: #f5f1e8; border-radius: 6px;">
        ${otp}
      </span>
    </div>
    <p style="font-family: Arial, sans-serif; font-size: 13px; color: #8a7f6d;">
      This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.
    </p>
  `);

  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: `${otp} is your verification code`,
    html,
    text: `Your verification code is ${otp}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`,
  });
}

// TODO: called from the Stripe webhook handler once payment work starts —
// wired here now so the payment step just has to call it.
export async function sendOrderConfirmationEmail(
  email: string,
  orderId: string,
  productName: string,
  amountCents: number
) {
  const amount = (amountCents / 100).toFixed(2);

  const html = wrapEmail(`
    <h1 style="font-size: 20px; margin: 0 0 16px;">Your order is confirmed</h1>
    <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4a4238;">
      Thank you for your order — here's a summary, and what happens from here.
    </p>
    <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-family: Arial, sans-serif; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #8a7f6d;">Order ID</td>
        <td style="padding: 8px 0; text-align: right;">#${orderId}</td>
      </tr>
      <tr style="border-top: 1px solid #e8e2d8;">
        <td style="padding: 8px 0; color: #8a7f6d;">Item</td>
        <td style="padding: 8px 0; text-align: right;">${productName}</td>
      </tr>
      <tr style="border-top: 1px solid #e8e2d8;">
        <td style="padding: 8px 0; color: #8a7f6d; font-weight: bold;">Total</td>
        <td style="padding: 8px 0; text-align: right; font-weight: bold;">$${amount}</td>
      </tr>
    </table>
    <h2 style="font-size: 15px; margin: 24px 0 8px;">What happens next</h2>
    <ol style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.8; color: #4a4238; padding-left: 20px; margin: 0;">
      <li>Your piece is hand-finished and prepared for shipping — since each one is handmade, this takes a little longer than a mass-produced item.</li>
      <li>Once it ships, you'll get another email from us with your tracking number.</li>
      <li>Your item will arrive in plastic-free, gift-ready packaging.</li>
    </ol>
    <p style="font-family: Arial, sans-serif; font-size: 13px; color: #8a7f6d; margin-top: 24px;">
      No action needed on your end right now — we'll be in touch as soon as it's on its way.
    </p>
  `);

  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: `Order confirmed — ${productName}`,
    html,
    text: `Thanks for your order (#${orderId}) — ${productName}, $${amount}. Your piece is being hand-finished and prepared for shipping. We'll email you again with tracking details once it ships.`,
  });
}

export async function sendTrackingEmail(
  email: string,
  orderId: string,
  trackingId: string,
  productName: string,
  carrier?: string | null
) {
  const html = wrapEmail(`
    <h1 style="font-size: 20px; margin: 0 0 16px;">Your order is on its way</h1>
    <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4a4238;">
      Good news — your ${productName} has shipped.
    </p>
    <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-family: Arial, sans-serif; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #8a7f6d;">Order ID</td>
        <td style="padding: 8px 0; text-align: right;">#${orderId}</td>
      </tr>
      <tr style="border-top: 1px solid #e8e2d8;">
        <td style="padding: 8px 0; color: #8a7f6d;">Tracking number</td>
        <td style="padding: 8px 0; text-align: right; font-weight: bold;">${trackingId}</td>
      </tr>
      ${
        carrier
          ? `<tr style="border-top: 1px solid #e8e2d8;">
              <td style="padding: 8px 0; color: #8a7f6d;">Carrier</td>
              <td style="padding: 8px 0; text-align: right;">${carrier}</td>
            </tr>`
          : ""
      }
    </table>
    <h2 style="font-size: 15px; margin: 24px 0 8px;">What happens next</h2>
    <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4a4238;">
      Use the tracking number above with the carrier's site to follow your package.
      No further action is needed from you — just keep an eye out for delivery.
    </p>
    <p style="font-family: Arial, sans-serif; font-size: 13px; color: #8a7f6d; margin-top: 20px;">
      We hope you love it. If anything about your order doesn't look right when it
      arrives, just reply to this email and we'll sort it out.
    </p>
  `);

  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: `Your order has shipped — tracking inside`,
    html,
    text: `Your order (#${orderId}) has shipped. Tracking number: ${trackingId}${
      carrier ? ` (${carrier})` : ""
    }. No action needed — just track your package and watch for delivery.`,
  });
}