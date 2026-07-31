import { Search, HelpCircle } from "lucide-react";

export default function SupportHero({ searchQuery, setSearchQuery }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-md space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
          <HelpCircle size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black">How can we help you?</h1>
          <p className="text-xs text-blue-100 mt-0.5">Search our knowledge base or get support for your orders</p>
        </div>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search issues, FAQs, refunds, order delays..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-800 text-sm font-medium focus:outline-none shadow-sm placeholder:text-slate-400"
        />
      </div>
    </section>
  );
}
