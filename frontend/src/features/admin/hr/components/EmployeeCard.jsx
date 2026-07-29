import React from "react";

export default function EmployeeCard({ employee }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="font-semibold">{employee?.name ?? "Employee"}</h3>
      <p className="mt-1 text-sm text-gray-500">{employee?.role ?? "Role"}</p>
    </div>
  );
}
