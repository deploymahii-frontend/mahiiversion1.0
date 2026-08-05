import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiHome, FiUsers, FiShoppingBag, FiBox, FiTool, FiClipboard, FiCreditCard, FiFilm, FiFlag, FiLifeBuoy, FiMap, FiGrid, FiBarChart2, FiSettings, FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const items = [
  { label: "Overview", icon: FiHome, href: "/admin/dashboard" },
  { label: "Users", icon: FiUsers, href: "/admin/users" },

  { label: "Products", icon: FiBox, href: "/admin/products" },
  { label: "Services", icon: FiTool, href: "/admin/services" },
  { label: "Orders", icon: FiClipboard, href: "/admin/orders" },
  { label: "Payments", icon: FiCreditCard, href: "/admin/payments" },
  { label: "Moments", icon: FiFilm, href: "/admin/moments" },
  { label: "Reports", icon: FiFlag, href: "/admin/reports" },
  { label: "Support", icon: FiLifeBuoy, href: "/admin/support" },
  { label: "Cities", icon: FiMap, href: "/admin/cities" },
  { label: "Categories", icon: FiGrid, href: "/admin/categories" },
  { label: "Analytics", icon: FiBarChart2, href: "/admin/analytics" },
  { label: "Settings", icon: FiSettings, href: "/admin/settings" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const toggle = () => setCollapsed((c) => !c);
  const widthClass = collapsed ? "w-16" : "w-56";

  return (
    <aside
      className={`${widthClass} bg-[#000000] border-r border-[#222] px-2 py-4 transition-all duration-200 flex flex-col h-screen overflow-y-auto shrink-0 sticky top-0`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-6 px-2">
        {!collapsed && (
          <span className="text-[#ededed] text-sm font-semibold tracking-tight">
            mahii
          </span>
        )}
        <button
          onClick={toggle}
          aria-label="Toggle navigation"
          className="text-[#666] hover:text-[#ededed] transition-colors p-1 rounded hover:bg-[#111]"
        >
          {collapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-0.5 flex-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] transition-all duration-150 ${
                  isActive
                    ? "bg-[#111] text-[#ededed] font-medium"
                    : "text-[#888] hover:text-[#ededed] hover:bg-[#111]"
                }`
              }
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-[#222]">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] text-[#888] hover:text-red-400 hover:bg-[#111] transition-all duration-150 w-full"
        >
          <FiLogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
