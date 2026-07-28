export default function NotificationBadge({ count = 0 }) {
    if (!count) return null;
    return (
        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">
            {count}
        </span>
    );
}
