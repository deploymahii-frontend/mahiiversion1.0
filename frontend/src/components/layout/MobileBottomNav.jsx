import { NavLink } from "react-router-dom";
import { Home, Search, PlusCircle, Film, ShoppingCart, User } from "lucide-react";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Search, label: "Explore", to: "/explore" },
  { icon: PlusCircle, label: "Create", to: "/shop/products/new" },
  { icon: Film, label: "Moments", to: "/moments" },
  { icon: ShoppingCart, label: "Cart", to: "/cart" },
  { icon: User, label: "Profile", to: "/profile" },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2 py-1.5 md:hidden transition-colors duration-200">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-semibold transition ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 scale-105"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
