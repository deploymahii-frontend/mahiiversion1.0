import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyWishlist() {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
        <Heart size={40} className="fill-rose-100 dark:fill-rose-900" />
      </div>

      <h2 className="text-2xl font-black text-slate-800 dark:text-white mt-6">
        No Favorites Saved
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-sm mx-auto">
        Start exploring mess halls, cafes, and shops around you to add them to your wishlist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
      >
        Explore Marketplace
      </Link>
    </section>
  );
}
