import { useState } from "react";
import { useShopDashboard, useShopOrders, useShopProducts, useShopOffers, useRegisterShop } from "../hooks/useShopOwner";
import {
  ShoppingBag, Package, TrendingUp, Star, Clock, IndianRupee,
  RefreshCw, AlertCircle, Gift, ChevronRight, Plus,
  LayoutDashboard, Server, Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CATEGORIES = [
  "mess", "restaurant", "cafe", "hotel", "bakery", "fast_food",
  "street_food", "grocery", "medical", "stationery", "salon",
  "barber", "gym", "hostel", "pg", "laundry"
];

function StatCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="bg-[#000000] rounded-xl p-5 border border-[#333333] shadow-sm hover:border-[#666666] transition-colors relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[13px] font-medium text-[#888888] tracking-tight">{label}</p>
          <h2 className="text-2xl font-semibold text-[#EDEDED] mt-2 font-mono tracking-tighter">{value ?? "—"}</h2>
          {sub && <p className="text-[11px] text-[#666666] mt-2 font-mono">{sub}</p>}
        </div>
        <div className="text-[#888888] group-hover:text-[#EDEDED] transition-colors">
          <Icon size={18} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function ShopOnboarding({ refetch }) {
  const { mutate: registerShop, isPending } = useRegisterShop();
  const [form, setForm] = useState({
    name: "",
    category: "restaurant",
    phone: "",
    email: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleInvalid = (e) => {
    e.preventDefault();
    toast.error(`Please fill out the required field: ${e.target.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.loading("Submitting shop data...", { duration: 1500 });

    registerShop({
      name: form.name,
      category: form.category,
      phone: form.phone,
      email: form.email || undefined,
      address: { 
        city: form.city,
        state: form.state || form.city, // fallback to city if empty
        addressLine: "Not specified",
        area: "Not specified",
      },
      location: { latitude: 0, longitude: 0 },
    }, {
      onSuccess: () => {
        toast.success("Shop Initialized Successfully!");
        refetch();
      },
      onError: (err) => {
        const msg = err.response?.data?.errors?.[0]?.message 
                 || err.response?.data?.message 
                 || err.message 
                 || "Failed to initialize shop";
        toast.error(`Error: ${msg}`);
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-lg bg-[#0A0A0A] border border-[#333333] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600" />
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#EDEDED] tracking-tight">Create your Shop</h1>
          <p className="text-[14px] text-[#888888] mt-2">Initialize your Mahii storefront and start accepting orders in minutes.</p>
        </div>

        <form onSubmit={handleSubmit} onInvalid={handleInvalid} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#A1A1AA] mb-1.5">Shop Name</label>
              <input required name="name" value={form.name} onChange={handleChange} placeholder="e.g. Acme Coffee" className="w-full bg-[#000000] border border-[#333333] rounded-lg px-3 py-2.5 text-[14px] text-[#EDEDED] placeholder-[#444444] focus:outline-none focus:border-[#666666] focus:ring-1 focus:ring-[#666666] transition-all" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#A1A1AA] mb-1.5">Category</label>
              <select required name="category" value={form.category} onChange={handleChange} className="w-full bg-[#000000] border border-[#333333] rounded-lg px-3 py-2.5 text-[14px] text-[#EDEDED] focus:outline-none focus:border-[#666666] focus:ring-1 focus:ring-[#666666] transition-all">
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1).replace('_', ' ')}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-[#A1A1AA] mb-1.5">Business Phone</label>
                <input required name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile" className="w-full bg-[#000000] border border-[#333333] rounded-lg px-3 py-2.5 text-[14px] text-[#EDEDED] placeholder-[#444444] focus:outline-none focus:border-[#666666] focus:ring-1 focus:ring-[#666666] transition-all" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#A1A1AA] mb-1.5">City</label>
                <input required name="city" value={form.city} onChange={handleChange} placeholder="e.g. Mumbai" className="w-full bg-[#000000] border border-[#333333] rounded-lg px-3 py-2.5 text-[14px] text-[#EDEDED] placeholder-[#444444] focus:outline-none focus:border-[#666666] focus:ring-1 focus:ring-[#666666] transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#A1A1AA] mb-1.5">State</label>
              <input required name="state" value={form.state} onChange={handleChange} placeholder="e.g. Maharashtra" className="w-full bg-[#000000] border border-[#333333] rounded-lg px-3 py-2.5 text-[14px] text-[#EDEDED] placeholder-[#444444] focus:outline-none focus:border-[#666666] focus:ring-1 focus:ring-[#666666] transition-all" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#A1A1AA] mb-1.5">Business Email (Optional)</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="contact@acme.com" className="w-full bg-[#000000] border border-[#333333] rounded-lg px-3 py-2.5 text-[14px] text-[#EDEDED] placeholder-[#444444] focus:outline-none focus:border-[#666666] focus:ring-1 focus:ring-[#666666] transition-all" />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#333333]">
            <Link to="/" className="text-[13px] text-[#888888] hover:text-[#EDEDED] transition-colors">Cancel</Link>
            <button disabled={isPending} type="submit" className="bg-[#EDEDED] hover:bg-white text-black px-4 py-2 text-[14px] font-medium rounded-lg transition-colors disabled:opacity-50">
              {isPending ? "Creating..." : "Initialize Shop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ShopOwnerDashboard() {
  const { data, isLoading, error, refetch } = useShopDashboard();
  const { data: products = [], isLoading: productsLoading } = useShopProducts();
  const { data: orders = [], isLoading: ordersLoading } = useShopOrders({ page: 1, limit: 4 });
  const shopId = data?.shop?.id;
  const { data: offers = [], isLoading: offersLoading } = useShopOffers(shopId);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse bg-black min-h-screen p-6">
        <div className="h-28 rounded-xl bg-[#111111]" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-32 bg-[#111111] rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4 bg-black">
        <AlertCircle size={28} className="text-red-500" />
        <h3 className="font-medium text-[#EDEDED] text-sm">Deployment Failed</h3>
        <p className="text-[#888888] text-[13px] max-w-xs font-mono">
          {error?.message || "ERR_CONNECTION_REFUSED"}
        </p>
        <button
          onClick={() => refetch?.()}
          className="text-[13px] bg-[#333333] hover:bg-[#444444] text-[#EDEDED] px-4 py-2 rounded-lg transition"
        >
          Redeploy
        </button>
      </div>
    );
  }

  if (data && !data.shopExists) {
    return <ShopOnboarding refetch={refetch} />;
  }

  const { stats = {}, shop = {} } = data || {};

  return (
    <div className="bg-black min-h-screen p-4 md:p-8 font-sans selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#333333]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[13px] font-medium text-[#888888] font-mono">
              <Server size={14} /> <span>{shop.slug || shopId?.slice(-6)}.mahii.in</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] ml-2" />
              <span className="text-emerald-500">Live</span>
            </div>
            <h1 className="text-3xl font-semibold text-[#EDEDED] tracking-tight">{shop.name || "My Shop"}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => refetch?.()} className="flex items-center gap-2 text-[13px] font-medium text-[#888888] hover:text-[#EDEDED] border border-[#333333] hover:border-[#666666] bg-[#000000] px-3 py-1.5 rounded-md transition-all">
              <RefreshCw size={14} /> Refresh
            </button>
            <Link to="orders" className="flex items-center gap-2 text-[13px] font-medium text-black bg-[#EDEDED] hover:bg-white px-4 py-1.5 rounded-md transition-all">
              <Activity size={14} /> Logs
            </Link>
          </div>
        </div>

        {/* Pending Orders Alert */}
        {stats.pendingOrders > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-[13px] font-mono text-orange-400">
                {stats.pendingOrders} pending requests require authorization
              </p>
            </div>
            <Link to="orders" className="text-[12px] bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md font-medium transition">
              Resolve
            </Link>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label="Today's Requests"
            value={stats.todayOrders}
            icon={Activity}
            sub={`Pending: ${stats.pendingOrders ?? 0}`}
          />
          <StatCard
            label="Bandwidth (Revenue)"
            value={`₹${Number(stats.todayRevenue ?? 0).toLocaleString("en-IN")}`}
            icon={IndianRupee}
          />
          <StatCard
            label="Total Data (Revenue)"
            value={`₹${Number(stats.totalRevenue ?? 0).toLocaleString("en-IN")}`}
            icon={TrendingUp}
            sub={`Completed: ${stats.completedOrders ?? 0}`}
          />
          <StatCard
            label="Total Requests"
            value={stats.totalOrders}
            icon={Server}
            sub={`Active: ${stats.pendingOrders ?? 0}`}
          />
          <StatCard
            label="Edge Functions (Products)"
            value={stats.totalProducts}
            icon={LayoutDashboard}
            sub={stats.lowStockProducts ? `Low Memory: ${stats.lowStockProducts}` : "Stable"}
          />
          <StatCard
            label="Quality Score"
            value={stats.rating ? Number(stats.rating).toFixed(1) : "—"}
            icon={Star}
            sub={`Reviews: ${stats.totalReviews ?? 0}`}
          />
        </div>

        {/* Split View */}
        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          
          {/* Logs / Recent Orders */}
          <div className="bg-[#000000] border border-[#333333] rounded-xl overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-[#333333] flex justify-between items-center bg-[#0A0A0A]">
              <h3 className="text-[14px] font-medium text-[#EDEDED]">Recent Executions (Orders)</h3>
              <Link to="orders" className="text-[12px] text-[#888888] hover:text-[#EDEDED] flex items-center gap-1 transition">
                View Logs <ChevronRight size={14} />
              </Link>
            </div>
            <div className="flex-1 p-5 space-y-3 font-mono">
              {ordersLoading ? (
                [...Array(3)].map((_, i) => <div key={i} className="h-12 rounded bg-[#111111] animate-pulse" />)
              ) : orders.length === 0 ? (
                <div className="text-[13px] text-[#666666] text-center py-8">No recent executions found.</div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 rounded-lg border border-[#222222] bg-[#0A0A0A] hover:border-[#444444] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${order.orderStatus === 'PENDING' ? 'bg-orange-500' : order.orderStatus === 'DELIVERED' ? 'bg-emerald-500' : 'bg-[#666666]'}`} />
                      <div>
                        <p className="text-[12px] text-[#EDEDED]">{order.orderNumber || order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-[11px] text-[#888888] mt-0.5">{order.customer?.name || "Anonymous"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] text-[#EDEDED]">₹{order.totalAmount}</p>
                      <p className="text-[11px] text-[#888888] mt-0.5">{new Date(order.createdAt).toLocaleTimeString("en-US", { hour12: false })}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Registry / Live Menu Preview */}
          <div className="bg-[#000000] border border-[#333333] rounded-xl overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-[#333333] flex justify-between items-center bg-[#0A0A0A]">
              <h3 className="text-[14px] font-medium text-[#EDEDED]">Function Registry (Menu)</h3>
              <Link to="products" className="text-[12px] text-[#888888] hover:text-[#EDEDED] flex items-center gap-1 transition">
                Manage <ChevronRight size={14} />
              </Link>
            </div>
            <div className="flex-1 p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(productsLoading ? [...Array(4)] : products.slice(0, 4)).map((product, index) => (
                product ? (
                  <div key={product._id} className="p-3 rounded-lg border border-[#222222] bg-[#0A0A0A] hover:border-[#444444] transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[13px] font-medium text-[#EDEDED] truncate pr-2">{product.name}</h4>
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${product.available ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[11px] text-[#666666] font-mono">{product.category?.name || "Function"}</span>
                      <span className="text-[12px] font-mono text-[#A1A1AA]">₹{product.price}</span>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="h-20 rounded-lg bg-[#111111] animate-pulse" />
                )
              ))}
              
              {products.length === 0 && !productsLoading && (
                <div className="col-span-full py-8 text-center border border-dashed border-[#333333] rounded-lg">
                  <p className="text-[13px] text-[#666666]">No functions deployed.</p>
                  <Link to="products" className="inline-flex items-center gap-1 mt-3 text-[12px] text-[#EDEDED] bg-[#222222] hover:bg-[#333333] px-3 py-1.5 rounded-md transition">
                    <Plus size={12} /> Deploy New
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
