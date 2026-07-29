import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiClipboard,
  FiGrid,
  FiBarChart2,
  FiFileText,
  FiSettings,
} from "react-icons/fi";

const MENU_ITEMS = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/admin",
  },
  {
    label: "Shops",
    icon: FiShoppingBag,
    path: "/admin/shops",
  },
  {
    label: "Users",
    icon: FiUsers,
    path: "/admin/users",
  },
  {
    label: "Orders",
    icon: FiClipboard,
    path: "/admin/orders",
  },
  {
    label: "Categories",
    icon: FiGrid,
    path: "/admin/categories",
  },
  {
    label: "Analytics",
    icon: FiBarChart2,
    path: "/admin/analytics",
  },
  {
    label: "Reports",
    icon: FiFileText,
    path: "/admin/reports",
  },
  {
    label: "Settings",
    icon: FiSettings,
    path: "/admin/settings",
  },
  {
    label: "System Settings",
    icon: FiSettings,
    path: "/admin/system-settings",
  },
  {
    label: "Feature Flags",
    icon: FiSettings,
    path: "/admin/feature-flags",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="flex w-72 flex-col bg-gray-900 text-white">

      <div className="border-b border-gray-800 p-6">

        <h1 className="text-2xl font-bold text-orange-400">
          Mahii Admin
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Platform Control Panel
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

      </nav>

      <div className="border-t border-gray-800 p-4 text-center text-sm text-gray-500">
        Mahii Admin v1.0
      </div>

    </aside>
  );
}
