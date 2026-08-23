export type OrderStatus = "Pending" | "Shipped";

export interface Order {
  id: string;
  customerName: string;
  email: string;
  orderDate: string; // ISO date string
  product: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  status: OrderStatus;
  trackingId: string | null;
}
