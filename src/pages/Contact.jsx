// src/pages/Contact.jsx
// Contact page — form, office details, map placeholder

import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function Contact() {
    // ── Form state ─────────────────────────────────────────────────
    // Each field is tracked separately so we can validate individually
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // ── Update field on change ─────────────────────────────────────
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear that field's error as soon as user starts typing
        setErrors({ ...errors, [e.target.name]: "" });
    }

    // ── Validate all fields ────────────────────────────────────────
    function validate() {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!form.subject.trim()) newErrors.subject = "Subject is required.";
        if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
        return newErrors;
    }

    // ── Submit handler ─────────────────────────────────────────────
    function handleSubmit() {
        const foundErrors = validate();
        if (Object.keys(foundErrors).length > 0) {
            setErrors(foundErrors);
            return;
        }
        // In a real app, we'd POST to an API here.
        // For now, just show success message.
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }

    // ── Reusable input field ───────────────────────────────────────
    // Defined OUTSIDE the component (see why in comments in ClientRegister.jsx)
    return (
        <div className="bg-[#F8FAFC] min-h-screen">

            {/* ── Page Header ── */}
            <section className="bg-[#0F172A] text-white py-16 px-4 text-center">
                <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
                <p className="text-gray-300 text-lg">
                    Have a question? We'd love to hear from you.
                </p>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">

                {/* ── Contact Form ── */}
                <div className="bg-white rounded-2xl shadow p-8">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Send a Message</h2>

                    {submitted ? (
                        // Success state
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                            <p className="text-green-700 font-semibold text-lg">✓ Message Sent!</p>
                            <p className="text-green-600 text-sm mt-2">
                                We'll get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-4 text-[#D4AF37] underline text-sm"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">

                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition ${errors.name ? "border-red-400" : "border-gray-200"
                                        }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition ${errors.email ? "border-red-400" : "border-gray-200"
                                        }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Phone (optional) */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Phone Number (optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+92 300 0000000"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="What is this about?"
                                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition ${errors.subject ? "border-red-400" : "border-gray-200"
                                        }`}
                                />
                                {errors.subject && (
                                    <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] transition resize-none ${errors.message ? "border-red-400" : "border-gray-200"
                                        }`}
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0F172A] font-bold py-3 rounded-xl transition w-full"
                            >
                                Send Message
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Office Info + Map ── */}
                <div className="flex flex-col gap-6">

                    {/* Contact Details */}
                    <div className="bg-white rounded-2xl shadow p-8">
                        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Get in Touch</h2>
                        <div className="flex flex-col gap-5">
                            {[
                                {
                                    icon: <FaMapMarkerAlt className="text-[#D4AF37] text-xl mt-1" />,
                                    label: "Office Address",
                                    value: "3rd Floor, Arfa Software Technology Park, Lahore, Punjab",
                                },
                                {
                                    icon: <FaPhone className="text-[#D4AF37] text-xl mt-1" />,
                                    label: "Phone",
                                    value: "+92 42 3571 0000",
                                },
                                {
                                    icon: <FaEnvelope className="text-[#D4AF37] text-xl mt-1" />,
                                    label: "Email",
                                    value: "support@legalease.pk",
                                },
                                {
                                    icon: <FaClock className="text-[#D4AF37] text-xl mt-1" />,
                                    label: "Working Hours",
                                    value: "Mon – Sat: 9:00 AM – 6:00 PM",
                                },
                            ].map((item) => (
                                <div key={item.label} className="flex gap-4">
                                    {item.icon}
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                                        <p className="text-gray-700 text-sm">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    {/* 
            In a real project, you'd embed a Google Maps <iframe> here.
            We're using a placeholder div that looks like a map for the demo.
          */}
                    <div className="bg-white rounded-2xl shadow overflow-hidden">
                        <div className="bg-gray-200 h-56 flex items-center justify-center relative">
                            <div className="text-center">
                                <FaMapMarkerAlt className="text-[#D4AF37] text-4xl mx-auto mb-2" />
                                <p className="text-gray-500 text-sm font-medium">
                                    Arfa Software Technology Park
                                </p>
                                <p className="text-gray-400 text-xs">Lahore, Pakistan</p>
                            </div>
                            {/* Grid lines to simulate a map */}
                            <div className="absolute inset-0 opacity-10">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute border-gray-400"
                                        style={{
                                            left: `${i * 14}%`,
                                            top: 0,
                                            bottom: 0,
                                            borderLeftWidth: "1px",
                                        }}
                                    />
                                ))}
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute border-gray-400"
                                        style={{
                                            top: `${i * 20}%`,
                                            left: 0,
                                            right: 0,
                                            borderTopWidth: "1px",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="p-4 text-center">
                            <a
                                href="https://maps.google.com/?q=Arfa+Software+Technology+Park+Lahore"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#D4AF37] text-sm font-medium hover:underline"
                            >
                                View on Google Maps →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}