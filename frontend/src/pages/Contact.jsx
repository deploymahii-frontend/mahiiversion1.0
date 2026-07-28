import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiPhone, FiMail, FiMapPin, FiMessageSquare, FiSend, FiHelpCircle } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thank you! Your support ticket has been logged successfully 🎉");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Help & Support | Mahii</title>
        <meta name="description" content="Get instant help & customer support from Mahii Hyperlocal Team." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-950/50 text-orange-600 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <FiHelpCircle size={14} /> 24/7 Customer Support
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              How Can We Help You?
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
              Have questions about your order, shop registration, or delivery? Reach out to the Mahii support team anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 space-y-4">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <FiMessageSquare className="text-orange-500" /> Direct Channels
                </h2>

                <div className="space-y-4 text-sm text-gray-600 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/40 text-orange-500 rounded-2xl shrink-0">
                      <FiPhone size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Call Support</p>
                      <p className="font-semibold text-orange-600 dark:text-orange-400 mt-0.5">+91 98765 43210</p>
                      <p className="text-xs text-gray-400">Mon-Sun: 8:00 AM - 11:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/40 text-orange-500 rounded-2xl shrink-0">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Email Us</p>
                      <p className="font-semibold text-orange-600 dark:text-orange-400 mt-0.5">support@mahii.in</p>
                      <p className="text-xs text-gray-400">Response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/40 text-orange-500 rounded-2xl shrink-0">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Head Office</p>
                      <p className="text-xs text-gray-600 dark:text-slate-300 mt-0.5">
                        Mahii Tech Park, Rajarampuri 5th Lane, Kolhapur, MH 416008
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 space-y-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send Us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 block mb-1">Your Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 block mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 block mb-1">Mobile Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400 block mb-1">Message / Issue Details</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can help you..."
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <button
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2"
                >
                  <FiSend />
                  <span>{submitting ? "Submitting Ticket..." : "Submit Support Request"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
