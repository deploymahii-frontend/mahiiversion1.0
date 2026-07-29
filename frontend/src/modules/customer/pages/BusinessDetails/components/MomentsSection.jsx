export default function MomentsSection() {
  const moments = [
    { title: 'Weekend Brunch', subtitle: 'Chef curated special', image: '' },
    { title: 'Festive Feast', subtitle: 'Seasonal favorites', image: '' },
  ];

  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-600">Moments</p>
          <h2 className="text-3xl font-bold">Love from our community</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {moments.map((moment) => (
            <div key={moment.title} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="h-40 w-full rounded-3xl bg-slate-100" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{moment.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{moment.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
