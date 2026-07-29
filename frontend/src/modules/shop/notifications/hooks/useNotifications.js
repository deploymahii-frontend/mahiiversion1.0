import { useEffect, useState } from "react";
import * as notificationService from "../services/notification.service";

export default function useNotifications() {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadNotifications() {

        try {

            const { data } =
                await notificationService.getNotifications();

            setNotifications(data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadNotifications();

    }, []);

    return {

        notifications,

        loading,

        refresh: loadNotifications,

    };

}
