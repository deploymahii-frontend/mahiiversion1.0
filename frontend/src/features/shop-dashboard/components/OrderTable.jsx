import OrderRow from './OrderRow';

const sampleOrders = [
  { id: 'MHI-1024', orderNumber: 'MHI-1024', customerName: 'Rahul', amount: 320, status: 'PLACED' },
  { id: 'MHI-1025', orderNumber: 'MHI-1025', customerName: 'Priya', amount: 180, status: 'READY' },
  { id: 'MHI-1026', orderNumber: 'MHI-1026', customerName: 'Nisha', amount: 540, status: 'PREPARING' },
];

const OrderTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sampleOrders.map((order) => (
            <OrderRow key={order.id} order={order} onAction={() => {}} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
