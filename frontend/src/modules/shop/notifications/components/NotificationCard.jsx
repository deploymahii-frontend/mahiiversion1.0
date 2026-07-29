export default function NotificationCard({

    notification,

    onRead,

}) {

    return (

        <div
            className={`rounded-xl border p-5 ${
                notification.read
                    ? "bg-white"
                    : "bg-blue-50"
            }`}
        >

            <div className="flex justify-between">

                <div>

                    <h3 className="font-bold">

                        {notification.title}

                    </h3>

                    <p className="mt-2">

                        {notification.message}

                    </p>

                    <small>

                        {new Date(
                            notification.createdAt
                        ).toLocaleString()}
                    </small>

                </div>

                {

                    !notification.read && (

                        <button
                            onClick={() =>
                                onRead(notification._id)
                            }
                            className="text-blue-600"
                        >

                            Mark Read

                        </button>

                    )

                }

            </div>

        </div>

    );

}
