export default function NotificationHeader({
    title = "Notifications",
    right,
}) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div>{right}</div>
        </div>
    );
}
