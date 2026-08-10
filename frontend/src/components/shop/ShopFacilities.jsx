import {
  FiWifi,
  FiInfo,
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

  const availableFacilities = facilities.filter(item => shop.facilities?.[item.key]);

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <FiInfo className="text-gray-900 dark:text-gray-100" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Features</h2>
      </div>

      {availableFacilities.length === 0 ? (
         <p className="text-sm text-gray-500 dark:text-gray-400">No specific features listed.</p>
      ) : (
        <div className="space-y-3">
          {availableFacilities.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-3 text-sm"
            >
              <div className="text-gray-400">{item.icon}</div>
              <span className="font-medium text-gray-700 dark:text-gray-300 flex-1">{item.label}</span>
              <FiCheckCircle className="text-emerald-500" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
