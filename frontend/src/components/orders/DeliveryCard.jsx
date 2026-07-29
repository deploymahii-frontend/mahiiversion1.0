export default function DeliveryCard({ address }) {
  if (!address) return null;

  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

      <p>{address.fullName}</p>
      <p>{address.mobile}</p>
      <p>{address.addressLine}</p>
      <p>{address.area}</p>
      <p>
        {address.city}, {address.state}
      </p>
      <p>{address.pincode}</p>

      {address.landmark && (
        <p className="text-gray-500 mt-2">Landmark: {address.landmark}</p>
      )}
    </div>
  );
}
