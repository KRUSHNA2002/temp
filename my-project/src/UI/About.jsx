import { motion } from "framer-motion";
import Testimonials from "./Testimonials";
import axios from "axios";
import { useEffect, useState } from "react";

import aboutbg from "../../public/premium_photo-1682097066897-209d0d9e9ae5.avif";

const About = () => {

  const [aboutData, setAboutData] =
    useState({
      subtitle: "",
      title: "",
      desc1: "",
      desc2: "",
      clients: "",
      experience: "",
      awards: "",
      image: "",
    });

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/about"
        );

        if (
          response.data.aboutEntry.length > 0
        ) {

          setAboutData(
            response.data.aboutEntry[0]
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

    fetchData();

  }, []);

  return (

    <>
      <section
        id="about"
        className="relative bg-black text-white min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden py-20"
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">

          <div className="w-full h-full bg-black relative">

            <div
              className="absolute w-full h-full"
              style={{
                background: `url(${aboutbg}) repeat`,
                backgroundSize: "cover",
                opacity: 0.15,
              }}
            />

          </div>

        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-3 mt-10 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >

            <p className="text-amber-400 uppercase tracking-[4px] text-sm">
              {aboutData.subtitle}
            </p>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              {aboutData.title}
            </h2>

            <p className="text-gray-300 leading-8 text-lg">
              {aboutData.desc1}
            </p>

            <p className="text-gray-400 leading-8">
              {aboutData.desc2}
            </p>

          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >

            <div className="relative">

              <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-20 rounded-full" />

              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-[6px] border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.4)] relative">

                <img
                  src={`http://localhost:5000/${aboutData.image}`}
                  alt="About"
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />

              </div>

            </div>

          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-amber-400 transition">

              <h3 className="text-5xl font-bold text-amber-400">
                {aboutData.clients}
              </h3>

              <p className="text-gray-300 mt-2 text-lg">
                Happy Clients
              </p>

            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-amber-400 transition">

              <h3 className="text-5xl font-bold text-amber-400">
                {aboutData.experience}
              </h3>

              <p className="text-gray-300 mt-2 text-lg">
                Years Experience
              </p>

            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-amber-400 transition">

              <h3 className="text-5xl font-bold text-amber-400">
                {aboutData.awards}
              </h3>

              <p className="text-gray-300 mt-2 text-lg">
                Awards Won
              </p>

            </div>

          </motion.div>

        </div>

      </section>

      <Testimonials />

    </>
  );
};

export default About;