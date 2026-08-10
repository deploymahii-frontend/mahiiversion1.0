import { useState, useEffect } from "react";
import { FiMapPin, FiX, FiSearch, FiCrosshair } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_LOCATIONS = [
  "Rajarampuri, Kolhapur",
  "Tarabai Park, Kolhapur",
  "Rankala, Kolhapur",
  "Shahupuri, Kolhapur",
  "Shivaji Udyamnagar, Kolhapur",
  "Nagala Park, Kolhapur",
];

export default function LocationPickerModal({ isOpen, onClose, onSelectLocation, currentLocation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const area =
              data.address?.suburb ||
              data.address?.neighbourhood ||
              data.address?.residential ||
              data.address?.city_district ||
              data.address?.city ||
              data.address?.town ||
              "Current Location";
            const city = data.address?.city || data.address?.state || "";
            const formatted = city ? `${area}, ${city}` : area;

            localStorage.setItem("mahii_user_coords", JSON.stringify({ latitude, longitude }));
            onSelectLocation(formatted);
          } catch (e) {
            onSelectLocation(`Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
          } finally {
            setIsGettingLocation(false);
            onClose();
          }
        },
        (error) => {
          setIsGettingLocation(false);
          alert("Could not get your location. Please check browser permissions.");
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setIsGettingLocation(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleCustomLocationSelect = (loc) => {
    onSelectLocation(loc);
    onClose();
  };

  const filteredLocations = POPULAR_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Choose Location</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">Discover shops and offers near you</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition text-gray-500"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="p-5 flex-1 overflow-y-auto">
            {/* Search Input */}
            <div className="relative mb-5">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your area, street, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            {/* Current Location Button */}
            <button
              onClick={handleGetCurrentLocation}
              disabled={isGettingLocation}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition mb-6"
            >
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                {isGettingLocation ? (
                  <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiCrosshair size={20} />
                )}
              </div>
              <div className="text-left">
                <p className="font-bold">Use current location</p>
                <p className="text-xs opacity-80">Enable location for better recommendations</p>
              </div>
            </button>

            {/* Popular Locations */}
            <div>
              <p className="text-sm font-semibold text-gray-400 dark:text-slate-500 mb-3 uppercase tracking-wider">
                Popular Areas
              </p>

              {searchQuery.trim() && (
                <button
                  onClick={() => handleCustomLocationSelect(searchQuery.trim())}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-orange-50 dark:bg-slate-800 hover:bg-orange-100 text-orange-600 dark:text-orange-400 font-bold transition mb-3 border border-orange-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-orange-500" />
                    <span>Select "{searchQuery.trim()}"</span>
                  </div>
                  <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-md">Use Custom</span>
                </button>
              )}

              <div className="space-y-2">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        onSelectLocation(loc);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition border border-transparent hover:border-gray-100 dark:hover:border-slate-700 group"
                    >
                      <div className="flex items-center gap-3 text-gray-700 dark:text-slate-200">
                        <FiMapPin className="text-gray-400 group-hover:text-orange-500 transition" />
                        <span className="font-medium">{loc}</span>
                      </div>
                      {currentLocation === loc && (
                        <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/40 px-2 py-1 rounded-full">
                          Selected
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No areas found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
