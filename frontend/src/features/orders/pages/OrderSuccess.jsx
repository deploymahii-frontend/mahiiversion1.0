import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function OrderSuccess() {
  const { state } = useLocation();

  const order = state?.order;
  const paymentFailed = state?.paymentFailed;

  if (paymentFailed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center p-6">
        <div className="w-full rounded-3xl border border-red-100 dark:border-red-900/30 bg-white dark:bg-slate-900 p-8 text-center shadow-lg">
          <FiXCircle size={72} className="mx-auto text-red-500" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Payment Failed</h1>
          <p className="mt-3 text-gray-500 dark:text-slate-400">
            We couldn't process your payment. Please try again.
          </p>
          <div className="mt-8">
            <Link
              to={`/checkout`}
              className="inline-block rounded-xl bg-orange-500 px-8 py-3 text-center font-semibold text-white hover:bg-orange-600 transition"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center p-6">
      <div className="w-full rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-lg">
        <FiCheckCircle size={72} className="mx-auto text-green-500" />

        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Order Placed Successfully
        </h1>

        <p className="mt-3 text-gray-500 dark:text-slate-400">
          Thank you for ordering with Mahii.
        </p>

        {order && (
          <div className="mt-8 rounded-2xl bg-gray-50 dark:bg-slate-950/50 border border-gray-100 dark:border-slate-800 p-5 text-left space-y-3">
            <div className="flex justify-between text-gray-900 dark:text-white">
              <span className="text-gray-500 dark:text-slate-400">Order Number</span>
              <strong className="font-bold">{order.orderNumber}</strong>
            </div>

            <div className="flex justify-between text-gray-900 dark:text-white">
              <span className="text-gray-500 dark:text-slate-400">Total Amount</span>
              <strong className="font-bold text-orange-600 dark:text-orange-400">₹{order.totalAmount}</strong>
            </div>

            {order.paymentMethod === "UPI_DIRECT" && (
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-800 text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Scan to Pay via UPI</p>
                <div className="bg-white p-4 inline-block rounded-xl border-2 border-gray-100">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=mahii@upi&pn=Mahii&am=${order.totalAmount}&tr=${order.orderNumber}&cu=INR`} 
                    alt="UPI QR Code" 
                    className="w-32 h-32"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-3">
                  Please scan this QR code with any UPI app to complete your payment.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/orders/${order?._id || order?.id}`}
            className="flex-1 rounded-xl bg-orange-500 px-5 py-3.5 text-center font-bold text-white hover:bg-orange-600 transition shadow-md shadow-orange-500/20"
          >
            View Order
          </Link>

          <Link
            to="/"
            className="flex-1 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-5 py-3.5 text-center font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
