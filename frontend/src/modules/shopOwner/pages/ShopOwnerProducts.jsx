import { useState } from "react";
import { Link } from "react-router-dom";
import { useShopProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useToggleAvailability, useShopDashboard } from "../hooks/useShopOwner";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, AlertCircle } from "lucide-react";

function ProductModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { name: "", price: "", description: "", available: true });

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-7 w-full max-w-md border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">
          {initial?._id ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-4">
          <input name="name" value={form.name} onChange={change} placeholder="Product Name *" className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white" />
          <input name="price" type="number" value={form.price} onChange={change} placeholder="Price (₹) *" className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white" />
          <textarea name="description" value={form.description} onChange={change} placeholder="Description" rows={3} className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none dark:text-white" />
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="available" checked={form.available} onChange={change} className="w-4 h-4 accent-orange-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Available for order</span>
          </label>
        </div>

        <div className="flex gap-3 mt-7">
          <button onClick={() => onSave(form)} className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
            Save Product
          </button>
          <button onClick={onClose} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopOwnerProducts() {
  const { data: dashboardData, isLoading: dashboardLoading } = useShopDashboard();
  const { data: products = [], isLoading: productsLoading } = useShopProducts();
  const { mutate: create } = useCreateProduct();
  const { mutate: update } = useUpdateProduct();
  const { mutate: remove } = useDeleteProduct();
  const { mutate: toggleAvail } = useToggleAvailability();
  const [modal, setModal] = useState(null); // null | { product? }
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (modal?.product?._id) {
      update({ productId: modal.product._id, data: form });
    } else {
      create(form);
    }
    setModal(null);
  };

  if (dashboardLoading || productsLoading) {
    return <div className="grid grid-cols-3 gap-5 animate-pulse">{[...Array(6)].map((_, i) => <div key={i} className="h-52 bg-slate-200 dark:bg-slate-800 rounded-2xl" />)}</div>;
  }

  if (dashboardData && !dashboardData.shopExists) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <AlertCircle size={48} className="text-orange-500" />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Shop Not Initialized</h2>
        <p className="max-w-md text-slate-500 dark:text-slate-400">
          You must complete the shop onboarding process before managing products.
        </p>
        <Link to="/shopowner/dashboard" className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition">
          Set up Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Products</h1>
          <p className="text-slate-400 dark:text-slate-500 mt-1">{products.length} products in your catalogue</p>
        </div>
        <button onClick={() => setModal({})} className="flex items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full max-w-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
      />

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-5xl mb-3">📦</p>
          <p className="font-bold text-slate-700 dark:text-slate-300">No products yet</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Add your first product to start selling</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <div key={product._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
            <div className="h-36 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-5xl mb-4">
              🍽️
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{product.name}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-2">{product.description}</p>
              </div>
              <p className="font-black text-slate-900 dark:text-white text-lg">₹{product.price}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${product.available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                {product.available ? "Available" : "Unavailable"}
              </span>
              <p className="text-xs text-slate-400 dark:text-slate-500">Stock: {product.inventory?.quantity ?? "∞"}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => toggleAvail({ productId: product._id, available: !product.available })}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {product.available ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                {product.available ? "Disable" : "Enable"}
              </button>
              <button
                onClick={() => setModal({ product })}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              >
                <Pencil size={13} /> Edit
              </button>
              <button
                onClick={() => { if (window.confirm("Delete this product?")) remove(product._id); }}
                className="flex items-center gap-1.5 text-xs font-bold text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <ProductModal
          initial={modal.product}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
