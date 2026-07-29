import { Link } from "react-router-dom";

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-6xl font-bold text-red-500">
                403
            </h1>

            <p className="mt-4 text-lg">
                Access Denied
            </p>

            <Link
                to="/"
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Go Home
            </Link>

        </div>
    );
}
