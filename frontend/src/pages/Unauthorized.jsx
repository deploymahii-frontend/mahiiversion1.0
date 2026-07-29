// src/pages/Unauthorized.jsx

import { Link } from "react-router-dom";

export default function Unauthorized() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="rounded-3xl bg-white p-10 text-center shadow">
                <h1 className="text-5xl font-bold text-red-600">
                    403
                </h1>
                <h2 className="mt-4 text-2xl font-semibold">
                    Access Denied
                </h2>
                <p className="mt-2 text-gray-500">
                    You do not have permission to view this page.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
