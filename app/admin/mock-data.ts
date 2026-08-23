import { Order } from "./types";

// TODO: replace with real data fetched from MongoDB via an API route
// (e.g. GET /api/admin/orders) once the backend exists.
export const mockOrders: Order[] = [
  {
    id: "ord_001",
    customerName: "Sample Customer One",
    email: "customer.one@example.com",
    orderDate: "2026-08-18",
    product: "Hexagonal Spice Box",
    shippingAddress: {
      line1: "123 Placeholder St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
    },
    status: "Pending",
    trackingId: null,
  },
  {
    id: "ord_002",
    customerName: "Sample Customer Two",
    email: "customer.two@example.com",
    orderDate: "2026-08-19",
    product: "Hexagonal Spice Box",
    shippingAddress: {
      line1: "456 Placeholder Ave",
      line2: "Apt 2B",
      city: "Los Angeles",
      state: "CA",
      zip: "90012",
    },
    status: "Shipped",
    trackingId: "1Z999AA10123456784",
  },
  {
    id: "ord_003",
    customerName: "Sample Customer Three",
    email: "customer.three@example.com",
    orderDate: "2026-08-21",
    product: "Hexagonal Spice Box",
    shippingAddress: {
      line1: "789 Placeholder Blvd",
      city: "San Diego",
      state: "CA",
      zip: "92101",
    },
    status: "Pending",
    trackingId: null,
  },
];
