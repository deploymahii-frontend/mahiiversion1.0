import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Tags,
    BarChart3,
    Bell,
    Settings,
    LogOut,
    Users
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/shop/dashboard",
    },
    {
        title: "Orders",
        icon: ShoppingBag,
        path: "/shop/orders",
    },
    {
        title: "Products",
        icon: Package,
        path: "/shop/products",
    },
    {
        title: "Categories",
        icon: Tags,
        path: "/shop/categories",
    },
    {
        title: "Customers",
        icon: Users,
        path: "/shop/customers",
    },
    {
        title: "Analytics",
        icon: BarChart3,
        path: "/shop/analytics",
    },
    {
        title: "Notifications",
        icon: Bell,
        path: "/shop/notifications",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/shop/settings",
    },
];

export default function Sidebar() {
    return (
        <aside className="w-72 h-screen bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 shadow-md flex flex-col transition-colors duration-200">
            <div className="h-20 flex items-center justify-center border-b border-gray-100 dark:border-slate-800">
                <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                    Mahii
                </h2>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-3.5 rounded-xl font-medium text-sm transition ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                        : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {menu.title}
                        </NavLink>
                    );
                })}
            </nav>

            <button
                className="m-4 flex items-center justify-center gap-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/50 transition"
            >
                <LogOut size={18} />
                Logout
            </button>
        </aside>
    );
}
