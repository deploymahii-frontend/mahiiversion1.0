import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition flex items-center justify-center ${
                isDark
                    ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                    : "bg-gray-100 border-gray-200 text-slate-700 hover:bg-gray-200"
            } ${className}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Black Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Black Mode"}
        >
            {isDark ? (
                <Sun className="w-5 h-5 text-amber-400 fill-amber-400 transition-transform hover:rotate-45" />
            ) : (
                <Moon className="w-5 h-5 text-slate-700 fill-slate-700 transition-transform hover:-rotate-12" />
            )}
        </button>
    );
}
