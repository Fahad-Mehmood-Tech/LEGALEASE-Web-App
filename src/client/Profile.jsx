// src/client/Profile.jsx

import { useState, useEffect } from "react";
import { getUser, saveUser } from "../utils/localStorage";
import { FaUserCircle, FaSave } from "react-icons/fa";

// Field component — OUTSIDE parent component
function Field({ label, name, value, onChange, type = "text", placeholder = "" }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
            />
        </div>
    );
}

export default function ClientProfile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        cnic: "",
    });

    const [saved, setSaved] = useState(false);
    const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState(false);

    // Page khulte hi user ka data load karo
    useEffect(() => {
        const user = getUser(); // ✅ sahi function
        if (user) {
            setProfile({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                city: user.city || "",
                cnic: user.cnic || "",
            });
        }
    }, []);

    // Profile fields change handler
    function handleChange(e) {
        setProfile({ ...profile, [e.target.name]: e.target.value });
        setSaved(false);
    }

    // Profile save karo
    function handleSave() {
        const existing = getUser(); // ✅ sahi function
        saveUser({ ...existing, ...profile }); // ✅ sahi function
        setSaved(true);
    }

    // Password change karo
    function handlePasswordChange() {
        setPwError("");
        setPwSuccess(false);

        // Validation
        if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
            setPwError("Please fill all password fields.");
            return;
        }
        if (pwForm.newPw !== pwForm.confirm) {
            setPwError("New passwords do not match.");
            return;
        }
        if (pwForm.newPw.length < 6) {
            setPwError("Password must be at least 6 characters.");
            return;
        }

        const existing = getUser(); // ✅ sahi function
        saveUser({ ...existing, password: pwForm.newPw }); // ✅ sahi function
        setPwSuccess(true);
        setPwForm({ current: "", newPw: "", confirm: "" });
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <FaUserCircle className="text-[#D4AF37] text-3xl" />
                    <div>
                        <h1 className="text-2xl font-bold text-[#0F172A]">Profile Settings</h1>
                        <p className="text-gray-500 text-sm">Manage your account information.</p>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow p-8">
                    <h2 className="text-lg font-bold text-[#0F172A] mb-5">Personal Information</h2>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-2xl font-bold">
                            {profile.name ? profile.name[0].toUpperCase() : "C"}
                        </div>
                        <div>
                            <p className="font-semibold text-[#0F172A]">{profile.name || "Your Name"}</p>
                            <p className="text-gray-400 text-sm">{profile.email}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        <Field label="Full Name" name="name" value={profile.name} onChange={handleChange} placeholder="Your full name" />
                        <Field label="Email Address" name="email" value={profile.email} onChange={handleChange} type="email" placeholder="email@example.com" />
                        <Field label="Phone Number" name="phone" value={profile.phone} onChange={handleChange} placeholder="+92 300 0000000" />
                        <Field label="City" name="city" value={profile.city} onChange={handleChange} placeholder="e.g. Karachi" />
                        <Field label="CNIC (optional)" name="cnic" value={profile.cnic} onChange={handleChange} placeholder="XXXXX-XXXXXXX-X" />
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-yellow-500 text-[#0F172A] font-bold px-6 py-3 rounded-xl transition"
                        >
                            <FaSave />
                            Save Changes
                        </button>
                        {saved && (
                            <p className="text-green-600 text-sm font-medium">✓ Profile updated!</p>
                        )}
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl shadow p-8">
                    <h2 className="text-lg font-bold text-[#0F172A] mb-5">Change Password</h2>

                    <div className="flex flex-col gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input
                                type="password"
                                value={pwForm.current}
                                onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                                placeholder="Enter current password"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                value={pwForm.newPw}
                                onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                                placeholder="Enter new password"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={pwForm.confirm}
                                onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                                placeholder="Re-enter new password"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                            />
                        </div>

                        {pwError && <p className="text-red-500 text-sm">{pwError}</p>}
                        {pwSuccess && <p className="text-green-600 text-sm font-medium">✓ Password changed successfully!</p>}

                        <button
                            onClick={handlePasswordChange}
                            className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition w-fit"
                        >
                            Update Password
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}