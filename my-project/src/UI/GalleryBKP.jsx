import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allPhotos, setallPhotos] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("https://photography-xzfi.onrender.com/api/gallery");
        setallPhotos(response.data.data); 
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };

    fetchGallery();
  }, []);

  const categories = ["All", ...new Set(allPhotos.map(item => item.category))];

const filteredPhotos = allPhotos.filter(
  (item) =>
    selectedCategory === "All" ||
    item.category === selectedCategory
);

  return (
    <section
      id="portfolio"
      className="relative bg-black text-white py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-amber-400 uppercase tracking-[4px] mb-3">Portfolio</p>
        <h2 className="text-3xl md:text-5xl font-bold">Our Work</h2>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-6 mb-12 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedCategory === cat
                ? "bg-amber-400 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl cursor-pointer break-inside-avoid shadow-lg"
            >
              <img
                src={`https://photography-xzfi.onrender.com/${photo.image}`}
                alt={photo.category}
                className="w-full object-cover hover:brightness-110 transition duration-500"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;