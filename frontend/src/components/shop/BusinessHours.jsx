import { FiClock } from "react-icons/fi";

const DAYS = [
  ["monday", "Monday"],
  ["tuesday", "Tuesday"],
  ["wednesday", "Wednesday"],
  ["thursday", "Thursday"],
  ["friday", "Friday"],
  ["saturday", "Saturday"],
  ["sunday", "Sunday"],
];

export default function BusinessHours({ shop }) {
  const hoursData = shop?.businessHours || {};
  const businessHours = DAYS.map(([key, label]) => ({
    day: label,
    ...hoursData[key],
  })).filter((item) => item.open || item.closed);

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiClock className="text-orange-500 text-2xl" />
          <h2 className="text-2xl font-bold">Business Hours</h2>
        </div>

        {businessHours.length === 0 ? (
          <p className="text-gray-500">Business hours not available.</p>
        ) : (
          <div className="space-y-4">
            {businessHours.map((day) => (
              <div
                key={day.day}
                className="flex justify-between items-center border-b pb-3"
              >
                <span className="font-medium">{day.day}</span>

                {day.closed ? (
                  <span className="text-red-500 font-medium">Closed</span>
                ) : (
                  <span className="text-gray-700">
                    {day.open || "-"} - {day.close || "-"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
