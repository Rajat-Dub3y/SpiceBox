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
  shippingAddress?: IShippingAddress; // set after payment succeeds, not at order creation — see checkout flow
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
      unique: true,
      sparse: true, // allows multiple `null`s (pending orders pre-payment) without violating uniqueness
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
      required: false,
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

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);