import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import servicesbg from "../../public/photo-1502982720700-bfff97f2ecac.jfif";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://photography-xzfi.onrender.com/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={servicesbg}
          alt="Services Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-20 pt-30">
        <p className="text-amber-400 uppercase tracking-widest mb-3 text-sm md:text-base">
          Services
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">What I Offer</h2>
        <p></p>
      </div>

      {/* Services Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-7xl px-6 md:px-12 mb-20">
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Image Circle */}
            {service.img ? (
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-gray-700/50 to-gray-600/50 mb-5 shadow-md overflow-hidden">
                <img
                  src={`https://photography-xzfi.onrender.com/${service.img}`}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-700/50 mb-5 shadow-md">
                <span className="text-gray-300 font-bold text-xl">
                  {service.title?.[0] || "S"}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>

            {/* Price & Duration */}
            <div className="flex gap-3 mb-3 text-gray-200 font-medium">
              {service.price && <span>{service.price} Rs</span>}
              {service.perHour && <span>• {service.perHour}</span>}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base">{service.desc}</p>

            {/* Decorative Glow */}
            <div className="absolute -z-10 w-40 h-40 rounded-full bg-gradient-to-r from-gray-500/20 via-gray-600/20 to-gray-700/20 opacity-20 blur-3xl top-[-2rem] left-1/2 transform -translate-x-1/2"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;