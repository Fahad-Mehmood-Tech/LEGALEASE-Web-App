// src/client/Chat.jsx
// Client's chat interface — same structure as LawyerMessages but from client side
// Clients see their lawyer conversations here

import { useState } from "react";
import { FaPaperPlane, FaSearch, FaCircle, FaGavel } from "react-icons/fa";

// ── Mock conversations from client's perspective ───────────────────
const mockConversations = [
    {
        id: 1,
        lawyerName: "Adv. Ahmed Raza",
        specialization: "Family Law",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        lastMessage: "Your case is looking strong.",
        time: "11:15 AM",
        unread: 1,
        messages: [
            { from: "client", text: "Assalamu Alaikum, I need help with a family matter.", time: "11:10 AM" },
            { from: "lawyer", text: "Walaikum Assalam! Please describe the issue.", time: "11:12 AM" },
            { from: "client", text: "My wife has filed for divorce. What should I do?", time: "11:13 AM" },
            { from: "lawyer", text: "Your case is looking strong.", time: "11:15 AM" },
        ],
    },
    {
        id: 2,
        lawyerName: "Adv. Sara Khan",
        specialization: "Criminal Law",
        avatar: "https://randomuser.me/api/portraits/women/55.jpg",
        lastMessage: "Please bring all documents tomorrow.",
        time: "Yesterday",
        unread: 0,
        messages: [
            { from: "lawyer", text: "I reviewed your case file.", time: "Yesterday" },
            { from: "client", text: "What do you think?", time: "Yesterday" },
            { from: "lawyer", text: "Please bring all documents tomorrow.", time: "Yesterday" },
        ],
    },
    {
        id: 3,
        lawyerName: "Adv. Bilal Hassan",
        specialization: "Property Law",
        avatar: "https://randomuser.me/api/portraits/men/78.jpg",
        lastMessage: "The property dispute can be resolved out of court.",
        time: "Tue",
        unread: 0,
        messages: [
            { from: "client", text: "Is there any way to settle this without going to court?", time: "Tue" },
            { from: "lawyer", text: "The property dispute can be resolved out of court.", time: "Tue" },
        ],
    },
];

export default function ClientChat() {
    const [activeChat, setActiveChat] = useState(mockConversations[0]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");

    // ── Filter by search ───────────────────────────────────────────
    const filtered = mockConversations.filter((c) =>
        c.lawyerName.toLowerCase().includes(search.toLowerCase())
    );

    // ── Send message ───────────────────────────────────────────────
    function sendMessage() {
        if (!input.trim() || !activeChat) return;

        const newMsg = {
            from: "client",
            text: input.trim(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setActiveChat((prev) => ({
            ...prev,
            messages: [...prev.messages, newMsg],
            lastMessage: newMsg.text,
        }));

        setInput("");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-2xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                    <FaGavel className="text-[#D4AF37]" />
                    My Chats
                </h1>

                <div className="bg-white rounded-2xl shadow overflow-hidden flex h-[75vh]">

                    {/* ── Left: Lawyer List ── */}
                    <div className="w-full sm:w-80 border-r border-gray-100 flex flex-col shrink-0">

                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center bg-[#F8FAFC] rounded-xl px-3 py-2 gap-2">
                                <FaSearch className="text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search lawyers..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent outline-none text-sm w-full text-gray-700"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1">
                            {filtered.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => setActiveChat(conv)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F8FAFC] transition border-b border-gray-50 ${activeChat?.id === conv.id
                                            ? "bg-[#F8FAFC] border-l-4 border-l-[#D4AF37]"
                                            : ""
                                        }`}
                                >
                                    <div className="relative shrink-0">
                                        <img
                                            src={conv.avatar}
                                            alt={conv.lawyerName}
                                            className="w-11 h-11 rounded-full object-cover"
                                        />
                                        <FaCircle className="text-green-400 text-xs absolute -bottom-0.5 -right-0.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-sm text-[#0F172A] truncate">
                                                {conv.lawyerName}
                                            </p>
                                            <span className="text-xs text-gray-400 shrink-0 ml-1">{conv.time}</span>
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

                    {/* ── Right: Message Area ── */}
                    {activeChat ? (
                        <div className="flex-1 flex flex-col">

                            {/* Chat header */}
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                                <img
                                    src={activeChat.avatar}
                                    alt={activeChat.lawyerName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-[#0F172A]">{activeChat.lawyerName}</p>
                                    <p className="text-xs text-[#D4AF37]">{activeChat.specialization}</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                                {activeChat.messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${msg.from === "client"
                                                    ? "bg-[#0F172A] text-white rounded-br-sm"
                                                    : "bg-[#F1F5F9] text-gray-800 rounded-bl-sm"
                                                }`}
                                        >
                                            <p>{msg.text}</p>
                                            <p className="text-xs mt-1 text-gray-400">{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Typing indicator */}
                            <div className="px-5 py-1">
                                <p className="text-xs text-gray-400 italic">
                                    {activeChat.lawyerName} may be typing...
                                </p>
                            </div>

                            {/* Input */}
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
                            Select a lawyer to start chatting.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}