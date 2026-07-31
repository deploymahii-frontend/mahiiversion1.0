import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "50% OFF on First Order",
    subtitle: "Discover the best restaurants near you.",
    button: "Order Now",
    bg: "from-orange-500 to-red-500",
    link: "/explore",
  },
  {
    id: 2,
    title: "Mahii Gold Membership",
    subtitle: "Free delivery + exclusive discounts every day.",
    button: "Join Gold",
    bg: "from-yellow-500 to-orange-500",
    link: "/customer/gold",
  },
  {
    id: 3,
    title: "Student Meal Plans",
    subtitle: "Affordable mess subscriptions starting today.",
    button: "Explore Plans",
    bg: "from-blue-600 to-indigo-600",
    link: "/explore?category=mess",
  },
];

export default function OfferCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[current];

  return (
    <section className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className={`rounded-3xl overflow-hidden bg-gradient-to-r ${banner.bg}`}
        >
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold">{banner.title}</h2>
            <p className="mt-3 text-white/90">{banner.subtitle}</p>
            <button
              onClick={() => navigate(banner.link)}
              className="mt-6 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              {banner.button}
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {banners.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              current === index ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
