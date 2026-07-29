export default function DeliveryStatusCard({ assignment }) {
    return (
        <section className="bg-white p-4 shadow">
            <h2 className="text-lg font-semibold">{assignment?.customerName || "No customer"}</h2>
            <p className="mt-2 text-sm text-gray-600">{assignment?.deliveryAddress || "No address"}</p>
            <p className="mt-2 text-sm text-gray-600">ETA: {assignment?.eta || "--"}</p>
        </section>
    );
}
