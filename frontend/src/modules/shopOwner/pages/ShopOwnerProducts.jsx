import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useShopProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useToggleAvailability,
  useShopDashboard,
  useUpdateStock,
} from "../hooks/useShopOwner";
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Search,
  Tag,
  Package,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";

const CATEGORIES = [
  "General",
  "Food & Beverage",
  "Grocery",
  "Pizza",
  "Burger",
  "Biryani",
  "Cafe & Coffee",
  "Bakery & Desserts",
  "Clothing & Fashion",
  "Medical & Pharmacy",
  "Stationery",
  "Services",
];

function ProductModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      category: "General",
      price: "",
      discountedPrice: "",
      description: "",
      stock: 100,
      sku: "",
      images: [""],
      status: "ACTIVE",
      available: true,
    }
  );

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUrlChange = (index, val) => {
    const nextImages = [...(form.images || [])];
    nextImages[index] = val;
    setForm((prev) => ({ ...prev, images: nextImages }));
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...(prev.images || []), ""] }));
  };

  const removeImageField = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.name.trim()) return alert("Product name is required.");
    if (!form.price || Number(form.price) <= 0) return alert("Valid positive price is required.");
    const cleanImages = (form.images || []).filter((img) => img && img.trim());
    onSave({
      ...form,
      images: cleanImages,
      price: Number(form.price),
      discountedPrice: form.discountedPrice ? Number(form.discountedPrice) : undefined,
      stock: Number(form.stock),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-xl border border-slate-100 dark:border-slate-800 my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {initial?._id ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Product Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={change}
                placeholder="e.g. Cheese Burst Pizza"
                required
                className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={change}
                className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Selling Price (₹) *
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={change}
                placeholder="e.g. 199"
                required
                min="1"
                className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Discount / Original Price (₹)
              </label>
              <input
                name="discountedPrice"
                type="number"
                value={form.discountedPrice || ""}
                onChange={change}
                placeholder="e.g. 249"
                className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
              />
            </div>
          </div>

          {/* Inventory & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Stock Quantity
              </label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={change}
                placeholder="100"
                min="0"
                className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                SKU / Item Code
              </label>
              <input
                name="sku"
                value={form.sku || ""}
                onChange={change}
                placeholder="SKU-1001"
                className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={change}
              placeholder="Freshly prepared delicious item with mozzarella cheese..."
              rows={3}
              className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none dark:text-white"
            />
          </div>

          {/* Image URLs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Product Images (URLs)
            </label>
            <div className="space-y-2">
              {(form.images || [""]).map((imgUrl, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={imgUrl}
                    onChange={(e) => handleImageUrlChange(i, e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
                  />
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(i)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold p-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 mt-1"
              >
                + Add Another Image URL
              </button>
            </div>
          </div>

          {/* Status & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status || "ACTIVE"}
                onChange={change}
                className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
              >
                <option value="ACTIVE">ACTIVE (Published)</option>
                <option value="INACTIVE">INACTIVE (Hidden)</option>
                <option value="OUT_OF_STOCK">OUT OF STOCK</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available ?? true}
                  onChange={change}
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Available for Customer Ordering
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
            >
              Save Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
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
  const { mutate: updateStock } = useUpdateStock();

  const [modal, setModal] = useState(null); // null | { product? }
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toString().toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "ACTIVE") return p.status === "ACTIVE" || p.available === true;
    if (statusFilter === "INACTIVE") return p.status === "INACTIVE" || p.available === false;
    if (statusFilter === "OUT_OF_STOCK")
      return p.status === "OUT_OF_STOCK" || (p.inventory?.quantity !== undefined && p.inventory.quantity <= 0);
    if (statusFilter === "ARCHIVED") return p.status === "ARCHIVED";

    return true;
  });

  const handleSave = (form) => {
    if (modal?.product?._id) {
      update({ productId: modal.product._id, data: form });
    } else {
      create(form);
    }
    setModal(null);
  };

  if (dashboardLoading || productsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-52 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (dashboardData && !dashboardData.shopExists) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <AlertCircle size={48} className="text-orange-500" />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Shop Not Initialized</h2>
        <p className="max-w-md text-slate-500 dark:text-slate-400">
          You must complete the shop onboarding process before managing products.
        </p>
        <Link
          to="/shopowner/dashboard"
          className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Set up Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Product Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage product pricing, stock availability, images, and public store listings.
          </p>
        </div>
        <button
          onClick={() => setModal({})}
          className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-2xl font-extrabold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, category, SKU..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white shadow-xs"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {["ALL", "ACTIVE", "INACTIVE", "OUT_OF_STOCK", "ARCHIVED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                statusFilter === tab
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center p-6">
          <Package size={48} className="text-slate-300 dark:text-slate-700 mb-3" />
          <p className="font-bold text-slate-700 dark:text-slate-300 text-lg">No products found</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
            {search || statusFilter !== "ALL"
              ? "Try resetting your search or filter parameters."
              : "Add your first product to start accepting customer orders."}
          </p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => {
          const mainImage = product.images?.[0] || product.image;
          const stockQty = product.inventory?.quantity ?? 100;
          const isAvailable = product.available && product.status === "ACTIVE";

          return (
            <div
              key={product._id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                {/* Product Image Header */}
                <div className="h-44 bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden relative flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-800">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">🍽️</span>
                  )}
                  {product.category && (
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.category?.name || product.category}
                    </span>
                  )}
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                      isAvailable
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {isAvailable ? <CheckCircle size={10} /> : <XCircle size={10} />}
                    {product.status || (isAvailable ? "ACTIVE" : "INACTIVE")}
                  </span>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-2">
                      {product.description || "No description provided"}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-slate-900 dark:text-white text-lg">
                      ₹{product.price}
                    </p>
                    {product.discountedPrice && (
                      <p className="text-xs text-slate-400 line-through">
                        ₹{product.discountedPrice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stock & SKU summary */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50 dark:border-slate-800/80 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Stock: <strong className="text-slate-800 dark:text-slate-200">{stockQty}</strong>
                  </span>
                  {product.sku && (
                    <span className="text-slate-400 text-[11px]">
                      SKU: {product.sku}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() =>
                    toggleAvail({
                      productId: product._id,
                      available: !product.available,
                    })
                  }
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {product.available ? <ToggleRight size={15} className="text-emerald-500" /> : <ToggleLeft size={15} className="text-slate-400" />}
                  {product.available ? "Disable" : "Enable"}
                </button>

                <button
                  onClick={() => setModal({ product })}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                >
                  <Pencil size={13} /> Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Archive this product? It will be hidden from customer discovery.")) {
                      remove(product._id);
                    }
                  }}
                  className="p-2.5 text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Archive Product"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
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
