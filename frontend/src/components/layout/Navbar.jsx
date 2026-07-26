import { Link } from "react-router-dom";
import { Bell, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Mahii
        </Link>

        <input
          placeholder="Search businesses, products..."
          className="hidden w-96 rounded-xl border border-gray-300 px-4 py-2 md:block"
        />

        <div className="flex items-center gap-5 text-slate-700">
          <Bell className="h-5 w-5" />
          <Link to="/cart"><ShoppingCart className="h-5 w-5" /></Link>
          <Link to="/dashboard"><User className="h-5 w-5" /></Link>
        </div>
      </div>
    </header>
  );
}
