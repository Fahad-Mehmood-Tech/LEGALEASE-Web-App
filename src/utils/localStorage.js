import { STORAGE_KEYS } from "./constants";

// ─── ROLE ───────────────────────────────────────────
export const saveRole = (role) => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
};

export const getRole = () => {
    return localStorage.getItem(STORAGE_KEYS.ROLE);
};

export const removeRole = () => {
    localStorage.removeItem(STORAGE_KEYS.ROLE);
};

// ─── USER ───────────────────────────────────────────
export const saveUser = (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
};

// ─── REGISTERED USERS ───────────────────────────────
export const getRegisteredUsers = () => {
    const users = localStorage.getItem("legalease_registered_users");
    return users ? JSON.parse(users) : [];
};

export const saveRegisteredUser = (newUser) => {
    const existing = getRegisteredUsers();
    existing.push(newUser);
    localStorage.setItem("legalease_registered_users", JSON.stringify(existing));
};

// ─── APPOINTMENTS ────────────────────────────────────
export const getAppointments = () => {
    const data = localStorage.getItem("legalease_appointments");
    return data ? JSON.parse(data) : [];
};

export const saveAppointment = (appointment) => {
    const existing = getAppointments();
    const newAppointment = {
        ...appointment,
        id: Date.now(),
        status: "pending",
    };
    existing.push(newAppointment);
    localStorage.setItem("legalease_appointments", JSON.stringify(existing));
    return newAppointment;
};

export const updateAppointmentStatus = (id, status) => {
    const existing = getAppointments();
    const updated = existing.map((apt) =>
        apt.id === id ? { ...apt, status } : apt
    );
    localStorage.setItem("legalease_appointments", JSON.stringify(updated));
};

// ─── LOGOUT ─────────────────────────────────────────
export const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem(STORAGE_KEYS.USER);
};