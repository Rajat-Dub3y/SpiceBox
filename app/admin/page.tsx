import { headers } from "next/headers";
import OrdersTable from "../../components/OrdersTable";
import { Order as OrderType } from "./types";

export const dynamic = "force-dynamic";

async function getOrders(): Promise<OrderType[]> {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  // Forward the same Authorization header the browser sent for this page —
  // /api/admin/orders is behind the identical middleware check, so without
  // this the internal request would get a 401 from our own middleware.
  const authHeader = headersList.get("authorization");

  const res = await fetch(`${protocol}://${host}/api/admin/orders`, {
    headers: authHeader ? { authorization: authHeader } : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load orders.");
  }

  return res.json();
}

export default async function AdminPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-2xl font-semibold text-gray-900">Orders</h1>
        <p className="mb-6 text-sm text-gray-500">
          {orders.length} order{orders.length === 1 ? "" : "s"}
        </p>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <OrdersTable orders={orders} />
        </div>
      </div>
    </main>
  );
}