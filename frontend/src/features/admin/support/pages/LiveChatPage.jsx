import {
  FiMessageCircle,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiUser,
  FiPaperclip,
  FiSmile,
  FiSend,
  FiClock,
  FiArrowRightCircle,
} from "react-icons/fi";

export default function LiveChatPage({
  loading,
  conversations = [],
  activeChat = {},
  message = "",
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onSelectChat,
  onMessageChange,
  onSend,
  onTransfer,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (

    <div className="grid grid-cols-12 gap-6">

      {/* Conversation List */}

      <div className="col-span-4 rounded-2xl bg-white shadow-sm">

        <div className="border-b p-5">

          <div className="flex items-center justify-between">

            <h2 className="flex items-center gap-2 text-xl font-bold">
              <FiMessageCircle />
              Live Chats
            </h2>

            <button
              onClick={onRefresh}
              className="rounded-lg border p-2"
            >
              <FiRefreshCw />
            </button>

          </div>

          <div className="relative mt-4">

            <FiSearch className="absolute left-3 top-3 text-gray-400"/>

            <input
              value={search}
              onChange={(e)=>onSearch?.(e.target.value)}
              placeholder="Search customer..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

        </div>

        <div className="max-h-[650px] overflow-y-auto">

          {conversations.map((chat)=>(

            <button
              key={chat.id}
              onClick={()=>onSelectChat?.(chat)}
              className="flex w-full items-center justify-between border-b p-4 text-left hover:bg-gray-50"
            >

              <div>

                <h4 className="font-semibold">
                  {chat.customer}
                </h4>

                <p className="text-sm text-gray-500">
                  {chat.lastMessage}
                </p>

              </div>

              <span className="text-xs text-gray-400">
                {chat.time}
              </span>

            </button>

          ))}

        </div>

      </div>

      {/* Chat Window */}

      <div className="col-span-8 rounded-2xl bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-5">

          <div>

            <h3 className="font-bold">
              {activeChat.customer || "Select Conversation"}
            </h3>

            <p className="text-sm text-gray-500">
              {activeChat.status || "Offline"}
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={onTransfer}
              className="rounded-lg border px-4 py-2"
            >
              <FiArrowRightCircle className="mr-2 inline"/>
              Transfer
            </button>

            <button
              onClick={onExport}
              className="rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              <FiDownload className="mr-2 inline"/>
              Export
            </button>

          </div>

        </div>

        {/* Messages */}

        <div className="h-[500px] overflow-y-auto p-6">

          {(activeChat.messages || []).map((msg,index)=>(

            <div
              key={index}
              className={`mb-5 flex ${
                msg.sender==="agent"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-md rounded-xl px-4 py-3 ${
                  msg.sender==="agent"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100"
                }`}
              >

                <p>{msg.text}</p>

                <span className="mt-2 block text-xs opacity-70">
                  {msg.time}
                </span>

              </div>

            </div>

          ))}

        </div>

        {/* Message Box */}

        <div className="border-t p-5">

          <div className="flex gap-3">

            <button className="rounded-lg border p-3">
              <FiPaperclip />
            </button>

            <button className="rounded-lg border p-3">
              <FiSmile />
            </button>

            <input
              value={message}
              onChange={(e)=>onMessageChange?.(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border px-4"
            />

            <button
              onClick={onSend}
              className="rounded-lg bg-indigo-600 px-6 text-white"
            >
              <FiSend />
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
