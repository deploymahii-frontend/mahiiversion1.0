import { Bell } from "lucide-react";
import ThemeToggle from "../../../components/common/ThemeToggle";

export default function Topbar() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 h-20 shadow-sm flex justify-between items-center px-8 transition-colors duration-200">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome, {user?.firstName || "Shop Owner"}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />

                <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition">
                    <Bell className="w-5 h-5" />
                </button>

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow">
                    {(user?.firstName || "S").charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
}
