import { useEffect, useState } from "react";
import { useShopProfile, useUpdateShopProfile, useToggleShopStatus } from "../hooks/useShopOwner";
import { Store, MapPin, Phone, Mail, Globe, Percent, CheckCircle, XCircle, Instagram } from "lucide-react";

export default function ShopOwnerProfile() {
  const { data: shop, isLoading } = useShopProfile();
  const { mutate: update, isPending: saving } = useUpdateShopProfile();
  const { mutate: toggleStatus } = useToggleShopStatus();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!shop) return;

    setForm({
      name: shop.name || "",
      category: shop.category || "",
      tagline: shop.tagline || "",
      description: shop.description || "",
      phone: shop.phone || "",
      email: shop.email || "",
      website: shop.website || "",
      gstNumber: shop.gstNumber || "",
      "address.line1": shop.address?.line1 || "",
      "address.city": shop.address?.city || "",
      "address.pincode": shop.address?.pincode || "",
      "socialLinks.whatsapp": shop.socialLinks?.whatsapp || "",
      "socialLinks.instagram": shop.socialLinks?.instagram || "",
    });
  }, [shop]);

  const startEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const payload = {
      name: form.name,
      category: form.category,
      tagline: form.tagline,
      description: form.description,
      phone: form.phone,
      email: form.email,
      website: form.website,
      gstNumber: form.gstNumber,
      address: {
        line1: form["address.line1"],
        city: form["address.city"],
        pincode: form["address.pincode"],
      },
      socialLinks: {
        whatsapp: form["socialLinks.whatsapp"],
        instagram: form["socialLinks.instagram"],
      },
    };
    update(payload, { onSuccess: () => setEditing(false) });
  };

  const change = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Shop Profile</h1>
          <p className="text-slate-400 mt-1">Manage your shop's storefront, contact details, and public listing.</p>
        </div>
        <button
          onClick={editing ? handleSave : startEdit}
          disabled={saving}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : editing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-3xl font-black">
              {shop.name?.[0] || "S"}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">{shop.name}</h2>
              <p className="text-sm text-slate-500 mt-1">{shop.category || "Shop owner storefront"}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {shop.isVerified ? (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <CheckCircle size={12} /> Verified
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                <XCircle size={12} /> Pending Verification
              </span>
            )}
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${shop.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-700"}`}>
              {shop.status}
            </span>
            <button
              onClick={() => toggleStatus(!shop.isOpen)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${shop.isOpen ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
            >
              {shop.isOpen ? "Open" : "Closed"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Public Shop Details</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { label: "Shop Name", name: "name", icon: Store, type: "text" },
              { label: "Category", name: "category", icon: Store, type: "text" },
              { label: "Tagline", name: "tagline", icon: Percent, type: "text" },
              { label: "Website", name: "website", icon: Globe, type: "text" },
              { label: "Phone", name: "phone", icon: Phone, type: "tel" },
              { label: "Email", name: "email", icon: Mail, type: "email" },
              { label: "GST Number", name: "gstNumber", icon: Percent, type: "text" },
            ].map(({ label, name, icon: Icon, type }) => (
              <div key={name} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600">{label}</label>
                {editing ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                    <Icon className="text-slate-400" size={16} />
                    <input
                      name={name}
                      value={form[name] || ""}
                      onChange={change}
                      type={type}
                      className="w-full border-none bg-transparent text-sm text-slate-700 focus:outline-none"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-slate-700">{shop[name] || "—"}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Address & Social Links</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { label: "Address", name: "address.line1", icon: MapPin },
              { label: "City", name: "address.city", icon: MapPin },
              { label: "PIN Code", name: "address.pincode", icon: MapPin },
              { label: "WhatsApp Link", name: "socialLinks.whatsapp", icon: Phone },
              { label: "Instagram Link", name: "socialLinks.instagram", icon: Instagram },
            ].map(({ label, name, icon: Icon }) => (
              <div key={name} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600">{label}</label>
                {editing ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                    <Icon className="text-slate-400" size={16} />
                    <input
                      name={name}
                      value={form[name] || ""}
                      onChange={change}
                      className="w-full border-none bg-transparent text-sm text-slate-700 focus:outline-none"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-slate-700">{form[name] || "—"}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Description</h2>
          {editing ? (
            <textarea
              name="description"
              value={form.description || ""}
              onChange={change}
              rows={5}
              className="w-full rounded-3xl border border-slate-200 p-4 text-sm text-slate-700 focus:outline-none"
            />
          ) : (
            <p className="text-sm text-slate-700 leading-relaxed">{shop.description || "No description has been added yet."}</p>
          )}
        </div>
      </div>

      {editing && (
        <button onClick={() => setEditing(false)} className="text-sm text-slate-400 hover:text-slate-600 font-semibold">
          Cancel editing
        </button>
      )}
    </div>
  );
}
