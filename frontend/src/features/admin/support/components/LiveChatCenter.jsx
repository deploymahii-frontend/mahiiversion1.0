export default function LiveChatCenter({ loading, chats }) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-60 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Live Chat Center</h2>
        <p className="text-gray-500">Monitor ongoing conversations with customers and partners.</p>
      </div>

      <div className="space-y-4">
        {chats.map((chat) => (
          <div key={chat.id} className="rounded-3xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{chat.customer}</p>
                <p className="text-sm text-gray-500">{chat.topic}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                {chat.status}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <p>Agent: {chat.agent}</p>
              <p>{chat.lastMessageTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
