import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

import RoleTable from "../components/RoleTable";
import RoleForm from "../components/RoleForm";

import useRoles from "../hooks/useRoles";

export default function Roles() {
  const {
    roles,
    loading,
    createRole,
    refresh,
  } = useRoles();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <main className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Roles Management
              </h1>

              <p className="mt-1 text-gray-500">
                Create and manage platform roles.
              </p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>
          </div>

          <RoleForm onSubmit={createRole} />

          <RoleTable
            roles={roles}
            loading={loading}
            onRefresh={refresh}
          />
        </main>
      </div>
    </div>
  );
}
