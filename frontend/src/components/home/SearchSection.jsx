import { useState, useRef } from "react";
import { FiSearch, FiMic, FiMicOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const popularSearches = [
  "Restaurants",
  "Grocery",
  "Bakery",
  "Dairy",
  "Misal",
  "Cafe",
  "Pizza",
  "Services",
];

const mockSuggestions = [
  "Kolhapur Misal House",
  "Shree Krishna Organic Mart",
  "Mahalaxmi Sweets & Bakers",
  "Royal Fresh Dairy",
  "Solkadhi",
];

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const filtered = mockSuggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (searchTerm) => {
    const term = searchTerm || query;
    if (term.trim()) {
      navigate(`/explore?search=${encodeURIComponent(term.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice search is not supported in your browser. Please type to search.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN"; // Supports Indian English & Hindi terms

      recognition.onstart = () => {
        setIsListening(true);
        toast.success("Listening... Speak now! 🎙️", { id: "voice-toast" });
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        toast.success(`Voice recognized: "${transcript}"`);
        setIsListening(false);
        handleSearch(transcript);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          toast.error("Microphone permission denied. Please allow microphone access.");
        } else {
          toast.error("Voice not recognized. Please try speaking again.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Failed to start voice recognition:", err);
      setIsListening(false);
      toast.error("Could not start voice search.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-5 mt-6">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

        <input
          type="text"
          placeholder={isListening ? "Listening to your voice..." : "Search shops, restaurants, bakeries, or daily items..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full h-14 rounded-2xl border bg-white dark:bg-slate-800 text-gray-900 dark:text-white pl-12 pr-14 outline-none focus:ring-2 shadow-sm transition ${
            isListening
              ? "border-red-500 ring-2 ring-red-500/30 bg-red-50/20 dark:bg-red-950/20"
              : "border-gray-200 dark:border-slate-700 focus:ring-orange-500"
          }`}
        />

        <button
          type="button"
          onClick={handleVoiceSearch}
          title={isListening ? "Stop Listening" : "Start Voice Search"}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${
            isListening
              ? "bg-red-500 text-white animate-pulse shadow-md shadow-red-500/30"
              : "text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-700"
          }`}
        >
          {isListening ? <FiMicOff size={20} /> : <FiMic size={20} />}
        </button>

        <AnimatePresence>
          {query && !isListening && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 right-0 mt-2 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-30"
            >
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 text-sm font-medium transition border-b border-gray-50 dark:border-slate-700/50 last:border-none"
                  >
                    🔍 {item}
                  </button>
                ))
              ) : (
                <button
                  onClick={() => handleSearch()}
                  className="w-full text-left px-4 py-3 hover:bg-orange-50 dark:hover:bg-slate-700 text-orange-600 dark:text-orange-400 text-sm font-semibold transition"
                >
                  Search "{query}" in Explore →
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-2 overflow-x-auto mt-4 pb-2 scrollbar-hide">
        {popularSearches.map((item) => (
          <button
            key={item}
            onClick={() => handleSearch(item)}
            className="whitespace-nowrap rounded-full bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-700 px-4 py-1.5 text-xs font-semibold text-orange-700 dark:text-orange-300 hover:bg-orange-500 hover:text-white transition shadow-sm"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
