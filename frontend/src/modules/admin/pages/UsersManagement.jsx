// src/modules/admin/pages/UsersManagement.jsx

import { useState } from "react";
import { FaSearch, FaUserEdit, FaTrash } from "react-icons/fa";

export default function UsersManagement() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    function deleteUser(id) {
        setUsers(previous => previous.filter(user => user._id !== id));
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Users Management</h1>
                        <p className="mt-2 text-gray-500">Manage customer and merchant accounts.</p>
                    </div>
                </div>

                <div className="mb-6 relative max-w-md">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
                        placeholder="Search users..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
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
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id} className="border-b">
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4">{user.status}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="rounded-lg bg-blue-600 p-2 text-white">
                                                <FaUserEdit />
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="rounded-lg bg-red-600 p-2 text-white"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
