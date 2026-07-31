import { X, Home, ShoppingBag, Heart, Wallet, Bell, User, Settings, MapPin, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
    { title: "Dashboard", icon: Home, path: "/customer/dashboard" },
    { title: "Orders", icon: ShoppingBag, path: "/customer/orders" },
    { title: "Wishlist", icon: Heart, path: "/customer/wishlist" },
    { title: "Wallet", icon: Wallet, path: "/customer/wallet" },
    { title: "Addresses", icon: MapPin, path: "/customer/addresses" },
    { title: "Notifications", icon: Bell, path: "/customer/notifications" },
    { title: "Profile", icon: User, path: "/customer/profile" },
    { title: "Settings", icon: Settings, path: "/customer/settings" }
];

export default function MobileSidebar({ open, onClose }) {
    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={onClose}
            />

            {/* Drawer */}
            <aside className="fixed left-0 top-0 z-50 w-72 h-screen bg-white flex flex-col lg:hidden">
                <div className="h-20 flex items-center justify-between px-6 border-b">
                    <h1 className="text-2xl font-black">Mahii</h1>
                    <button onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex-1 p-5 overflow-y-auto">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 rounded-xl px-4 py-3 mb-2 transition ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-slate-100"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                {item.title}
                            </NavLink>
                        );
                    })}
                </nav>

                <button className="m-5 rounded-xl bg-red-500 text-white py-3 flex justify-center items-center gap-2">
                    <LogOut size={18} />
                    Logout
                </button>
            </aside>
        </>
    );
}
