import CustomerLayout from "@/layouts/CustomerLayout";

export default function OrderSuccess() {
  return (
    <CustomerLayout>
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold">Order placed successfully</h1>
        <p className="mt-4 text-sm text-slate-600">Your order is confirmed and being prepared.</p>
      </div>
    </CustomerLayout>
  );
}
