const ProductFilters = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <input
        type="text"
        placeholder="Search product"
        className="min-w-[180px] flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
      />
      <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm">
        <option value="all">All Categories</option>
        <option value="meal">Meal</option>
        <option value="beverage">Beverage</option>
      </select>
      <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="draft">Draft</option>
      </select>
      <select className="rounded-xl border border-gray-200 px-3 py-2 text-sm">
        <option value="all">All Stock</option>
        <option value="low">Low Stock</option>
        <option value="high">High Stock</option>
      </select>
    </div>
  );
};

export default ProductFilters;
