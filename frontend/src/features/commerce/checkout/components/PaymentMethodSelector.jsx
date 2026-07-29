import { useState } from "react";

const PAYMENT_METHODS = [
  {
    id: "COD",
    title: "Cash on Delivery",
    description: "Pay when your order is delivered",
  },
  {
    id: "UPI",
    title: "UPI",
    description: "Pay using any UPI app",
  },
];

export default function PaymentMethodSelector({
  value,
  onChange,
}) {
  const [selected, setSelected] = useState(value || "COD");

  function handleSelect(method) {
    setSelected(method);
    onChange?.(method);
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Payment Method
      </h2>

      <div className="space-y-4">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
              selected === method.id
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200"
            }`}
          >
            <div>
              <h3 className="font-medium">{method.title}</h3>

              <p className="text-sm text-gray-500">
                {method.description}
              </p>
            </div>

            <input
              type="radio"
              checked={selected === method.id}
              onChange={() => handleSelect(method.id)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
