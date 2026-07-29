export default function CartSummary() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Summary</h2>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div className="flex justify-between"><span>Subtotal</span><span>₹240</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>₹40</span></div>
        <div className="flex justify-between font-semibold text-slate-900"><span>Total</span><span>₹280</span></div>
      </div>
    </section>
  );
}
