// src/lawyer/Profile.jsx
// Lawyer can view and edit their own profile details
// Data is saved to localStorage so it persists across sessions

import { useState, useEffect } from "react";
import { getCurrentUser, saveCurrentUser } from "../utils/localStorage";
import { FaUserEdit, FaSave } from "react-icons/fa";

// ── Practice area options ──────────────────────────────────────────
const PRACTICE_AREAS = [
    "Family Law", "Criminal Law", "Corporate Law",
    "Property Law", "Tax Law", "Immigration Law",
    "Civil Law", "Labour Law",
];

// ── Reusable labeled input ─────────────────────────────────────────
// Must be defined OUTSIDE the component to avoid re-mount on every render
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

export default function LawyerProfile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        fee: "",
        city: "",
        bio: "",
        languages: "",
        officeAddress: "",
    });

    const [saved, setSaved] = useState(false); // show success message after save

    // ── Load current user data on mount ───────────────────────────
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            // Pre-fill form with existing data; fallback to "" for missing fields
            setProfile({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                specialization: user.specialization || "",
                experience: user.experience || "",
                fee: user.fee || "",
                city: user.city || "",
                bio: user.bio || "",
                languages: user.languages || "",
                officeAddress: user.officeAddress || "",
            });
        }
    }, []);

    // ── Update a field in state ────────────────────────────────────
    function handleChange(e) {
        setProfile({ ...profile, [e.target.name]: e.target.value });
        setSaved(false); // hide success message when user starts editing again
    }

    // ── Save profile to localStorage ──────────────────────────────
    function handleSave() {
        const existing = getCurrentUser();
        const updated = { ...existing, ...profile }; // merge new data with existing
        saveCurrentUser(updated);
        setSaved(true);
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6">
            <div className="max-w-3xl mx-auto">

                {/* ── Header ── */}
                <div className="mb-8 flex items-center gap-3">
                    <FaUserEdit className="text-[#D4AF37] text-3xl" />
                    <div>
                        <h1 className="text-2xl font-bold text-[#0F172A]">Edit Profile</h1>
                        <p className="text-gray-500 text-sm">
                            Keep your profile updated to attract more clients.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-5">

                    {/* Avatar placeholder */}
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 rounded-full bg-[#0F172A] flex items-center justify-center text-white text-xl font-bold">
                            {profile.name ? profile.name[0].toUpperCase() : "L"}
                        </div>
                        <div>
                            <p className="font-semibold text-[#0F172A]">{profile.name || "Your Name"}</p>
                            <p className="text-gray-400 text-sm">{profile.email}</p>
                        </div>
                    </div>

                    {/* ── Form Fields ── */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <Field label="Full Name" name="name" value={profile.name} onChange={handleChange} placeholder="e.g. Ahmed Raza" />
                        <Field label="Email Address" name="email" value={profile.email} onChange={handleChange} type="email" placeholder="email@example.com" />
                        <Field label="Phone Number" name="phone" value={profile.phone} onChange={handleChange} placeholder="+92 300 0000000" />
                        <Field label="City" name="city" value={profile.city} onChange={handleChange} placeholder="e.g. Lahore" />
                        <Field label="Experience (years)" name="experience" value={profile.experience} onChange={handleChange} placeholder="e.g. 8" type="number" />
                        <Field label="Consultation Fee (PKR)" name="fee" value={profile.fee} onChange={handleChange} placeholder="e.g. 3000" type="number" />
                        <Field label="Languages Spoken" name="languages" value={profile.languages} onChange={handleChange} placeholder="e.g. Urdu, English" />
                        <Field label="Office Address" name="officeAddress" value={profile.officeAddress} onChange={handleChange} placeholder="Full office address" />
                    </div>

                    {/* Specialization dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Specialization
                        </label>
                        <select
                            name="specialization"
                            value={profile.specialization}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition bg-white"
                        >
                            <option value="">-- Select Practice Area --</option>
                            {PRACTICE_AREAS.map((area) => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>
                    </div>

                    {/* Bio textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Biography
                        </label>
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Write a short bio about your background and expertise..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition resize-none"
                        />
                    </div>

                    {/* Save button + success message */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-yellow-500 text-[#0F172A] font-bold px-6 py-3 rounded-xl transition"
                        >
                            <FaSave />
                            Save Profile
                        </button>
                        {saved && (
                            <p className="text-green-600 text-sm font-medium">
                                ✓ Profile saved successfully!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}