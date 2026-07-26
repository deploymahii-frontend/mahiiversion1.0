import React from "react";
import { Menu, ShoppingCart, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          Mahii
        </Link>

        <div className="hidden lg:flex flex-1 max-w-xl">
          <SearchBar />
        </div>

        <div className="hidden lg:block">
          <LocationSelector />
        </div>

        <nav className="hidden lg:flex items-center gap-6 font-medium">
          <Link to="/explore">Explore</Link>
          <Link to="/moments">Moments</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/gold">Gold</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden lg:flex">
            <Bell size={20} />
          </button>

          <Link to="/cart">
            <ShoppingCart size={22} />
          </Link>

          <Link to="/profile">
            <img
              src="/default-avatar.png"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          </Link>

          <button className="lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
