import { Routes, Route, Navigate } from "react-router-dom";
import { getRole, getUser } from "../utils/localStorage";
// Auth Pages
import RoleSelection from "../auth/RoleSelection";
import ClientLogin from "../auth/ClientLogin";
import ClientRegister from "../auth/ClientRegister";
import LawyerLogin from "../auth/LawyerLogin";
import LawyerRegister from "../auth/LawyerRegister";

// Client Pages
import ClientDashboard from "../client/Dashboard";
import Lawyers from "../client/Lawyers";
import LawyerProfile from "../client/LawyerProfile";
import Appointment from "../client/Appointment";
import ClientChat from "../client/Chat";
import ClientProfile from "../client/Profile";

// Lawyer Pages
import LawyerDashboard from "../lawyer/Dashboard";
import LawyerAppointments from "../lawyer/Appointments";
import LawyerMessages from "../lawyer/Messages";
import LawyerProfilePage from "../lawyer/Profile";

// Public Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

// ─── Protected Route ────────────────────────────────
const ProtectedRoute = ({ children, allowedRole }) => {
    const role = localStorage.getItem("legalease_role");
    const user = localStorage.getItem("legalease_user");

    if (!role || !user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const PublicRoute = ({ children }) => {
    const role = getRole();
    const user = getUser();

    console.log("PublicRoute check:", role, user);

    if (role && user) {
        if (role === "client") return <Navigate to="/client/dashboard" replace />;
        if (role === "lawyer") return <Navigate to="/lawyer/dashboard" replace />;
    }

    return children;
};

// ─── Main Routes ────────────────────────────────────
const AppRoutes = () => {
    return (
        <Routes>

            {/* Role Selection - Default Page */}
            <Route path="/" element={
                <PublicRoute>
                    <RoleSelection />
                </PublicRoute>
            } />

            {/* Public Pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Client Auth */}
            <Route path="/client/login" element={<PublicRoute>
                <ClientLogin />
            </PublicRoute>} />
            <Route path="/client/register" element={
                <PublicRoute>
                    <ClientRegister />
                </PublicRoute>
            } />

            {/* Client Protected Pages */}
            <Route path="/client/dashboard" element={
                <ProtectedRoute allowedRole="client">
                    <ClientDashboard />
                </ProtectedRoute>
            } />
            <Route path="/client/lawyers" element={
                <ProtectedRoute allowedRole="client">
                    <Lawyers />
                </ProtectedRoute>
            } />
            <Route path="/client/lawyers/:id" element={
                <ProtectedRoute allowedRole="client">
                    <LawyerProfile />
                </ProtectedRoute>
            } />
            <Route path="/client/appointment/:id" element={
                <ProtectedRoute allowedRole="client">
                    <Appointment />
                </ProtectedRoute>
            } />
            <Route path="/client/chat" element={
                <ProtectedRoute allowedRole="client">
                    <ClientChat />
                </ProtectedRoute>
            } />
            <Route path="/client/profile" element={
                <ProtectedRoute allowedRole="client">
                    <ClientProfile />
                </ProtectedRoute>
            } />

            {/* Lawyer Auth */}
            <Route path="/lawyer/login" element={
                <PublicRoute>
                    <LawyerLogin />
                </PublicRoute>
            } />

            <Route path="/lawyer/register" element={
                <PublicRoute>
                    <LawyerRegister />
                </PublicRoute>
            } />

            {/* Lawyer Protected Pages */}
            <Route path="/lawyer/dashboard" element={
                <ProtectedRoute allowedRole="lawyer">
                    <LawyerDashboard />
                </ProtectedRoute>
            } />
            <Route path="/lawyer/appointments" element={
                <ProtectedRoute allowedRole="lawyer">
                    <LawyerAppointments />
                </ProtectedRoute>
            } />
            <Route path="/lawyer/messages" element={
                <ProtectedRoute allowedRole="lawyer">
                    <LawyerMessages />
                </ProtectedRoute>
            } />
            <Route path="/lawyer/profile" element={
                <ProtectedRoute allowedRole="lawyer">
                    <LawyerProfilePage />
                </ProtectedRoute>
            } />

            {/* 404 - Page Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
    );
};

export default AppRoutes;