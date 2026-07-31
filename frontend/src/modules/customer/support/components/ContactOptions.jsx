import { Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactOptions() {
  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Still Need Help?</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <a
          href="tel:+911800123456"
          className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-3 hover:bg-emerald-100 transition"
        >
          <Phone size={20} />
          <div>
            <p className="text-xs text-emerald-600 font-bold">24/7 Helpline</p>
            <p className="text-sm font-bold">1800-123-456</p>
          </div>
        </a>

        <a
          href="mailto:support@mahii.in"
          className="p-4 rounded-2xl bg-blue-50 text-blue-700 font-semibold flex items-center gap-3 hover:bg-blue-100 transition"
        >
          <Mail size={20} />
          <div>
            <p className="text-xs text-blue-600 font-bold">Email Support</p>
            <p className="text-sm font-bold">support@mahii.in</p>
          </div>
        </a>

        <button
          onClick={() => alert("Live chat coming soon!")}
          className="p-4 rounded-2xl bg-purple-50 text-purple-700 font-semibold flex items-center gap-3 hover:bg-purple-100 transition text-left"
        >
          <MessageCircle size={20} />
          <div>
            <p className="text-xs text-purple-600 font-bold">Live Chat</p>
            <p className="text-sm font-bold">Start Chat</p>
          </div>
        </button>
      </div>
    </section>
  );
}
