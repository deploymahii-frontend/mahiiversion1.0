import { toast } from "react-hot-toast";

import useNotifications from "../hooks/useNotifications";

import NotificationCard from "../components/NotificationCard";

import * as notificationService from "../services/notification.service";

export default function NotificationCenterPage() {

    const {

        notifications,

        loading,

        refresh,

    } = useNotifications();

    async function markRead(id) {

        try {

            await notificationService.markAsRead(id);

            refresh();

        } catch {

            toast.error("Unable to update notification.");

        }

    }

    async function readAll() {

        await notificationService.markAllAsRead();

        refresh();

    }

    if (loading)
        return <>Loading...</>;

    return (

        <div className="p-8 space-y-8">

            <div className="flex justify-between">

                <h1 className="text-3xl font-bold">

                    Notifications

                </h1>

                <button

                    onClick={readAll}

                    className="bg-blue-600 text-white px-5 py-2 rounded"

                >

                    Mark All Read

                </button>

            </div>

            <div className="space-y-5">

                {

                    notifications.map(item => (

                        <NotificationCard

                            key={item._id}

                            notification={item}

                            onRead={markRead}

                        />

                    ))

                }

            </div>

        </div>

    );

}
