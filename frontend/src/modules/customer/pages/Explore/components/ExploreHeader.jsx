import { Search, MapPin, Mic, Bell } from "lucide-react";

export default function ExploreHeader() {
  return (
    <section className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search businesses, products, services, offers..."
              className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-14 py-4 text-sm shadow-sm focus:border-yellow-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-gray-600">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm hover:border-yellow-400">
              <MapPin size={18} />
              Near me
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm hover:border-yellow-400">
              <Mic size={18} />
              Voice
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm hover:border-yellow-400">
              <Bell size={18} />
              Alerts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
