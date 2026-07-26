import { useMemo, useState } from "react";
import {
	FiSearch,
	FiSend,
	FiPaperclip,
	FiSmile,
	FiUser,
	FiUsers,
	FiRefreshCw,
	FiArrowRightCircle,
	FiMessageSquare,
} from "react-icons/fi";

export default function LiveChat({
	loading,
	conversations = [],
	activeConversation,
	messages = [],
	currentAgent,
	onSelectConversation,
	onSendMessage,
	onTransferConversation,
	onRefresh,
}) {
	const [search, setSearch] = useState("");
	const [message, setMessage] = useState("");

	const filtered = useMemo(() => {
		if (!search.trim()) return conversations;

		return conversations.filter((conversation) =>
			`${conversation.name} ${conversation.type}`
				.toLowerCase()
				.includes(search.toLowerCase())
		);
	}, [search, conversations]);

	if (loading) {
		return (
			<div className="rounded-2xl bg-white p-6 shadow-sm">
				<div className="h-[720px] animate-pulse rounded-xl bg-gray-100" />
			</div>
		);
	}

	const handleSend = () => {
		if (!message.trim()) return;

		onSendMessage?.(message);

		setMessage("");
	};

	return (
		<div className="grid gap-6 xl:grid-cols-4">

			{/* Conversations */}

			<div className="rounded-2xl bg-white p-5 shadow-sm">

				<div className="mb-5 flex items-center justify-between">

					<h2 className="text-xl font-bold">
						Conversations
					</h2>

					<button
						onClick={onRefresh}
						className="rounded-lg border p-2 hover:bg-gray-100"
					>
						<FiRefreshCw />
					</button>

				</div>

				<div className="relative mb-5">

					<FiSearch className="absolute left-3 top-3 text-gray-400" />

					<input
						className="w-full rounded-lg border py-2 pl-10 pr-4"
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

				</div>

				<div className="space-y-3">

					{filtered.map((conversation) => (

						<button
							key={conversation.id}
							onClick={() => onSelectConversation?.(conversation)}
							className={`w-full rounded-xl border p-4 text-left transition ${
								activeConversation?.id === conversation.id
									? "border-blue-600 bg-blue-50"
									: "hover:bg-gray-50"
							}`}
						>

							<div className="flex justify-between">

								<div>

									<h3 className="font-semibold">
										{conversation.name}
									</h3>

									<p className="text-sm text-gray-500">
										{conversation.lastMessage}
									</p>

								</div>

								<span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
									{conversation.unread}
								</span>

							</div>

						</button>

					))}

				</div>

			</div>

			{/* Chat */}

			<div className="xl:col-span-3 rounded-2xl bg-white shadow-sm">

				<div className="flex items-center justify-between border-b p-5">

					<div>

						<h2 className="text-xl font-bold">
							{activeConversation?.name ?? "Select Conversation"}
						</h2>

						<p className="text-sm text-gray-500">
							{activeConversation?.type}
						</p>

					</div>

					<button
						onClick={onTransferConversation}
						className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
					>
						<FiArrowRightCircle />
						Transfer
					</button>

				</div>

				<div className="h-[520px] overflow-y-auto p-6">

					{messages.map((msg) => (

						<div
							key={msg.id}
							className={`mb-4 flex ${
								msg.sender === currentAgent
									? "justify-end"
									: "justify-start"
							}`}
						>

							<div
								className={`max-w-lg rounded-2xl px-4 py-3 ${
									msg.sender === currentAgent
										? "bg-blue-600 text-white"
										: "bg-gray-100"
								}`}
							>

								<div className="mb-1 text-xs opacity-70">
									{msg.sender}
								</div>

								<div>{msg.message}</div>

								<div className="mt-2 text-right text-xs opacity-70">
									{msg.time}
								</div>

							</div>

						</div>

					))}

				</div>

				<div className="border-t p-5">

					<div className="flex gap-3">

						<button className="rounded-lg border p-3">
							<FiPaperclip />
						</button>

						<button className="rounded-lg border p-3">
							<FiSmile />
						</button>

						<input
							className="flex-1 rounded-lg border px-4"
							placeholder="Type message..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>

						<button
							onClick={handleSend}
							className="rounded-lg bg-blue-600 px-5 text-white"
						>
							<FiSend />
						</button>

					</div>

				</div>

			</div>

		</div>
	);
}
