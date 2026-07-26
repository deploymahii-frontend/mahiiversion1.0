import UsersTable from "./components/UsersTable";
import UserFilters from "./components/UserFilters";
import UserToolbar from "./components/UserToolbar";

import { useUsers } from "./hooks/useUsers";

export default function UsersPage() {

    const {

        users,

        loading,

        filters,

        setFilters

    } = useUsers();

    if (loading) return <div>Loading...</div>;

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <UserToolbar />

            <UserFilters
                filters={filters}
                setFilters={setFilters}
            />

            <UsersTable
                users={users}
            />

        </main>

    );

}
