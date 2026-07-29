function NotificationCard({ notification }) {

    return (

        <article className="rounded-xl border p-4">

            <h3>{notification.title}</h3>

            <p>{notification.message}</p>

            <small>{notification.createdAt}</small>

        </article>

    );

}
