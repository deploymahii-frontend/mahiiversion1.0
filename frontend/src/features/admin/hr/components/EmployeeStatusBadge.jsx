import React from "react";

export default function EmployeeStatusBadge({ status = "Active" }) {
  return (
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
      {status}
    </span>
  );
}
