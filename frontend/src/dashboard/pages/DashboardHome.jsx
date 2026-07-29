import useDashboard from "../../hooks/useDashboard";

export default function DashboardHome() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return <div className="p-8">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Welcome 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card title="Today's Orders" value={dashboard?.today?.orders ?? 0} />
        <Card title="Today's Revenue" value={`₹${dashboard?.today?.revenue ?? 0}`} />
        <Card title="Total Orders" value={dashboard?.stats?.totalOrders ?? 0} />
        <Card title="Completed Orders" value={dashboard?.stats?.completedOrders ?? 0} />
        <Card title="Pending Orders" value={dashboard?.stats?.pendingOrders ?? 0} />
        <Card title="Revenue" value={`₹${dashboard?.stats?.revenue ?? 0}`} />
        <Card title="Products" value={dashboard?.stats?.totalProducts ?? 0} />
        <Card title="Reviews" value={dashboard?.stats?.totalReviews ?? 0} />
        <Card title="Offers" value={dashboard?.stats?.activeOffers ?? 0} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-3xl bg-white shadow-lg p-6">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
  );
}
