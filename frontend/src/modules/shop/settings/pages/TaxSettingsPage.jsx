import { toast } from "react-hot-toast";
import useShopSettings from "../hooks/useShopSettings";
import GSTForm from "../components/GSTForm";
import * as settingsService from "../services/settings.service";

export default function TaxSettingsPage() {

    const {
        settings,
        loading,
        refresh,
    } = useShopSettings();

    async function save(values) {

        try {

            await settingsService.updateGST(values);

            toast.success("GST settings updated.");

            refresh();

        } catch {

            toast.error("Unable to update GST settings.");

        }

    }

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                GST & Tax Settings

            </h1>

            <GSTForm

                initialValues={settings.gst}

                onSubmit={save}

            />

        </div>

    );

}
