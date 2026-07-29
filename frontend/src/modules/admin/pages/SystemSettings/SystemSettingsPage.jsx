import GeneralSettings from "./components/GeneralSettings";
import FeatureFlags from "./components/FeatureFlags";
import SecuritySettings from "./components/SecuritySettings";
import MaintenanceMode from "./components/MaintenanceMode";
import HealthStatus from "./components/HealthStatus";

import { useSystemSettings } from "./hooks/useSystemSettings";

export default function SystemSettingsPage() {

    const {

        settings,

        loading

    } = useSystemSettings();

    if (loading) return <div>Loading...</div>;

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <GeneralSettings settings={settings} />

            <FeatureFlags settings={settings} />

            <SecuritySettings settings={settings} />

            <MaintenanceMode settings={settings} />

            <HealthStatus />

        </main>

    );

}
