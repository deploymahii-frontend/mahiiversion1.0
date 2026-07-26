import RolesTable from "./components/RolesTable";
import PermissionMatrix from "./components/PermissionMatrix";

export default function RoleManagementPage() {

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <RolesTable />

            <PermissionMatrix />

        </main>

    );

}
