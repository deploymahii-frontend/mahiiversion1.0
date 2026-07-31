import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Heart, Wallet, User } from "lucide-react";

const tabs = [
    { title: "Home", icon: Home, path: "/customer/dashboard" },
    { title: "Orders", icon: ShoppingBag, path: "/customer/orders" },
    { title: "Wishlist", icon: Heart, path: "/customer/wishlist" },
    { title: "Wallet", icon: Wallet, path: "/customer/wallet" },
    { title: "Profile", icon: User, path: "/customer/profile" }
];

export default function BottomNavigation() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t lg:hidden">
            <div className="flex justify-around items-center h-16">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 text-xs transition ${
                                    isActive
                                        ? "text-blue-600"
                                        : "text-slate-500"
                                }`
                            }
                        >
                            <Icon size={22} />
                            <span>{tab.title}</span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
