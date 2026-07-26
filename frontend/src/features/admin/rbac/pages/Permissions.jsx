import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

import PermissionMatrix from "../components/PermissionMatrix";
import usePermissions from "../hooks/usePermissions";

export default function Permissions() {
  const { permissions, loading, refresh } = usePermissions();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <main className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Permissions</h1>

              <p className="mt-1 text-gray-500">
                Review and manage available system permissions.
              </p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>
          </div>

          <PermissionMatrix
            permissions={permissions}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
}
