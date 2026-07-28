// src/modules/admin/pages/SystemSettings.jsx

import { useState } from "react";
import { FaCog, FaShieldAlt, FaUserShield } from "react-icons/fa";

export default function SystemSettings() {
    const [settings, setSettings] = useState({
        requireApproval: true,
        maintenanceMode: false,
        allowNewRegistrations: true,
    });

    function updateSetting(key, value) {
        setSettings(previous => ({
            ...previous,
            [key]: value,
        }));
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl px-5 py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">System Settings</h1>
                        <p className="mt-2 text-gray-500">Configure platform controls and security options.</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <FaCog className="text-3xl text-blue-600" />
                            <div>
                                <h2 className="text-xl font-semibold">Platform Settings</h2>
                                <p className="text-gray-500">General operational controls.</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <label className="flex items-center justify-between rounded-2xl border px-4 py-4">
                                <span>Require Shop Approval</span>
                                <input
                                    type="checkbox"
                                    checked={settings.requireApproval}
                                    onChange={e => updateSetting("requireApproval", e.target.checked)}
                                />
                            </label>
                            <label className="flex items-center justify-between rounded-2xl border px-4 py-4">
                                <span>Maintenance Mode</span>
                                <input
                                    type="checkbox"
                                    checked={settings.maintenanceMode}
                                    onChange={e => updateSetting("maintenanceMode", e.target.checked)}
                                />
                            </label>
                            <label className="flex items-center justify-between rounded-2xl border px-4 py-4">
                                <span>Allow New Registrations</span>
                                <input
                                    type="checkbox"
                                    checked={settings.allowNewRegistrations}
                                    onChange={e => updateSetting("allowNewRegistrations", e.target.checked)}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <FaShieldAlt className="text-3xl text-green-600" />
                            <div>
                                <h2 className="text-xl font-semibold">Security Settings</h2>
                                <p className="text-gray-500">Control authentication and access.</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <label className="flex items-center justify-between rounded-2xl border px-4 py-4">
                                <span>Two-factor Authentication</span>
                                <input type="checkbox" checked={true} readOnly />
                            </label>
                            <label className="flex items-center justify-between rounded-2xl border px-4 py-4">
                                <span>Admin Audit Logging</span>
                                <input type="checkbox" checked={true} readOnly />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <FaUserShield className="text-3xl text-purple-600" />
                            <div>
                                <h2 className="text-xl font-semibold">Access Control</h2>
                                <p className="text-gray-500">Set platform admin controls.</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="rounded-2xl border p-4">
                                <p className="text-sm text-gray-500">Admin roles can be managed from the users section.</p>
                            </div>
                            <div className="rounded-2xl border p-4">
                                <p className="text-sm text-gray-500">Logout sessions are reviewed automatically.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
