import Button from "@/components/ui/Button";

export default function DeliveryActions({ assignment, onPickup, onArrive, onDeliver }) {
    return (
        <section className="space-y-3 bg-white p-4">
            <Button onClick={onPickup}>Picked Up</Button>
            <Button onClick={onArrive}>Arrived</Button>
            <Button onClick={onDeliver}>Deliver Order</Button>
        </section>
    );
}
