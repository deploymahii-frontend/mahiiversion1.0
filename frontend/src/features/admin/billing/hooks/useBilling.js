import { useMemo, useState } from "react";

export default function useBilling() {
  const [loading] = useState(false);

  const statistics = useMemo(
    () => [
      { label: "Active Subscriptions", value: "1,284", change: "+12.4%" },
      { label: "Monthly Revenue", value: "$84.2K", change: "+8.1%" },
      { label: "Refund Requests", value: "24", change: "-3.2%" },
      { label: "Past Due", value: "18", change: "+1.9%" },
    ],
    []
  );

  return {
    loading,
    statistics,
  };
}
