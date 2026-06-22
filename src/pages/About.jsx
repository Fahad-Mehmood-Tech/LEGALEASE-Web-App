// src/pages/About.jsx
// About page — company mission, vision, why choose us, team section

import { FaGavel, FaHandshake, FaShieldAlt, FaStar, FaUsers, FaBriefcase } from "react-icons/fa";

// ── Team data (mock) ──────────────────────────────────────────────
const team = [
    {
        name: "Ahmed Raza",
        role: "Founder & CEO",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "15+ years in legal tech. Former corporate lawyer turned entrepreneur.",
    },
    {
        name: "Sara Khan",
        role: "Head of Legal Affairs",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        bio: "Expert in family and civil law with a passion for accessible justice.",
    },
    {
        name: "Usman Ali",
        role: "CTO",
        image: "https://randomuser.me/api/portraits/men/65.jpg",
        bio: "Full-stack engineer building platforms that connect people to lawyers.",
    },
    {
        name: "Ayesha Tariq",
        role: "Client Relations Manager",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        bio: "Dedicated to making every client's experience smooth and stress-free.",
    },
];

// ── Why Choose Us cards ───────────────────────────────────────────
const reasons = [
    {
        icon: <FaShieldAlt className="text-[#D4AF37] text-3xl" />,
        title: "Verified Lawyers",
        desc: "Every lawyer on our platform is background-checked and license-verified.",
    },
    {
        icon: <FaHandshake className="text-[#D4AF37] text-3xl" />,
        title: "Easy Booking",
        desc: "Schedule appointments in minutes — no phone calls, no waiting.",
    },
    {
        icon: <FaStar className="text-[#D4AF37] text-3xl" />,
        title: "Rated & Reviewed",
        desc: "Real reviews from real clients to help you make the right choice.",
    },
    {
        icon: <FaUsers className="text-[#D4AF37] text-3xl" />,
        title: "50,000+ Clients",
        desc: "Trusted by thousands of clients across Pakistan every month.",
    },
];

export default function About() {
    return (
        <div className="bg-[#F8FAFC] min-h-screen">

            {/* ── Hero Banner ── */}
            <section className="bg-[#0F172A] text-white py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-center mb-4">
                        <FaGavel className="text-[#D4AF37] text-5xl" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">About LegalEase</h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        We are on a mission to make legal help accessible, affordable, and
                        stress-free for every Pakistani citizen.
                    </p>
                </div>
            </section>

            {/* ── Mission & Vision ── */}
            <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
                {/* Mission */}
                <div className="bg-white rounded-2xl shadow p-8 border-l-4 border-[#D4AF37]">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        LegalEase was founded with one goal in mind — to bridge the gap
                        between people who need legal help and the lawyers who can provide it.
                        We believe everyone deserves access to quality legal representation,
                        regardless of their background or location.
                    </p>
                </div>

                {/* Vision */}
                <div className="bg-white rounded-2xl shadow p-8 border-l-4 border-[#0F172A]">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We envision a Pakistan where every individual can find a trusted
                        lawyer with just a few taps — a future where legal services are as
                        easy to access as ordering a meal or booking a cab.
                    </p>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="bg-[#0F172A] py-12 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                    {[
                        { label: "Lawyers", value: "500+" },
                        { label: "Clients Served", value: "50K+" },
                        { label: "Cases Resolved", value: "30K+" },
                        { label: "Cities Covered", value: "20+" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-3xl font-bold text-[#D4AF37]">{stat.value}</p>
                            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-10">
                    Why Choose LegalEase?
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((r) => (
                        <div
                            key={r.title}
                            className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-md transition"
                        >
                            <div className="flex justify-center mb-4">{r.icon}</div>
                            <h3 className="font-bold text-[#0F172A] mb-2">{r.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Team Section ── */}
            <section className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#0F172A] text-center mb-10">
                        Meet the Team
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="bg-[#F8FAFC] rounded-2xl p-6 text-center shadow hover:shadow-md transition"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#D4AF37]"
                                />
                                <h3 className="font-bold text-[#0F172A]">{member.name}</h3>
                                <p className="text-[#D4AF37] text-sm font-medium mb-2">{member.role}</p>
                                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="py-16 px-4 text-center bg-[#F8FAFC]">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3">
                    Ready to find your lawyer?
                </h2>
                <p className="text-gray-500 mb-6">
                    Browse hundreds of verified lawyers across Pakistan.
                </p>
                <a
                    href="/lawyers"
                    className="bg-[#D4AF37] hover:bg-yellow-500 text-[#0F172A] font-bold px-8 py-3 rounded-xl transition inline-block"
                >
                    Browse Lawyers
                </a>
            </section>
        </div>
    );
}