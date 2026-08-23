"use client";

import { useState } from "react";
import { Order } from "../types";
import OrderRow from "./OrderRow";

interface OrdersTableProps {
  initialOrders: Order[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);

  const handleTrackingSent = (orderId: string, trackingId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, trackingId, status: "Shipped" } : o
      )
    );
  };

  if (orders.length === 0) {
    return (
      <div className="rounded border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-300 text-sm text-gray-500">
            <th className="pb-2 pr-4 font-medium">Customer</th>
            <th className="pb-2 pr-4 font-medium">Order Date</th>
            <th className="pb-2 pr-4 font-medium">Product</th>
            <th className="pb-2 pr-4 font-medium">Shipping Address</th>
            <th className="pb-2 pr-4 font-medium">Status</th>
            <th className="pb-2 pr-4 font-medium">Tracking</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onTrackingSent={handleTrackingSent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
