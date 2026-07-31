import { useState } from "react";
import { useShopProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useToggleAvailability } from "../hooks/useShopOwner";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

function ProductModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { name: "", price: "", description: "", available: true });

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-md">
        <h2 className="text-xl font-black text-slate-900 mb-6">
          {initial?._id ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-4">
          <input name="name" value={form.name} onChange={change} placeholder="Product Name *" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          <input name="price" type="number" value={form.price} onChange={change} placeholder="Price (₹) *" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          <textarea name="description" value={form.description} onChange={change} placeholder="Description" rows={3} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none" />
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="available" checked={form.available} onChange={change} className="w-4 h-4 accent-slate-900" />
            <span className="text-sm font-semibold text-slate-700">Available for order</span>
          </label>
        </div>

        <div className="flex gap-3 mt-7">
          <button onClick={() => onSave(form)} className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
            Save Product
          </button>
          <button onClick={onClose} className="flex-1 border border-slate-200 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopOwnerProducts() {
  const { data: products = [], isLoading } = useShopProducts();
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

  if (isLoading) {
    return <div className="grid grid-cols-3 gap-5 animate-pulse">{[...Array(6)].map((_, i) => <div key={i} className="h-52 bg-slate-200 rounded-2xl" />)}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Products</h1>
          <p className="text-slate-400 mt-1">{products.length} products in your catalogue</p>
        </div>
        <button onClick={() => setModal({})} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full max-w-sm border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-5xl mb-3">📦</p>
          <p className="font-bold text-slate-700">No products yet</p>
          <p className="text-slate-400 text-sm mt-1">Add your first product to start selling</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="h-36 bg-slate-50 rounded-xl flex items-center justify-center text-5xl mb-4">
              🍽️
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900">{product.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{product.description}</p>
              </div>
              <p className="font-black text-slate-900 text-lg">₹{product.price}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${product.available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                {product.available ? "Available" : "Unavailable"}
              </span>
              <p className="text-xs text-slate-400">Stock: {product.inventory?.quantity ?? "∞"}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => toggleAvail({ productId: product._id, available: !product.available })}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {product.available ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                {product.available ? "Disable" : "Enable"}
              </button>
              <button
                onClick={() => setModal({ product })}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 border border-blue-100 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Pencil size={13} /> Edit
              </button>
              <button
                onClick={() => { if (window.confirm("Delete this product?")) remove(product._id); }}
                className="flex items-center gap-1.5 text-xs font-bold text-red-500 border border-red-100 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
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
