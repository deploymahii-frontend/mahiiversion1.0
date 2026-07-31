import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import toast from "react-hot-toast";

export default function ThemeSelector({ currentTheme = "system" }) {
  const [theme, setTheme] = useState(currentTheme);

  const handleSelect = (t) => {
    setTheme(t);
    toast.success(`Theme set to ${t}`);
  };

  const options = [
    { label: "Light Mode", value: "light", icon: Sun },
    { label: "Dark Mode", value: "dark", icon: Moon },
    { label: "System Default", value: "system", icon: Monitor },
  ];

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Appearance & Theme</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`p-4 rounded-2xl border font-semibold text-sm flex items-center justify-center gap-2 transition ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
