export default function OnlineToggle({ online, onChange }) {
    return (
        <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow">
            <span>{online ? "Online" : "Offline"}</span>
            <input type="checkbox" checked={online} onChange={onChange} />
        </div>
    );
}
