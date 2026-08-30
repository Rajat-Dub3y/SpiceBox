import mongoose, { Schema, Document, Model } from "mongoose";

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered";

export interface IShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string; // structurally always "California" — enforced by the frontend dropdown, not validated here
  zip: string;
}

export interface IOrder extends Document {
  email: string;
  stripePaymentIntentId: string | null; // unique — doubles as our webhook idempotency guard
  amount: number; // in cents
  quantity: number;
  shippingAddress: IShippingAddress; // known at order creation — collected in the same step as email, before OTP
  status: OrderStatus;
  trackingId: string | null;
  trackingCarrier: string | null;
  confirmationEmailSent: boolean;
  trackingEmailSent: boolean;
  paymentFailedAttempts: number;
  lastPaymentError: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ShippingAddressSchema = new Schema<IShippingAddress>(
  {
    name: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true, default: "California" },
    zip: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    stripePaymentIntentId: {
      type: String,
      default: null,
      // No `unique`/`sparse` here — see the partial index below instead.
      // sparse only excludes documents where the field is *missing*, not
      // documents where it's present but null — and every new order sets
      // it to null explicitly, so a plain sparse-unique index still
      // collides on the second null. A partial index that only applies
      // when the field is actually a string avoids that.
    },
    amount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered"],
      default: "pending",
      index: true,
    },
    trackingId: {
      type: String,
      default: null,
    },
    trackingCarrier: {
      type: String,
      default: null,
    },
    confirmationEmailSent: {
      type: Boolean,
      default: false,
    },
    trackingEmailSent: {
      type: Boolean,
      default: false,
    },
    paymentFailedAttempts: {
      type: Number,
      default: 0,
    },
    lastPaymentError: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Unique only when stripePaymentIntentId is an actual string — this is
// what makes it safe for every new pending order to have `null` here
// without colliding, while still guaranteeing no two orders ever share
// the same real PaymentIntent ID once one is assigned (our webhook
// idempotency guard).
OrderSchema.index(
  { stripePaymentIntentId: 1 },
  {
    unique: true,
    partialFilterExpression: { stripePaymentIntentId: { $type: "string" } },
  }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);