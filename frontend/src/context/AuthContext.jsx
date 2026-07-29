import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import * as authService from "../modules/auth/services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    const [authenticated, setAuthenticated] = useState(() => {
        const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
        return Boolean(token);
    });

    useEffect(() => {

        initialize();

    }, []);

    async function initialize() {

        try {

            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("accessToken");

            if (!token) {
                setLoading(false);
                return;
            }

            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                    setAuthenticated(true);
                } catch (e) {}
            }

            const response = await authService.getProfile();
            if (response?.data?.data) {
                setUser(response.data.data);
                setAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }

        } catch (err) {
            // Only logout on explicit 401 error
            if (err?.response?.status === 401) {
                logout();
            }
        } finally {

            setLoading(false);

        }

    }

    function login(userData, accessToken, refreshToken) {

        localStorage.setItem(
            "token",
            accessToken
        );

        localStorage.setItem(
            "accessToken",
            accessToken
        );

        if (refreshToken) {
            localStorage.setItem(
                "refreshToken",
                refreshToken
            );
        }

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);

        setAuthenticated(true);

    }

    async function refreshProfile() {

        try {

            const { data } =
                await authService.getProfile();

            if (data?.data) {
                setUser(data.data);
                localStorage.setItem("user", JSON.stringify(data.data));
            }

        } catch {}

    }

    async function logout() {

        try {

            await authService.logout();

        } catch {}

        localStorage.removeItem("token");

        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

        localStorage.removeItem("user");

        setAuthenticated(false);

        setUser(null);

    }

    const value = useMemo(() => ({

        user,

        loading,

        authenticated,

        login,

        logout,

        refreshProfile,

    }), [

        user,

        loading,

        authenticated,

    ]);

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(

            "useAuth must be used inside AuthProvider"

        );

    }

    return context;

}
