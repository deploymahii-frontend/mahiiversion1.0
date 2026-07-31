import { useState } from "react";
import { Plus } from "lucide-react";
import useAddresses from "../hooks/useAddresses";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";
import EmptyAddress from "../components/EmptyAddress";

export default function AddressPage() {
  const [showForm, setShowForm] = useState(false);
  const { data = [], isLoading } = useAddresses();

  const mockAddresses = [
    { _id: "ADDR001", label: "Home", type: "HOME", addressLine: "Flat 402, Royal Palms, Rajaram Puri 5th Lane", city: "Kolhapur", state: "Maharashtra", postalCode: "416001", isDefault: true },
    { _id: "ADDR002", label: "Work", type: "WORK", addressLine: "Building B, Cyber City, Tarabai Park", city: "Kolhapur", state: "Maharashtra", postalCode: "416003", isDefault: false },
  ];

  const addresses = data.length ? data : mockAddresses;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        {[1, 2].map((i) => (
          <div key={i} className="h-32 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Saved Addresses</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage delivery locations for quick checkout</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 dark:bg-blue-600 text-white font-bold px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
        >
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {!addresses.length ? (
        <EmptyAddress onAdd={() => setShowForm(true)} />
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressCard key={address._id || address.id} address={address} />
          ))}
        </div>
      )}

      <AddressForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
