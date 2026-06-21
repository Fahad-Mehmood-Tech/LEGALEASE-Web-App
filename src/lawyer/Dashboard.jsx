import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBriefcase,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { getUser, getAppointments, updateAppointmentStatus } from "../utils/localStorage";
import lawyersData from "../data/lawyers.json";

const LawyerDashboard = () => {
    const navigate = useNavigate();
    const user = getUser();

    // Lawyer ki apni info lawyers.json se dhundo
    // Email se match karke
    const lawyerInfo = lawyersData.find((lawyer) => lawyer.email === user?.lawyerId);

    // localStorage se saari appointments lo
    // phir sirf is lawyer ki appointments filter karo
    const allAppointments = getAppointments();
    const [appointments, setAppointments] = useState(
        allAppointments.filter((apt) => apt.lawyerId === lawyerInfo?.id)
    );

    // ─── Stats Calculate Karo ────────────────────────
    // Appointments ki counting karo status ke hisaab se
    const totalAppointments = appointments.length;
    const pendingCount = appointments.filter(
        (apt) => apt.status === "pending"
    ).length;
    const confirmedCount = appointments.filter(
        (apt) => apt.status === "confirmed"
    ).length;
    const rejectedCount = appointments.filter(
        (apt) => apt.status === "rejected"
    ).length;

    // ─── Accept / Reject Handler ─────────────────────
    const handleStatus = (id, newStatus) => {
        // localStorage mein status update karo
        updateAppointmentStatus(id, newStatus);

        // Screen pe bhi update dikhao — page reload nahi hoga
        setAppointments((prev) =>
            prev.map((apt) =>
                apt.id === id ? { ...apt, status: newStatus } : apt
            )
        );
    };

    // ─── Status Badge Color ──────────────────────────
    // Har status ka alag color
    const getStatusStyle = (status) => {
        if (status === "confirmed") return "bg-green-100 text-green-600";
        if (status === "rejected") return "bg-red-100 text-red-600";
        return "bg-yellow-100 text-yellow-600"; // pending
    };

    // ─── UI ─────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar role="lawyer" />

            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white">
                    <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <img
                            src={
                                user?.avatar ||
                                "https://randomuser.me/api/portraits/men/1.jpg"
                            }
                            alt="avatar"
                            className="w-16 h-16 rounded-full border-4 border-white object-cover"
                        />

                        {/* Name + Info */}
                        <div>
                            <h1 className="text-2xl font-bold mb-1">
                                Welcome, {user?.name?.split(" ")[0]}! 👋
                            </h1>
                            <p className="text-blue-100">
                                {lawyerInfo?.specialization || "Legal Professional"} •{" "}
                                {lawyerInfo?.location || "Pakistan"}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                    {/* Total */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                            <FaCalendarAlt className="text-blue-600" />
                        </div>
                        <p className="text-gray-500 text-sm">Total</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {totalAppointments}
                        </p>
                    </div>

                    {/* Pending */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="bg-yellow-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                            <FaClock className="text-yellow-500" />
                        </div>
                        <p className="text-gray-500 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
                    </div>

                    {/* Confirmed */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                            <FaCheckCircle className="text-green-500" />
                        </div>
                        <p className="text-gray-500 text-sm">Confirmed</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {confirmedCount}
                        </p>
                    </div>

                    {/* Rejected */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                            <FaTimesCircle className="text-red-500" />
                        </div>
                        <p className="text-gray-500 text-sm">Rejected</p>
                        <p className="text-2xl font-bold text-gray-800">{rejectedCount}</p>
                    </div>

                </div>

                {/* Appointments Section */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Appointments
                    </h2>

                    {/* Agar koi appointment nahi */}
                    {appointments.length === 0 ? (
                        <div className="text-center py-12">
                            <FaCalendarAlt className="text-gray-300 text-5xl mx-auto mb-3" />
                            <p className="text-gray-400">No appointments yet.</p>
                            <p className="text-gray-400 text-sm mt-1">
                                When clients book with you, they will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {appointments.map((apt) => (
                                <div
                                    key={apt.id}
                                    className="border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-all duration-200"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                                        {/* Client Info */}
                                        <div className="space-y-2">

                                            {/* Client Name */}
                                            <div className="flex items-center gap-2">
                                                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                    {apt.clientName?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {apt.clientName}
                                                    </p>
                                                    <p className="text-xs text-gray-400">Client</p>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <FaEnvelope className="text-gray-400" />
                                                {apt.clientEmail}
                                            </div>

                                            {/* Phone */}
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <FaPhone className="text-gray-400" />
                                                {apt.clientPhone}
                                            </div>

                                            {/* Case Type */}
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <FaBriefcase className="text-gray-400" />
                                                {apt.caseType}
                                            </div>

                                        </div>

                                        {/* Date + Time + Status */}
                                        <div className="flex flex-col items-start md:items-end gap-3">

                                            {/* Date */}
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <FaCalendarAlt className="text-blue-400" />
                                                {apt.date}
                                            </div>

                                            {/* Time */}
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <FaClock className="text-blue-400" />
                                                {apt.time}
                                            </div>

                                            {/* Status Badge */}
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusStyle(
                                                    apt.status
                                                )}`}
                                            >
                                                {apt.status}
                                            </span>

                                            {/* Accept / Reject Buttons */}
                                            {/* Sirf tab dikhao jab status pending ho */}
                                            {apt.status === "pending" && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleStatus(apt.id, "confirmed")}
                                                        className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200"
                                                    >
                                                        <FaCheckCircle />
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatus(apt.id, "rejected")}
                                                        className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-200"
                                                    >
                                                        <FaTimesCircle />
                                                        Reject
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    {/* Notes — agar hain toh dikhao */}
                                    {apt.notes && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-sm text-gray-500">
                                                <span className="font-medium text-gray-700">
                                                    Notes:{" "}
                                                </span>
                                                {apt.notes}
                                            </p>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LawyerDashboard;