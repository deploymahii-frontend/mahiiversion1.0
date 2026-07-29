export function calculateCartTotals(cart) {
  const subTotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = cart.discount || 0;
  const tax = cart.tax || 0;
  const deliveryCharge = cart.deliveryCharge || 0;

  return {
    subTotal,
    totalAmount: subTotal - discount + tax + deliveryCharge,
  };
}
