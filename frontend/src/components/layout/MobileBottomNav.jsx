import { Home, Search, Plus, Clapperboard, ShoppingCart, User } from "lucide-react";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Search, label: "Explore", to: "/explore" },
  { icon: Plus, label: "Create", to: "/" },
  { icon: Clapperboard, label: "Moments", to: "/" },
  { icon: ShoppingCart, label: "Cart", to: "/cart" },
  { icon: User, label: "Profile", to: "/dashboard" },
];

export default function MobileBottomNav() {
  return (
    <nav className="sticky bottom-0 z-40 border-t border-gray-200 bg-white px-3 py-2 md:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.to} className="flex flex-col items-center gap-1 text-[11px] text-slate-600">
              <Icon className="h-5 w-5" />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
