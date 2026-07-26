const OrderFilters = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <input
        type="text"
        placeholder="Search order"
        className="flex-1 min-w-[180px] rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
      />
      <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm">
        <option value="all">All Status</option>
        <option value="PLACED">Placed</option>
        <option value="ACCEPTED">Accepted</option>
        <option value="PREPARING">Preparing</option>
        <option value="READY">Ready</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm">
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
      </select>
    </div>
  );
};

export default OrderFilters;
