import { useEffect, useState } from "react";
import * as settingsService from "../services/settings.service";

export default function useShopSettings() {

    const [settings, setSettings] = useState(null);

    const [loading, setLoading] = useState(true);

    async function loadSettings() {

        try {

            const { data } =
                await settingsService.getSettings();

            setSettings(data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadSettings();

    }, []);

    return {

        settings,

        loading,

        refresh: loadSettings,

    };

}
