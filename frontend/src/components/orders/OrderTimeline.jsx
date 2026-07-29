// src/components/orders/OrderTimeline.jsx

const steps = [
    "Order Placed",
    "Accepted",
    "Preparing",
    "Ready for Pickup",
    "Out for Delivery",
    "Delivered",
];

export default function OrderTimeline({
    currentStep,
}) {
    return (
        <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
                <div
                    key={step}
                    className="flex items-center gap-4"
                >
                    <div
                        className={`h-4 w-4 rounded-full ${
                            index <= currentStep
                                ? "bg-green-500"
                                : "bg-gray-300"
                        }`}
                    />
                    <span>{step}</span>
                </div>
            ))}
        </div>
    );
}
