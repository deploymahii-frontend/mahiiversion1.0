const ProductForm = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Add Product</h3>
      <p className="mt-1 text-sm text-gray-500">Create a new catalog item for your shop.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Product Name</label>
          <input className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm" placeholder="Product name" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
          <input className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm" placeholder="Category" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Price</label>
          <input className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm" placeholder="₹0" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Stock</label>
          <input className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm" placeholder="0" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
          <textarea className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm" rows="3" placeholder="Describe the product" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white">Save Product</button>
      </div>
    </div>
  );
};

export default ProductForm;
