export default function SubscriptionCard({ plan }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{plan?.name}</h3>
      <p className="mt-2 text-gray-600">${plan?.price}/{plan?.interval}</p>
    </div>
  );
}
