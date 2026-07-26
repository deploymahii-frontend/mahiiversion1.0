import { FiBell, FiSearch, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">

      <div className="relative w-full max-w-md">

        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search users, shops, orders..."
          className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-orange-500"
        />

      </div>

      <div className="ml-6 flex items-center gap-4">

        <button className="relative rounded-full p-2 hover:bg-gray-100">
          <FiBell size={22} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="text-right">
          <p className="font-semibold">
            Super Admin
          </p>

          <p className="text-sm text-gray-500">
            admin@mahii.in
          </p>
        </div>

        <img
          src="/images/avatar.png"
          alt="Admin"
          className="h-10 w-10 rounded-full object-cover"
        />

        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
          title="Logout"
        >
          <FiLogOut size={20} />
        </button>

      </div>

    </header>
  );
}
