"use client";

import { useState } from "react";
import { Order } from "../types";

interface OrderRowProps {
  order: Order;
  onTrackingSent: (orderId: string, trackingId: string) => void;
}

// TODO: replace with a real API call once the backend exists, e.g.
//   await fetch(`/api/admin/orders/${orderId}/tracking`, {
//     method: "POST",
//     body: JSON.stringify({ trackingId }),
//   });
// which should update the order in MongoDB and trigger the tracking email.
async function sendTrackingEmail(orderId: string, trackingId: string) {
  console.log(`[stub] Sending tracking email for order ${orderId}: ${trackingId}`);
  return new Promise((resolve) => setTimeout(resolve, 500));
}

export default function OrderRow({ order, onTrackingSent }: OrderRowProps) {
  const [trackingInput, setTrackingInput] = useState(order.trackingId ?? "");
  const [sending, setSending] = useState(false);
  const [justSent, setJustSent] = useState(false);

  const handleSend = async () => {
    if (!trackingInput.trim()) return;
    setSending(true);
    setJustSent(false);
    try {
      await sendTrackingEmail(order.id, trackingInput.trim());
      onTrackingSent(order.id, trackingInput.trim());
      setJustSent(true);
      setTimeout(() => setJustSent(false), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <tr className="border-b border-gray-200 align-top">
      <td className="py-3 pr-4">
        <div className="font-medium text-gray-900">{order.customerName}</div>
        <div className="text-sm text-gray-500">{order.email}</div>
      </td>
      <td className="py-3 pr-4 text-sm text-gray-700">{order.orderDate}</td>
      <td className="py-3 pr-4 text-sm text-gray-700">{order.product}</td>
      <td className="py-3 pr-4 text-sm text-gray-700">
        {order.shippingAddress.line1}
        {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
        <br />
        {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
        {order.shippingAddress.zip}
      </td>
      <td className="py-3 pr-4">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
            order.status === "Shipped"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.status}
        </span>
      </td>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={trackingInput}
            onChange={(e) => setTrackingInput(e.target.value)}
            placeholder="Enter tracking ID"
            className="w-40 rounded border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={sending || !trackingInput.trim()}
            className="rounded bg-gray-900 px-3 py-1 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {sending ? "Sending…" : "Send Tracking Email"}
          </button>
        </div>
        {justSent && (
          <div className="mt-1 text-xs font-medium text-green-700">
            Tracking email sent.
          </div>
        )}
      </td>
    </tr>
  );
}
