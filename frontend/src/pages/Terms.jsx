import { Helmet } from "react-helmet-async";
import { FiShield, FiCheckCircle } from "react-icons/fi";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Mahii</title>
        <meta name="description" content="Mahii Terms & Conditions for customer orders, shop listings, and delivery services." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 text-orange-500 mb-4">
            <FiShield size={32} />
            <span className="text-xs font-extrabold uppercase tracking-widest bg-orange-100 dark:bg-orange-950/50 px-3 py-1 rounded-full">
              Legal Documentation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-8">
            Last Updated: July 2026 • Effective for all Mahii customers, shop owners, and partners.
          </p>

          <div className="space-y-8 text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiCheckCircle className="text-orange-500" /> 1. Platform Overview & Services
              </h2>
              <p>
                Mahii (Mahii Hyperlocal Technologies) operates as a hyperlocal marketplace platform connecting consumers with local merchants, restaurants, grocery stores, bakeries, and service providers across Kolhapur and surrounding regions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiCheckCircle className="text-orange-500" /> 2. Account Registration & User Security
              </h2>
              <p>
                Users must provide accurate, complete information when registering an account on Mahii. You are responsible for safeguarding your credentials and any activity conducted under your account.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiCheckCircle className="text-orange-500" /> 3. Ordering, Pricing & Payments
              </h2>
              <p>
                All prices listed on Mahii are set directly by partner merchants. Payments can be completed online via UPI, Credit/Debit cards, Net Banking, or Cash on Delivery where applicable.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiCheckCircle className="text-orange-500" /> 4. Cancellations & Refund Policy
              </h2>
              <p>
                Orders can be cancelled before merchant confirmation. Refunds for failed transactions or damaged goods are processed within 3-5 business days back to the original payment method.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiCheckCircle className="text-orange-500" /> 5. Contact & Legal Disputes
              </h2>
              <p>
                For questions regarding these terms, please contact our legal department at <span className="text-orange-500 font-semibold">legal@mahii.in</span> or visit our Kolhapur office.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
