import {
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiInstagram,
  FiShare2,
} from "react-icons/fi";

export default function ShopQuickActions({ shop }) {
  const openMaps = () => {
    const coordinates = shop.location?.coordinates;
    const [longitude, latitude] = coordinates || [0, 0];

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      "_blank"
    );
  };

  const callShop = () => {
    window.location.href = `tel:${shop.phone}`;
  };

  const whatsappShop = () => {
    window.open(
      shop.socialLinks?.whatsapp ||
        `https://wa.me/${shop.phone.replace(/\D/g, "")}`,
      "_blank"
    );
  };

  const openInstagram = () => {
    if (shop.socialLinks?.instagram) {
      window.open(shop.socialLinks.instagram, "_blank");
    }
  };

  const shareShop = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Shree Mess",
        text: "Check out this shop on Mahii!",
        url: window.location.href,
      });
    }
  };

  const ActionButton = ({ icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
    >
      {icon}
      <span className="text-sm mt-2">{label}</span>
    </button>
  );

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="grid grid-cols-5 gap-4">
        <ActionButton
          icon={<FiMapPin size={24} className="text-orange-500" />}
          label="Navigate"
          onClick={openMaps}
        />

        <ActionButton
          icon={<FiPhone size={24} className="text-green-600" />}
          label="Call"
          onClick={callShop}
        />

        <ActionButton
          icon={<FiMessageCircle size={24} className="text-green-500" />}
          label="WhatsApp"
          onClick={whatsappShop}
        />

        <ActionButton
          icon={<FiInstagram size={24} className="text-pink-500" />}
          label="Instagram"
          onClick={openInstagram}
        />

        <ActionButton
          icon={<FiShare2 size={24} className="text-blue-500" />}
          label="Share"
          onClick={shareShop}
        />
      </div>
    </section>
  );
}
