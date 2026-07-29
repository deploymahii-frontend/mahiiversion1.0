const statusStyles = {
  pending: 'bg-amber-100 text-amber-700',
  preparing: 'bg-blue-100 text-blue-700',
  ready: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-rose-100 text-rose-700',
};

const OrderList = ({ orders, onStatusChange }) => {
  if (!orders?.length) {
    return <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">No orders yet.</div>;
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const status = (order?.status || order?.orderStatus || 'pending').toLowerCase();
        return (
          <div key={order?.id || order?.orderNumber} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">#{order?.orderNumber || order?.id}</p>
                <h4 className="text-base font-semibold text-gray-900">{order?.customer?.name || order?.customerName || 'Customer'}</h4>
                <p className="text-sm text-gray-500">{order?.items?.length || order?.itemCount || 0} items • ₹{order?.grandTotal || order?.total || order?.amount || 0}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
                  {status}
                </span>
                <select
                  value={status}
                  onChange={(event) => onStatusChange?.(order?.id || order?.orderNumber, event.target.value)}
                  className="rounded-full border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
