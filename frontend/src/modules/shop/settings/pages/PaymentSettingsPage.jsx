import { toast } from "react-hot-toast";
import useShopSettings from "../hooks/useShopSettings";
import PaymentSettingsForm from "../components/PaymentSettingsForm";
import * as settingsService from "../services/settings.service";

export default function PaymentSettingsPage() {

    const {
        settings,
        loading,
        refresh,
    } = useShopSettings();

    async function save(values) {

        try {

            await settingsService.updatePayments(values);

            toast.success("Payment settings updated.");

            refresh();

        } catch {

            toast.error("Unable to update payment settings.");

        }

    }

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                Payment Settings

            </h1>

            <PaymentSettingsForm

                initialValues={settings.payment}

                onSubmit={save}

            />

        </div>

    );

}
