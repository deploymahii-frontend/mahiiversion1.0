export default function MomentsSection({ moments = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Mahii Moments</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {moments.map((moment) => (
          <img key={moment._id} src={moment.thumbnail} alt="" className="aspect-[9/16] rounded-xl object-cover" />
        ))}
      </div>
    </section>
  );
}
