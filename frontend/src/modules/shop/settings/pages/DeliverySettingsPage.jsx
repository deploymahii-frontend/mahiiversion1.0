import { toast } from "react-hot-toast";
import useShopSettings from "../hooks/useShopSettings";
import DeliverySettingsForm from "../components/DeliverySettingsForm";
import * as settingsService from "../services/settings.service";

export default function DeliverySettingsPage() {

    const {
        settings,
        loading,
        refresh,
    } = useShopSettings();

    async function save(values) {

        try {

            await settingsService.updateDelivery(values);

            toast.success("Delivery settings updated.");

            refresh();

        } catch {

            toast.error("Unable to update delivery settings.");

        }

    }

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                Delivery Settings

            </h1>

            <DeliverySettingsForm

                initialValues={settings.delivery}

                onSubmit={save}

            />

        </div>

    );

}
