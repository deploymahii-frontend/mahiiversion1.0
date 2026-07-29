import {
  FiWifi,
  FiHome,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaSnowflake,
  FaParking,
  FaLeaf,
  FaWheelchair,
  FaUsers,
} from "react-icons/fa";

export default function ShopFacilities({ shop }) {
  const facilities = [
    {
      key: "parking",
      label: "Parking",
      icon: <FaParking />,
    },
    {
      key: "wifi",
      label: "Free Wi-Fi",
      icon: <FiWifi />,
    },
    {
      key: "ac",
      label: "Air Conditioning",
      icon: <FaSnowflake />,
    },
    {
      key: "pureVeg",
      label: "Pure Veg",
      icon: <FaLeaf />,
    },
    {
      key: "familyFriendly",
      label: "Family Friendly",
      icon: <FaUsers />,
    },
    {
      key: "wheelchairAccessible",
      label: "Wheelchair Accessible",
      icon: <FaWheelchair />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiHome className="text-orange-500 text-2xl" />
          <h2 className="text-2xl font-bold">Facilities</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {facilities.map((item) => (
            <div
              key={item.key}
              className={`rounded-2xl p-4 flex items-center gap-3 border ${
                shop.facilities?.[item.key]
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <div className="text-xl">{item.icon}</div>

              <div className="flex-1">
                <p className="font-medium">{item.label}</p>
              </div>

              {shop.facilities?.[item.key] && (
                <FiCheckCircle className="text-green-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
