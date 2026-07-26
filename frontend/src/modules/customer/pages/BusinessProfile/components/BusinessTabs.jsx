const tabs = ["Products", "Services", "Offers", "Moments", "Reviews"];

export default function BusinessTabs() {
  return (
    <section className="sticky top-16 z-30 bg-white">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button key={tab} className="flex-1 p-4 font-medium hover:border-b-2 hover:border-blue-600">
            {tab}
          </button>
        ))}
      </div>
    </section>
  );
}
