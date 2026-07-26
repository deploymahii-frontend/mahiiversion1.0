import {
  PackagePlus,
  ShoppingBag,
  Megaphone,
  Users,
  Settings,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Add Product",
    description: "Create a new menu item",
    icon: PackagePlus,
    path: "/products/new",
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Orders",
    description: "Manage live orders",
    icon: ShoppingBag,
    path: "/orders",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Marketing",
    description: "Create promotions",
    icon: Megaphone,
    path: "/marketing",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Staff",
    description: "Manage employees",
    icon: Users,
    path: "/staff",
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Shop Profile",
    description: "Edit business details",
    icon: Store,
    path: "/shop",
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Settings",
    description: "Application settings",
    icon: Settings,
    path: "/settings",
    color: "bg-gray-100 text-gray-700",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Quick Actions
        </h2>

        <p className="text-gray-500 mt-1">
          Frequently used business tools
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="group rounded-2xl border border-gray-100 hover:border-violet-300 hover:shadow-md transition-all p-5 text-left"
            >
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center ${action.color}`}
              >
                <Icon size={22} />
              </div>

              <h3 className="font-semibold text-gray-900 mt-4 group-hover:text-violet-600">
                {action.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
