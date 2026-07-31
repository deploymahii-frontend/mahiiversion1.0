import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is Mahii Gold?", a: "Mahii Gold is a VIP subscription program offering free delivery, extra discounts, and double reward points on all food and mess orders." },
  { q: "How does Free Delivery work?", a: "Free delivery automatically applies at checkout on all orders above ₹149 from participating Mahii partner shops." },
  { q: "Can I cancel my membership anytime?", a: "Yes, you can cancel auto-renewal anytime from your profile settings." },
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Frequently Asked Questions</h3>
      <div className="divide-y divide-slate-100">
        {faqs.map((faq, idx) => (
          <div key={idx} className="py-4">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex justify-between items-center text-left font-semibold text-slate-800"
            >
              <span>{faq.q}</span>
              <ChevronDown size={18} className={`transition ${openIdx === idx ? "rotate-180 text-amber-500" : "text-slate-400"}`} />
            </button>
            {openIdx === idx && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
