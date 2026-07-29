import OrderRow from "./OrderRow";

export default function OrderTable({
  orders = [],
  loading = false,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Shop
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Payment
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Order Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onRefresh={onRefresh}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
