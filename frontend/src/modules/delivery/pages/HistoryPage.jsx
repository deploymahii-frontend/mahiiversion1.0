import HistoryItem from "../components/HistoryItem";

export default function HistoryPage({ history = [] } = {}) {
    return (
        <main className="min-h-screen bg-gray-100 p-4">
            {history.map((item) => (
                <HistoryItem key={item._id} item={item} />
            ))}
        </main>
    );
}
