// src/lawyer/Appointments.jsx
// Lawyer can see all appointments booked with them
// They can mark them as confirmed or cancelled

import { useState, useEffect } from "react";
import { getAppointments, saveAppointments } from "../utils/localStorage";
import { getCurrentUser } from "../utils/localStorage";
import { FaCalendarCheck, FaClock, FaUser, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

// ── Status badge colors ────────────────────────────────────────────
// Maps each status string to a Tailwind color combo
const STATUS_STYLES = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

export default function LawyerAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState("all"); // "all" | "pending" | "confirmed" | "cancelled"

    const currentUser = getCurrentUser(); // logged-in lawyer

    // ── Load appointments on mount ─────────────────────────────────
    // We filter only appointments that belong to this lawyer
    useEffect(() => {
        const all = getAppointments(); // reads from localStorage
        const mine = all.filter(
            (apt) => apt.lawyerId === currentUser?.id || apt.lawyerName === currentUser?.name
        );
        setAppointments(mine);
    }, []);

    // ── Update status (confirm / cancel) ──────────────────────────
    // We update the specific appointment in the full list then re-save
    function updateStatus(id, newStatus) {
        const all = getAppointments();
        const updated = all.map((apt) =>
            apt.id === id ? { ...apt, status: newStatus } : apt
        );
        saveAppointments(updated);

        // Also update local state so UI re-renders immediately
        setAppointments((prev) =>
            prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
        );
    }

    // ── Filter logic ───────────────────────────────────────────────
    const filtered =
        filter === "all"
            ? appointments
            : appointments.filter((apt) => apt.status === filter);

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6">
            <div className="max-w-5xl mx-auto">

                {/* ── Header ── */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
                        <FaCalendarCheck className="text-[#D4AF37]" />
                        My Appointments
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage all appointments booked by your clients.
                    </p>
                </div>

                {/* ── Filter Tabs ── */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    {["all", "pending", "confirmed", "cancelled"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${filter === tab
                                    ? "bg-[#0F172A] text-white"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#D4AF37]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* ── Appointments List ── */}
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow p-12 text-center">
                        <FaCalendarCheck className="text-gray-300 text-5xl mx-auto mb-4" />
                        <p className="text-gray-400 font-medium">No appointments found.</p>
                        <p className="text-gray-400 text-sm mt-1">
                            {filter === "all"
                                ? "No clients have booked with you yet."
                                : `No ${filter} appointments.`}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {filtered.map((apt) => (
                            <div
                                key={apt.id}
                                className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                                {/* ── Left: Client & Appointment Info ── */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <FaUser className="text-[#D4AF37]" />
                                        <p className="font-semibold text-[#0F172A]">
                                            {apt.clientName || "Unknown Client"}
                                        </p>
                                        {/* Status badge */}
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${STATUS_STYLES[apt.status] || STATUS_STYLES.pending
                                                }`}
                                        >
                                            {apt.status || "pending"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <FaClock className="text-gray-400" />
                                        <span>
                                            {apt.date} at {apt.time}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        <span className="font-medium text-gray-700">Case Type:</span>{" "}
                                        {apt.caseType || "Not specified"}
                                    </p>

                                    {apt.notes && (
                                        <p className="text-sm text-gray-400 italic">
                                            "{apt.notes}"
                                        </p>
                                    )}
                                </div>

                                {/* ── Right: Action Buttons ── */}
                                {/* Only show action buttons if appointment is still pending */}
                                {(!apt.status || apt.status === "pending") && (
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => updateStatus(apt.id, "confirmed")}
                                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-xl transition"
                                        >
                                            <FaCheckCircle />
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => updateStatus(apt.id, "cancelled")}
                                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl transition"
                                        >
                                            <FaTimesCircle />
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                {/* Show label if already actioned */}
                                {apt.status === "confirmed" && (
                                    <span className="text-green-600 text-sm font-medium shrink-0">
                                        ✓ Confirmed
                                    </span>
                                )}
                                {apt.status === "cancelled" && (
                                    <span className="text-red-500 text-sm font-medium shrink-0">
                                        ✗ Cancelled
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}