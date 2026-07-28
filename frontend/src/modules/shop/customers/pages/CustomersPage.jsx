import { useState, useMemo } from "react";
import useCustomers from "../hooks/useCustomers";
import CustomerCard from "../components/CustomerCard";
import CustomerTable from "../components/CustomerTable";
import CustomerFilters from "../components/CustomerFilters";
import CustomerStats from "../components/CustomerStats";
import { Users } from "lucide-react";

export default function CustomersPage() {
    const { customers, loading } = useCustomers();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [viewMode, setViewMode] = useState("grid");

    const filteredCustomers = useMemo(() => {
        return customers.filter((c) => {
            const matchesSearch =
                (c.fullName || c.name || "").toLowerCase().includes(search.toLowerCase()) ||
                (c.mobile || "").includes(search) ||
                (c.email || "").toLowerCase().includes(search.toLowerCase());

            if (!matchesSearch) return false;

            if (filter === "VIP") return (c.totalOrders || 0) >= 20;
            if (filter === "GOLD") return (c.totalOrders || 0) >= 10 && (c.totalOrders || 0) < 20;
            if (filter === "REGULAR") return (c.totalOrders || 0) >= 3 && (c.totalOrders || 0) < 10;
            if (filter === "BLOCKED") return c.isBlocked;

            return true;
        });
    }, [customers, search, filter]);

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
                Loading Customers...
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View customer profiles, loyalty tiers, and purchase history.
                    </p>
                </div>
            </div>

            <CustomerStats customers={customers} />

            <CustomerFilters
                search={search}
                onSearchChange={setSearch}
                filter={filter}
                onFilterChange={setFilter}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            {filteredCustomers.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100 shadow-sm">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-semibold text-gray-700">No customers found</p>
                    <p className="text-xs text-gray-400 mt-1">Try refining your search or filter options.</p>
                </div>
            ) : viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCustomers.map((customer) => (
                        <CustomerCard key={customer._id} customer={customer} />
                    ))}
                </div>
            ) : (
                <CustomerTable customers={filteredCustomers} />
            )}
        </div>
    );
}
