import { toast } from "react-hot-toast";
import useShopSettings from "../hooks/useShopSettings";
import BusinessHoursForm from "../components/BusinessHoursForm";
import * as settingsService from "../services/settings.service";

export default function BusinessHoursPage() {

    const {
        settings,
        loading,
        refresh,
    } = useShopSettings();

    async function saveHours(values) {

        try {

            await settingsService.updateBusinessHours(values);

            toast.success("Business hours updated.");

            refresh();

        } catch {

            toast.error("Unable to update business hours.");

        }

    }

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                Business Hours

            </h1>

            <BusinessHoursForm

                initialValues={settings.businessHours}

                onSubmit={saveHours}

            />

        </div>

    );

}
