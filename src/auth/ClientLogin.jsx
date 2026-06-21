import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBalanceScale, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { saveUser, saveRole } from "../utils/localStorage";
import usersData from "../data/users.json";

const ClientLogin = () => {
    const navigate = useNavigate();

    // ─── State ───────────────────────────────────────
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ─── Handle Input Change ─────────────────────────
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setError("");
    };

    // ─── Handle Submit ───────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            // JSON users check karo
            const jsonUser = usersData.find(
                (u) =>
                    u.email === formData.email &&
                    u.password === formData.password &&
                    u.role === "client"
            );

            // LocalStorage users check karo
            const registeredUsers = JSON.parse(
                localStorage.getItem("legalease_registered_users") || "[]"
            );
            const localUser = registeredUsers.find(
                (u) =>
                    u.email === formData.email &&
                    u.password === formData.password &&
                    u.role === "client"
            );

            const foundUser = jsonUser || localUser;

            if (foundUser) {
                saveRole("client");
                saveUser(foundUser);
                navigate("/client/dashboard");
            } else {
                setError("Invalid email or password. Please try again.");
            }

            setLoading(false);
        }, 1000);
    };

    // ─── UI ─────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <FaBalanceScale className="text-blue-600 text-2xl" />
                    <h1 className="text-2xl font-bold text-blue-600">LegalEase</h1>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
                    Welcome Back
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Login to your client account
                </p>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="accent-blue-600"
                            />
                            Remember Me
                        </label>
                        <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                            Forgot Password?
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-lg disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Register Link */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/client/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Register here
                    </Link>
                </p>

                {/* Back to Role Selection */}
                <p className="text-center text-gray-400 text-sm mt-2">
                    <Link to="/" className="hover:text-blue-600 hover:underline">
                        ← Back to Role Selection
                    </Link>
                </p>

                {/* Demo Credentials */}
                <div className="mt-6 bg-blue-50 rounded-lg p-3 text-sm text-gray-600">
                    <p className="font-medium text-blue-700 mb-1">Demo Credentials:</p>
                    <p>Email: <span className="font-medium">ali@email.com</span></p>
                    <p>Password: <span className="font-medium">test123</span></p>
                </div>

            </div>
        </div>
    );
};

export default ClientLogin;