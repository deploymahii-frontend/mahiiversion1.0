const tabs = [
  { label: "Shops", value: "SHOP" },
  { label: "Products", value: "PRODUCT" },
  { label: "Services", value: "SERVICE" },
];

export default function WishlistTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-5 py-2 rounded-2xl font-semibold text-sm transition ${
            activeTab === tab.value
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
