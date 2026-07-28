// src/routes/RoleProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

export default function RoleProtectedRoute({
    allowedRoles,
}) {
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    if (
        !user.role ||
        !allowedRoles.includes(user.role)
    ) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return <Outlet />;
}
