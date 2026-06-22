import { useNavigate } from "react-router-dom";
import {
    FaUsers,
    FaCalendarCheck,
    FaComments,
    FaSearch,
    FaStar,
    FaMapMarkerAlt,
    FaBriefcase,
    FaArrowRight,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { getUser, getAppointments } from "../utils/localStorage";
import lawyersData from "../data/lawyers.json";

const ClientDashboard = () => {
    const navigate = useNavigate();
    const user = getUser();

    const allAppointments = getAppointments();
    const myAppointments = allAppointments.filter(
        (apt) => apt.clientEmail === user?.email
    );
    // Top 3 lawyers featured
    const featuredLawyers = lawyersData.slice(0, 3);

    // Stats
    const stats = [
        {
            label: "Total Lawyers",
            value: lawyersData.length,
            icon: <FaUsers className="text-blue-600 text-2xl" />,
            bg: "bg-blue-50",
        },
        {
            label: "My Appointments",
            value: myAppointments.length,
            icon: <FaCalendarCheck className="text-green-600 text-2xl" />,
            bg: "bg-green-50",
        },
        {
            label: "Messages",
            value: 0,
            icon: <FaComments className="text-purple-600 text-2xl" />,
            bg: "bg-purple-50",
        },
    ];

    // Practice Areas
    const practiceAreas = [
        { label: "Family Law", emoji: "👨‍👩‍👧" },
        { label: "Criminal Law", emoji: "⚖️" },
        { label: "Corporate Law", emoji: "🏢" },
        { label: "Property Law", emoji: "🏠" },
        { label: "Tax Law", emoji: "📊" },
        { label: "Immigration Law", emoji: "✈️" },
    ];

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}
            <Navbar role="client" />

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
                    </h1>
                    <p className="text-blue-100 mb-6">
                        Find the best lawyers for your legal needs
                    </p>

                    {/* Search Bar */}
                    <div className="flex gap-3">
                        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                            <FaSearch className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search lawyers by specialization..."
                                className="flex-1 outline-none text-gray-700 text-sm"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") navigate("/client/lawyers");
                                }}
                            />
                        </div>
                        <button
                            onClick={() => navigate("/client/lawyers")}
                            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-all duration-200"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4"
                        >
                            <div className={`${stat.bg} p-4 rounded-xl`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Practice Areas */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-5">
                        Browse by Practice Area
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {practiceAreas.map((area, index) => (
                            <button
                                key={index}
                                onClick={() => navigate("/client/lawyers")}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group"
                            >
                                <span className="text-3xl">{area.emoji}</span>
                                <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600 text-center">
                                    {area.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Lawyers */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-bold text-gray-800">
                            Featured Lawyers
                        </h2>
                        <button
                            onClick={() => navigate("/client/lawyers")}
                            className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
                        >
                            View All <FaArrowRight />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredLawyers.map((lawyer) => (
                            <div
                                key={lawyer.id}
                                className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all duration-200"
                            >
                                {/* Lawyer Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={lawyer.image}
                                        alt={lawyer.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-sm">
                                            {lawyer.name}
                                        </h3>
                                        <p className="text-blue-600 text-xs">{lawyer.specialization}</p>
                                    </div>
                                </div>

                                {/* Lawyer Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <FaStar className="text-yellow-400" />
                                        <span>{lawyer.rating} ({lawyer.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <FaMapMarkerAlt className="text-red-400" />
                                        <span>{lawyer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <FaBriefcase className="text-gray-400" />
                                        <span>{lawyer.experience} years experience</span>
                                    </div>
                                </div>

                                {/* Fee + Button */}
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-600 font-semibold text-sm">
                                        Rs. {lawyer.fee.toLocaleString()}/hr
                                    </span>
                                    <button
                                        onClick={() => navigate(`/client/lawyers/${lawyer.id}`)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-all duration-200"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        onClick={() => navigate("/client/lawyers")}
                        className="bg-blue-600 rounded-2xl p-6 text-white cursor-pointer hover:bg-blue-700 transition-all duration-200"
                    >
                        <FaUsers className="text-3xl mb-3" />
                        <h3 className="text-xl font-bold mb-1">Find a Lawyer</h3>
                        <p className="text-blue-100 text-sm">
                            Browse our network of verified legal professionals
                        </p>
                    </div>

                    <div
                        onClick={() => navigate("/client/chat")}
                        className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-100"
                    >
                        <FaComments className="text-3xl mb-3 text-purple-600" />
                        <h3 className="text-xl font-bold mb-1 text-gray-800">
                            Start a Chat
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Message lawyers directly for quick consultations
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ClientDashboard;