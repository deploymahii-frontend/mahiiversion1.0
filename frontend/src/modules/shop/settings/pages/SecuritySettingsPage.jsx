import { toast } from "react-hot-toast";
import SecurityForm from "../components/SecurityForm";
import useShopSettings from "../hooks/useShopSettings";
import * as settingsService from "../services/settings.service";

export default function SecuritySettingsPage() {

    const {
        settings,
        loading,
    } = useShopSettings();

    async function changePassword(data) {

        try {

            await settingsService.changePassword(data);

            toast.success("Password changed successfully.");

        } catch {

            toast.error("Unable to change password.");

        }

    }

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8 space-y-8">

            <h1 className="text-3xl font-bold">

                Security Settings

            </h1>

            <SecurityForm
                onSubmit={changePassword}
            />

        </div>

    );

}
