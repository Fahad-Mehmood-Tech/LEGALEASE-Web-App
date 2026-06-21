import { useParams, useNavigate } from "react-router-dom";
import {
    FaStar,
    FaMapMarkerAlt,
    FaBriefcase,
    FaPhone,
    FaLanguage,
    FaCalendarAlt,
    FaComments,
    FaArrowLeft,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import lawyersData from "../data/lawyers.json";

const LawyerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // ID se lawyer dhundo
    const lawyer = lawyersData.find((l) => l.id === Number(id));

    // Agar lawyer nahi mila
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

    // Star rendering
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}
            />
        ));
    };

    // Days list
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar role="client" />

            <div className="max-w-5xl mx-auto px-4 py-8">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/client/lawyers")}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors duration-200"
                >
                    <FaArrowLeft />
                    Back to Lawyers
                </button>

                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <img
                                src={lawyer.image}
                                alt={lawyer.name}
                                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-bold text-white mb-1">
                                    {lawyer.name}
                                </h1>
                                <p className="text-blue-100 text-lg mb-3">
                                    {lawyer.specialization}
                                </p>
                                <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                                    {renderStars(lawyer.rating)}
                                    <span className="text-white ml-2">
                                        {lawyer.rating} ({lawyer.reviews} reviews)
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span className="flex items-center gap-1 bg-yellow-400 bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
                                        <FaMapMarkerAlt />
                                        {lawyer.location}
                                    </span>
                                    <span className="flex items-center gap-1 bg-yellow-400 bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
                                        <FaBriefcase />
                                        {lawyer.experience} years
                                    </span>
                                    <span className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                                        Rs. {lawyer.fee.toLocaleString()}/hr
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 flex flex-col md:flex-row gap-3">
                        <button
                            onClick={() => navigate(`/client/appointment/${lawyer.id}`)}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
                        >
                            <FaCalendarAlt />
                            Book Appointment
                        </button>
                        <button
                            onClick={() => navigate("/client/chat")}
                            className="flex-1 flex items-center justify-center gap-2 bg-purple-50 text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-100 transition-all duration-200 border border-purple-100"
                        >
                            <FaComments />
                            Chat Now
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Biography */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                About
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {lawyer.biography}
                            </p>
                        </div>

                        {/* Qualifications */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Qualifications
                            </h2>
                            <div className="space-y-3">
                                {lawyer.qualifications.map((q, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                                        <p className="text-gray-600">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Practice Areas */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Practice Areas
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {lawyer.practiceAreas.map((area, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium"
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Client Reviews
                            </h2>
                            <div className="space-y-4">
                                {lawyer.reviews_list.map((review, i) => (
                                    <div
                                        key={i}
                                        className="border border-gray-100 rounded-xl p-4"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <p className="font-semibold text-gray-800 text-sm">
                                                    {review.name}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">{review.comment}</p>
                                        <p className="text-gray-400 text-xs mt-2">{review.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">

                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                                Contact Info
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-red-400 mt-1 shrink-0" />
                                    <p className="text-gray-600 text-sm">{lawyer.officeAddress}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaLanguage className="text-blue-400 shrink-0" />
                                    <p className="text-gray-600 text-sm">
                                        {lawyer.languages.join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                                Availability
                            </h2>
                            <div className="space-y-3">
                                {days.map((day) => (
                                    <div key={day} className="flex items-start justify-between">
                                        <span className="text-sm font-medium text-gray-600 capitalize w-24">
                                            {day.slice(0, 3)}
                                        </span>
                                        {lawyer.availability[day].length > 0 ? (
                                            <div className="flex flex-wrap gap-1 flex-1 justify-end">
                                                {lawyer.availability[day].slice(0, 2).map((time, i) => (
                                                    <span
                                                        key={i}
                                                        className="flex items-center gap-1 bg-green-50 text-green-600 text-xs px-2 py-1 rounded-lg"
                                                    >
                                                        <FaClock className="text-xs" />
                                                        {time}
                                                    </span>
                                                ))}
                                                {lawyer.availability[day].length > 2 && (
                                                    <span className="text-xs text-gray-400">
                                                        +{lawyer.availability[day].length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-red-400">Unavailable</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fee Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                            <h2 className="text-lg font-bold mb-2">Consultation Fee</h2>
                            <p className="text-3xl font-bold text-yellow-400 mb-1">
                                Rs. {lawyer.fee.toLocaleString()}
                            </p>
                            <p className="text-blue-100 text-sm mb-4">per hour</p>
                            <button
                                onClick={() => navigate(`/client/appointment/${lawyer.id}`)}
                                className="w-full bg-yellow-400 text-gray-900 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition-all duration-200 text-sm"
                            >
                                Book Now
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerProfile;