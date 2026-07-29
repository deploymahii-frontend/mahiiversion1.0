export default function LoginPage() {
    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-bold">Delivery Partner Login</h1>
                <input
                    className="mb-4 w-full rounded border p-3"
                    placeholder="Phone Number"
                />
                <input
                    className="mb-4 w-full rounded border p-3"
                    type="password"
                    placeholder="Password"
                />
                <button className="w-full rounded-full bg-blue-600 px-4 py-2 text-white">
                    Login
                </button>
            </div>
        </main>
    );
}
