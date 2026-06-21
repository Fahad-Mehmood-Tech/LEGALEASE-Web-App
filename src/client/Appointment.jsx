import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import lawyersData from "../data/lawyers.json";
import { getUser, saveAppointment } from "../utils/localStorage";
import { CASE_TYPES } from "../utils/constants";

const Appointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = getUser();

    // URL se lawyer ID lo aur us lawyer ko dhundo
    const lawyer = lawyersData.find((l) => l.id === Number(id));

    // ─── Form Data ───────────────────────────────────
    // Ye sab form ke fields hain
    const [formData, setFormData] = useState({
        clientName: user?.name || "",
        clientEmail: user?.email || "",
        clientPhone: user?.phone || "",
        date: "",
        time: "",
        caseType: "",
        notes: "",
    });

    // ─── Error Messages ──────────────────────────────
    const [errors, setErrors] = useState({});

    // ─── Success State ───────────────────────────────
    // Jab form submit ho jaaye toh success dikhana
    const [submitted, setSubmitted] = useState(false);

    // ─── Handle Input Change ─────────────────────────
    // Jab bhi koi field likhe — ye function chalta hai
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Field ka naya value save karo
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Us field ka error clear karo
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // ─── Validation ──────────────────────────────────
    // Check karo sab fields sahi bhare hain ya nahi
    const validate = () => {
        const newErrors = {};

        if (!formData.clientName.trim()) {
            newErrors.clientName = "Name is required.";
        }
        if (!formData.clientEmail.trim()) {
            newErrors.clientEmail = "Email is required.";
        }
        if (!formData.clientPhone.trim()) {
            newErrors.clientPhone = "Phone number is required.";
        }
        if (!formData.date) {
            newErrors.date = "Please select a date.";
        }
        if (!formData.time) {
            newErrors.time = "Please select a time.";
        }
        if (!formData.caseType) {
            newErrors.caseType = "Please select case type.";
        }

        return newErrors;
    };

    // ─── Handle Submit ───────────────────────────────
    const handleSubmit = (e) => {
        // Page reload rokna
        e.preventDefault();

        // Validation check karo
        const validationErrors = validate();

        // Agar errors hain toh form submit mat karo
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Appointment object banao
        const appointmentData = {
            ...formData,
            lawyerId: lawyer.id,
            lawyerName: lawyer.name,
        };

        // localStorage mein save karo
        saveAppointment(appointmentData);

        // Success screen dikhao
        setSubmitted(true);
    };

    // ─── Agar Lawyer Na Mile ─────────────────────────
    if (!lawyer) {
        return (
            <div className="min-h-screen bg-slate-100">
                <Navbar role="client" />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <p className="text-gray-500 text-xl mb-4">Lawyer not found!</p>
                        <button
                            onClick={() => navigate("/client/lawyers")}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            Back to Lawyers
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Success Screen ──────────────────────────────
    // Form submit hone ke baad ye dikhao
    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-100">
                <Navbar role="client" />
                <div className="flex items-center justify-center min-h-[80vh] px-4">
                    <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md w-full">

                        {/* Green Check Icon */}
                        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Appointment Booked!
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Your appointment with{" "}
                            <span className="font-semibold text-blue-600">
                                {lawyer.name}
                            </span>{" "}
                            has been booked successfully.
                        </p>

                        {/* Appointment Summary Box */}
                        <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 mb-6">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Date:</span> {formData.date}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Time:</span> {formData.time}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Case Type:</span> {formData.caseType}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Fee:</span> Rs.{" "}
                                {lawyer.fee.toLocaleString()}/hr
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate("/client/dashboard")}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
                            >
                                Go to Dashboard
                            </button>
                            <button
                                onClick={() => navigate("/client/lawyers")}
                                className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                            >
                                Find More Lawyers
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // ─── Main Form UI ────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar role="client" />

            <div className="max-w-3xl mx-auto px-4 py-8">

                {/* Back Button */}
                <button
                    onClick={() => navigate(`/client/lawyers/${lawyer.id}`)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
                >
                    <FaArrowLeft />
                    Back to Profile
                </button>

                {/* Page Title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Book Appointment
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Fill in the details to book with{" "}
                        <span className="text-blue-600 font-medium">{lawyer.name}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* ── Form (Left Side) ── */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-6">

                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Client Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="clientName"
                                        value={formData.clientName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 ${errors.clientName
                                                ? "border-red-400 bg-red-50"
                                                : "border-gray-300"
                                            }`}
                                    />
                                    {errors.clientName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.clientName}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="clientEmail"
                                        value={formData.clientEmail}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 ${errors.clientEmail
                                                ? "border-red-400 bg-red-50"
                                                : "border-gray-300"
                                            }`}
                                    />
                                    {errors.clientEmail && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.clientEmail}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="clientPhone"
                                        value={formData.clientPhone}
                                        onChange={handleChange}
                                        placeholder="03XXXXXXXXX"
                                        className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 ${errors.clientPhone
                                                ? "border-red-400 bg-red-50"
                                                : "border-gray-300"
                                            }`}
                                    />
                                    {errors.clientPhone && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.clientPhone}
                                        </p>
                                    )}
                                </div>

                                {/* Date + Time — side by side */}
                                <div className="grid grid-cols-2 gap-4">

                                    {/* Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split("T")[0]}
                                            className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 ${errors.date
                                                    ? "border-red-400 bg-red-50"
                                                    : "border-gray-300"
                                                }`}
                                        />
                                        {errors.date && (
                                            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                                        )}
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Time
                                        </label>
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 bg-white ${errors.time
                                                    ? "border-red-400 bg-red-50"
                                                    : "border-gray-300"
                                                }`}
                                        >
                                            <option value="">Select time</option>
                                            <option value="9:00 AM">9:00 AM</option>
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="12:00 PM">12:00 PM</option>
                                            <option value="2:00 PM">2:00 PM</option>
                                            <option value="3:00 PM">3:00 PM</option>
                                            <option value="4:00 PM">4:00 PM</option>
                                        </select>
                                        {errors.time && (
                                            <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                                        )}
                                    </div>

                                </div>

                                {/* Case Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Case Type
                                    </label>
                                    <select
                                        name="caseType"
                                        value={formData.caseType}
                                        onChange={handleChange}
                                        className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 bg-white ${errors.caseType
                                                ? "border-red-400 bg-red-50"
                                                : "border-gray-300"
                                            }`}
                                    >
                                        <option value="">Select case type</option>
                                        {CASE_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.caseType && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.caseType}
                                        </p>
                                    )}
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Notes{" "}
                                        <span className="text-gray-400">(Optional)</span>
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Describe your case briefly..."
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <FaCalendarAlt />
                                    Confirm Appointment
                                </button>

                            </form>
                        </div>
                    </div>

                    {/* ── Lawyer Summary (Right Side) ── */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">

                            <h3 className="font-bold text-gray-800 mb-4">
                                Booking Summary
                            </h3>

                            {/* Lawyer Info */}
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                <img
                                    src={lawyer.image}
                                    alt={lawyer.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">
                                        {lawyer.name}
                                    </p>
                                    <p className="text-blue-600 text-xs">
                                        {lawyer.specialization}
                                    </p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Location</span>
                                    <span className="text-gray-700 font-medium">
                                        {lawyer.location}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Experience</span>
                                    <span className="text-gray-700 font-medium">
                                        {lawyer.experience} years
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Rating</span>
                                    <span className="text-yellow-500 font-medium">
                                        ⭐ {lawyer.rating}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-gray-100 pt-3">
                                    <span className="text-gray-500">Fee</span>
                                    <span className="text-blue-600 font-bold">
                                        Rs. {lawyer.fee.toLocaleString()}/hr
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Appointment;