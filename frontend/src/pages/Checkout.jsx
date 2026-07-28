import { useState } from "react";
import useCheckout from "../hooks/useCheckout";

export default function Checkout() {
  const { loading, placeOrder } = useCheckout();

  const [form, setForm] = useState({
    deliveryType: "SHOP_DELIVERY",
    paymentMethod: "CASH",
    deliveryAddress: {
      fullName: "",
      mobile: "",
      addressLine: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    },
    notes: "",
  });

  function submit(e) {
    e.preventDefault();
    placeOrder(form);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <form onSubmit={submit} className="space-y-6">
        {form.deliveryType === "SHOP_DELIVERY" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Full Name"
                className="w-full border rounded-xl p-4"
                value={form.deliveryAddress.fullName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deliveryAddress: {
                      ...form.deliveryAddress,
                      fullName: e.target.value,
                    },
                  })
                }
                required
              />

              <input
                placeholder="Mobile"
                className="w-full border rounded-xl p-4"
                value={form.deliveryAddress.mobile}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deliveryAddress: {
                      ...form.deliveryAddress,
                      mobile: e.target.value,
                    },
                  })
                }
                required
              />
            </div>

            <input
              placeholder="Address Line"
              className="w-full border rounded-xl p-4"
              value={form.deliveryAddress.addressLine}
              onChange={(e) =>
                setForm({
                  ...form,
                  deliveryAddress: {
                    ...form.deliveryAddress,
                    addressLine: e.target.value,
                  },
                })
              }
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Area"
                className="w-full border rounded-xl p-4"
                value={form.deliveryAddress.area}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deliveryAddress: {
                      ...form.deliveryAddress,
                      area: e.target.value,
                    },
                  })
                }
                required
              />

              <input
                placeholder="City"
                className="w-full border rounded-xl p-4"
                value={form.deliveryAddress.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deliveryAddress: {
                      ...form.deliveryAddress,
                      city: e.target.value,
                    },
                  })
                }
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="State"
                className="w-full border rounded-xl p-4"
                value={form.deliveryAddress.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deliveryAddress: {
                      ...form.deliveryAddress,
                      state: e.target.value,
                    },
                  })
                }
                required
              />

              <input
                placeholder="Pincode"
                className="w-full border rounded-xl p-4"
                value={form.deliveryAddress.pincode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deliveryAddress: {
                      ...form.deliveryAddress,
                      pincode: e.target.value,
                    },
                  })
                }
                required
              />
            </div>

            <input
              placeholder="Landmark"
              className="w-full border rounded-xl p-4"
              value={form.deliveryAddress.landmark}
              onChange={(e) =>
                setForm({
                  ...form,
                  deliveryAddress: {
                    ...form.deliveryAddress,
                    landmark: e.target.value,
                  },
                })
              }
            />
          </div>
        )}

        <select
          className="w-full border rounded-xl p-4"
          value={form.paymentMethod}
          onChange={(e) =>
            setForm({
              ...form,
              paymentMethod: e.target.value,
            })
          }
        >
          <option value="CASH">Cash</option>
          <option value="UPI_DIRECT">UPI</option>
          <option value="RAZORPAY">Razorpay</option>
        </select>

        <select
          className="w-full border rounded-xl p-4"
          value={form.deliveryType}
          onChange={(e) =>
            setForm({
              ...form,
              deliveryType: e.target.value,
            })
          }
        >
          <option value="SHOP_DELIVERY">Shop Delivery</option>
          <option value="PICKUP">Pickup</option>
          <option value="VISIT_SHOP">Visit Shop</option>
        </select>

        <textarea
          placeholder="Notes"
          className="w-full border rounded-xl p-4"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
