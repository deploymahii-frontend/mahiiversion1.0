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
    <section>
      <div className="flex items-center gap-2 mb-4">
        <FiClock className="text-gray-900 dark:text-gray-100" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Business Hours</h2>
      </div>

      {businessHours.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Business hours not available.</p>
      ) : (
        <div className="space-y-3">
          {businessHours.map((day) => (
            <div
              key={day.day}
              className="flex justify-between items-center text-sm"
            >
              <span className="font-semibold text-gray-700 dark:text-gray-300">{day.day}</span>

              {day.closed ? (
                <span className="text-rose-500 font-bold tracking-wide uppercase text-[10px]">Closed</span>
              ) : (
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  {day.open || "-"} - {day.close || "-"}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
