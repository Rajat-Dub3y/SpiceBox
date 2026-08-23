import OrdersTable from "../../components/OrdersTable";
import { mockOrders } from "./mock-data";

// TODO: once the backend exists, fetch real orders here instead of
// importing mock data, e.g.:
//   const orders = await getOrders(); // server-side fetch from MongoDB
export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8 text-gray-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter a tracking ID and send the customer their shipping notification.
        </p>
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
          <OrdersTable initialOrders={mockOrders} />
        </div>
      </div>
    </main>
  );
}
