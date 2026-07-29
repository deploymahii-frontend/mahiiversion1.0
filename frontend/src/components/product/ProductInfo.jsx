import { FaLeaf, FaTruck, FaShieldAlt } from "react-icons/fa";

export default function ProductInfo({ product }) {
  return (
    <section className="max-w-7xl mx-auto px-8 py-12 grid lg:grid-cols-[2fr_1fr] gap-10">
      <div>
        <h2 className="text-3xl font-bold mb-4">About this product</h2>
        <p className="text-gray-700 leading-8 text-lg">
          {product.description}
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="border rounded-2xl p-5 bg-white">
            <FaLeaf className="text-green-600 text-2xl mb-3" />
            <h3 className="font-semibold">Fresh Quality</h3>
            <p className="text-sm text-gray-600">Carefully sourced and packed daily.</p>
          </div>

          <div className="border rounded-2xl p-5 bg-white">
            <FaTruck className="text-orange-500 text-2xl mb-3" />
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Quick home delivery across your city.</p>
          </div>

          <div className="border rounded-2xl p-5 bg-white">
            <FaShieldAlt className="text-blue-600 text-2xl mb-3" />
            <h3 className="font-semibold">Secure Checkout</h3>
            <p className="text-sm text-gray-600">Trusted payments and order tracking.</p>
          </div>
        </div>
      </div>

      <aside className="bg-white rounded-3xl shadow-sm p-8 h-fit">
        <p className="text-sm uppercase tracking-wide text-gray-500">Price</p>
        <div className="flex items-end gap-2 mt-2">
          <span className="text-4xl font-bold">₹{product.price}</span>
          <span className="text-gray-400 line-through">₹{product.comparePrice || product.price + 50}</span>
        </div>

        <div className="mt-6 space-y-3 text-sm text-gray-600">
          <p><span className="font-semibold text-gray-900">Weight:</span> {product.weight || "1 Unit"}</p>
          <p><span className="font-semibold text-gray-900">In Stock:</span> {product.stock > 0 ? "Yes" : "Out of stock"}</p>
          <p><span className="font-semibold text-gray-900">Shop:</span> {product.shop?.name || "Mahii Store"}</p>
        </div>

        <button className="w-full mt-8 bg-orange-500 text-white rounded-2xl py-3 font-semibold hover:bg-orange-600 transition">
          Add to Cart
        </button>
      </aside>
    </section>
  );
}
