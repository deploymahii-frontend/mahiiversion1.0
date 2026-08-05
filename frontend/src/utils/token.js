const ACCESS_TOKEN = "accessToken";
const LEGACY_TOKEN = "token";
const CURRENT_TOKEN = "mahii_token";

export const saveToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(LEGACY_TOKEN, token);
    localStorage.setItem(CURRENT_TOKEN, token);
};

export const getToken = () => {
    return (
        localStorage.getItem(CURRENT_TOKEN) ||
        localStorage.getItem(ACCESS_TOKEN) ||
        localStorage.getItem(LEGACY_TOKEN)
    );
};

export const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(LEGACY_TOKEN);
    localStorage.removeItem(CURRENT_TOKEN);
};
