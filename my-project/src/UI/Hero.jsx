import { motion } from "framer-motion";
import Testimonials from "./Testimonials";
import {Link} from "react-router-dom"
import axios from "axios";
import herobg from  "../../public/photo-1502982720700-bfff97f2ecac.jfif";
import { useEffect, useState } from "react";

const Hero = () => {

  const [heroData, setHeroData] = useState({});
  
 useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://photography-xzfi.onrender.com/api/herosection"
        );

        console.log(response.data.heroEntry[0]);

        setHeroData(response.data.heroEntry[0]);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);
  



  return (
    <>
    <section
      id="home"
      className="relative h-screen bg-black text-white flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            `url('${herobg}')`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-amber-400 uppercase tracking-[4px] mb-4 text-sm md:text-base"
          >
            {heroData.headline}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="text-4xl md:text-8xl font-bold leading-tight mb-6"
          >
            {heroData.title}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mt-4 md:mt-6 text-gray-300 max-w-xl mx-auto md:mx-0"
          >
           {heroData.desc}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start"
          >
            <button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
              <Link to='/gallery'>{heroData?.btn1}</Link>
            </button>

            <button className="border border-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-300">
             <Link to='/contact'> {heroData.btn2}</Link>
            </button>
          </motion.div>
        </motion.div>
      </div> 
    </section>
  
  

    </>
  );
};

export default Hero;