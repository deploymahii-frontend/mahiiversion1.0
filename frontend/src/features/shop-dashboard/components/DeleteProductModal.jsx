const DeleteProductModal = () => {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-rose-700">Delete Product</h3>
      <p className="mt-2 text-sm text-rose-600">This action will remove the product from the catalog.</p>
      <div className="mt-4 flex gap-2">
        <button className="rounded-full border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700">Cancel</button>
        <button className="rounded-full bg-rose-600 px-3 py-2 text-sm font-medium text-white">Delete</button>
      </div>
    </div>
  );
};

export default DeleteProductModal;
