import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Gallery = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allPhotos, setallPhotos] = useState([]);

  useEffect(() => {

    const fetchGallery = async () => {

      try {

        const response = await axios.get(
          "https://photography-xzfi.onrender.com/api/gallery"
        );

        setallPhotos(response.data.data);

      } catch (err) {

        console.error("Error fetching gallery:", err);

      }

    };

    fetchGallery();

  }, []);

  const categories = [
    "All",
    ...new Set(allPhotos.map((item) => item.category)),
  ];

  const filteredPhotos = allPhotos.filter(
    (item) =>
      selectedCategory === "All" ||
      item.category === selectedCategory
  );

  return (

    <section
      id="portfolio"
      className="relative bg-black py-28 px-6 md:px-12 overflow-hidden"
    >

      {/* TOP BLUR */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-500 rounded-full blur-3xl opacity-20"></div>

      {/* BOTTOM BLUR */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADING */}
        <div className="text-center mb-20">

          <p className="text-[#d4a017] uppercase tracking-[5px] mb-4 font-semibold">
            Portfolio
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">

            Our
            <span className="text-[#d4a017]"> Gallery</span>

          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg leading-8">

            Capturing timeless moments with elegance,
            creativity, and cinematic storytelling.

          </p>

        </div>

        {/* CATEGORY TABS */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">

          {categories.map((cat) => (

            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-7 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#d4a017] text-white shadow-lg"
                  : "bg-[#111111] border border-[#2a2a2a] text-gray-300 hover:bg-[#1b1b1b]"
              }`}
            >

              {cat}

            </button>

          ))}

        </div>

        {/* GALLERY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <AnimatePresence>

            {filteredPhotos.map((photo, idx) => (

              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[32px] bg-[#111111] border border-[#222222] shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_60px_rgba(212,160,23,0.20)] transition-all duration-500"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-[32px]">

                  <img
                    src={`https://photography-xzfi.onrender.com/${photo.image}`}
                    alt={photo.category}
                    loading="lazy"
                    className="w-full h-[450px] object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* CATEGORY TEXT */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">

                    <p className="text-[#f6d365] uppercase tracking-[3px] text-sm mb-2">

                      Photography

                    </p>

                    <h3 className="text-white text-2xl font-bold">

                      {photo.category}

                    </h3>

                  </div>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

        {/* EMPTY */}
        {filteredPhotos.length === 0 && (

          <div className="text-center py-24">

            <h3 className="text-3xl font-bold text-white mb-4">
              No Images Found
            </h3>

            <p className="text-gray-400">
              Please upload gallery images.
            </p>

          </div>

        )}

      </div>

    </section>

  );

};

export default Gallery;