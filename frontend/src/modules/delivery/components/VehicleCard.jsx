export default function VehicleCard({ partner }) {
    return (
        <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="font-semibold">Vehicle Details</h2>
            <p>{partner?.vehicleType || "Vehicle type"}</p>
            <p>{partner?.vehicleNumber || "Vehicle number"}</p>
        </section>
    );
}
