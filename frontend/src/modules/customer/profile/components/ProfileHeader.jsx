import { User, Crown, Camera, Edit3 } from "lucide-react";
import { useState } from "react";

export default function ProfileHeader({ user = {}, onEdit }) {
  const name = user.name || "Valued Customer";
  const email = user.email || "customer@mahii.in";
  const isGold = user.isGold ?? true;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
      <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        {/* Avatar Container */}
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white overflow-hidden font-bold text-3xl border-4 border-white dark:border-slate-800 shadow-md">
            {user.avatar || user.profilePicture ? (
              <img
                src={user.avatar || user.profilePicture}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <button
            onClick={onEdit}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
            title="Change Avatar"
          >
            <Camera size={14} />
          </button>
        </div>

        {/* User Info */}
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              {name}
            </h2>
            {isGold && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                <Crown size={13} /> Gold Member
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            {email}
          </p>
        </div>
      </div>

      {/* Edit Profile Action */}
      <button
        onClick={onEdit}
        className="rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 px-5 py-2.5 font-bold text-sm flex items-center gap-2 transition"
      >
        <Edit3 size={16} />
        Edit Profile
      </button>
    </section>
  );
}
