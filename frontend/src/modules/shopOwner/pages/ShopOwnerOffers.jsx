import { useState } from "react";
import { Link } from "react-router-dom";
import { useShopDashboard, useShopOffers, useCreateOffer, useUpdateOffer, useDeleteOffer } from "../hooks/useShopOwner";
import { Plus, Trash2, Pencil, CheckCircle2, XCircle, Percent, IndianRupee, CalendarDays, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

function OfferModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || {
    title: "",
    description: "",
    couponCode: "",
    type: "percentage",
    value: "",
    minimumOrder: "",
    validFrom: new Date().toISOString().slice(0, 10),
    validTill: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    isActive: true,
  });

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const inp = "mt-1.5 w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white";
  const lbl = "text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-7 w-full max-w-md border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">{initial?._id ? "Edit Offer" : "Create Offer"}</h2>
        <div className="space-y-4">
          <div>
            <label className={lbl}>Title</label>
            <input name="title" value={form.title} onChange={change} placeholder="Weekend special" className={inp} />
          </div>
          <div>
            <label className={lbl}>Promo Code</label>
            <input name="couponCode" value={form.couponCode} onChange={change} placeholder="e.g. WELCOME20" className={`${inp} font-mono uppercase`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Type</label>
              <select name="type" value={form.type} onChange={change} className={inp}>
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat (₹)</option>
              </select>
            </div>
            <div>
              <label className={lbl}>Value</label>
              <input name="value" type="number" min="0" value={form.value} onChange={change} placeholder="20" className={inp} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Minimum Order (₹)</label>
              <input name="minimumOrder" type="number" min="0" value={form.minimumOrder} onChange={change} className={inp} />
            </div>
            <div>
              <label className={lbl}>Valid From</label>
              <input name="validFrom" type="date" value={form.validFrom} onChange={change} className={inp} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Valid Till</label>
              <input name="validTill" type="date" value={form.validTill} onChange={change} className={inp} />
            </div>
            <div>
              <label className={lbl}>Active</label>
              <div className="mt-1">
                <label className="inline-flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="isActive" checked={form.isActive} onChange={change} className="w-4 h-4 accent-orange-500" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Enabled</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className={lbl}>Description</label>
            <textarea name="description" value={form.description} onChange={change} rows={3} className={`${inp} resize-none`} />
          </div>
        </div>
        <div className="flex gap-3 mt-7">
          <button onClick={() => onSave(form)} className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition">
            {initial?._id ? "Update" : "Create"}
          </button>
          <button onClick={onClose} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopOwnerOffers() {
  const { data: dashboardData, isLoading: dashboardLoading } = useShopDashboard();
  const shopId = dashboardData?.shop?.id;
  const { data: offers = [], isLoading: offersLoading, refetch } = useShopOffers(shopId);
  const createOffer = useCreateOffer();
  const updateOffer = useUpdateOffer();
  const deleteOffer = useDeleteOffer();

  if (dashboardLoading || offersLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => <div key={i} className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl" />)}
      </div>
    );
  }

  if (dashboardData && !dashboardData.shopExists) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <AlertCircle size={48} className="text-orange-500" />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Shop Not Initialized</h2>
        <p className="max-w-md text-slate-500 dark:text-slate-400">
          You must complete the shop onboarding process before managing offers.
        </p>
        <Link to="/shopowner/dashboard" className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition">
          Set up Shop
        </Link>
      </div>
    );
  }

  const [tab, setTab] = useState("active");
  const [modal, setModal] = useState(null);

  const now = new Date();
  const parsedOffers = offers.map((offer) => ({
    ...offer,
    expiresAt: offer.validTill,
    minOrder: offer.minimumOrder,
  }));
  const active = parsedOffers.filter((o) => o.isActive && new Date(o.expiresAt) > now);
  const expired = parsedOffers.filter((o) => !o.isActive || new Date(o.expiresAt) <= now);
  const displayed = tab === "active" ? active : expired;

  const handleSave = async (form) => {
    try {
      if (modal?.offer?._id) {
        await updateOffer.mutateAsync({ offerId: modal.offer._id, data: form });
      } else {
        await createOffer.mutateAsync({ ...form, shop: shopId });
      }
      setModal(null);
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to save offer");
    }
  };

  const handleDelete = async (offerId) => {
    if (!window.confirm("Delete this offer?")) return;
    try {
      await deleteOffer.mutateAsync(offerId);
      toast.success("Offer deleted");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to delete offer");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Offers & Promotions</h1>
          <p className="text-slate-400 dark:text-slate-500 mt-1">Create discount codes to attract more customers</p>
        </div>
        <button onClick={() => setModal({})} className="flex items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition shadow-md shadow-orange-500/20">
          <Plus size={16} /> Create Offer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 text-center">
          <p className="text-3xl font-black text-slate-900 dark:text-white">{offers.length}</p>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">Total</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm p-5 text-center">
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{active.length}</p>
          <p className="text-sm font-semibold text-emerald-500 mt-1">Active</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 text-center">
          <p className="text-3xl font-black text-slate-500 dark:text-slate-400">{expired.length}</p>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">Expired</p>
        </div>
      </div>

      <div className="flex gap-2">
        {["active", "expired"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition capitalize ${tab === t ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400"}`}
          >
            {t} ({t === "active" ? active.length : expired.length})
          </button>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-5xl mb-3">🎁</p>
          <p className="font-bold text-slate-700 dark:text-slate-300">{tab === "active" ? "No active offers" : "No expired offers"}</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">{tab === "active" ? "Create your first promotional offer" : "Expired offers appear here"}</p>
        </div>
      )}

      <div className="space-y-4">
        {displayed.map((offer) => {
          const isExp = new Date(offer.expiresAt) <= now;
          return (
            <div key={offer._id} className={`bg-white dark:bg-slate-900 rounded-2xl border shadow-sm p-6 transition ${isExp ? "border-slate-200 dark:border-slate-800 opacity-70" : "border-slate-100 dark:border-slate-800 hover:shadow-md"}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${offer.type === "percentage" ? "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400" : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"}`}>
                    {offer.type === "percentage" ? <Percent size={22} /> : <IndianRupee size={22} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-slate-900 dark:text-white font-mono text-lg">{offer.couponCode || offer.title || `OFFER-${offer._id.slice(-4).toUpperCase()}`}</h3>
                      {offer.isActive && !isExp ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full"><CheckCircle2 size={12} /> Active</span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full"><XCircle size={12} /> Expired</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{offer.description || "No description provided."}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400 dark:text-slate-500">
                      <span>{offer.type === "percentage" ? `${offer.value}% off` : `₹${offer.value} off`}</span>
                      <span>Min order ₹{offer.minimumOrder ?? 0}</span>
                      <span className="flex items-center gap-1"><CalendarDays size={12} />{new Date(offer.expiresAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModal({ offer })}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modal !== null && <OfferModal initial={modal.offer} onSave={handleSave} onClose={() => setModal(null)} />}
    </div>
  );
}
