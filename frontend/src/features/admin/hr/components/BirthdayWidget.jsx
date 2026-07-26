export default function BirthdayWidget({ birthdays = [] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Birthdays</h2>
      <div className="mt-4 space-y-3">
        {birthdays.slice(0, 4).map((birthday) => (
          <div key={birthday.id} className="rounded-xl border p-4">
            <p className="font-semibold">{birthday.name}</p>
            <p className="text-sm text-gray-500">{birthday.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
