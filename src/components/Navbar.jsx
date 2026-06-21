import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    FaBalanceScale,
    FaHome,
    FaUsers,
    FaComments,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { getUser, logout } from "../utils/localStorage";

const Navbar = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUser();
    const [menuOpen, setMenuOpen] = useState(false);

    // ─── Logout Handler ──────────────────────────────
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // ─── Active Link Check ───────────────────────────
    const isActive = (path) => location.pathname === path;

    // ─── Nav Links based on Role ─────────────────────
    const clientLinks = [
        { path: "/client/dashboard", label: "Dashboard", icon: <FaHome /> },
        { path: "/client/lawyers", label: "Lawyers", icon: <FaUsers /> },
        { path: "/client/chat", label: "Chat", icon: <FaComments /> },
        { path: "/client/profile", label: "Profile", icon: <FaUser /> },
    ];

    const lawyerLinks = [
        { path: "/lawyer/dashboard", label: "Dashboard", icon: <FaHome /> },
        { path: "/lawyer/appointments", label: "Appointments", icon: <FaUsers /> },
        { path: "/lawyer/messages", label: "Messages", icon: <FaComments /> },
        { path: "/lawyer/profile", label: "Profile", icon: <FaUser /> },
    ];

    const links = role === "lawyer" ? lawyerLinks : clientLinks;

    // ─── UI ─────────────────────────────────────────
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to={role === "lawyer" ? "/lawyer/dashboard" : "/client/dashboard"}
                    className="flex items-center gap-2"
                >
                    <FaBalanceScale className="text-blue-600 text-2xl" />
                    <span className="text-xl font-bold text-blue-600">LegalEase</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                                    : "text-gray-600 hover:text-blue-600"
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* User Info + Logout */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-2">
                        <img
                            src={user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                            alt="avatar"
                            className="w-9 h-9 rounded-full object-cover border-2 border-blue-100"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            {user?.name || "User"}
                        </span>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition-all duration-200 text-sm font-medium"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-600 text-xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">

                    {/* User Info */}
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                        <img
                            src={user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                        />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
                            <p className="text-xs text-gray-500">{user?.email || ""}</p>
                        </div>
                    </div>

                    {/* Mobile Links */}
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}

                    {/* Mobile Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-200"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>
            )}
        </nav>
    );
};

export default Navbar;