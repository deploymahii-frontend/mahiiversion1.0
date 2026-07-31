import { MapPin, Plus, Home, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const labelIcons = {
  Home: Home,
  Work: Briefcase,
  default: MapPin,
};

export default function AddressSection({ addresses = [] }) {
  if (!addresses.length) return null;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Saved Addresses</h2>
        <Link
          to="/customer/addresses"
          className="flex items-center gap-2 text-blue-600 text-sm font-medium"
        >
          <Plus size={16} />
          Add New
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {addresses.map((address) => {
          const Icon = labelIcons[address.label] || labelIcons.default;
          return (
            <div
              key={address._id}
              className="border border-slate-200 rounded-2xl p-4 flex items-start gap-3 hover:border-blue-300 transition"
            >
              <div className="bg-blue-50 rounded-xl p-2 mt-0.5">
                <Icon size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">{address.label}</h3>
                <p className="text-gray-500 text-sm mt-1">{address.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
