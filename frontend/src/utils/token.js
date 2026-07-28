const ACCESS_TOKEN = "accessToken";

export const saveToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
};

export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
};

export const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
};
