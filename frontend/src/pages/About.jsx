import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTruck, FiUsers, FiAward, FiArrowRight } from "react-icons/fi";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Mahii | Kolhapur's Hyperlocal Marketplace</title>
        <meta name="description" content="Discover Mahii's mission to empower local merchants and deliver fresh experiences in Kolhapur." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <span className="inline-block bg-orange-100 dark:bg-orange-950/50 text-orange-600 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
              Empowering Local Commerce
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Bringing Kolhapur's Neighborhoods <span className="text-orange-500">Closer To You</span>
            </h1>
            <p className="text-gray-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Mahii is built with a singular mission: connecting residents with local merchants, mess owners, bakeries, and artisans in real time with ultra-fast neighborhood delivery.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl text-center shadow-md border border-gray-100 dark:border-slate-700">
              <div className="text-3xl sm:text-4xl font-black text-orange-500">1,800+</div>
              <div className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Local Merchants</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl text-center shadow-md border border-gray-100 dark:border-slate-700">
              <div className="text-3xl sm:text-4xl font-black text-orange-500">35,000+</div>
              <div className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Happy Customers</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl text-center shadow-md border border-gray-100 dark:border-slate-700">
              <div className="text-3xl sm:text-4xl font-black text-orange-500">15 Mins</div>
              <div className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Avg Delivery Time</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl text-center shadow-md border border-gray-100 dark:border-slate-700">
              <div className="text-3xl sm:text-4xl font-black text-orange-500">100%</div>
              <div className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Authentic Local</div>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Why Mahii Exists</h2>
              <p className="text-gray-500 text-sm mt-1">Four pillars driving our technology and operations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 space-y-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-950/50 text-orange-500 rounded-2xl w-fit">
                  <FiShoppingBag size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Support Local Shop Owners</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  We give traditional shop owners digital tools to manage orders, inventory, and instant customer delivery without heavy commission margins.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 space-y-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-950/50 text-orange-500 rounded-2xl w-fit">
                  <FiTruck size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Hyperlocal Speed & Convenience</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  Orders are dispatched directly from neighborhood hubs, ensuring hot food, fresh dairy, and groceries arrive at your doorstep in minutes.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 space-y-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-950/50 text-orange-500 rounded-2xl w-fit">
                  <FiUsers size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Authentic Local Experiences</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  From iconic Kolhapuri Misal joints to organic farmers, Mahii showcases authentic regional flavor and local community moments.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 space-y-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-950/50 text-orange-500 rounded-2xl w-fit">
                  <FiAward size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quality Assurance & Transparency</h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  Every merchant undergoes verification to guarantee clean hygiene standards, honest pricing, and genuine product quality.
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl font-black">Meet the Minds Behind Mahii</h3>
              <p className="text-orange-100 text-sm">Explore our leadership team, founder & CEO, and vision.</p>
            </div>
            <Link
              to="/team"
              className="bg-white text-orange-600 hover:bg-orange-50 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 text-sm shrink-0"
            >
              <span>Meet Mahii Team</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
