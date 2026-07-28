import { Helmet } from "react-helmet-async";
import { FiLock, FiShield, FiEye, FiServer } from "react-icons/fi";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Mahii</title>
        <meta name="description" content="Mahii Privacy Policy explaining data protection, security, and usage." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 text-orange-500 mb-4">
            <FiLock size={32} />
            <span className="text-xs font-extrabold uppercase tracking-widest bg-orange-100 dark:bg-orange-950/50 px-3 py-1 rounded-full">
              Privacy & Security
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-8">
            Your privacy matters to us. Learn how Mahii protects and uses your data.
          </p>

          <div className="space-y-8 text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiEye className="text-orange-500" /> Information We Collect
              </h2>
              <p>
                We collect personal information such as your name, mobile number, delivery address, and order history strictly to fulfill your hyperlocal orders and improve local recommendations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiServer className="text-orange-500" /> Location Data Usage
              </h2>
              <p>
                Mahii uses precise GPS location data with your permission to calculate delivery distance, display nearby shops, and enable live delivery captain tracking.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiShield className="text-orange-500" /> Data Protection & Encryption
              </h2>
              <p>
                All sensitive data, including payment information, is transmitted via SSL/TLS encryption. We never sell your personal data to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiLock className="text-orange-500" /> Your Data Rights
              </h2>
              <p>
                You have the right to access, update, or request deletion of your personal account data at any time by emailing <span className="text-orange-500 font-semibold">privacy@mahii.in</span>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
