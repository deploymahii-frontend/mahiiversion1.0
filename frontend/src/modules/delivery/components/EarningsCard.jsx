export default function EarningsCard({ earnings = 0 }) {
    return (
        <section className="mb-6 rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">Earnings</h2>
            <p className="mt-4 text-3xl font-bold">₹{earnings}</p>
        </section>
    );
}
