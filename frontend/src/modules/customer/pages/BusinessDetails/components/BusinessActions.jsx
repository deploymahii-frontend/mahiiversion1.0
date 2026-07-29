export default function BusinessActions() {
  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {['Save', 'Call', 'Navigate', 'Chat', 'Share', 'Moments'].map((action) => (
            <button key={action} className="rounded-3xl border border-gray-200 bg-white px-4 py-4 text-sm font-semibold hover:border-yellow-400">
              {action}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
