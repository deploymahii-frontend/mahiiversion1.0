const ProductList = ({ products }) => {
  if (!products?.length) {
    return <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">No products listed yet.</div>;
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div key={product?.id || product?.slug} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <h4 className="font-semibold text-gray-900">{product?.name || product?.title || 'Product'}</h4>
            <p className="text-sm text-gray-500">₹{product?.price || 0}</p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
            {product?.stock ?? product?.inventory ?? 0} in stock
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
