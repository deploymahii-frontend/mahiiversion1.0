import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegisterShop } from "../hooks/useShopOwner";
import toast from "react-hot-toast";
import {
  Store, MapPin, Phone, Mail, FileText, Clock,
  ChevronRight, ChevronLeft, CheckCircle2, Loader2, LocateFixed
} from "lucide-react";

const CATEGORIES = [
  { value: "mess",        label: "Mess",         emoji: "🍛" },
  { value: "restaurant",  label: "Restaurant",   emoji: "🍽️" },
  { value: "cafe",        label: "Café",         emoji: "☕" },
  { value: "hotel",       label: "Hotel",        emoji: "🏨" },
  { value: "bakery",      label: "Bakery",       emoji: "🧁" },
  { value: "fast_food",   label: "Fast Food",    emoji: "🍔" },
  { value: "street_food", label: "Street Food",  emoji: "🥘" },
  { value: "grocery",     label: "Grocery",      emoji: "🛒" },
  { value: "medical",     label: "Medical",      emoji: "💊" },
  { value: "stationery",  label: "Stationery",   emoji: "📚" },
  { value: "salon",       label: "Salon",        emoji: "💇" },
  { value: "barber",      label: "Barber",       emoji: "💈" },
  { value: "gym",         label: "Gym",          emoji: "🏋️" },
  { value: "hostel",      label: "Hostel",       emoji: "🛏️" },
  { value: "pg",          label: "PG",           emoji: "🏠" },
  { value: "laundry",     label: "Laundry",      emoji: "👔" },
];

const STEPS = [
  { id: 1, label: "Shop Details",  icon: Store },
  { id: 2, label: "Address",       icon: MapPin },
  { id: 3, label: "Review & Submit", icon: CheckCircle2 },
];

export default function ShopRegistration() {
  const navigate = useNavigate();
  const { mutateAsync: registerShop, isPending } = useRegisterShop();
  const [step, setStep] = useState(1);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const {
    register, handleSubmit, watch, setValue, trigger,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "", category: "", description: "", phone: "", email: "",
      addressLine: "", area: "", city: "", state: "", pincode: "",
      latitude: "", longitude: "",
      deliveryAvailable: false, pickupAvailable: true,
    },
  });

  const formValues = watch();

  async function nextStep() {
    let valid = false;
    if (step === 1) valid = await trigger(["name", "category", "phone"]);
    if (step === 2) valid = await trigger(["city", "state"]);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by your browser");
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue("latitude", pos.coords.latitude.toFixed(6));
        setValue("longitude", pos.coords.longitude.toFixed(6));
        toast.success("Location detected!");
        setDetectingLocation(false);
      },
      () => {
        toast.error("Could not detect location. Please enter manually.");
        setDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function onSubmit(data) {
    const payload = {
      name: data.name,
      category: data.category,
      description: data.description,
      phone: data.phone,
      email: data.email || undefined,
      address: {
        addressLine: data.addressLine,
        area: data.area,
        city: data.city,
        state: data.state,
        country: "India",
        pincode: data.pincode,
      },
      deliveryAvailable: data.deliveryAvailable,
      pickupAvailable: data.pickupAvailable,
    };

    if (data.latitude && data.longitude) {
      payload.location = {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
      };
    }

    try {
      await registerShop(payload);
      toast.success("Shop registered! Awaiting admin approval 🎉");
      navigate("/dashboard/approval-pending");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white mb-4 shadow-lg shadow-orange-500/25">
            <Store size={30} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Register Your Shop</h1>
          <p className="text-slate-400 dark:text-slate-500 mt-2">
            Join the Mahii marketplace and reach thousands of local customers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" :
                  isDone ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" :
                  "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                }`}>
                  {isDone ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-6 md:p-8">

            {/* Step 1: Shop Details */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Store size={20} className="text-orange-500" /> Shop Details
                </h2>

                {/* Name */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Shop Name *</label>
                  <input
                    {...register("name", { required: "Shop name is required", minLength: { value: 2, message: "Minimum 2 characters" } })}
                    placeholder="e.g. Sharma's Kitchen"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Category *</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                    {CATEGORIES.map((cat) => (
                      <label
                        key={cat.value}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          formValues.category === cat.value
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30 shadow-sm"
                            : "border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <input type="radio" value={cat.value} {...register("category", { required: "Pick a category" })} className="sr-only" />
                        <span className="text-xl">{cat.emoji}</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Description</label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="Tell customers what makes your shop special..."
                    className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm resize-none focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
                  />
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5"><Phone size={14} /> Phone *</label>
                    <input
                      {...register("phone", { required: "Phone number is required" })}
                      placeholder="9876543210"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5"><Mail size={14} /> Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="shop@example.com"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin size={20} className="text-orange-500" /> Shop Address
                </h2>

                <div>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Address Line</label>
                  <input
                    {...register("addressLine")}
                    placeholder="Shop No. 12, Main Road"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Area / Locality</label>
                    <input {...register("area")} placeholder="MG Road" className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">City *</label>
                    <input {...register("city", { required: "City is required" })} placeholder="Pune" className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" />
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">State *</label>
                    <input {...register("state", { required: "State is required" })} placeholder="Maharashtra" className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" />
                    {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Pincode</label>
                    <input {...register("pincode")} placeholder="411001" className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" />
                  </div>
                </div>

                {/* Location Detection */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2"><LocateFixed size={16} /> GPS Location</label>
                    <button
                      type="button"
                      onClick={detectLocation}
                      disabled={detectingLocation}
                      className="flex items-center gap-1.5 bg-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-600 transition disabled:opacity-50"
                    >
                      {detectingLocation ? <Loader2 size={14} className="animate-spin" /> : <LocateFixed size={14} />}
                      {detectingLocation ? "Detecting..." : "Auto Detect"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input {...register("latitude")} placeholder="Latitude" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" />
                    <input {...register("longitude")} placeholder="Longitude" className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none dark:text-white" />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register("deliveryAvailable")} className="w-4 h-4 accent-orange-500 rounded" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Delivery Available</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" {...register("pickupAvailable")} className="w-4 h-4 accent-orange-500 rounded" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pickup Available</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText size={20} className="text-orange-500" /> Review Your Details
                </h2>

                {/* Summary Cards */}
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Shop Info</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Name</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{formValues.name || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Category</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {CATEGORIES.find((c) => c.value === formValues.category)?.emoji} {CATEGORIES.find((c) => c.value === formValues.category)?.label || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Phone</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{formValues.phone || "—"}</span>
                      </div>
                      {formValues.email && (
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Email</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{formValues.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Address</h3>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {[formValues.addressLine, formValues.area, formValues.city, formValues.state, formValues.pincode].filter(Boolean).join(", ") || "—"}
                    </p>
                    {formValues.latitude && formValues.longitude && (
                      <p className="text-xs text-slate-400 mt-1">📍 {formValues.latitude}, {formValues.longitude}</p>
                    )}
                  </div>
                </div>

                {/* Approval Notice */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-amber-700 dark:text-amber-300">Admin Approval Required</p>
                      <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                        After registration, your shop will be reviewed by the Mahii team.
                        You'll be notified once it's approved and you can start selling!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-md"
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition shadow-lg shadow-orange-500/25 disabled:opacity-50"
                >
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                  {isPending ? "Submitting..." : "Submit for Approval"}
                </button>
              )}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
