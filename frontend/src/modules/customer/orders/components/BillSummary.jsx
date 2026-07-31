export default function BillSummary({ bill }) {
  if (!bill) return null;

  const subtotal = bill.subtotal || bill.itemsTotal || 0;
  const deliveryFee = bill.deliveryFee || 0;
  const discount = bill.discount || 0;
  const grandTotal = bill.grandTotal || bill.total || (subtotal + deliveryFee - discount);

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-bold text-lg text-slate-800 mb-4">Bill Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Item Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Discount Applied</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}
        <hr className="my-2 border-slate-100" />
        <div className="flex justify-between text-base font-bold text-slate-900">
          <span>Grand Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
