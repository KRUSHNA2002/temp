import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SidebarButton = () => {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // WhatsApp details
  const phoneNumber = "917020787143";

  const message =
    "Hi, thank you for visiting our website. We appreciate your interest and look forward to connecting with you.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center z-50">

      {/* Main Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-amber-50 opacity-25 text-black p-4 rounded-full shadow-lg mb-4 transition-transform transform-gpu hover:scale-110"
        aria-label="Toggle Sidebar"
      >
        {open ? <FaArrowRight size={20} /> : <FaArrowLeft size={20} />}
      </button>

      {/* Animated Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col space-y-4 bg-black/80 p-4 rounded-xl shadow-lg"
          >
            {/* Scroll Top */}
            <button
              onClick={scrollToTop}
              className="bg-amber-500 text-white p-3 rounded-full hover:bg-amber-600 transition"
              aria-label="Scroll to Top"
            >
              <FaArrowUp />
            </button>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
            >
              <FaFacebookF />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition"
            >
              <FaWhatsapp />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarButton;