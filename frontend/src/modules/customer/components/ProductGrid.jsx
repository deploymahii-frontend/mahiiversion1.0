// src/modules/customer/components/ProductGrid.jsx

import { FaPlus } from "react-icons/fa";

export default function ProductGrid({ products = [] }) {
    if (!products.length) {
        return (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                No products available.
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <div
                    key={product._id || product.id || product.name}
                    className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <div className="h-48 overflow-hidden rounded-3xl bg-gray-100">
                        <img
                            src={product.image || "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="mt-5 space-y-3">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                            <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-lg font-bold text-blue-600">₹{product.price || product.amount || "0"}</span>
                            <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                <FaPlus /> Add
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
