import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    FaBalanceScale,
    FaEye,
    FaEyeSlash,
    FaEnvelope,
    FaLock,
    FaUser,
    FaPhone,
} from "react-icons/fa";
import { saveUser, saveRegisteredUser, saveRole } from "../utils/localStorage";

// ─── Reusable Input Field ────────────────────────
// ⚠️ Component ke BAHAR hai — isliye re-render nahi hoga
const InputField = ({
    label,
    name,
    type,
    placeholder,
    icon,
    rightIcon,
    value,
    onChange,
    error,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
            </span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-700 ${error ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
            />
            {rightIcon && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {rightIcon}
                </span>
            )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const ClientRegister = () => {
    const navigate = useNavigate();

    // ─── State ───────────────────────────────────────
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // ─── Validation ──────────────────────────────────
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required.";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email.";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^03[0-9]{9}$/.test(formData.phone.replace(/-/g, ""))) {
            newErrors.phone = "Please enter a valid Pakistani number (03XXXXXXXXX).";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        return newErrors;
    };

    // ─── Handle Input Change ─────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // ─── Handle Submit ───────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const registeredUsers = JSON.parse(
                localStorage.getItem("legalease_registered_users") || "[]"
            );
            const emailExists = registeredUsers.find(
                (u) => u.email === formData.email
            );

            if (emailExists) {
                setErrors({ email: "This email is already registered." });
                setLoading(false);
                return;
            }

            const newUser = {
                id: Date.now(),
                role: "client",
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
                    Math.random() * 50
                )}.jpg`,
            };

            saveRegisteredUser(newUser);
            saveRole("client");
            saveUser(newUser);
            navigate("/client/dashboard");
            setLoading(false);
        }, 1000);
    };

    // ─── UI ──────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <FaBalanceScale className="text-blue-600 text-2xl" />
                    <h1 className="text-2xl font-bold text-blue-600">LegalEase</h1>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
                    Create Account
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Register as a client to find lawyers
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <InputField
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        icon={<FaUser />}
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />

                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        icon={<FaEnvelope />}
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <InputField
                        label="Phone Number"
                        name="phone"
                        type="text"
                        placeholder="03XXXXXXXXX"
                        icon={<FaPhone />}
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />

                    <InputField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 characters"
                        icon={<FaLock />}
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        }
                    />

                    <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        icon={<FaLock />}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-lg disabled:opacity-60 mt-2"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/client/login" className="text-blue-600 font-medium hover:underline">
                        Login here
                    </Link>
                </p>

                <p className="text-center text-gray-400 text-sm mt-2">
                    <Link to="/" className="hover:text-blue-600 hover:underline">
                        ← Back to Role Selection
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default ClientRegister;