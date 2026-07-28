import { Award, ShieldAlert, Star, Zap } from "lucide-react";

export default function LoyaltyBadge({ totalOrders = 0, isBlocked = false }) {
    if (isBlocked) {
        return (
            <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full border border-red-200">
                <ShieldAlert className="w-3.5 h-3.5" /> Blocked
            </span>
        );
    }

    if (totalOrders >= 20) {
        return (
            <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full border border-purple-200">
                <Zap className="w-3.5 h-3.5 fill-purple-600" /> VIP Member
            </span>
        );
    }

    if (totalOrders >= 10) {
        return (
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500" /> Gold Customer
            </span>
        );
    }

    if (totalOrders >= 3) {
        return (
            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
                <Award className="w-3.5 h-3.5" /> Regular
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
            New Customer
        </span>
    );
}
