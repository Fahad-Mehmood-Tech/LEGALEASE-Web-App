import { useNavigate } from "react-router-dom";
import { saveRole } from "../utils/localStorage";
import { FaUserTie, FaBalanceScale } from "react-icons/fa";

function RoleSelection() {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        saveRole(role);
        if (role === "client") {
            navigate("/client/login");
        } else {
            navigate("/lawyer/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-[450px]">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <FaBalanceScale className="text-blue-600 text-3xl" />
                    <h1 className="text-4xl font-bold text-blue-600">LegalEase</h1>
                </div>

                <p className="text-gray-500 mb-8">Your Trusted Legal Partner</p>

                <h2 className="text-xl font-semibold text-gray-700 mb-6">
                    Choose your role to continue
                </h2>

                {/* Client Button */}
                <button
                    onClick={() => handleRoleSelect("client")}
                    className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-xl mb-4 hover:bg-blue-700 transition-all duration-200 text-lg font-medium"
                >
                    <FaUserTie className="text-xl" />
                    I am a Client
                </button>

                {/* Lawyer Button */}
                <button
                    onClick={() => handleRoleSelect("lawyer")}
                    className="w-full flex items-center justify-center gap-3 border-2 border-blue-600 text-blue-600 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 text-lg font-medium"
                >
                    <FaBalanceScale className="text-xl" />
                    I am a Lawyer
                </button>

                <p className="text-gray-400 text-sm mt-8">
                    © 2024 LegalEase. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default RoleSelection;