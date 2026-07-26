import AuditTable from "./components/AuditTable";

import { useAuditLogs } from "./hooks/useAuditLogs";

export default function AuditLogsPage() {

    const {

        logs,

        loading

    } = useAuditLogs();

    if (loading) return <div>Loading...</div>;

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <AuditTable

                logs={logs}

            />

        </main>

    );

}
