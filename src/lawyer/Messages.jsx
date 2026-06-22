// src/lawyer/Messages.jsx
// Lawyer's chat interface — shows a list of client conversations
// and a mock message area. Frontend only (no real backend).

import { useState } from "react";
import { FaPaperPlane, FaSearch, FaCircle } from "react-icons/fa";

// ── Mock conversation data ─────────────────────────────────────────
// In a real app this would come from an API / WebSocket
const mockConversations = [
    {
        id: 1,
        clientName: "Ali Hassan",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        lastMessage: "When is your next available slot?",
        time: "10:32 AM",
        unread: 2,
        messages: [
            { from: "client", text: "Assalamu Alaikum, I need legal advice.", time: "10:28 AM" },
            { from: "lawyer", text: "Walaikum Assalam! How can I help you?", time: "10:29 AM" },
            { from: "client", text: "When is your next available slot?", time: "10:32 AM" },
        ],
    },
    {
        id: 2,
        clientName: "Sara Malik",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        lastMessage: "Thank you for the update.",
        time: "Yesterday",
        unread: 0,
        messages: [
            { from: "client", text: "Is the case proceeding well?", time: "Yesterday" },
            { from: "lawyer", text: "Yes, we have a hearing next week.", time: "Yesterday" },
            { from: "client", text: "Thank you for the update.", time: "Yesterday" },
        ],
    },
    {
        id: 3,
        clientName: "Usman Raza",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg",
        lastMessage: "I sent the documents.",
        time: "Mon",
        unread: 1,
        messages: [
            { from: "client", text: "I sent the documents.", time: "Mon" },
        ],
    },
];

export default function LawyerMessages() {
    // activeChat = which conversation is open (null = none selected on mobile)
    const [activeChat, setActiveChat] = useState(mockConversations[0]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    // ── Filter conversations by search ────────────────────────────
    const filtered = mockConversations.filter((c) =>
        c.clientName.toLowerCase().includes(search.toLowerCase())
    );

    // ── Send a new message ─────────────────────────────────────────
    // This only updates local state (no backend), so messages reset on refresh
    function sendMessage() {
        if (!input.trim() || !activeChat) return;

        const newMsg = {
            from: "lawyer",
            text: input.trim(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        // Update the active chat's messages
        setActiveChat((prev) => ({
            ...prev,
            messages: [...prev.messages, newMsg],
            lastMessage: newMsg.text,
        }));

        setInput("");
    }

    // Send on Enter key press
    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Messages</h1>

                <div className="bg-white rounded-2xl shadow overflow-hidden flex h-[75vh]">

                    {/* ── Left Panel: Conversation List ── */}
                    <div className="w-full sm:w-80 border-r border-gray-100 flex flex-col shrink-0">

                        {/* Search */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center bg-[#F8FAFC] rounded-xl px-3 py-2 gap-2">
                                <FaSearch className="text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent outline-none text-sm w-full text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Conversation items */}
                        <div className="overflow-y-auto flex-1">
                            {filtered.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => setActiveChat(conv)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F8FAFC] transition border-b border-gray-50 ${activeChat?.id === conv.id ? "bg-[#F8FAFC] border-l-4 border-l-[#D4AF37]" : ""
                                        }`}
                                >
                                    <div className="relative shrink-0">
                                        <img
                                            src={conv.avatar}
                                            alt={conv.clientName}
                                            className="w-11 h-11 rounded-full object-cover"
                                        />
                                        {/* Online indicator dot */}
                                        <FaCircle className="text-green-400 text-xs absolute -bottom-0.5 -right-0.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-sm text-[#0F172A] truncate">
                                                {conv.clientName}
                                            </p>
                                            <span className="text-xs text-gray-400 shrink-0 ml-1">
                                                {conv.time}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-0.5">
                                            <p className="text-xs text-gray-400 truncate">{conv.lastMessage}</p>
                                            {conv.unread > 0 && (
                                                <span className="bg-[#D4AF37] text-white text-xs rounded-full px-1.5 py-0.5 shrink-0 ml-1">
                                                    {conv.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Right Panel: Message Area ── */}
                    {activeChat ? (
                        <div className="flex-1 flex flex-col">

                            {/* Chat header */}
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                                <img
                                    src={activeChat.avatar}
                                    alt={activeChat.clientName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-[#0F172A]">{activeChat.clientName}</p>
                                    <p className="text-xs text-green-500">● Online</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                                {activeChat.messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.from === "lawyer" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${msg.from === "lawyer"
                                                    ? "bg-[#0F172A] text-white rounded-br-sm"
                                                    : "bg-[#F1F5F9] text-gray-800 rounded-bl-sm"
                                                }`}
                                        >
                                            <p>{msg.text}</p>
                                            <p
                                                className={`text-xs mt-1 ${msg.from === "lawyer" ? "text-gray-400" : "text-gray-400"
                                                    }`}
                                            >
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Typing indicator (decorative) */}
                            <div className="px-5 py-1">
                                <p className="text-xs text-gray-400 italic">
                                    {activeChat.clientName} may be typing...
                                </p>
                            </div>

                            {/* Input box */}
                            <div className="px-5 pb-5 pt-2 border-t border-gray-100 flex gap-3 items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                                />
                                <button
                                    onClick={sendMessage}
                                    className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0F172A] p-3 rounded-xl transition shrink-0"
                                >
                                    <FaPaperPlane />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            Select a conversation to start messaging.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}