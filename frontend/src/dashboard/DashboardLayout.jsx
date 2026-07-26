import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/orders', label: 'Orders' },
  { to: '/dashboard/products', label: 'Products' },
  { to: '/dashboard/analytics', label: 'Analytics' },
  { to: '/dashboard/profile', label: 'Profile' },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white border-r">
        <div className="p-4 font-bold text-lg">Mahii Shop</div>
        <nav className="p-4">
          <ul className="space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-2 transition ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <div className="text-lg font-medium">Merchant Dashboard</div>
          <div className="text-sm text-gray-500">Manage your shop</div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
