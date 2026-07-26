export default function RecentActivityWidget({ activities = [] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Recent HR Activity</h2>
      <div className="mt-4 space-y-3">
        {activities.slice(0, 5).map((activity) => (
          <div key={activity.id} className="rounded-xl border p-4">
            <p className="font-semibold">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
