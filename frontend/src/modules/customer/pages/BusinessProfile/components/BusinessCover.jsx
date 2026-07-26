export default function BusinessCover({ business }) {
  return (
    <section className="relative">
      <img src={business.coverImage} alt={business.name} className="h-72 w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70" />
    </section>
  );
}
