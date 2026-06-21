import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaSearch,
    FaStar,
    FaMapMarkerAlt,
    FaBriefcase,
    FaFilter,
    FaTimes,
    FaComments,
    FaCalendarAlt,
    FaEye,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import lawyersData from "../data/lawyers.json";
import { PRACTICE_AREAS, CITIES } from "../utils/constants";

const Lawyers = () => {
    const navigate = useNavigate();

    // ─── State ───────────────────────────────────────
    const [search, setSearch] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // ─── Filter + Search + Sort Logic ───────────────
    const filteredLawyers = useMemo(() => {
        let result = [...lawyersData];

        // Search filter
        if (search) {
            result = result.filter(
                (l) =>
                    l.name.toLowerCase().includes(search.toLowerCase()) ||
                    l.specialization.toLowerCase().includes(search.toLowerCase()) ||
                    l.location.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Practice area filter
        if (selectedArea) {
            result = result.filter((l) => l.specialization === selectedArea);
        }

        // City filter
        if (selectedCity) {
            result = result.filter((l) => l.location === selectedCity);
        }

        // Rating filter
        if (selectedRating) {
            result = result.filter((l) => l.rating >= Number(selectedRating));
        }

        // Sort
        if (sortBy === "fee_low") {
            result.sort((a, b) => a.fee - b.fee);
        } else if (sortBy === "fee_high") {
            result.sort((a, b) => b.fee - a.fee);
        } else if (sortBy === "experience") {
            result.sort((a, b) => b.experience - a.experience);
        } else if (sortBy === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [search, selectedArea, selectedCity, selectedRating, sortBy]);

    // ─── Clear Filters ───────────────────────────────
    const clearFilters = () => {
        setSearch("");
        setSelectedArea("");
        setSelectedCity("");
        setSelectedRating("");
        setSortBy("");
    };

    const hasFilters =
        search || selectedArea || selectedCity || selectedRating || sortBy;

    // ─── Star Rating UI ──────────────────────────────
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}
            />
        ));
    };

    // ─── UI ─────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar role="client" />

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Find a Lawyer</h1>
                    <p className="text-gray-500 mt-1">
                        {filteredLawyers.length} lawyers available
                    </p>
                </div>

                {/* Search + Filter Bar */}
                <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                    <div className="flex gap-3 flex-wrap">

                        {/* Search Input */}
                        <div className="flex-1 min-w-[200px] flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2">
                            <FaSearch className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, specialization, city..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 outline-none text-sm text-gray-700"
                            />
                        </div>

                        {/* Filter Toggle Button */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${showFilters
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                                }`}
                        >
                            <FaFilter />
                            Filters
                            {hasFilters && (
                                <span className="bg-yellow-400 text-gray-900 text-xs px-1.5 py-0.5 rounded-full">
                                    !
                                </span>
                            )}
                        </button>

                        {/* Clear Filters */}
                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-all duration-200"
                            >
                                <FaTimes />
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Filter Options */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">

                            {/* Practice Area */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Practice Area
                                </label>
                                <select
                                    value={selectedArea}
                                    onChange={(e) => setSelectedArea(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400"
                                >
                                    <option value="">All Areas</option>
                                    {PRACTICE_AREAS.map((area) => (
                                        <option key={area} value={area}>
                                            {area}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    City
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400"
                                >
                                    <option value="">All Cities</option>
                                    {CITIES.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Minimum Rating
                                </label>
                                <select
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400"
                                >
                                    <option value="">Any Rating</option>
                                    <option value="4.5">4.5+</option>
                                    <option value="4">4.0+</option>
                                    <option value="3.5">3.5+</option>
                                </select>
                            </div>

                            {/* Sort By */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Sort By
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400"
                                >
                                    <option value="">Default</option>
                                    <option value="rating">Highest Rating</option>
                                    <option value="experience">Most Experience</option>
                                    <option value="fee_low">Fee: Low to High</option>
                                    <option value="fee_high">Fee: High to Low</option>
                                </select>
                            </div>

                        </div>
                    )}
                </div>

                {/* Lawyers Grid */}
                {filteredLawyers.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                        <p className="text-gray-400 text-lg">No lawyers found.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-blue-600 text-sm hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredLawyers.map((lawyer) => (
                            <div
                                key={lawyer.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={lawyer.image}
                                            alt={lawyer.name}
                                            className="w-16 h-16 rounded-full object-cover border-3 border-white border-opacity-50"
                                        />
                                        <div>
                                            <h3 className="font-bold text-white">{lawyer.name}</h3>
                                            <p className="text-blue-100 text-sm">
                                                {lawyer.specialization}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">

                                    {/* Stars */}
                                    <div className="flex items-center gap-1 mb-3">
                                        {renderStars(lawyer.rating)}
                                        <span className="text-sm text-gray-500 ml-1">
                                            {lawyer.rating} ({lawyer.reviews})
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaMapMarkerAlt className="text-red-400 shrink-0" />
                                            {lawyer.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaBriefcase className="text-gray-400 shrink-0" />
                                            {lawyer.experience} years experience
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {lawyer.description}
                                    </p>

                                    {/* Fee */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-xs text-gray-400">Consultation Fee</p>
                                            <p className="text-blue-600 font-bold">
                                                Rs. {lawyer.fee.toLocaleString()}/hr
                                            </p>
                                        </div>
                                        <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                                            Available
                                        </span>
                                    </div>

                                    {/* Buttons */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            onClick={() => navigate(`/client/lawyers/${lawyer.id}`)}
                                            className="flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-all duration-200"
                                        >
                                            <FaEye />
                                            Profile
                                        </button>
                                        <button
                                            onClick={() => navigate("/client/chat")}
                                            className="flex items-center justify-center gap-1 bg-purple-50 text-purple-600 py-2 rounded-lg text-xs font-medium hover:bg-purple-100 transition-all duration-200"
                                        >
                                            <FaComments />
                                            Chat
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate(`/client/appointment/${lawyer.id}`)
                                            }
                                            className="flex items-center justify-center gap-1 bg-green-50 text-green-600 py-2 rounded-lg text-xs font-medium hover:bg-green-100 transition-all duration-200"
                                        >
                                            <FaCalendarAlt />
                                            Book
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Lawyers;