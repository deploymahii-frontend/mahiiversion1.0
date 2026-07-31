import { useState } from "react";
import { useShopProfile, useUpdateShopProfile, useToggleShopStatus } from "../hooks/useShopOwner";
import { Store, Clock, MapPin, Phone, CheckCircle, XCircle } from "lucide-react";

export default function ShopOwnerProfile() {
  const { data: shop, isLoading } = useShopProfile();
  const { mutate: update, isPending: saving } = useUpdateShopProfile();
  const { mutate: toggleStatus } = useToggleShopStatus();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  const startEdit = () => {
    setForm({
      name: shop?.name || "",
      description: shop?.description || "",
      phone: shop?.phone || "",
      "address.line1": shop?.address?.line1 || "",
      "address.city": shop?.address?.city || "",
      "address.pincode": shop?.address?.pincode || "",
    });
    setEditing(true);
  };

  const handleSave = () => {
    const payload = {
      name: form.name,
      description: form.description,
      phone: form.phone,
      address: {
        line1: form["address.line1"],
        city: form["address.city"],
        pincode: form["address.pincode"],
      },
    };
    update(payload, { onSuccess: () => setEditing(false) });
  };

  const change = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  if (isLoading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-48 bg-slate-200 rounded-2xl" />
      <div className="h-64 bg-slate-200 rounded-2xl" />
    </div>
  );

  if (!shop) return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <Store size={48} className="text-slate-300 mb-4" />
      <p className="font-bold text-slate-700 text-xl">No shop registered</p>
      <p className="text-slate-400 text-sm mt-2">Contact Mahii support to register your shop</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Shop Profile</h1>
          <p className="text-slate-400 mt-1">Manage your shop's public information</p>
        </div>
        <button
          onClick={editing ? handleSave : startEdit}
          disabled={saving}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : editing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Shop header card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-3xl font-black">
            {shop.name?.[0] || "S"}
          </div>
          <div className="flex-1">
            {editing ? (
              <input name="name" value={form.name} onChange={change} className="text-2xl font-black text-slate-900 border-b-2 border-slate-900 bg-transparent w-full focus:outline-none" />
            ) : (
              <h2 className="text-2xl font-black text-slate-900">{shop.name}</h2>
            )}
            <p className="text-sm text-slate-400 mt-1">{shop.category}</p>
            <div className="flex items-center gap-2 mt-2">
              {shop.isVerified ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <CheckCircle size={11} /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  <XCircle size={11} /> Pending Verification
                </span>
              )}
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                shop.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}>
                {shop.status}
              </span>
            </div>
          </div>

          {/* Open/Close toggle */}
          <button
            onClick={() => toggleStatus(!shop.isOpen)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${
              shop.isOpen ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-slate-200 text-slate-600 hover:bg-slate-300"
            }`}
          >
            {shop.isOpen ? "🟢 Open" : "🔴 Closed"}
          </button>
        </div>
      </div>

      {/* Info fields */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
        <h3 className="font-bold text-slate-800">Shop Information</h3>

        {[
          { label: "Description",   name: "description",    icon: Store,   value: shop.description || "—",  type: "textarea" },
          { label: "Phone",         name: "phone",          icon: Phone,   value: shop.phone || "—",        type: "tel" },
          { label: "Address",       name: "address.line1",  icon: MapPin,  value: shop.address?.line1 || "—" },
          { label: "City",          name: "address.city",   icon: MapPin,  value: shop.address?.city || "—" },
          { label: "Pincode",       name: "address.pincode",icon: MapPin,  value: shop.address?.pincode || "—" },
        ].map(({ label, name, icon: Icon, value, type }) => (
          <div key={name} className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-slate-50">
              <Icon size={16} className="text-slate-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-400">{label}</p>
              {editing ? (
                type === "textarea" ? (
                  <textarea name={name} value={form[name]} onChange={change} rows={2} className="w-full text-sm text-slate-700 border-b border-slate-300 bg-transparent focus:outline-none resize-none mt-0.5" />
                ) : (
                  <input name={name} value={form[name]} onChange={change} type={type || "text"} className="w-full text-sm text-slate-700 border-b border-slate-300 bg-transparent focus:outline-none mt-0.5" />
                )
              ) : (
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <button onClick={() => setEditing(false)} className="text-sm text-slate-400 hover:text-slate-600 font-semibold">
          Cancel editing
        </button>
      )}
    </div>
  );
}
