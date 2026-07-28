import api from "@/services/api";

export const getSettings = () =>
    api.get("/shop/settings");

export const updateProfile = (data) =>
    api.put("/shop/settings/profile", data);

export const updateBusinessHours = (data) =>
    api.put("/shop/settings/business-hours", data);

export const updateDelivery = (data) =>
    api.put("/shop/settings/delivery", data);

export const updatePayments = (data) =>
    api.put("/shop/settings/payments", data);

export const updateGST = (data) =>
    api.put("/shop/settings/gst", data);

export const changePassword = (data) =>
    api.put("/shop/settings/password", data);

export const uploadLogo = (formData) =>
    api.post("/shop/settings/logo", formData);

export const uploadBanner = (formData) =>
    api.post("/shop/settings/banner", formData);

export const getActiveSessions = () =>
    api.get("/shop/settings/sessions");

export const logoutAllSessions = () =>
    api.post("/shop/settings/logout-all");

export const toggleTwoFactor = () =>
    api.put("/shop/settings/two-factor");
