import { useState } from "react";

export default function DeliveryAddressForm({
  value,
  onChange,
}) {
  const [address, setAddress] = useState(
    value || {
      fullName: "",
      mobile: "",
      addressLine: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    }
  );

  function handleChange(e) {
    const updated = {
      ...address,
      [e.target.name]: e.target.value,
    };

    setAddress(updated);

    onChange?.(updated);
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Delivery Address
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-lg border p-3"
          placeholder="Full Name"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          placeholder="Mobile Number"
          name="mobile"
          value={address.mobile}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3 md:col-span-2"
          placeholder="Address Line"
          name="addressLine"
          value={address.addressLine}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          placeholder="Area"
          name="area"
          value={address.area}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          placeholder="City"
          name="city"
          value={address.city}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          placeholder="State"
          name="state"
          value={address.state}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          placeholder="Pincode"
          name="pincode"
          value={address.pincode}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3 md:col-span-2"
          placeholder="Landmark (Optional)"
          name="landmark"
          value={address.landmark}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
