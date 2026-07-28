import api from "@/services/api";

export const uploadLogo = (formData) =>
    api.post(
        "/shop/settings/logo",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

export const uploadBanner = (formData) =>
    api.post(
        "/shop/settings/banner",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

export const deleteLogo = () =>
    api.delete("/shop/settings/logo");

export const deleteBanner = () =>
    api.delete("/shop/settings/banner");
