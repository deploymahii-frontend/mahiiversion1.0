import {
  FiShoppingCart,
  FiSearch,
  FiUser,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiCreditCard,
  FiPrinter,
  FiPackage,
  FiPercent,
  FiSave,
} from "react-icons/fi";

export default function PointOfSale({
  loading,
  products = [],
  cart = [],
  customer,
  totals = {},
  search = "",
  onSearch,
  onAddProduct,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem,
  onSelectCustomer,
  onApplyDiscount,
  onHoldOrder,
  onCheckout,
  onPrintReceipt,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[750px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {/* Product Selection */}
      <div className="xl:col-span-2 space-y-6">
        <div className="rounded-2xl bg-white shadow-sm p-5">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search product or scan barcode..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => onAddProduct?.(product)}
              className="rounded-2xl border bg-white p-5 text-left shadow-sm hover:border-indigo-500"
            >
              <FiPackage className="mb-3 text-2xl text-indigo-600" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.sku}</p>
              <p className="mt-3 text-lg font-bold">{product.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="rounded-2xl bg-white shadow-sm p-5 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <FiShoppingCart />
            Cart
          </h2>

          <button onClick={onSelectCustomer} className="rounded-lg border px-3 py-2">
            <FiUser className="inline mr-2" />
            {customer?.name || "Customer"}
          </button>
        </div>

        <div className="flex-1 overflow-auto space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="rounded-xl border p-4">
              <h3 className="font-semibold">{item.name}</h3>

              <p className="text-gray-500 text-sm">{item.price}</p>

              <div className="mt-3 flex justify-between items-center">
                <div className="flex gap-2">
                  <button onClick={() => onDecreaseQty?.(item)} className="rounded border p-1">
                    <FiMinus />
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => onIncreaseQty?.(item)} className="rounded border p-1">
                    <FiPlus />
                  </button>
                </div>

                <button onClick={() => onRemoveItem?.(item)} className="text-red-600">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}

        <div className="border-t mt-5 pt-5 space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <strong>{totals.subtotal}</strong>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <strong>{totals.discount}</strong>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <strong>{totals.tax}</strong>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>{totals.total}</span>
          </div>
        </div>

        {/* Actions */}

        <div className="grid gap-3 mt-6">
          <button onClick={onApplyDiscount} className="rounded-lg border py-3">
            <FiPercent className="mr-2 inline" />
            Apply Discount
          </button>

          <button onClick={onHoldOrder} className="rounded-lg border py-3">
            <FiSave className="mr-2 inline" />
            Hold Order
          </button>

          <button onClick={onCheckout} className="rounded-lg bg-indigo-600 py-3 text-white">
            <FiCreditCard className="mr-2 inline" />
            Checkout
          </button>

          <button onClick={onPrintReceipt} className="rounded-lg bg-green-600 py-3 text-white">
            <FiPrinter className="mr-2 inline" />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
