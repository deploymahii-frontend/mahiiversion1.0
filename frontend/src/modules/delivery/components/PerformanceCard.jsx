export default function PerformanceCard({ partner }) {
    return (
        <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="font-semibold">Performance</h2>
            <p>Rating : {partner?.rating || 0}</p>
            <p>Deliveries : {partner?.completedDeliveries || 0}</p>
            <p>Earnings : ₹{partner?.walletBalance || 0}</p>
        </section>
    );
}
