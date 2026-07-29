import Button from "@/components/ui/Button";

export default function OrderCard({ order }) {
    if (!order) {
        return (
            <div className="rounded-xl bg-white p-6 shadow">
                No Active Order
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">{order.customerName}</h2>
            <p className="mt-2 text-sm text-gray-600">{order.address}</p>
            <Button className="mt-4">Open Navigation</Button>
        </div>
    );
}
