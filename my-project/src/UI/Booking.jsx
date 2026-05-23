import { useState } from "react";
import { motion } from "framer-motion";
import img1 from "../../public/photo-1516035069371-29a1b244cc32.avif";
import toast, { Toaster } from "react-hot-toast";
import { use } from "react";
const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    date: "",
    package: "",
    message: "",
  });

  const [btnsubmit,setbtnsubmit]=useState(true);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtnsubmit(false);
    try {
      const response = await fetch("http://localhost:5000/api/bookings/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
       toast.success("Booking Submitted Successfully 📸");

        setFormData({ name: "", email: "", phoneno: "", date: "", package: "", message: "" });

        setbtnsubmit(true);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(data.message);
    }
  };

  return (
<>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
    <section
      id="contact"
      className="relative text-white py-20 px-4 md:px-8 overflow-hidden"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

     
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-5xl mx-auto z-10">
        <div className="text-center mb-12 mt-8">
          <p className="text-amber-400 uppercase tracking-[4px] mb-3 font-semibold">
            Book Now
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Reserve Your Session
          </h2>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 bg-black/70 p-10 rounded-3xl shadow-2xl backdrop-blur-md"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="bg-zinc-900/80 p-4 rounded-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 transition"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="bg-zinc-900/80 p-4 rounded-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 transition"
          />

          {/* 🔹 Phone Number */}
          {/* 🔹 Phone Number */}
          <input
            type="tel"
            name="phoneno" // match the state key
            value={formData.phoneno}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="bg-zinc-900/80 p-4 rounded-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 transition"
          />

          {/* 🔹 Date with white calendar icon */}
          <div className="relative">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-zinc-900/80 p-4 rounded-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 transition w-full appearance-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              {/* White calendar icon */}
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6 2a1 1 0 100 2h8a1 1 0 100-2H6zM3 6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm2 2v2h2V8H5zm4 0v2h2V8H9zm4 0v2h2V8h-2zm-8 4v2h2v-2H5zm4 0v2h2v-2H9zm4 0v2h2v-2h-2z" />
              </svg>
            </div>
          </div>

          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="bg-zinc-900/80 p-4 rounded-xl outline-none text-gray-400 focus:ring-2 focus:ring-amber-500 transition"
          >
            <option value="">Select Package</option>
            <option value="Wedding Shoot">Wedding Shoot</option>
            <option value="Portrait Shoot">Portrait Shoot</option>
            <option value="Event Shoot">Event Shoot</option>
            <option value="Fashion Shoot">Fashion Shoot</option>
          </select>

          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="md:col-span-2 bg-zinc-900/80 p-4 rounded-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 transition"
          ></textarea>

          <button
            type="submit"
            className={`md:col-span-2 bg-amber-500 hover:bg-amber-600 transition-colors text-black py-4 rounded-xl font-bold shadow-lg hover:shadow-xl ${!btnsubmit ? "opacity-50 cursor-not-allowed":"hover:shadow-xl"} `}
          >
            Book Session
          </button>
        </motion.form>
      </div>
    </section>
    </>
  );
};

export default Booking;