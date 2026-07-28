import { toast } from "react-hot-toast";

import useShopSettings from "../hooks/useShopSettings";

import ShopProfileForm from "../components/ShopProfileForm";

import * as settingsService from "../services/settings.service";

export default function ShopSettingsPage() {

    const {

        settings,

        loading,

        refresh,

    } = useShopSettings();

    async function saveProfile(data) {

        try {

            await settingsService.updateProfile(data);

            toast.success("Profile updated.");

            refresh();

        } catch {

            toast.error("Unable to save profile.");

        }

    }

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold mb-8">

                Shop Settings

            </h1>

            <ShopProfileForm

                initialValues={settings}

                onSubmit={saveProfile}

            />

        </div>

    );

}
