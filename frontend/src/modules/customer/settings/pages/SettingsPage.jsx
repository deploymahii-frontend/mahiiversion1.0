import useSettings from "../hooks/useSettings";
import ThemeSelector from "../components/ThemeSelector";
import NotificationSettings from "../components/NotificationSettings";
import PrivacySettings from "../components/PrivacySettings";

export default function SettingsPage() {
  const { data = {}, isLoading } = useSettings();

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Settings & Preferences</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Customize application behavior, themes, and privacy</p>
      </div>

      <ThemeSelector currentTheme={data.theme} />
      <NotificationSettings settings={data.notifications || {}} />
      <PrivacySettings settings={data.privacy || {}} />
    </div>
  );
}
