import { useState } from "react";
import { Plus } from "lucide-react";
import usePaymentMethods from "../hooks/usePaymentMethods";
import PaymentMethodCard from "../components/PaymentMethodCard";
import toast from "react-hot-toast";

export default function PaymentMethodsPage() {
  const { data = [], isLoading } = usePaymentMethods();

  const mockMethods = [
    { _id: "PM001", type: "UPI", provider: "PhonePe", displayName: "om.patil@upi", isDefault: true },
    { _id: "PM002", type: "CARD", provider: "HDFC Visa", displayName: "**** **** **** 4821", isDefault: false },
    { _id: "PM003", type: "COD", provider: "Cash On Delivery", displayName: "Pay at Doorstep", isDefault: false },
  ];

  const methods = data.length ? data : mockMethods;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Saved Payment Methods</h1>
          <p className="text-slate-500 mt-1">Manage UPI IDs, cards, and payment options for 1-click checkout</p>
        </div>

        <button
          onClick={() => toast.success("Add payment method flow initialized.")}
          className="bg-blue-600 text-white font-bold px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
        >
          <Plus size={18} />
          Add Method
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-3xl bg-slate-200" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {methods.map((method) => (
            <PaymentMethodCard key={method._id} method={method} />
          ))}
        </div>
      )}
    </div>
  );
}
