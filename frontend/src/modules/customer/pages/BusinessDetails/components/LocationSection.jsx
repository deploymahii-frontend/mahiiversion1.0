export default function LocationSection() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
            <h2 className="text-3xl font-bold">Location</h2>
            <p className="mt-4 text-sm text-gray-600">Shahupuri, Kolhapur, Maharashtra, India.</p>
            <div className="mt-6 rounded-3xl bg-white p-4 text-sm text-gray-500 shadow-sm">Map placeholder</div>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
            <h2 className="text-3xl font-bold">Contact</h2>
            <p className="mt-4 text-sm text-gray-600">Phone: +91 12345 67890</p>
            <p className="mt-2 text-sm text-gray-600">Email: hello@shreemess.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
