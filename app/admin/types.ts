export type OrderStatus = "pending" | "paid" | "shipped" | "delivered";

export interface Order {
  id: string;
  customerName: string | null; // null until shipping is attached (post-payment step)
  email: string;
  orderDate: string; // ISO date string
  product: string;
  amount: number; // in cents
  shippingAddress: {
    line1: string;
    city: string;
    state: string; // will always be "California" per current shipping scope
    zip: string;
  } | null;
  status: OrderStatus;
  trackingId: string | null;
  trackingEmailSent: boolean;
}