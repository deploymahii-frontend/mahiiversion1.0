export default function NotificationList() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">New offer available near you</div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Your order is on the way</div>
      </div>
    </section>
  );
}
