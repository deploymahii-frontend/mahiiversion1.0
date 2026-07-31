import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Dashboard", icon: "🏠", href: "/admin/dashboard" },
  { label: "Users", icon: "👤", href: "/admin/users" },
  { label: "Businesses", icon: "🏪", href: "/admin/businesses" },
  { label: "Products", icon: "📦", href: "/admin/products" },
  { label: "Services", icon: "🛠", href: "/admin/services" },
  { label: "Orders", icon: "📋", href: "/admin/orders" },
  { label: "Payments", icon: "💳", href: "/admin/payments" },
  { label: "Mahii Moments", icon: "🎬", href: "/admin/moments" },
  { label: "Reports", icon: "🚩", href: "/admin/reports" },
  { label: "Support", icon: "🎫", href: "/admin/support" },
  { label: "Cities", icon: "🌍", href: "/admin/cities" },
  { label: "Categories", icon: "📂", href: "/admin/categories" },
  { label: "Analytics", icon: "📊", href: "/admin/analytics" },
  { label: "Settings", icon: "⚙", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);
  const widthClass = collapsed ? "w-20" : "w-64";
  
  return (
    <aside
      className={`${widthClass} bg-[#051e34] border-r border-[#031525] px-3 py-5 transition-width duration-200 flex flex-col h-screen overflow-y-auto shrink-0 sticky top-0`}
    >
      <div className="flex items-center justify-between mb-8 px-3">
        {!collapsed && (
          <span className="text-[#8a9bb1] text-xs font-bold uppercase tracking-wider">
            Mahii Admin
          </span>
        )}
        <button 
          onClick={toggle} 
          aria-label="Toggle navigation" 
          className="text-[#8a9bb1] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
        >
          {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="space-y-1.5 flex-1">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors group ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-[#8a9bb1] hover:text-white hover:bg-white/10"
              }`
            }
          >
            <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
