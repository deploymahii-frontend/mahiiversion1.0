import { NavLink } from "react-router-dom";

const items = [
  { label: "Dashboard", path: "/admin" },
  { label: "System Settings", path: "/admin/system-settings" },
  { label: "Feature Flags", path: "/admin/feature-flags" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 border-r border-gray-200 bg-gray-900 p-6 text-white">
      <h2 className="text-xl font-semibold">Mahii Admin</h2>
      <div className="mt-8 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
