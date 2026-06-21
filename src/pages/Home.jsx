import { useNavigate } from "react-router-dom";
import {
    FaBalanceScale,
    FaStar,
    FaMapMarkerAlt,
    FaBriefcase,
    FaUsers,
    FaCheckCircle,
    FaHandshake,
    FaSearch,
    FaCalendarAlt,
    FaComments,
    FaArrowRight,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import lawyersData from "../data/lawyers.json";

const Home = () => {
    const navigate = useNavigate();

    // Sirf top 3 lawyers dikhao
    const topLawyers = lawyersData.slice(0, 3);

    // ─── How It Works Steps ──────────────────────────
    const steps = [
        {
            icon: <FaSearch className="text-3xl text-blue-600" />,
            title: "Search Lawyer",
            description:
                "Search from our network of verified legal professionals by specialization or city.",
        },
        {
            icon: <FaCalendarAlt className="text-3xl text-blue-600" />,
            title: "Book Appointment",
            description:
                "Select a convenient date and time and book your appointment in minutes.",
        },
        {
            icon: <FaComments className="text-3xl text-blue-600" />,
            title: "Get Legal Advice",
            description:
                "Meet your lawyer and get professional legal advice for your case.",
        },
    ];

    // ─── Stats ───────────────────────────────────────
    const stats = [
        { value: "500+", label: "Verified Lawyers", icon: <FaUsers /> },
        { value: "10,000+", label: "Happy Clients", icon: <FaHandshake /> },
        { value: "95%", label: "Success Rate", icon: <FaCheckCircle /> },
    ];

    // ─── Practice Areas ──────────────────────────────
    const practiceAreas = [
        { label: "Family Law", emoji: "👨‍👩‍👧", desc: "Divorce, custody, inheritance" },
        { label: "Criminal Law", emoji: "⚖️", desc: "Defense, bail, appeals" },
        { label: "Corporate Law", emoji: "🏢", desc: "Contracts, mergers, compliance" },
        { label: "Property Law", emoji: "🏠", desc: "Real estate, disputes, transactions" },
        { label: "Tax Law", emoji: "📊", desc: "FBR, tax planning, appeals" },
        { label: "Immigration Law", emoji: "✈️", desc: "Visas, permits, citizenship" },
    ];

    // ─── Star Rating UI ──────────────────────────────
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"
                }
            />
        ));
    };

    return (
        <div className="min-h-screen bg-white">

            {/* ── Navbar ── */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <FaBalanceScale className="text-blue-600 text-2xl" />
                        <span className="text-xl font-bold text-blue-600">LegalEase</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/")}
                            className="text-gray-600 hover:text-blue-600 text-sm font-medium px-4 py-2"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
                        >
                            Get Started
                        </button>
                    </div>

                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Find the Best Lawyer
                        <span className="text-yellow-400"> For Your Case</span>
                    </h1>

                    <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Connect with verified legal professionals across Pakistan.
                        Book appointments online and get expert legal advice.
                    </p>

                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto mb-8">
                        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                            <FaSearch className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by specialization or city..."
                                className="flex-1 outline-none text-gray-700 text-sm"
                            />
                        </div>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-all duration-200"
                        >
                            Search
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {["Family Law", "Criminal Law", "Corporate Law", "Property Law"].map(
                            (area) => (
                                <button
                                    key={area}
                                    onClick={() => navigate("/")}
                                    className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-30 transition-all duration-200"
                                >
                                    {area}
                                </button>
                            )
                        )}
                    </div>

                </div>
            </section>

            {/* ── Stats Section ── */}
            <section className="bg-white py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-blue-600 text-3xl flex justify-center mb-3">
                                    {stat.icon}
                                </div>
                                <p className="text-4xl font-bold text-gray-800 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Practice Areas Section ── */}
            <section className="bg-slate-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">
                            Practice Areas
                        </h2>
                        <p className="text-gray-500">
                            We cover all major areas of law to serve your needs
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {practiceAreas.map((area, i) => (
                            <div
                                key={i}
                                onClick={() => navigate("/")}
                                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                            >
                                <span className="text-4xl mb-3 block">{area.emoji}</span>
                                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                    {area.label}
                                </h3>
                                <p className="text-gray-500 text-sm">{area.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ── Top Lawyers Section ── */}
            <section className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">
                            Top Lawyers
                        </h2>
                        <p className="text-gray-500">
                            Meet our highest rated legal professionals
                        </p>
                    </div>

                    {/* Lawyers Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {topLawyers.map((lawyer) => (
                            <div
                                key={lawyer.id}
                                className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200"
                            >
                                {/* Card Top */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={lawyer.image}
                                            alt={lawyer.name}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-white"
                                        />
                                        <div>
                                            <h3 className="font-bold text-white text-sm">
                                                {lawyer.name}
                                            </h3>
                                            <p className="text-blue-100 text-xs">
                                                {lawyer.specialization}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">
                                    <div className="flex items-center gap-1 mb-3">
                                        {renderStars(lawyer.rating)}
                                        <span className="text-sm text-gray-500 ml-1">
                                            {lawyer.rating}
                                        </span>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaMapMarkerAlt className="text-red-400" />
                                            {lawyer.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaBriefcase className="text-gray-400" />
                                            {lawyer.experience} years experience
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-600 font-bold text-sm">
                                            Rs. {lawyer.fee.toLocaleString()}/hr
                                        </span>
                                        <button
                                            onClick={() => navigate("/")}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-all duration-200"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 mx-auto text-blue-600 font-medium hover:underline"
                        >
                            View All Lawyers <FaArrowRight />
                        </button>
                    </div>

                </div>
            </section>

            {/* ── How It Works Section ── */}
            <section className="bg-slate-50 py-16 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* Section Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">
                            How It Works
                        </h2>
                        <p className="text-gray-500">
                            Get legal help in just 3 simple steps
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="text-center">

                                {/* Step Number */}
                                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                                    {i + 1}
                                </div>

                                {/* Icon */}
                                <div className="flex justify-center mb-4">{step.icon}</div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="bg-blue-600 py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Find Your Lawyer?
                    </h2>
                    <p className="text-blue-100 mb-8">
                        Join thousands of clients who found the right legal help on LegalEase
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-200"
                    >
                        Get Started Today
                    </button>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FaBalanceScale className="text-yellow-400 text-xl" />
                                <span className="text-xl font-bold">LegalEase</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Your trusted platform for finding verified legal professionals
                                across Pakistan.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold mb-4 text-gray-200">Quick Links</h4>
                            <div className="space-y-2">
                                {["Home", "Find Lawyers", "About Us", "Contact"].map(
                                    (link) => (
                                        <p
                                            key={link}
                                            onClick={() => navigate("/")}
                                            className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors duration-200"
                                        >
                                            {link}
                                        </p>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-bold mb-4 text-gray-200">Contact Us</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <FaEnvelope className="text-yellow-400" />
                                    info@legalease.pk
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <FaPhone className="text-yellow-400" />
                                    +92 300 1234567
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <FaMapMarkerAlt className="text-yellow-400" />
                                    Lahore, Pakistan
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-6 text-center">
                        <p className="text-gray-500 text-sm">
                            © 2024 LegalEase. All rights reserved.
                        </p>
                    </div>

                </div>
            </footer>

        </div>
    );
};

export default Home;