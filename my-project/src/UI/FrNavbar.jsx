import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Use Link for routing
import { Outlet } from "react-router-dom"; // ✅ import Outlet
const FrNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null); // track open dropdown by index
  const [servicesOpen, setServicesOpen] = useState(false); // Desktop dropdown state

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Services", href: "/services" },
    
    {
      name: "More",
      href: "/more",
      dropdown: [
        { name: "blogs", href: "/blog" },
        { name: "faq", href: "/faq" },
        
      ],
    },

    // { name: "Contact", href: "/contact" },
   
  ];

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-6xl bg-gradient-to-r from-black/90 via-gray-900/70 to-black/90 rounded-full backdrop-blur-xl shadow-xl px-6 md:px-12 py-3 flex justify-between items-center mt-2 md:mt-4">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black text-lg">
            📸
          </div>
          <h1 className="text-lg md:text-2xl font-extrabold text-white tracking-widest hover:text-yellow-400 transition-colors duration-300">
            FOTOEXPRESS STUDIO
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 uppercase text-white font-semibold text-sm relative">
          {menuItems.map((item, idx) =>
            !item.dropdown ? (
              <li key={idx} className="relative group">
                <Link
                  to={item.href}
                  className="transition-all duration-300 hover:text-yellow-400 hover:scale-105  text-sm"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </li>
            ) : (
              <li
                key={idx}
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold uppercase transition-all duration-300 hover:text-yellow-400">
                  {item.name} ▼
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-44 bg-black/95 backdrop-blur-md rounded-xl shadow-xl py-2 flex flex-col text-sm text-white font-medium"
                    >
                      {item.dropdown.map((subItem, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-yellow-400/20 rounded-lg transition-colors duration-300"
                        >
                          <Link to={subItem.href}>{subItem.name}</Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            )
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:inline-block px-6 py-2 rounded-full bg-yellow-400 font-bold text-black hover:bg-yellow-300 transition-all duration-300 shadow-md"
          >
            Book Now
          </Link>
          <button
            className="md:hidden text-3xl text-white hover:text-yellow-400 transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden mx-auto max-w-6xl mt-2 bg-gradient-to-r from-black/90 via-gray-900/70 to-black/90 rounded-3xl backdrop-blur-xl shadow-xl px-6 py-6 space-y-4 text-center"
          >
            {menuItems.map((item, idx) =>
              !item.dropdown ? (
                <Link
                  key={idx}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 rounded-xl bg-white/5 hover:bg-yellow-400/20 transition-all duration-300 text-white font-semibold text-lg shadow-sm"
                >
                  {item.name}
                </Link>
              ) : (
                <div key={idx} className="space-y-2">
                  <button
                    onClick={() =>
                      setMobileDropdownOpen(
                        mobileDropdownOpen === idx ? null : idx
                      )
                    }
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-yellow-400/20 text-white font-semibold text-lg shadow-sm transition-all duration-300"
                  >
                    {item.name} {mobileDropdownOpen === idx ? "▲" : "▼"}
                  </button>

                  <AnimatePresence>
                    {mobileDropdownOpen === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-2 pl-4"
                      >
                        {item.dropdown.map((subItem, i) => (
                          <Link
                            key={i}
                            to={subItem.href}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 rounded-xl bg-white/10 hover:bg-yellow-400/20 transition-all duration-300 text-white font-medium text-base"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block mt-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-all duration-300 shadow-lg"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

     </>
  );
};

export default FrNavbar;