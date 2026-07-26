const tabs = ["All", "Businesses", "Products", "Services"];

export default function CategoryTabs() {
  return (
    <div className="flex border-b bg-white">
      {tabs.map((tab) => (
        <button key={tab} className="flex-1 border-b-2 border-transparent p-4 font-medium hover:border-blue-600">
          {tab}
        </button>
      ))}
    </div>
  );
}
