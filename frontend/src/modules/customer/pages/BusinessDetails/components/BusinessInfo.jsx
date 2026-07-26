export default function BusinessInfo() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold">Business Info</h2>
            <p className="mt-4 text-sm text-gray-600">Details, timings, contact and storefront information for the business.</p>
          </div>
          <div className="lg:col-span-2 rounded-3xl border border-gray-200 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm text-gray-500">Address</h3>
                <p className="mt-2 text-base font-medium">Shahupuri, Kolhapur</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Hours</h3>
                <p className="mt-2 text-base font-medium">8:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
