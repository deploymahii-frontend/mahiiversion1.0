import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
  FiShield,
  FiSmartphone,
  FiHeart,
} from "react-icons/fi";

const popularAreas = [
  "KIT college Kolhapur",
];

const categories = [
  { name: "Restaurants & Messes", path: "/explore?category=Restaurants" },
  { name: "Organic Groceries", path: "/explore?category=Grocery" },
  { name: "Sweets & Bakeries", path: "/explore?category=Bakery" },
  { name: "Fresh Milk & Dairy", path: "/explore?category=Dairy" },
  { name: "Kolhapuri Misal Specials", path: "/explore?search=Misal" },
  { name: "Daily Local Services", path: "/explore?category=Services" },
];

const partnerLinks = [
  { name: "Register Your Shop / Store", path: "/signup" },
  { name: "Shop Owner Login Portal", path: "/login" },
  { name: "Partner as Delivery Captain", path: "/signup" },
  { name: "Merchant Support & FAQs", path: "/contact" },
  { name: "Admin Portal Access", path: "/login" },
];

const companyLinks = [
  { name: "About Mahii", path: "/about" },
  { name: "Mahii Team & Leadership", path: "/team" },
  { name: "Explore Nearby Shops", path: "/explore" },
  { name: "Mahii Moments & Stories", path: "/moments" },
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Help & Support", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Banner + App Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 items-center">
          <div className="lg:col-span-7 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2 text-3xl font-extrabold text-white tracking-tight">
              <span className="text-orange-500">Mahii</span>.in
            </Link>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              Mahii is Kolhapur’s premier hyperlocal marketplace connecting residents with trusted local shops, authentic food joints, fresh groceries, sweets, and everyday services.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-4">
            <div className="text-left sm:text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-orange-400">Experience Mahii Mobile</p>
              <p className="text-xs text-slate-400 mt-0.5">Order faster with live tracking & offers</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-2xl border border-slate-700 transition"
              >
                <FiSmartphone size={20} className="text-orange-400" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase text-slate-400 font-semibold">Get it on</p>
                  <p className="text-xs font-bold">Google Play</p>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-2xl border border-slate-700 transition"
              >
                <FiSmartphone size={20} className="text-orange-400" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase text-slate-400 font-semibold">Download on</p>
                  <p className="text-xs font-bold">App Store</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Popular Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-orange-500 pl-3">
              Top Categories
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-orange-400 transition flex items-center gap-1.5">
                    <span>›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Partner With Us */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-orange-500 pl-3">
              Partner With Mahii
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {partnerLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-orange-400 transition flex items-center gap-1.5">
                    <span>›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-orange-500 pl-3">
              Company & Policy
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-orange-400 transition flex items-center gap-1.5">
                    <span>›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-orange-500 pl-3">
              Connect With Us
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <FiMapPin className="text-orange-400 shrink-0" size={15} />
                <span>KIT Kolhapur, Maharashtra 416234, India</span>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="text-orange-400 shrink-0" size={15} />
                <span>+91 7757096119 / 920179770</span>
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-orange-400 shrink-0" size={15} />
                <span>supportmahii@gmail.com</span>
              </p>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Follow Our Journey</p>
              <div className="flex items-center gap-2.5">
                <a href="https://www.instagram.com/mahii.yourfriend?igsh=MXE1Y2EwYWNwY29kaw==" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition">
                  <FiInstagram size={16} />
                </a>
                <a href="https://in.linkedin.com/company/mahii-pvt-ltd" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition">
                  <FiLinkedin size={16} />
                </a>
                <a href="https://youtube.com/@mahii.yourfriend?si=iMT5F_rx5TN6KUUs" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-white text-slate-300 flex items-center justify-center transition">
                  <FiYoutube size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Areas Badge Strip */}
        <div className="pt-8 border-t border-slate-800/80 space-y-3">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Major Delivery Hubs in Kolhapur:</p>
          <div className="flex flex-wrap gap-2">
            {popularAreas.map((area) => (
              <span
                key={area}
                className="bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-3 py-1 rounded-full text-xs transition border border-slate-800"
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Trust Badges */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <FiShield className="text-emerald-400" size={16} />
            <span>100% Safe & Secure Hyperlocal Checkout</span>
          </div>

          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Mahii Hyperlocal Technologies. Crafted with <FiHeart className="text-red-500 fill-current" size={12} /> in Kolhapur.
          </p>

          <div className="flex items-center gap-3 text-slate-400 font-bold text-[10px] tracking-widest uppercase">
            <span>BHIM UPI</span>
            <span>•</span>
            <span>VISA</span>
            <span>•</span>
            <span>MASTERCARD</span>
            <span>•</span>
            <span>NETBANKING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
