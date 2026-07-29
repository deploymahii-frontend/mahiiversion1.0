import { useState } from "react";

import AuditRow from "./AuditRow";
import AuditDetailsModal from "./AuditDetailsModal";

export default function AuditTable({
  logs = [],
  loading = false,
}) {
  const [selectedLog, setSelectedLog] = useState(null);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading audit logs...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Administrator</th>
                <th className="px-6 py-4 text-left">Module</th>
                <th className="px-6 py-4 text-left">Action</th>
                <th className="px-6 py-4 text-left">Target</th>
                <th className="px-6 py-4 text-left">IP Address</th>
                <th className="px-6 py-4 text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No audit records found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <AuditRow
                    key={log._id}
                    log={log}
                    onView={() => setSelectedLog(log)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AuditDetailsModal
        open={!!selectedLog}
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
      />
    </>
  );
}
