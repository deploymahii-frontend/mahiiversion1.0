import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

// Real‑time dashboard hook for admin
export default function useDashboardData() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalBusinesses: 0,
    activeOrders: 0,
    revenue: "₹0",
    moments: 0,
    products: 0,
    services: 0,
    supportTickets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = [];

    const subscribeCount = (path, key, formatter = (c) => c) => {
      const colRef = collection(db, path);
      const u = onSnapshot(colRef, (snap) => {
        setDashboard((prev) => ({ ...prev, [key]: formatter(snap.size) }));
      });
      unsub.push(u);
    };

    // Collection names are assumed; adjust if different in your Firestore
    subscribeCount("users", "totalUsers");
    subscribeCount("businesses", "totalBusinesses");
    subscribeCount("orders", "activeOrders");
    // Revenue could be a sub‑collection or doc; for demo we just count docs
    subscribeCount("revenue", "revenue", (c) => `₹${(c * 1000).toLocaleString()}`);
    subscribeCount("moments", "moments");
    subscribeCount("products", "products");
    subscribeCount("services", "services");
    subscribeCount("supportTickets", "supportTickets");

    setLoading(false);

    return () => {
      unsub.forEach((fn) => fn());
    };
  }, []);

  return { dashboard, loading };
}
