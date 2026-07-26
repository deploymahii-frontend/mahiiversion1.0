import useAuth from "../../auth/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">

        <h1 className="text-3xl font-bold">
          Welcome to Mahii Business
        </h1>

        <p className="mt-4">
          Hello,
          <strong> {user?.fullName}</strong>
        </p>

        <p className="mt-2">
          Role:
          <strong> {user?.role}</strong>
        </p>

        <button
          onClick={logout}
          className="mt-8 px-6 py-3 rounded-xl bg-red-600 text-white"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
