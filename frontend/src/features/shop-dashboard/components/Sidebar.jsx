import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiShoppingBag,
  FiPackage,
  FiBarChart2,
  FiUsers,
  FiStar,
  FiGift,
  FiSettings,
  FiUser,
} from 'react-icons/fi';

const menuItems = [
  { label: 'Dashboard', icon: FiHome, path: '/shop/dashboard' },
  { label: 'Orders', icon: FiShoppingBag, path: '/shop/orders' },
  { label: 'Products', icon: FiPackage, path: '/shop/products' },
  { label: 'Analytics', icon: FiBarChart2, path: '/shop/analytics' },
  { label: 'Customers', icon: FiUsers, path: '/shop/customers' },
  { label: 'Reviews', icon: FiStar, path: '/shop/reviews' },
  { label: 'Discounts', icon: FiGift, path: '/shop/discounts' },
  { label: 'Shop Profile', icon: FiUser, path: '/shop/profile' },
  { label: 'Settings', icon: FiSettings, path: '/shop/settings' },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-orange-500">Mahii Shop</h1>
        <p className="mt-1 text-sm text-gray-500">Merchant Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-50'
                  }`
                }
              >
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t p-4">
        <button className="w-full rounded-xl border px-4 py-3 text-left transition hover:bg-gray-100">
          Logout
        </button>
      </div>
    </aside>
  );
}
