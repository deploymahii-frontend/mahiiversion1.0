import { useMemo } from "react";

export default function useEmployees(employees = []) {
  return useMemo(() => ({ employees }), [employees]);
}
