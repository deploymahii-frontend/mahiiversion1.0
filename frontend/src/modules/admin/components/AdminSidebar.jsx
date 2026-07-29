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
  return (
    <aside className="w-72 border-r border-slate-200 bg-white px-4 py-6">
      <div className="mb-8 px-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Mahii Admin</div>
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <span>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
