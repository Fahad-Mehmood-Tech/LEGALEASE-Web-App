// App name and tagline
export const APP_NAME = "LegalEase";
export const APP_TAGLINE = "Your Trusted Legal Partner";

// User roles
export const ROLES = {
    CLIENT: "client",
    LAWYER: "lawyer",
};

// LocalStorage keys
export const STORAGE_KEYS = {
    ROLE: "legalease_role",
    USER: "legalease_user",
};

// Navigation routes
export const ROUTES = {
    // Auth
    HOME: "/",
    ROLE_SELECTION: "/",
    CLIENT_LOGIN: "/client/login",
    CLIENT_REGISTER: "/client/register",
    LAWYER_LOGIN: "/lawyer/login",
    LAWYER_REGISTER: "/lawyer/register",

    // Client pages
    CLIENT_DASHBOARD: "/client/dashboard",
    CLIENT_LAWYERS: "/client/lawyers",
    CLIENT_LAWYER_PROFILE: "/client/lawyers/:id",
    CLIENT_APPOINTMENT: "/client/appointment/:id",
    CLIENT_CHAT: "/client/chat",
    CLIENT_PROFILE: "/client/profile",

    // Lawyer pages
    LAWYER_DASHBOARD: "/lawyer/dashboard",
    LAWYER_APPOINTMENTS: "/lawyer/appointments",
    LAWYER_MESSAGES: "/lawyer/messages",
    LAWYER_PROFILE: "/lawyer/profile",

    // Public pages
    ABOUT: "/about",
    CONTACT: "/contact",
};

// Practice areas
export const PRACTICE_AREAS = [
    "Family Law",
    "Criminal Law",
    "Corporate Law",
    "Property Law",
    "Tax Law",
    "Immigration Law",
    "Civil Law",
    "Intellectual Property",
];

// Pakistani cities
export const CITIES = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
];

// Ratings filter options
export const RATINGS = [5, 4, 3, 2, 1];

// Case types for booking
export const CASE_TYPES = [
    "Family Dispute",
    "Criminal Defense",
    "Corporate Matter",
    "Property Issue",
    "Tax Problem",
    "Immigration Case",
    "Civil Dispute",
    "Other",
];