// src/modules/admin/pages/UsersManagement.jsx

import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import api from "@/services/api";

export default function UsersManagement() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/users");
        const payload = response?.data?.data?.users || [];
        setUsers(payload);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();
    return users.filter((user) => {
      const haystack = `${user.name || ""} ${user.email || ""} ${user.role || ""} ${user.status || ""}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [search, users]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Users Management</h1>
            <p className="mt-2 text-gray-500">Manage customer and merchant accounts from live platform data.</p>
          </div>
        </div>

        <div className="mb-6 relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
            placeholder="Search users..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">Loading users…</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-red-500">{error}</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id || user._id} className="border-b">
                    <td className="p-4">{user.name || user.fullName || "—"}</td>
                    <td className="p-4">{user.email || "—"}</td>
                    <td className="p-4">{user.role || "—"}</td>
                    <td className="p-4">{user.status || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
