import { useState } from "react";
import { Settings, Bell, BellOff, CreditCard, Clock, Shield, AlertTriangle, Save, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ShopOwnerSettings() {
  const [notifications, setNotifications] = useState({
    newOrders: true, orderUpdates: true, marketing: false, dailyReport: true,
  });
  const [payment, setPayment] = useState({ upiId: "", bankName: "", accountNumber: "", ifsc: "" });
  const [hours, setHours] = useState(
    Object.fromEntries(DAYS.map((d) => [d, { open: "09:00", close: "21:00", isOpen: true }]))
  );
  const [saving, setSaving] = useState(false);

  const toggleNotif = (key) => setNotifications((p) => ({ ...p, [key]: !p[key] }));
  const updatePayment = (e) => { const { name, value } = e.target; setPayment((p) => ({ ...p, [name]: value })); };
  const toggleDay = (day) => setHours((p) => ({ ...p, [day]: { ...p[day], isOpen: !p[day].isOpen } }));
  const updateTime = (day, field, value) => setHours((p) => ({ ...p, [day]: { ...p[day], [field]: value } }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); toast.success("Settings saved successfully"); }, 800);
  };

  const inp = "w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white";

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-400 dark:text-slate-500 mt-1">Manage notifications, payments, and shop hours</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition disabled:opacity-50 shadow-md shadow-orange-500/20">
          <Save size={16} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-5"><Bell size={18} className="text-orange-500" /> Notification Preferences</h2>
        <div className="space-y-3">
          {[
            { key: "newOrders", label: "New Orders", desc: "Get notified when a customer places an order" },
            { key: "orderUpdates", label: "Order Status Updates", desc: "Alerts when order status changes" },
            { key: "dailyReport", label: "Daily Revenue Report", desc: "Receive a daily summary of your earnings" },
            { key: "marketing", label: "Marketing & Tips", desc: "Tips to grow your business on Mahii" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{label}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{desc}</p>
              </div>
              <button onClick={() => toggleNotif(key)} className="text-slate-500 dark:text-slate-400 hover:text-orange-500 transition">
                {notifications[key] ? <ToggleRight size={28} className="text-orange-500" /> : <ToggleLeft size={28} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-5"><CreditCard size={18} className="text-orange-500" /> Payment Settings</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Configure how you receive payouts from Mahii</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">UPI ID</label><input name="upiId" value={payment.upiId} onChange={updatePayment} placeholder="yourshop@upi" className={`mt-1.5 ${inp}`} /></div>
          <div><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bank Name</label><input name="bankName" value={payment.bankName} onChange={updatePayment} placeholder="State Bank of India" className={`mt-1.5 ${inp}`} /></div>
          <div><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account Number</label><input name="accountNumber" value={payment.accountNumber} onChange={updatePayment} placeholder="XXXX XXXX XXXX" className={`mt-1.5 ${inp}`} /></div>
          <div><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">IFSC Code</label><input name="ifsc" value={payment.ifsc} onChange={updatePayment} placeholder="SBIN0001234" className={`mt-1.5 ${inp}`} /></div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-5"><Clock size={18} className="text-orange-500" /> Operating Hours</h2>
        <div className="space-y-2">
          {DAYS.map((day) => (
            <div key={day} className={`flex items-center gap-4 p-3 rounded-xl transition ${hours[day].isOpen ? "bg-slate-50 dark:bg-slate-800/50" : "bg-slate-50/50 dark:bg-slate-800/20 opacity-60"}`}>
              <button onClick={() => toggleDay(day)} className="text-slate-400 hover:text-orange-500 transition flex-shrink-0">
                {hours[day].isOpen ? <ToggleRight size={24} className="text-orange-500" /> : <ToggleLeft size={24} />}
              </button>
              <span className="w-24 text-sm font-bold text-slate-700 dark:text-slate-300">{day}</span>
              {hours[day].isOpen ? (
                <div className="flex items-center gap-2">
                  <input type="time" value={hours[day].open} onChange={(e) => updateTime(day, "open", e.target.value)} className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-3 py-1.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <span className="text-slate-400 text-sm">to</span>
                  <input type="time" value={hours[day].close} onChange={(e) => updateTime(day, "close", e.target.value)} className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-3 py-1.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              ) : (
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900/50 shadow-sm p-6">
        <h2 className="text-lg font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-3"><AlertTriangle size={18} /> Danger Zone</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">These actions are irreversible. Please proceed with caution.</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => toast("Feature coming soon")} className="flex items-center gap-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 dark:hover:bg-red-950/30 transition">
            <Shield size={15} /> Deactivate Shop
          </button>
          <button onClick={() => toast("Feature coming soon")} className="flex items-center gap-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 dark:hover:bg-red-950/30 transition">
            <AlertTriangle size={15} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
