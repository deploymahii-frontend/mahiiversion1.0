import { Users, UserCheck, Star, ShieldAlert } from "lucide-react";

export default function CustomerStats({ customers = [] }) {
    const total = customers.length;
    const active = customers.filter(c => !c.isBlocked).length;
    const vip = customers.filter(c => (c.totalOrders || 0) >= 10).length;
    const blocked = customers.filter(c => c.isBlocked).length;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-500">Total Customers</p>
                    <h3 className="text-2xl font-bold text-gray-900">{total}</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <UserCheck className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-500">Active</p>
                    <h3 className="text-2xl font-bold text-gray-900">{active}</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <Star className="w-6 h-6 fill-amber-500" />
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-500">Gold & VIP</p>
                    <h3 className="text-2xl font-bold text-gray-900">{vip}</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-500">Blocked</p>
                    <h3 className="text-2xl font-bold text-gray-900">{blocked}</h3>
                </div>
            </div>
        </div>
    );
}
