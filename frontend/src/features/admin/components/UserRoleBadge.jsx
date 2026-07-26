const ROLE_CONFIG = {
  CUSTOMER: {
    label: "Customer",
    className: "bg-blue-100 text-blue-700",
  },

  SHOP_OWNER: {
    label: "Shop Owner",
    className: "bg-orange-100 text-orange-700",
  },

  DELIVERY_PARTNER: {
    label: "Delivery Partner",
    className: "bg-green-100 text-green-700",
  },

  ADMIN: {
    label: "Admin",
    className: "bg-purple-100 text-purple-700",
  },

  SUPER_ADMIN: {
    label: "Super Admin",
    className: "bg-red-100 text-red-700",
  },
};

export default function UserRoleBadge({
  role = "CUSTOMER",
}) {
  const config =
    ROLE_CONFIG[role] ||
    ROLE_CONFIG.CUSTOMER;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
