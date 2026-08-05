import { useShopProducts, useUpdateStock } from "../hooks/useShopOwner";
import { Minus, Plus, AlertTriangle } from "lucide-react";

function StockBadge({ qty }) {
  if (qty === 0)     return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-500">Out of Stock</span>;
  if (qty <= 5)      return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600">Low Stock</span>;
  return               <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">In Stock</span>;
}

export default function ShopOwnerInventory() {
  const { data: products = [], isLoading } = useShopProducts();
  const { mutate: updateStock, isPending } = useUpdateStock();

  const total     = products.length;
  const lowStock  = products.filter((p) => p.inventory?.quantity > 0 && p.inventory?.quantity <= 5).length;
  const outStock  = products.filter((p) => p.inventory?.quantity === 0).length;

  const changeQty = (productId, current, delta) => {
    const next = Math.max(0, (current || 0) + delta);
    updateStock({ productId, quantity: next });
  };

  if (isLoading) return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />)}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Inventory</h1>
        <p className="text-slate-400 dark:text-slate-500 mt-1">Manage stock levels across your catalogue</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 text-center">
          <p className="text-3xl font-black text-slate-900 dark:text-white">{total}</p>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">Total Products</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-100 dark:border-amber-900/50 shadow-sm p-5 text-center">
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{lowStock}</p>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">Low Stock</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-100 dark:border-red-900/50 shadow-sm p-5 text-center">
          <p className="text-3xl font-black text-red-500 dark:text-red-400">{outStock}</p>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">Out of Stock</p>
        </div>
      </div>

      {/* Low stock alert */}
      {(lowStock > 0 || outStock > 0) && (
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 rounded-2xl p-4">
          <AlertTriangle size={18} className="text-amber-500 shrink-0" />
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
            {outStock} products are out of stock and {lowStock} have low stock. Update inventory to avoid missed orders.
          </p>
        </div>
      )}

      {/* Product stock grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => {
          const qty = product.inventory?.quantity ?? 0;
          return (
            <div key={product._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{product.name}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">₹{product.price}</p>
                </div>
                <StockBadge qty={qty} />
              </div>

              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                <button
                  disabled={isPending || qty === 0}
                  onClick={() => changeQty(product._id, qty, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-40"
                >
                  <Minus size={14} />
                </button>

                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{qty}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">units</p>
                </div>

                <button
                  disabled={isPending}
                  onClick={() => changeQty(product._id, qty, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-slate-900 dark:bg-orange-500 rounded-lg text-white hover:bg-slate-700 dark:hover:bg-orange-600 transition-colors disabled:opacity-40"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
