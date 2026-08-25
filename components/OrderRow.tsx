"use client";

import { useState } from "react";
import { Order } from "@/app/admin/types";

interface OrderRowProps {
  order: Order;
  onTrackingSent: (orderId: string, trackingId: string) => void;
}

async function sendTrackingEmail(
  orderId: string,
  trackingId: string
): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`/api/admin/orders/${orderId}/tracking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trackingId }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { success: false, error: data?.error || "Failed to send email." };
  }

  return { success: true };
}

export default function OrderRow({ order, onTrackingSent }: OrderRowProps) {
  const [trackingId, setTrackingId] = useState(order.trackingId ?? "");
  const [sending, setSending] = useState(false);
  const [sentConfirmation, setSentConfirmation] = useState(
    order.trackingEmailSent
  );
  const [error, setError] = useState<string | null>(null);

  const hasShippingAddress = order.shippingAddress !== null;

  const handleSendClick = async () => {
    if (!trackingId.trim()) {
      setError("Enter a tracking ID first.");
      return;
    }
    setError(null);
    setSending(true);
    try {
      const result = await sendTrackingEmail(order.id, trackingId.trim());
      if (result.success) {
        setSentConfirmation(true);
        onTrackingSent(order.id, trackingId.trim());
      } else {
        setError(result.error || "Something went wrong sending the email.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <tr className="border-b border-gray-200 align-top">
      <td className="py-3 pr-4">
        <div className="font-medium text-gray-900">
          {order.customerName ?? (
            <span className="italic text-gray-400">Not yet provided</span>
          )}
        </div>
        <div className="text-sm text-gray-500">{order.email}</div>
      </td>
      <td className="py-3 pr-4 text-sm text-gray-700">{order.orderDate}</td>
      <td className="py-3 pr-4 text-sm text-gray-700">{order.product}</td>
      <td className="py-3 pr-4 text-sm text-gray-700">
        {order.shippingAddress ? (
          <>
            {order.shippingAddress.line1}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zip}
          </>
        ) : (
          <span className="italic text-gray-400">
            Awaiting shipping details
          </span>
        )}
      </td>
      <td className="py-3 pr-4">
        <span
          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
            order.status === "shipped" || order.status === "delivered"
              ? "bg-green-100 text-green-800"
              : order.status === "paid"
              ? "bg-blue-100 text-blue-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {order.status}
        </span>
      </td>
      <td className="py-3 pr-4">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID"
          disabled={!hasShippingAddress}
          className="w-40 rounded border border-gray-300 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
        />
      </td>
      <td className="py-3">
        <button
          onClick={handleSendClick}
          disabled={sending || !hasShippingAddress}
          title={
            !hasShippingAddress
              ? "Customer hasn't completed shipping details yet"
              : undefined
          }
          className="rounded bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Tracking Email"}
        </button>
        {sentConfirmation && (
          <div className="mt-1 text-xs text-green-700">Email sent ✓</div>
        )}
        {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
      </td>
    </tr>
  );
}